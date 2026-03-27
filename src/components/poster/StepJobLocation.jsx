export default function StepJobLocation({ d, set }) {
  return (
    <div>
      <h2 className="gs-title">Where's the job?</h2>
      <p className="gs-desc">Help seekers find gigs near them.</p>
      <div className="gs-field">
        <button className={`gs-opt ${d.isRemote ? "active" : ""}`}
          onClick={() => set("isRemote", !d.isRemote)}>
          🏠 This job can be done remotely
        </button>
      </div>
      {!d.isRemote && (
        <>
          <div className="gs-field">
            <label className="gs-label">Street Address</label>
            <input className="gs-input" value={d.jobAddress}
              onChange={e => set("jobAddress", e.target.value)} placeholder="123 Main St" />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="gs-field" style={{ flex: 2 }}>
              <label className="gs-label">City</label>
              <input className="gs-input" value={d.jobCity}
                onChange={e => set("jobCity", e.target.value)} placeholder="Springfield" />
            </div>
            <div className="gs-field" style={{ flex: 1 }}>
              <label className="gs-label">State</label>
              <input className="gs-input" value={d.jobState}
                onChange={e => set("jobState", e.target.value)} placeholder="NY" maxLength={2} />
            </div>
          </div>
        </>
      )}
      <div className="gs-field">
        <label className="gs-label">Zip Code *</label>
        <input className="gs-input" value={d.jobZip}
          onChange={e => set("jobZip", e.target.value)} placeholder="10001" maxLength={10} />
      </div>
    </div>
  );
}
