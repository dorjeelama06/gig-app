import { CATEGORY_OPTIONS } from "../../constants/options";

export default function StepJobDetails({ d, set, toggle, addCustom }) {
  return (
    <div>
      <h2 className="gs-title">What's the job?</h2>
      <p className="gs-desc">Describe the gig so seekers know what to expect.</p>
      <div className="gs-field">
        <label className="gs-label">Job Title *</label>
        <input className="gs-input" value={d.jobTitle}
          onChange={e => set("jobTitle", e.target.value)} placeholder="e.g. Car Detailing Assistant" />
      </div>
      <div className="gs-field">
        <label className="gs-label">Description</label>
        <textarea className="gs-textarea" value={d.jobDesc}
          onChange={e => set("jobDesc", e.target.value)}
          placeholder="What will the worker be doing? Any details about the role..." />
      </div>
      <div className="gs-field">
        <label className="gs-label">Category * (select all that apply)</label>
        <div className="gs-chips" style={{ marginTop: 6 }}>
          {CATEGORY_OPTIONS.map(o => (
            <button key={o.id} className={`gs-chip ${d.jobCategory.includes(o.id) ? "active" : ""}`}
              onClick={() => toggle(o.id)}>
              <span className="gs-chip-icon">{o.icon}</span><span>{o.label}</span>
            </button>
          ))}
          {d.jobCategory.filter(s => !CATEGORY_OPTIONS.find(o => o.id === s)).map(c => (
            <button key={c} className="gs-chip active" onClick={() => toggle(c)}>
              <span className="gs-chip-icon">✨</span><span>{c}</span>
            </button>
          ))}
        </div>
        <div className="gs-custom-row" style={{ marginTop: 8 }}>
          <input className="gs-input" style={{ flex: 1 }} value={d.customCategory}
            onChange={e => set("customCategory", e.target.value)} placeholder="Add your own..."
            onKeyDown={e => e.key === "Enter" && addCustom()} />
          <button className="gs-add-btn" style={{ opacity: d.customCategory.trim() ? 1 : 0.4 }}
            onClick={addCustom}>+ Add</button>
        </div>
      </div>
      <div className="gs-field">
        <label className="gs-label">Number of Positions</label>
        <input type="number" className="gs-input" value={d.positionsCount} min="1"
          onChange={e => set("positionsCount", e.target.value)} placeholder="1" />
      </div>
    </div>
  );
}
