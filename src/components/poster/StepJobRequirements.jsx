export default function StepJobRequirements({ d, set }) {
  const ageOptions = ["14", "15", "16", "17", "18", "21"];
  return (
    <div>
      <h2 className="gs-title">Any requirements?</h2>
      <p className="gs-desc">Optional — leave blank if the gig is open to anyone.</p>
      <div className="gs-field">
        <label className="gs-label">Minimum Age</label>
        <div className="gs-chips">
          {ageOptions.map(a => (
            <button key={a} className={`gs-chip ${d.minAge === a ? "active" : ""}`}
              onClick={() => set("minAge", a)}>
              {a}+
            </button>
          ))}
        </div>
      </div>
      <div className="gs-field">
        <label className="gs-label">Skills or Certifications</label>
        <input className="gs-input" value={d.skills}
          onChange={e => set("skills", e.target.value)}
          placeholder="e.g. Driver's license, CPR certified" />
      </div>
      <div className="gs-field">
        <label className="gs-label">Dress Code</label>
        <input className="gs-input" value={d.dressCode}
          onChange={e => set("dressCode", e.target.value)}
          placeholder="e.g. Closed-toe shoes, company shirt provided" />
      </div>
      <div className="gs-field">
        <label className="gs-label">Other Requirements</label>
        <textarea className="gs-textarea" value={d.requirements}
          onChange={e => set("requirements", e.target.value)}
          placeholder="Anything else applicants should know..." />
      </div>
    </div>
  );
}
