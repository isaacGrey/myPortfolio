export default function TagList({ items, className = '' }) {
  return (
    <div className={`tag-list ${className}`}>
      {items.map((item) => <span className="tech-tag" key={item}>{item}</span>)}
    </div>
  );
}
