import { useState } from "react";
import "./App.css";
import { Container, Button, Input, Typography, Paper } from '@mui/material';

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
    <Container maxWidth="sm" style={{ marginTop: '40px', fontFamily: 'Arial' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center">DevBank Frontend</Typography>
        <Typography variant="body1" align="center" style={{ marginBottom: '20px' }}>
          Ingresa la URL del backend (ej: http://&lt;IP&gt;:3000) y prueba /health.
        </Typography>

        <Input
          style={{ width: "100%", padding: 10 }}
          placeholder="http://x.x.x.x:3000"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          fullWidth
        />

        <Button variant="contained" color="primary" style={{ marginTop: 12 }} onClick={checkHealth}>
          Probar /health
        </Button>

        <pre style={{ marginTop: 16, background: "#111", color: "#0f0", padding: 12 }}>
          {result}
        </pre>
      </Paper>
    </Container>
  );
}
