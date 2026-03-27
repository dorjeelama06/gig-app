import { AVAILABILITY_OPTIONS } from "../../constants/options";

export default function StepAvailability({ sel, toggle }) {
  return (
    <div>
      <h2 className="gs-title">When are you free?</h2>
      <p className="gs-desc">Select all the times you could work.</p>
      <div className="gs-opts">
        {AVAILABILITY_OPTIONS.map(o => (
          <button key={o.id} className={`gs-avail ${sel.includes(o.id) ? "active" : ""}`}
            onClick={() => toggle(o.id)}>
            <span className={`gs-check ${sel.includes(o.id) ? "active" : ""}`}>
              {sel.includes(o.id) ? "✓" : ""}
            </span>
            <span className="gs-avail-icon">{o.icon}</span>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
