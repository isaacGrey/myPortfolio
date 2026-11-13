import { useEffect, useRef } from 'react';

const PROVIDED_IDS = {
  rest: 'rest.png',
  closed: 'closed.png',
  half: 'half.png',
  left: 'left.png',
  right: 'right.png',
  up: 'up.png',
  down: 'down.png',
  upright: 'upright.png',
  wnw: 'wnw.png',
  downright: 'downright.png',
  downleft: 'downleft.png',
  ene: 'ene.png',
  ese: 'ese.png',
  nne: 'nne.png',
  nnw: 'nnw.png',
  ssw: 'ssw.png',
  sse: 'sse.png',
  wsw: 'wsw.png',
  shock: 'shock.png',
  ouch: 'ouch.png',
  scared: 'scared.png',
  tongue: 'tongue.png',
};

// These are keys used by the original portrait engine that do not have a
// custom image in Isaac's portrait set. Pointing them to rest.png keeps any
// future/original trigger safe instead of requesting missing assets.
const FALLBACK_KEYS = [
  'cross', 'angry', 'scrunch', 'winkr', 'winkl', 'raised', 'puff', 'laugh',
  'yawn', 'grin', 'kiss', 'cry', 'smug', 'fish', 'blue', 'dizzy', 'blonde',
  'pink', 'wind', 'deadpan', 'yawn1', 'yawn2', 'whistle1', 'yawn4', 'sneeze1',
  'gum1', 'gum2', 'whistle2', 'sneeze2', 'gum3', 'gumpop', 'hearts', 'stars',
  'snore', 'shy', 'sick',
];

const IDS = Object.freeze({
  ...PROVIDED_IDS,
  ...Object.fromEntries(FALLBACK_KEYS.map((key) => [key, 'rest.png'])),
});

const RING = ['e', 'ene', 'ne', 'nne', 'n', 'nnw', 'nw', 'wnw', 'w', 'wsw', 'sw', 'ssw', 's', 'sse', 'se', 'ese'];
const EYEFILE = {
  e: 'right',
  ene: 'ene',
  ne: 'upright',
  nne: 'nne',
  n: 'up',
  nnw: 'nnw',
  nw: 'wnw',
  wnw: 'wnw',
  w: 'left',
  wsw: 'wsw',
  sw: 'downleft',
  ssw: 'ssw',
  s: 'down',
  sse: 'sse',
  se: 'downright',
  ese: 'ese',
  half: 'half',
  closed: 'closed',
};

const REACTIONS = ['tongue', 'shock', 'scared'];

// Optional local sound effects. Drop your files into public/sounds/ using these names.
// The portrait still works normally if the files are not present.
const SOUND_URLS = {
  pull: '/sounds/pull.mp3',
  ouch: '/sounds/ouch.mp3',
};

export default function LivingPortrait() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const fallbackRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const fallback = fallbackRef.current;
    if (!wrap || !canvas) return undefined;
    if (fallback) fallback.style.visibility = 'visible';

    const P = '/portrait/';
    const url = (fileName) => `${P}${fileName}`;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    if (!gl) return undefined;

    let alive = true;
    let rafId = 0;
    const timers = new Set();

    const later = (fn, delay) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (alive) fn();
      }, delay);
      timers.add(id);
      return id;
    };

    const audioCache = {};
    const playSound = (name, volume = 0.7) => {
      const source = SOUND_URLS[name];
      if (!source) return;
      try {
        let audio = audioCache[name];
        if (!audio) {
          audio = new Audio(source);
          audio.preload = 'auto';
          audioCache[name] = audio;
        }
        audio.pause();
        audio.currentTime = 0;
        audio.volume = volume;
        const playback = audio.play();
        if (playback?.catch) playback.catch(() => {});
      } catch {
        // Sound effects are optional; never interrupt portrait interaction.
      }
    };

    const stopSound = (name) => {
      const audio = audioCache[name];
      if (!audio) return;
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {
        // Sound effects are optional; never interrupt portrait interaction.
      }
    };

    const OVER = 1.7;
    const N = 72;
    const M = N + 1;
    const SPAN = OVER / N;
    const ORIGIN = 0.5 - OVER / 2;
    const WOBBLE = 2.3 * 2 * Math.PI;
    const REACH = 0.085 / SPAN;
    const C = REACH * WOBBLE;
    const GAMMA = 2 * 0.14 * WOBBLE;
    const NU = 0.2 * C;

    const VS = `
      attribute vec2 a, d;
      attribute float s;
      varying vec2 vUv;
      varying float vS;
      uniform vec2 lean;
      uniform float overS;
      void main() {
        vUv = a;
        vS = s;
        vec2 p = a + d + lean;
        gl_Position = vec4(vec2(p.x - .5, .5 - p.y) * 2. / overS, 0., 1.);
      }
    `;

    const FS = `
      precision highp float;
      varying vec2 vUv;
      varying float vS;
      uniform sampler2D faceA, faceB;
      uniform float fade;
      void main() {
        if (vUv.x < 0. || vUv.y < 0. || vUv.x > 1. || vUv.y > 1.) {
          gl_FragColor = vec4(0.);
          return;
        }
        vec4 c = mix(texture2D(faceA, vUv), texture2D(faceB, vUv), fade);
        if (c.a < .004) {
          gl_FragColor = vec4(0.);
          return;
        }
        gl_FragColor = vec4(c.rgb * vS, c.a);
      }
    `;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    const vertexShader = compileShader(gl.VERTEX_SHADER, VS);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, FS);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const U = { over_: gl.getUniformLocation(program, 'overS') };
    for (const name of ['lean', 'faceA', 'faceB', 'fade']) {
      U[name] = gl.getUniformLocation(program, name);
    }
    gl.uniform1f(U.over_, OVER);
    gl.uniform1i(U.faceA, 0);
    gl.uniform1i(U.faceB, 1);

    const count = M * M;
    const ux = new Float32Array(count);
    const uy = new Float32Array(count);
    const vx = new Float32Array(count);
    const vy = new Float32Array(count);
    const rest = new Float32Array(count * 2);
    const dyn = new Float32Array(count * 3);
    const sx = new Float32Array(count);
    const sy = new Float32Array(count);

    for (let j = 0, k = 0; j < M; j += 1) {
      for (let i = 0; i < M; i += 1) {
        rest[k++] = ORIGIN + i * SPAN;
        rest[k++] = ORIGIN + j * SPAN;
      }
    }

    const idx = new Uint16Array(N * N * 6);
    for (let j = 0, k = 0; j < N; j += 1) {
      for (let i = 0; i < N; i += 1) {
        const a = j * M + i;
        const b = a + 1;
        const c = a + M;
        const d = c + 1;
        idx[k++] = a;
        idx[k++] = c;
        idx[k++] = b;
        idx[k++] = b;
        idx[k++] = c;
        idx[k++] = d;
      }
    }

    const restBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, restBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, rest, gl.STATIC_DRAW);
    const attrA = gl.getAttribLocation(program, 'a');
    gl.enableVertexAttribArray(attrA);
    gl.vertexAttribPointer(attrA, 2, gl.FLOAT, false, 0, 0);

    const dynBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dynBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, dyn, gl.DYNAMIC_DRAW);
    const attrD = gl.getAttribLocation(program, 'd');
    const attrS = gl.getAttribLocation(program, 's');
    gl.enableVertexAttribArray(attrD);
    gl.vertexAttribPointer(attrD, 2, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray(attrS);
    gl.vertexAttribPointer(attrS, 1, gl.FLOAT, false, 12, 8);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    let brush = null;
    function takeHold(u, v, radius = 0.22) {
      const list = [];
      for (let k = 0; k < count; k += 1) {
        const dx = rest[k * 2] + ux[k] - u;
        const dy = rest[k * 2 + 1] + uy[k] - v;
        const weight = Math.exp(-(dx * dx + dy * dy) / (radius * radius));
        if (weight > 0.02) list.push([k, weight, ux[k], uy[k]]);
      }
      brush = { u, v, list, px: 0, py: 0 };
    }

    const GAP = SPAN * 0.34;
    const lineA = new Float32Array(M);
    const lineB = new Float32Array(M);
    const lineP = new Float32Array(M);

    function order(start, stride, field, base) {
      for (let i = 0; i < M; i += 1) {
        const k = start + i * stride;
        lineP[i] = base[k] + field[k];
      }
      lineA[0] = lineP[0];
      for (let i = 1; i < M; i += 1) lineA[i] = Math.max(lineP[i], lineA[i - 1] + GAP);
      lineB[N] = lineP[N];
      for (let i = N - 1; i >= 0; i -= 1) lineB[i] = Math.min(lineP[i], lineB[i + 1] - GAP);
      for (let i = 0; i < M; i += 1) {
        const k = start + i * stride;
        field[k] = (lineA[i] + lineB[i]) / 2 - base[k];
      }
    }

    const restX = new Float32Array(count);
    const restY = new Float32Array(count);
    for (let k = 0; k < count; k += 1) {
      restX[k] = rest[k * 2];
      restY[k] = rest[k * 2 + 1];
    }

    function untangle() {
      for (let pass = 0; pass < 2; pass += 1) {
        for (let j = 0; j < M; j += 1) order(j * M, 1, sx, restX);
        for (let i = 0; i < M; i += 1) order(i, M, sy, restY);
      }
    }

    const H = 1 / 240;
    let simLeft = 0;

    function step(dt) {
      const c2 = C * C;
      const wo2 = WOBBLE * WOBBLE;
      for (let j = 1; j < N; j += 1) {
        for (let i = 1; i < N; i += 1) {
          const k = j * M + i;
          const l = k - 1;
          const r = k + 1;
          const t = k - M;
          const b = k + M;
          const lx = ux[l] + ux[r] + ux[t] + ux[b] - 4 * ux[k];
          const ly = uy[l] + uy[r] + uy[t] + uy[b] - 4 * uy[k];
          const lvx = vx[l] + vx[r] + vx[t] + vx[b] - 4 * vx[k];
          const lvy = vy[l] + vy[r] + vy[t] + vy[b] - 4 * vy[k];
          vx[k] += (c2 * lx - wo2 * ux[k] - GAMMA * vx[k] + NU * lvx) * dt;
          vy[k] += (c2 * ly - wo2 * uy[k] - GAMMA * vy[k] + NU * lvy) * dt;
        }
      }

      if (brush) {
        for (const [k, weight, u0, v0] of brush.list) {
          const K = 3000 * weight;
          const D = 90 * weight;
          vx[k] += ((u0 + brush.px * weight - ux[k]) * K - vx[k] * D) * dt;
          vy[k] += ((v0 + brush.py * weight - uy[k]) * K - vy[k] * D) * dt;
        }
      }

      for (let k = 0; k < count; k += 1) {
        ux[k] += vx[k] * dt;
        uy[k] += vy[k] * dt;
      }
    }

    function poke(u, v, dx, dy, radius = 0.09) {
      for (let k = 0; k < count; k += 1) {
        const ax = rest[k * 2] - u;
        const ay = rest[k * 2 + 1] - v;
        const weight = Math.exp(-(ax * ax + ay * ay) / (radius * radius));
        vx[k] += dx * weight;
        vy[k] += dy * weight;
      }
    }

    const textures = {};
    const configureTexture = () => {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

    const load = (name) => new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = url(IDS[name] ?? IDS.rest);
    });

    function upload(name, image) {
      if (!alive || !image) return;
      const texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE5);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      configureTexture();
      textures[name] = texture;
    }

    let ready = false;
    let alphaMap = null;
    let last = performance.now();
    let pu = 0.5;
    let pv = 0.5;
    let awake = false;
    let pressed = false;
    let downU = 0;
    let downV = 0;
    let lastX = 0;
    let lastY = 0;
    let moodFace = null;
    let moodUntil = 0;
    let faceA = 'rest';
    let faceB = 'rest';
    let fadeT = 0;
    let fadeMs = 1;
    let logical = 'rest';
    let logicalMs = 70;
    let eyeNow = 'rest';
    let eyeNowMs = 40;
    let nextBlink = 0;
    let blinkStep = -1;
    let blinkT = 0;
    let leanX = 0;
    let leanY = 0;
    let lvX = 0;
    let lvY = 0;
    let reactionIndex = 0;
    let pullSoundPlayed = false;

    const fileOf = (cell) => (cell === 'rest' ? 'rest' : EYEFILE[cell]);
    const setFace = (name, ms) => {
      logical = name;
      logicalMs = ms;
    };
    const setEye = (cell, ms) => {
      const file = fileOf(cell);
      if (file && textures[file]) {
        eyeNow = cell;
        eyeNowMs = ms;
      }
    };

    function show(name, ms, now) {
      if (!textures[name] || name === faceB) return;
      faceA = (now - fadeT) / fadeMs > 0.5 ? faceB : faceA;
      faceB = name;
      fadeT = now;
      fadeMs = Math.min(70, Math.max(1, ms));
    }

    function compose(now) {
      if (logical !== 'rest') show(logical, logicalMs, now);
      else show(fileOf(eyeNow), eyeNowMs, now);
    }

    const ringFor = (dx, dy) => RING[
      Math.round(((Math.atan2(-dy, dx) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI / 8)) % 16
    ];

    function hitMap(image) {
      const alphaCanvas = document.createElement('canvas');
      alphaCanvas.width = 128;
      alphaCanvas.height = 128;
      const context = alphaCanvas.getContext('2d', { willReadFrequently: true });
      context.clearRect(0, 0, 128, 128);
      context.drawImage(image, 0, 0, 128, 128);
      alphaMap = context.getImageData(0, 0, 128, 128).data;
    }

    const toUv = (x, y) => {
      const rect = canvas.getBoundingClientRect();
      return [
        ((x - rect.left) / rect.width - 0.5) * OVER + 0.5,
        ((y - rect.top) / rect.height - 0.5) * OVER + 0.5,
      ];
    };

    const solid = (u, v) => (
      alphaMap
      && u >= 0 && v >= 0 && u < 1 && v < 1
      && alphaMap[((Math.floor(v * 128) * 128 + Math.floor(u * 128)) * 4) + 3] > 40
    );

    function wake(now) {
      if (awake) return;
      awake = true;
      // Do not force a centered wake-up blink. It caused the portrait to
      // momentarily snap straight when the pointer first entered the page.
      nextBlink = now + 1600;
    }

    function setReaction(name, duration = 650) {
      if (!textures[name]) return;
      moodFace = name;
      moodUntil = performance.now() + duration;
    }

    const onPointerMove = (event) => {
      const now = performance.now();
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      [pu, pv] = toUv(event.clientX, event.clientY);
      wake(now);

      const onHead = solid(pu, pv);
      wrap.style.cursor = pressed ? 'grabbing' : onHead ? 'grab' : '';
      if (onHead && !pressed) poke(pu, pv, dx * 0.00035, dy * 0.00035, 0.07);

      if (pressed && brush) {
        let px = pu - brush.u;
        let py = pv - brush.v;
        const length = Math.hypot(px, py);
        const limit = 0.24;
        if (length > 0) {
          const scale = limit * (1 - Math.exp(-length / limit)) / length;
          px *= scale;
          py *= scale;
        }
        brush.px = px;
        brush.py = py;

        if (!pullSoundPlayed && Math.hypot(px, py) > 0.025) {
          pullSoundPlayed = true;
          playSound('pull', 0.65);
        }
      }
    };

    const onPointerDown = (event) => {
      const now = performance.now();
      const [u, v] = toUv(event.clientX, event.clientY);
      if (!solid(u, v)) return;
      wake(now);
      pressed = true;
      downU = u;
      downV = v;
      pu = u;
      pv = v;
      takeHold(u, v);
      moodFace = null;
      pullSoundPlayed = false;
      wrap.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    };

    const release = (event) => {
      if (!pressed) return;
      const dragDistance = Math.hypot(pu - downU, pv - downV);
      stopSound('pull');
      pressed = false;
      brush = null;
      wrap.style.cursor = solid(pu, pv) ? 'grab' : '';
      if (event?.pointerId != null && wrap.hasPointerCapture?.(event.pointerId)) {
        wrap.releasePointerCapture(event.pointerId);
      }

      if (dragDistance > 0.035) {
        playSound('ouch', 0.78);
        setReaction('ouch', 720);
      } else {
        const reaction = REACTIONS[reactionIndex % REACTIONS.length];
        reactionIndex += 1;
        setReaction(reaction, reaction === 'tongue' ? 780 : 620);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    wrap.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);

    let lastScroll = window.scrollY;
    let scrollUntil = 0;
    const onScroll = () => {
      const now = performance.now();
      if (Math.abs(window.scrollY - lastScroll) > 2) {
        scrollUntil = now + 500;
        lastScroll = window.scrollY;
      }
      wake(now);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let visible = true;
    const intersectionObserver = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    }, { threshold: 0 });
    intersectionObserver.observe(canvas);

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(bounds.width * ratio));
      const height = Math.max(1, Math.floor(bounds.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    resizeCanvas();

    function frame(now) {
      if (!alive) return;
      rafId = requestAnimationFrame(frame);
      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;
      if (!ready || !visible) return;

      const want = moodFace && now < moodUntil ? moodFace : 'rest';
      if (moodFace && now >= moodUntil) moodFace = null;
      setFace(want, want === 'rest' ? 110 : 90);

      if (logical === 'rest') {
        if (!awake) {
          setEye('closed', 200);
        } else if (blinkStep >= 0) {
          const stepIndex = Math.floor((now - blinkT) / 62);
          if (stepIndex !== blinkStep) {
            blinkStep = stepIndex;
            if (stepIndex === 0) setEye('half', 20);
            else if (stepIndex === 1) setEye('closed', 20);
            else if (stepIndex === 2) setEye('half', 20);
            else blinkStep = -1;
          }
        } else {
          const target = now < scrollUntil ? [0, 1] : [pu - 0.5, pv - 0.46];
          const targetDistance = Math.hypot(target[0], target[1]);
          const gazeCell = targetDistance < 0.13 ? 'rest' : ringFor(target[0], target[1]);
          setEye(gazeCell, 50);

          if (now > nextBlink) {
            // half.png and closed.png are straight-facing portraits. Blinking
            // while looking off-center made the face visibly snap straight
            // every few seconds. Only blink when the current gaze is centered.
            if (gazeCell === 'rest') {
              blinkStep = 0;
              blinkT = now;
              setEye('half', 20);
              nextBlink = now + 2200 + Math.random() * 3400;
            } else {
              // Keep the pending blink alive without interrupting directional gaze.
              nextBlink = now + 450;
            }
          }
        }
      }

      compose(now);

      const tx = (
        pressed
          ? (brush ? brush.px * 0.16 : 0)
          : awake ? (pu - 0.5) * 0.012 : 0
      ) + Math.sin(now * 0.0009) * 0.0015;
      const ty = (
        pressed
          ? (brush ? brush.py * 0.16 : 0)
          : awake ? (pv - 0.46) * 0.008 : 0
      ) + Math.sin(now * 0.0013) * 0.0022;

      lvX += ((tx - leanX) * 70 - lvX * 8) * dt;
      lvY += ((ty - leanY) * 70 - lvY * 8) * dt;
      leanX += lvX * dt;
      leanY += lvY * dt;

      simLeft += dt;
      let steps = 0;
      while (simLeft >= H && steps < 9) {
        step(H);
        simLeft -= H;
        steps += 1;
      }
      if (steps === 9) simLeft = 0;

      for (let j = 0; j < M; j += 1) {
        for (let i = 0; i < M; i += 1) {
          const k = j * M + i;
          const edge = i === 0 || j === 0 || i === N || j === N;
          sx[k] = edge ? ux[k] : (ux[k] * 4 + ux[k - 1] + ux[k + 1] + ux[k - M] + ux[k + M]) / 8;
          sy[k] = edge ? uy[k] : (uy[k] * 4 + uy[k - 1] + uy[k + 1] + uy[k - M] + uy[k + M]) / 8;
        }
      }

      untangle();
      for (let k = 0, offset = 0; k < count; k += 1) {
        dyn[offset++] = sx[k];
        dyn[offset++] = sy[k];
        const row = k % M;
        const column = Math.floor(k / M);
        let shade = 1;
        if (row > 0 && row < N && column > 0 && column < N) {
          shade = Math.max(
            0.86,
            Math.min(1.16, 1 - ((sx[k + 1] - sx[k - 1]) + (sy[k + M] - sy[k - M])) * 1.8),
          );
        }
        dyn[offset++] = shade;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, dynBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, dyn);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[faceA] || textures.rest);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[faceB] || textures.rest);
      gl.uniform1f(U.fade, Math.min(1, (now - fadeT) / fadeMs));
      gl.uniform2f(U.lean, leanX, leanY);
      gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
    }

    (async () => {
      const base = await load('rest');
      if (!alive || !base) return;
      upload('rest', base);
      hitMap(base);
      if (fallback) fallback.style.visibility = 'hidden';
      ready = true;
      last = performance.now();
      rafId = requestAnimationFrame(frame);

      const take = async (name) => {
        const image = await load(name);
        if (alive && image) upload(name, image);
      };

      await Promise.all(['closed', 'half'].map(take));
      if (!alive) return;

      const gazeNames = [
        'right', 'ene', 'upright', 'nne', 'up', 'nnw', 'wnw', 'left',
        'wsw', 'downleft', 'ssw', 'down', 'sse', 'downright', 'ese',
      ];
      const reactionNames = ['shock', 'ouch', 'scared', 'tongue'];
      const names = [...gazeNames, ...reactionNames];
      let cursor = 0;
      await Promise.all(Array.from({ length: 4 }, async () => {
        while (alive && cursor < names.length) {
          const name = names[cursor++];
          await take(name);
        }
      }));
    })();

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      window.removeEventListener('scroll', onScroll);
      stopSound('pull');
      Object.values(textures).forEach((texture) => gl.deleteTexture(texture));
      gl.deleteBuffer(restBuffer);
      gl.deleteBuffer(dynBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
    };
  }, []);

  const fallbackSrc = '/portrait/rest.png';

  return (
    <div
      className="hero-art living-portrait-panel"
      data-reveal
      aria-label="Interactive portrait of Isaac Greyole S. Balingit"
    >
      <div className="art-topline"><span>ENGINEERING / 01</span><span>IB—SYS</span></div>
      <div className="art-grid" aria-hidden="true" />
      <div className="living-portrait-stage">
        <div className="living-portrait-wrap" ref={wrapRef}>
          <img
            ref={fallbackRef}
            className="living-portrait-fallback"
            src={fallbackSrc}
            alt="Isaac Greyole S. Balingit"
            draggable="false"
          />
          <canvas ref={canvasRef} className="living-portrait-canvas" aria-hidden="true" />
        </div>
      </div>
      <div className="art-coordinate">SYSTEMS<br />IN MOTION</div>
      <div className="art-bottomline"><span>BUILD / CONNECT / IMPROVE</span><span>◌</span></div>
    </div>
  );
}
