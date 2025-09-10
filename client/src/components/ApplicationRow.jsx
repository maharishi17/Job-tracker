import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export default function ApplicationRow({ app }) {
  const qc = useQueryClient();

  const setStatus = useMutation({
    mutationFn: (newStatus) => api.patch(`/applications/${app._id}`, { status: newStatus }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications"] })
  });

  const del = useMutation({
    mutationFn: () => api.delete(`/applications/${app._id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications"] })
  });

  return (
    <tr>
      <td>{app.company}</td>
      <td>{app.role}</td>
      <td>
        <select value={app.status} onChange={(e) => setStatus.mutate(e.target.value)}>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </td>
      <td>{app.followUpOn ? new Date(app.followUpOn).toLocaleDateString() : "-"}</td>
      <td><button onClick={() => del.mutate()}>Delete</button></td>
    </tr>
  );
}
