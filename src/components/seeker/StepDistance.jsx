import { DISTANCE_OPTIONS } from "../../constants/options";

export default function StepDistance({ v, set }) {
  return (
    <div>
      <h2 className="gs-title">How far will you travel?</h2>
      <p className="gs-desc">Max distance from home for gigs.</p>
      <div className="gs-dist-grid">
        {DISTANCE_OPTIONS.map(o => (
          <button key={o.id} className={`gs-dist ${v === o.id ? "active" : ""}`} onClick={() => set(o.id)}>
            <span className="gs-dist-icon">{o.icon}</span>
            <span className="gs-dist-label">{o.label}</span>
            <span className="gs-dist-desc">{o.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
