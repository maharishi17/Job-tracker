import { useState } from "react";

export default function ApplicationForm({ onCreate }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("applied");
  const [notes, setNotes] = useState("");
  const [followUpOn, setFollowUpOn] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;
    onCreate({ company, role, status, notes, followUpOn: followUpOn || null });
    setCompany(""); setRole(""); setStatus("applied"); setNotes(""); setFollowUpOn("");
  }

  function openDatePicker() {
    const el = document.getElementById("followUpOn");
    if (el?.showPicker) el.showPicker();   // Chrome/Android/Safari newer
    else el?.focus();                      // fallback (older Safari)
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8, marginBottom: 12 }}>
      {/* Row: company / role / status */}
      <div className="field-row">
        <input
          placeholder="Company *"
          value={company}
          onChange={e => setCompany(e.target.value)}
        />
        <input
          placeholder="Role *"
          value={role}
          onChange={e => setRole(e.target.value)}
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Notes */}
      <textarea
        placeholder="Notes"
        rows={3}
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />

      {/* Row: date + submit */}
      <div className="field-row submit-row">
        {/* Date with custom calendar button */}
        <div className="date-field">
          <input
            id="followUpOn"
            className="date-input"
            type="date"
            value={followUpOn}
            onChange={e => setFollowUpOn(e.target.value)}
          />
          <button
            type="button"
            className="date-btn"
            onClick={openDatePicker}
            aria-label="Open date picker"
          >
            {/* simple calendar icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        <button type="submit" className="btn-submit">Add</button>
      </div>
    </form>
  );
}
