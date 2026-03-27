export function Rev({ label, val }) {
  return (
    <div className="gs-rev">
      <div className="gs-rev-label">{label}</div>
      <div className="gs-rev-val">{val}</div>
    </div>
  );
}

export function RevTags({ label, tags }) {
  return (
    <div className="gs-rev">
      <div className="gs-rev-label">{label}</div>
      <div className="gs-rev-tags">{tags.map((t, i) => <span key={i} className="gs-rev-tag">{t}</span>)}</div>
    </div>
  );
}
