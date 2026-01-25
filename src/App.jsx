import { useState } from "react";
import "./App.css";

export default function App() {
  const [baseUrl, setBaseUrl] = useState("");
  const [result, setResult] = useState("");

  const checkHealth = async () => {
    try {
      const url = `${baseUrl.replace(/\/$/, "")}/health`;
      const r = await fetch(url);
      const j = await r.json();
      setResult(JSON.stringify(j, null, 2));
    } catch (e) {
      setResult(`Error: ${e.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>DevBank Frontend</h1>
      <p>Ingresa la URL del backend (ej: http://&lt;IP&gt;:3000) y prueba /health.</p>

      <input
        style={{ width: "100%", padding: 10 }}
        placeholder="http://x.x.x.x:3000"
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.target.value)}
      />

      <button style={{ marginTop: 12, padding: "10px 14px" }} onClick={checkHealth}>
        Probar /health
      </button>

      <pre style={{ marginTop: 16, background: "#111", color: "#0f0", padding: 12 }}>
        {result}
      </pre>
    </div>
  );
}
