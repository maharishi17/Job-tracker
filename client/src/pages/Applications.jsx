import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationRow from "../components/ApplicationRow";

export default function Applications() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [q, setQ] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications", { page, status, q }],
    queryFn: async () => {
      const res = await api.get("/applications", {
        params: { page, limit: 6, status, q }
      });
      return res.data;
    },
    keepPreviousData: true
  });

  const qc = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload) => api.post("/applications", payload).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications"] })
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading applications</p>;

  return (
    <div>
      <ApplicationForm onCreate={(v) => createMutation.mutate(v)} />

      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
        >
          <option value="all">All</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
          placeholder="Search company..."
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
        />
      </div>

      <table width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>Company</th><th>Role</th><th>Status</th><th>Follow-up</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map(app => (
            <ApplicationRow key={app._id} app={app} />
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {data.page} / {data.pages || 1}</span>
        <button disabled={data.page >= data.pages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
