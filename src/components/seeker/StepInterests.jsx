import { CATEGORY_OPTIONS } from "../../constants/options";

export default function StepInterests({ d, toggle, set, addCustom }) {
  return (
    <div>
      <h2 className="gs-title">What are you into?</h2>
      <p className="gs-desc">Pick all the gig types that interest you.</p>
      <div className="gs-chips">
        {CATEGORY_OPTIONS.map(o => (
          <button key={o.id} className={`gs-chip ${d.interests.includes(o.id) ? "active" : ""}`}
            onClick={() => toggle(o.id)}>
            <span className="gs-chip-icon">{o.icon}</span><span>{o.label}</span>
          </button>
        ))}
        {d.interests.filter(s => !CATEGORY_OPTIONS.find(o => o.id === s)).map(c => (
          <button key={c} className="gs-chip active" onClick={() => toggle(c)}>
            <span className="gs-chip-icon">✨</span><span>{c}</span>
          </button>
        ))}
      </div>
      <div className="gs-custom-row">
        <input className="gs-input" style={{ flex: 1 }} value={d.customInterest}
          onChange={e => set("customInterest", e.target.value)}
          placeholder="Add your own..."
          onKeyDown={e => e.key === "Enter" && addCustom()} />
        <button className="gs-add-btn" style={{ opacity: d.customInterest.trim() ? 1 : 0.4 }}
          onClick={addCustom}>+ Add</button>
      </div>
    </div>
  );
}
