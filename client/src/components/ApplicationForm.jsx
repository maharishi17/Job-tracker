import { useState } from "react";

export default function ApplicationForm({ onCreate }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("applied");
  const [notes, setNotes] = useState("");
  const [followUpOn, setFollowUpOn] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!company || !role) return;
    onCreate({ company, role, status, notes, followUpOn: followUpOn || null });
    setCompany(""); setRole(""); setStatus("applied"); setNotes(""); setFollowUpOn("");
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8, marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input placeholder="Company *" value={company} onChange={e => setCompany(e.target.value)} />
        <input placeholder="Role *" value={role} onChange={e => setRole(e.target.value)} />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <textarea placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
      <div style={{ display: "flex", gap: 8 }}>
        <input type="date" value={followUpOn} onChange={e => setFollowUpOn(e.target.value)} />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
