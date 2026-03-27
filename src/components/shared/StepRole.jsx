export default function StepRole({ v, set }) {
  return (
    <div>
      <h2 className="gs-title">What brings you here?</h2>
      <p className="gs-desc">Let us know how we can help you today.</p>
      <div className="gs-roles">
        {[
          { id: "seeker", icon: "🔍", label: "Looking for a Job", hint: "Find gigs nearby" },
          { id: "poster", icon: "📋", label: "Looking to Hire", hint: "Post a gig & find helpers" },
        ].map(o => (
          <button key={o.id} className={`gs-role ${v === o.id ? "active" : ""}`} onClick={() => set(o.id)}>
            <span className="gs-role-icon">{o.icon}</span>
            <span className="gs-role-label">{o.label}</span>
            <span className="gs-role-hint">{o.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
