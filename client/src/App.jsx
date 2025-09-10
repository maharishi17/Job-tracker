import { BrowserRouter, Routes, Route } from "react-router-dom";
import Applications from "./pages/Applications";

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          maxWidth: 900,
          margin: "20px auto",
          padding: 16,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Header */}
        <header
          style={{
            textAlign: "center",
            marginBottom: 20
          }}
        >
          <h1>Daily Work update</h1>
        </header>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Applications />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: "0.9em",
            opacity: 0.7
          }}
        >
          Maharishi @ Iaaxin 2025 all rights reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}
