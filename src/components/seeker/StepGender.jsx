export default function StepGender({ d, set }) {
  const opts = [
    { id: "male", label: "Male" }, { id: "female", label: "Female" },
    { id: "nonbinary", label: "Non-binary" },
    { id: "custom", label: "I'd rather describe myself" },
    { id: "prefer_not", label: "Prefer not to say" },
  ];
  return (
    <div>
      <h2 className="gs-title">How do you identify?</h2>
      <p className="gs-desc">Optional and kept private.</p>
      <div className="gs-opts">
        {opts.map(o => (
          <button key={o.id} className={`gs-opt ${d.gender === o.id ? "active" : ""}`}
            onClick={() => set("gender", o.id)}>{o.label}</button>
        ))}
      </div>
      {d.gender === "custom" && (
        <div className="gs-field" style={{ marginTop: 12 }}>
          <input className="gs-input" value={d.genderCustom}
            onChange={e => set("genderCustom", e.target.value)} placeholder="How do you identify?" />
        </div>
      )}
    </div>
  );
}
