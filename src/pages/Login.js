import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = "lt-font-link";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!password) { setError("Please enter your password."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    navigate("/dashboard");
  };

  const S = {
    root: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0d0a12",
      fontFamily: "'Space Grotesk', Arial, sans-serif",
      padding: "20px",
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      background: "#150d1e",
      border: "1px solid rgba(236,72,153,0.15)",
      borderRadius: "24px",
      padding: "44px 40px",
      boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
    },
    logo: {
      fontFamily: "'Syne', Arial, sans-serif",
      fontSize: "14px",
      fontWeight: 800,
      letterSpacing: "1px",
      textTransform: "uppercase",
      background: "linear-gradient(135deg, #ec4899, #a855f7)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "32px",
      display: "block",
    },
    title: {
      fontFamily: "'Syne', Arial, sans-serif",
      fontSize: "30px",
      fontWeight: 800,
      color: "#fdf2f8",
      marginBottom: "8px",
    },
    sub: { fontSize: "14px", color: "#9d6f8a", marginBottom: "32px" },
    label: {
      display: "block",
      fontSize: "12px",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      color: "#9d6f8a",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "13px 16px",
      background: "#1f1029",
      border: "1px solid rgba(236,72,153,0.18)",
      borderRadius: "12px",
      color: "#fdf2f8",
      fontFamily: "'Space Grotesk', Arial, sans-serif",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
      marginBottom: "16px",
    },
    inputWrap: { position: "relative", marginBottom: "16px" },
    inputWithBtn: {
      width: "100%",
      padding: "13px 48px 13px 16px",
      background: "#1f1029",
      border: "1px solid rgba(236,72,153,0.18)",
      borderRadius: "12px",
      color: "#fdf2f8",
      fontFamily: "'Space Grotesk', Arial, sans-serif",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
    },
    eyeBtn: {
      position: "absolute",
      right: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      color: "#9d6f8a",
      padding: 0,
      lineHeight: 1,
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "28px",
    },
    remember: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#9d6f8a",
      fontSize: "13px",
      cursor: "pointer",
    },
    forgotBtn: {
      background: "none",
      border: "none",
      color: "#ec4899",
      fontFamily: "'Space Grotesk', Arial, sans-serif",
      fontSize: "13px",
      fontWeight: 600,
      cursor: "pointer",
      padding: 0,
    },
    submitBtn: {
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "12px",
      background: loading ? "#7c1d4a" : "linear-gradient(135deg, #ec4899, #a855f7)",
      color: "white",
      fontFamily: "'Syne', Arial, sans-serif",
      fontSize: "16px",
      fontWeight: 700,
      cursor: loading ? "not-allowed" : "pointer",
      letterSpacing: "0.3px",
      transition: "opacity 0.2s",
    },
    error: {
      background: "rgba(236,72,153,0.1)",
      border: "1px solid rgba(236,72,153,0.25)",
      borderRadius: "10px",
      padding: "10px 14px",
      fontSize: "13px",
      color: "#f9a8d4",
      marginBottom: "18px",
    },
    registerRow: {
      textAlign: "center",
      fontSize: "14px",
      color: "#9d6f8a",
      marginTop: "20px",
    },
    tagline: {
      textAlign: "center",
      marginTop: "24px",
      fontSize: "12px",
      color: "#2d1a28",
      letterSpacing: "0.5px",
    },
  };

  return (
    <div style={S.root}>
      <div style={S.card}>
        <span style={S.logo}>🚀 Life Tracker</span>
        <div style={S.title}>Welcome back</div>
        <div style={S.sub}>Sign in to continue your productivity streak</div>

        {error && <div style={S.error}>⚠️ {error}</div>}

        <form onSubmit={handleLogin} noValidate>
          <div>
            <label style={S.label}>Email address</label>
            <input
              style={S.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              autoComplete="email"
            />
          </div>

          <div>
            <label style={S.label}>Password</label>
            <div style={S.inputWrap}>
              <input
                style={S.inputWithBtn}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                autoComplete="current-password"
              />
              <button
                type="button"
                style={S.eyeBtn}
                onClick={() => setShowPassword(p => !p)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div style={S.row}>
            <label style={S.remember}>
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{ accentColor: "#ec4899", width: 15, height: 15, cursor: "pointer" }}
              />
              Remember me
            </label>
            <button type="button" style={S.forgotBtn}>Forgot password?</button>
          </div>

          <button type="submit" style={S.submitBtn} disabled={loading}>
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>

        <div style={S.registerRow}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#ec4899", fontWeight: 600, textDecoration: "none" }}>
            Create one free
          </Link>
        </div>
        <div style={S.tagline}>Stay focused. Stay productive. 🔥</div>
      </div>
    </div>
  );
}