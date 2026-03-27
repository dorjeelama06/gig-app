export default function StepExperience({ exps, add, upd, rm }) {
  return (
    <div>
      <h2 className="gs-title">Any past experience?</h2>
      <p className="gs-desc">No worries if not — everyone starts somewhere!</p>
      {exps.map((e, i) => (
        <div key={i} className="gs-exp">
          <div className="gs-exp-head">
            <span className="gs-exp-num">#{i + 1}</span>
            <button className="gs-rm-btn" onClick={() => rm(i)}>✕</button>
          </div>
          <input className="gs-input" placeholder="Job title (e.g. Dog walker)"
            value={e.title} onChange={ev => upd(i, "title", ev.target.value)} />
          <textarea className="gs-textarea" placeholder="What did you do?"
            value={e.desc} onChange={ev => upd(i, "desc", ev.target.value)} />
          <input className="gs-input" style={{ marginTop: 8 }} placeholder="How long? (e.g. 6 months)"
            value={e.dur} onChange={ev => upd(i, "dur", ev.target.value)} />
        </div>
      ))}
      <button className="gs-add-exp" onClick={add}>+ Add Experience</button>
      {exps.length === 0 && <p className="gs-skip">No experience yet? Totally fine — just hit Continue!</p>}
    </div>
  );
}
