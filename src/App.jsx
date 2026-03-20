import { useState } from "react";

const STEPS = [
  "role", "name", "dob", "gender", "interests",
  "experience", "availability", "distance", "contact", "review",
];

const INTEREST_OPTIONS = [
  { id: "cars", label: "Cars", icon: "🚗" },
  { id: "cooking", label: "Cooking", icon: "🍳" },
  { id: "babysitting", label: "Babysitting", icon: "👶" },
  { id: "petcare", label: "Pet Care", icon: "🐕" },
  { id: "tutoring", label: "Tutoring", icon: "📚" },
  { id: "lawncare", label: "Lawn Care", icon: "🌿" },
  { id: "cleaning", label: "Cleaning", icon: "🧹" },
  { id: "techhelp", label: "Tech Help", icon: "💻" },
  { id: "errands", label: "Errands", icon: "🏃" },
  { id: "crafts", label: "Arts & Crafts", icon: "🎨" },
  { id: "music", label: "Music", icon: "🎵" },
];

const AVAILABILITY_OPTIONS = [
  { id: "weekday_morning", label: "Weekday Mornings", icon: "☀️" },
  { id: "weekday_afternoon", label: "After School", icon: "🎒" },
  { id: "weekday_evening", label: "Weekday Evenings", icon: "🌙" },
  { id: "saturday", label: "Saturdays", icon: "📅" },
  { id: "sunday", label: "Sundays", icon: "📅" },
  { id: "summer", label: "Summer Break", icon: "🌞" },
  { id: "winter", label: "Winter Break", icon: "❄️" },
];

const DISTANCE_OPTIONS = [
  { id: "1", label: "1 mi", desc: "Walking distance", icon: "🚶" },
  { id: "3", label: "3 mi", desc: "Short bike ride", icon: "🚲" },
  { id: "5", label: "5 mi", desc: "Nearby areas", icon: "🛴" },
  { id: "10", label: "10 mi", desc: "Across town", icon: "🚌" },
  { id: "15", label: "15+ mi", desc: "Travel far", icon: "🚗" },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState(1);
  const [formData, setFormData] = useState({
    role: "", firstName: "", lastName: "", dob: "", gender: "",
    genderCustom: "", interests: [], customInterest: "",
    experiences: [], availability: [], distance: "",
    email: "", phone: "", zipCode: "",
  });

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const go = (d) => {
    const next = step + d;
    if (next < 0 || next >= STEPS.length || animating) return;
    setDir(d);
    setAnimating(true);
    setTimeout(() => { setStep(next); setAnimating(false); }, 250);
  };

  const update = (f, v) => setFormData(p => ({ ...p, [f]: v }));
  const toggleArr = (f, item) => setFormData(p => ({
    ...p, [f]: p[f].includes(item) ? p[f].filter(i => i !== item) : [...p[f], item],
  }));

  const addExp = () => update("experiences", [...formData.experiences, { title: "", desc: "", dur: "" }]);
  const updateExp = (i, f, v) => {
    const e = [...formData.experiences]; e[i] = { ...e[i], [f]: v };
    update("experiences", e);
  };
  const removeExp = (i) => update("experiences", formData.experiences.filter((_, j) => j !== i));

  const addCustomInterest = () => {
    const val = formData.customInterest.trim();
    if (val && !formData.interests.includes(val)) {
      update("interests", [...formData.interests, val]);
      update("customInterest", "");
    }
  };

  const age = (() => {
    if (!formData.dob) return null;
    const t = new Date(), b = new Date(formData.dob);
    let a = t.getFullYear() - b.getFullYear();
    if (t.getMonth() < b.getMonth() || (t.getMonth() === b.getMonth() && t.getDate() < b.getDate())) a--;
    return a;
  })();

  const canProceed = () => {
    switch (currentStep) {
      case "role": return !!formData.role;
      case "name": return formData.firstName.trim() && formData.lastName.trim();
      case "dob": return !!formData.dob;
      case "gender": return !!formData.gender && (formData.gender !== "custom" || formData.genderCustom.trim());
      case "interests": return formData.interests.length > 0;
      case "experience": return true;
      case "availability": return formData.availability.length > 0;
      case "distance": return !!formData.distance;
      case "contact": return formData.email.trim() && formData.zipCode.trim();
      case "review": return true;
      default: return false;
    }
  };

  const handleSubmit = () => {
    alert("Profile submitted! 🎉\n\nIn a real app this data would be sent to a backend server.");
    console.log("Form data:", formData);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

        .gs-wrap {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 12px;
          background: linear-gradient(160deg, #0F0C29, #1A1A2E 45%, #24243E);
          font-family: 'DM Sans', -apple-system, sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .gs-orb {
          position: fixed; border-radius: 50%; pointer-events: none;
        }
        .gs-orb1 { width: 300px; height: 300px; top: -80px; right: -60px;
          background: radial-gradient(circle, rgba(255,107,53,0.14) 0%, transparent 70%); }
        .gs-orb2 { width: 250px; height: 250px; bottom: -50px; left: -50px;
          background: radial-gradient(circle, rgba(110,72,232,0.1) 0%, transparent 70%); }

        @media (min-width: 520px) {
          .gs-orb1 { width: 420px; height: 420px; top: -120px; right: -100px; }
          .gs-orb2 { width: 350px; height: 350px; bottom: -80px; left: -80px; }
        }

        .gs-card {
          width: 100%;
          max-width: 480px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 20px 16px 16px;
          position: relative;
          z-index: 1;
        }

        @media (min-width: 520px) {
          .gs-wrap { padding: 40px 20px; }
          .gs-card { padding: 36px 32px 28px; border-radius: 24px; }
        }

        /* Header */
        .gs-header { text-align: center; margin-bottom: 16px; }
        .gs-logo-row { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 2px; }
        .gs-logo-icon { font-size: 22px; }
        .gs-logo-text {
          font-size: 20px; font-weight: 800; letter-spacing: -0.5px;
          background: linear-gradient(135deg, #FFF, rgba(255,255,255,0.7));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .gs-tagline { color: #8888A0; font-size: 12px; }

        @media (min-width: 520px) {
          .gs-header { margin-bottom: 20px; }
          .gs-logo-icon { font-size: 28px; }
          .gs-logo-text { font-size: 26px; }
          .gs-tagline { font-size: 14px; }
        }

        /* Progress */
        .gs-progress { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
        .gs-pbar { flex: 1; height: 4px; border-radius: 4px; background: rgba(255,255,255,0.08); overflow: hidden; }
        .gs-pfill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, #FF6B35, #FFB347); transition: width 0.4s ease; }
        .gs-ptext { color: #8888A0; font-size: 11px; white-space: nowrap; font-variant-numeric: tabular-nums; }

        @media (min-width: 520px) {
          .gs-progress { margin-bottom: 22px; }
        }

        /* Steps */
        .gs-step { min-height: 260px; transition: opacity 0.25s ease, transform 0.25s ease; }
        .gs-step.out { opacity: 0; }
        .gs-step.in { opacity: 1; transform: translateX(0); }

        @media (min-width: 520px) {
          .gs-step { min-height: 280px; }
        }

        .gs-title { font-size: 18px; font-weight: 700; color: #FFF; margin-bottom: 4px; letter-spacing: -0.3px; }
        .gs-desc { color: #8888A0; font-size: 13px; margin-bottom: 18px; line-height: 1.45; }
        @media (min-width: 520px) {
          .gs-title { font-size: 22px; }
          .gs-desc { font-size: 14px; margin-bottom: 24px; }
        }

        /* Inputs — 16px font on mobile prevents iOS zoom */
        .gs-field { margin-bottom: 14px; }
        .gs-label {
          display: block; color: rgba(255,255,255,0.55); font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px;
        }
        .gs-input {
          width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          color: #FFF; font-size: 16px; outline: none; font-family: inherit;
          transition: border-color 0.2s;
        }
        .gs-input:focus { border-color: #FF6B35; }
        .gs-input::placeholder { color: rgba(255,255,255,0.25); }
        /* Fix date input color on mobile */
        .gs-input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7); }

        /* Role cards — stack on very small screens */
        .gs-roles { display: flex; flex-direction: column; gap: 10px; }
        @media (min-width: 380px) {
          .gs-roles { flex-direction: row; }
        }
        .gs-role {
          flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 18px 12px; background: rgba(255,255,255,0.04);
          border: 2px solid rgba(255,255,255,0.08); border-radius: 16px;
          cursor: pointer; color: #FFF; font-family: inherit; transition: all 0.2s;
        }
        .gs-role:active { transform: scale(0.97); }
        .gs-role.active { border-color: #FF6B35; background: rgba(255,107,53,0.08); }
        .gs-role-icon { font-size: 30px; }
        .gs-role-label { font-size: 14px; font-weight: 600; }
        .gs-role-hint { font-size: 11px; color: #8888A0; text-align: center; }

        @media (min-width: 520px) {
          .gs-role { padding: 22px 14px; }
          .gs-role-icon { font-size: 34px; }
        }

        /* Option list buttons */
        .gs-opts { display: flex; flex-direction: column; gap: 8px; }
        .gs-opt {
          padding: 13px 16px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          color: #FFF; font-size: 15px; text-align: left; cursor: pointer;
          font-family: inherit; transition: all 0.2s;
        }
        .gs-opt:active { transform: scale(0.98); }
        .gs-opt.active { border-color: #FF6B35; background: rgba(255,107,53,0.1); }

        /* Interest chips — wrap nicely on small screens */
        .gs-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .gs-chip {
          display: flex; align-items: center; gap: 5px; padding: 8px 12px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px; color: #FFF; font-size: 13px; cursor: pointer;
          font-family: inherit; transition: all 0.2s;
        }
        .gs-chip:active { transform: scale(0.95); }
        .gs-chip.active { border-color: #FF6B35; background: rgba(255,107,53,0.12); }
        .gs-chip-icon { font-size: 16px; }

        @media (min-width: 520px) {
          .gs-chip { padding: 9px 14px; }
          .gs-chip-icon { font-size: 18px; }
        }

        .gs-custom-row { display: flex; gap: 8px; }
        .gs-add-btn {
          padding: 12px 14px; background: #FF6B35; color: #FFF; border: none;
          border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 13px;
          white-space: nowrap; font-family: inherit; flex-shrink: 0;
        }
        .gs-add-btn:active { transform: scale(0.95); }

        /* Availability */
        .gs-avail {
          display: flex; align-items: center; gap: 10px; padding: 12px 14px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; color: #FFF; font-size: 14px; cursor: pointer;
          font-family: inherit; transition: all 0.2s; text-align: left; width: 100%;
        }
        .gs-avail:active { transform: scale(0.98); }
        .gs-avail.active { border-color: #FF6B35; background: rgba(255,107,53,0.1); }
        .gs-check {
          width: 20px; height: 20px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center; font-size: 11px;
          font-weight: 700; flex-shrink: 0; transition: all 0.2s;
        }
        .gs-check.active { background: #FF6B35; border-color: #FF6B35; color: #FFF; }
        .gs-avail-icon { font-size: 16px; flex-shrink: 0; }

        /* Distance — 2-col grid, responsive */
        .gs-dist-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .gs-dist-grid > :last-child:nth-child(odd) { grid-column: 1 / -1; }
        .gs-dist {
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          padding: 14px 8px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 14px;
          cursor: pointer; font-family: inherit; transition: all 0.2s; color: #FFF;
        }
        .gs-dist:active { transform: scale(0.96); }
        .gs-dist.active { border-color: #FF6B35; background: rgba(255,107,53,0.1); }
        .gs-dist-icon { font-size: 22px; }
        .gs-dist-label { font-size: 15px; font-weight: 700; }
        .gs-dist-desc { font-size: 10px; color: #8888A0; }

        @media (min-width: 520px) {
          .gs-dist { padding: 16px 10px; }
          .gs-dist-icon { font-size: 24px; }
          .gs-dist-desc { font-size: 11px; }
        }

        /* Experience */
        .gs-exp {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 12px; margin-bottom: 10px;
        }
        .gs-exp-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .gs-exp-num { color: #FF6B35; font-weight: 700; font-size: 13px; }
        .gs-rm-btn {
          background: rgba(255,80,80,0.15); border: none; color: #FF5050;
          border-radius: 8px; width: 28px; height: 28px; cursor: pointer;
          font-size: 14px; display: flex; align-items: center; justify-content: center;
        }
        .gs-add-exp {
          width: 100%; padding: 14px; background: rgba(255,107,53,0.06);
          border: 2px dashed rgba(255,107,53,0.25); border-radius: 12px;
          color: #FF6B35; font-weight: 600; font-size: 14px; cursor: pointer;
          font-family: inherit; margin-bottom: 6px;
        }
        .gs-skip { text-align: center; color: #8888A0; font-size: 12px; font-style: italic; margin-top: 6px; }

        .gs-textarea {
          width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          color: #FFF; font-size: 16px; outline: none; font-family: inherit;
          min-height: 56px; resize: vertical; margin-top: 8px;
        }
        .gs-textarea:focus { border-color: #FF6B35; }
        .gs-textarea::placeholder { color: rgba(255,255,255,0.25); }

        /* Age badge */
        .gs-age {
          display: inline-flex; align-items: baseline; gap: 8px; margin-top: 12px;
          padding: 10px 18px; background: rgba(255,107,53,0.08);
          border: 1px solid rgba(255,107,53,0.2); border-radius: 12px;
        }
        .gs-age-num { font-size: 24px; font-weight: 800; color: #FF6B35; }
        .gs-age-label { color: #8888A0; font-size: 13px; }

        /* Review — stacked on mobile, side-by-side on desktop */
        .gs-rev {
          display: flex; flex-direction: column; gap: 2px;
          padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .gs-rev-label {
          color: #8888A0; font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .gs-rev-val { color: #FFF; font-size: 14px; line-height: 1.5; }
        @media (min-width: 520px) {
          .gs-rev { flex-direction: row; gap: 12px; }
          .gs-rev-label { width: 100px; flex-shrink: 0; padding-top: 2px; font-size: 12px; }
          .gs-rev-val { font-size: 15px; }
        }
        .gs-rev-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 2px; }
        .gs-rev-tag {
          display: inline-block; padding: 3px 10px; background: rgba(255,107,53,0.1);
          border: 1px solid rgba(255,107,53,0.2); border-radius: 50px;
          font-size: 12px; color: #FFB895;
        }

        /* Nav — always full width on mobile */
        .gs-nav {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 20px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06);
          gap: 12px;
        }
        .gs-back {
          padding: 11px 16px; background: transparent;
          border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
          color: #8888A0; font-size: 14px; cursor: pointer; font-family: inherit; font-weight: 500;
        }
        .gs-back:active { transform: scale(0.96); }
        .gs-next {
          padding: 12px 20px; background: linear-gradient(135deg, #FF6B35, #FF8B5E);
          border: none; border-radius: 12px; color: #FFF; font-size: 15px;
          font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s;
          flex-shrink: 0;
        }
        .gs-next:active { transform: scale(0.96); }
        .gs-next.disabled { opacity: 0.4; cursor: not-allowed; }
        .gs-next.submit { background: linear-gradient(135deg, #22C55E, #16A34A); padding: 13px 24px; }

        @media (min-width: 520px) {
          .gs-nav { margin-top: 24px; padding-top: 18px; }
          .gs-next { padding: 12px 28px; }
        }

        /* Prevent horizontal overflow on very small phones */
        @media (max-width: 359px) {
          .gs-card { padding: 16px 12px 12px; }
          .gs-title { font-size: 17px; }
          .gs-chip { padding: 7px 10px; font-size: 12px; }
        }
      `}</style>

      <div className="gs-wrap">
        <div className="gs-orb gs-orb1" />
        <div className="gs-orb gs-orb2" />

        <div className="gs-card">
          {/* Header */}
          <div className="gs-header">
            <div className="gs-logo-row">
              <span className="gs-logo-icon">⚡</span>
              <span className="gs-logo-text">GigSpark</span>
            </div>
            <p className="gs-tagline">
              {formData.role === "poster" ? "Find young talent nearby" : "Find gigs. Build skills. Earn money."}
            </p>
          </div>

          {/* Progress */}
          <div className="gs-progress">
            <div className="gs-pbar">
              <div className="gs-pfill" style={{ width: `${progress}%` }} />
            </div>
            <span className="gs-ptext">{step + 1}/{STEPS.length}</span>
          </div>

          {/* Step Content */}
          <div
            className={`gs-step ${animating ? "out" : "in"}`}
            style={animating ? { transform: `translateX(${dir * 30}px)` } : {}}
          >
            {currentStep === "role" && <StepRole v={formData.role} set={v => update("role", v)} />}
            {currentStep === "name" && <StepName d={formData} set={update} />}
            {currentStep === "dob" && <StepDOB v={formData.dob} set={v => update("dob", v)} age={age} />}
            {currentStep === "gender" && <StepGender d={formData} set={update} />}
            {currentStep === "interests" && (
              <StepInterests d={formData} toggle={id => toggleArr("interests", id)}
                set={update} addCustom={addCustomInterest} />
            )}
            {currentStep === "experience" && (
              <StepExperience exps={formData.experiences} add={addExp} upd={updateExp} rm={removeExp} />
            )}
            {currentStep === "availability" && (
              <StepAvailability sel={formData.availability} toggle={id => toggleArr("availability", id)} />
            )}
            {currentStep === "distance" && <StepDistance v={formData.distance} set={v => update("distance", v)} />}
            {currentStep === "contact" && <StepContact d={formData} set={update} />}
            {currentStep === "review" && <StepReview d={formData} age={age} />}
          </div>

          {/* Nav */}
          <div className="gs-nav">
            {step > 0 ? (
              <button className="gs-back" onClick={() => go(-1)}>← Back</button>
            ) : <div />}
            {currentStep === "review" ? (
              <button className="gs-next submit" onClick={handleSubmit}>Submit ✨</button>
            ) : (
              <button
                className={`gs-next ${canProceed() ? "" : "disabled"}`}
                onClick={canProceed() ? () => go(1) : undefined}
              >Continue →</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Step Components ─── */

function StepRole({ v, set }) {
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

function StepName({ d, set }) {
  return (
    <div>
      <h2 className="gs-title">What's your name?</h2>
      <p className="gs-desc">We'll use this on your profile.</p>
      <div className="gs-field">
        <label className="gs-label">First Name</label>
        <input className="gs-input" value={d.firstName} onChange={e => set("firstName", e.target.value)} placeholder="e.g. Jordan" />
      </div>
      <div className="gs-field">
        <label className="gs-label">Last Name</label>
        <input className="gs-input" value={d.lastName} onChange={e => set("lastName", e.target.value)} placeholder="e.g. Smith" />
      </div>
    </div>
  );
}

function StepDOB({ v, set, age }) {
  return (
    <div>
      <h2 className="gs-title">When were you born?</h2>
      <p className="gs-desc">Helps us match you with age-appropriate gigs.</p>
      <div className="gs-field">
        <label className="gs-label">Date of Birth</label>
        <input type="date" className="gs-input" value={v} onChange={e => set(e.target.value)} />
      </div>
      {age !== null && (
        <div className="gs-age">
          <span className="gs-age-num">{age}</span>
          <span className="gs-age-label">years old</span>
        </div>
      )}
    </div>
  );
}

function StepGender({ d, set }) {
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

function StepInterests({ d, toggle, set, addCustom }) {
  return (
    <div>
      <h2 className="gs-title">What are you into?</h2>
      <p className="gs-desc">Pick all the gig types that interest you.</p>
      <div className="gs-chips">
        {INTEREST_OPTIONS.map(o => (
          <button key={o.id} className={`gs-chip ${d.interests.includes(o.id) ? "active" : ""}`}
            onClick={() => toggle(o.id)}>
            <span className="gs-chip-icon">{o.icon}</span><span>{o.label}</span>
          </button>
        ))}
        {d.interests.filter(s => !INTEREST_OPTIONS.find(o => o.id === s)).map(c => (
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

function StepExperience({ exps, add, upd, rm }) {
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

function StepAvailability({ sel, toggle }) {
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

function StepDistance({ v, set }) {
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

function StepContact({ d, set }) {
  return (
    <div>
      <h2 className="gs-title">How can we reach you?</h2>
      <p className="gs-desc">We'll never spam you — promise.</p>
      <div className="gs-field">
        <label className="gs-label">Email *</label>
        <input type="email" className="gs-input" value={d.email}
          onChange={e => set("email", e.target.value)} placeholder="you@email.com" />
      </div>
      <div className="gs-field">
        <label className="gs-label">Phone (optional)</label>
        <input type="tel" className="gs-input" value={d.phone}
          onChange={e => set("phone", e.target.value)} placeholder="(555) 123-4567" />
      </div>
      <div className="gs-field">
        <label className="gs-label">Zip Code *</label>
        <input className="gs-input" value={d.zipCode}
          onChange={e => set("zipCode", e.target.value)} placeholder="10001" maxLength={10} />
      </div>
    </div>
  );
}

function StepReview({ d, age }) {
  const gLabel = d.gender === "custom" ? d.genderCustom : d.gender === "prefer_not" ? "Prefer not to say"
    : d.gender ? d.gender.charAt(0).toUpperCase() + d.gender.slice(1) : "";
  const iLabels = d.interests.map(id => {
    const f = INTEREST_OPTIONS.find(o => o.id === id);
    return f ? `${f.icon} ${f.label}` : `✨ ${id}`;
  });
  const aLabels = d.availability.map(id => {
    const f = AVAILABILITY_OPTIONS.find(o => o.id === id);
    return f ? f.label : id;
  });
  const dist = DISTANCE_OPTIONS.find(o => o.id === d.distance);

  return (
    <div>
      <h2 className="gs-title">Review your profile</h2>
      <p className="gs-desc">Make sure everything looks good.</p>

      <div className="gs-rev">
        <div className="gs-rev-label">Role</div>
        <div className="gs-rev-val">{d.role === "seeker" ? "🔍 Job Seeker" : "📋 Hiring"}</div>
      </div>
      <div className="gs-rev">
        <div className="gs-rev-label">Name</div>
        <div className="gs-rev-val">{d.firstName} {d.lastName}</div>
      </div>
      <div className="gs-rev">
        <div className="gs-rev-label">Age</div>
        <div className="gs-rev-val">{age} years old</div>
      </div>
      <div className="gs-rev">
        <div className="gs-rev-label">Gender</div>
        <div className="gs-rev-val">{gLabel}</div>
      </div>
      <div className="gs-rev">
        <div className="gs-rev-label">Interests</div>
        <div className="gs-rev-tags">{iLabels.map((l, i) => <span key={i} className="gs-rev-tag">{l}</span>)}</div>
      </div>
      {d.experiences.length > 0 && (
        <div className="gs-rev">
          <div className="gs-rev-label">Experience</div>
          <div className="gs-rev-val">
            {d.experiences.map((e, i) => (
              <div key={i}><strong>{e.title}</strong>{e.dur && ` · ${e.dur}`}</div>
            ))}
          </div>
        </div>
      )}
      <div className="gs-rev">
        <div className="gs-rev-label">Availability</div>
        <div className="gs-rev-tags">{aLabels.map((l, i) => <span key={i} className="gs-rev-tag">{l}</span>)}</div>
      </div>
      <div className="gs-rev">
        <div className="gs-rev-label">Distance</div>
        <div className="gs-rev-val">{dist ? `${dist.icon} ${dist.label} — ${dist.desc}` : ""}</div>
      </div>
      <div className="gs-rev">
        <div className="gs-rev-label">Contact</div>
        <div className="gs-rev-val">{d.email}{d.phone && ` · ${d.phone}`}<br />Zip: {d.zipCode}</div>
      </div>
    </div>
  );
}
