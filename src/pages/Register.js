import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const getStrength = (pw) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#06b6d4", "#10b981"][strength];

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Please enter your full name."); return; }
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!password) { setError("Please create a password."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    navigate("/");
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
      maxWidth: "440px",
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
      marginBottom: "28px",
      display: "block",
    },
    title: {
      fontFamily: "'Syne', Arial, sans-serif",
      fontSize: "28px",
      fontWeight: 800,
      color: "#fdf2f8",
      marginBottom: "6px",
    },
    sub: { fontSize: "14px", color: "#9d6f8a", marginBottom: "28px" },
    label: {
      display: "block",
      fontSize: "12px",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      color: "#9d6f8a",
      marginBottom: "8px",
    },
    field: { marginBottom: "16px" },
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
    },
    inputWrap: { position: "relative" },
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
    strengthTrack: {
      height: "4px",
      background: "#2d1a38",
      borderRadius: "99px",
      marginTop: "8px",
      overflow: "hidden",
    },
    strengthFill: {
      height: "100%",
      borderRadius: "99px",
      width: `${(strength / 4) * 100}%`,
      background: strengthColor,
      transition: "width 0.3s ease, background 0.3s ease",
    },
    strengthLabel: {
      fontSize: "11px",
      color: strengthColor,
      marginTop: "4px",
      fontWeight: 600,
      textAlign: "right",
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
    showPwRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#9d6f8a",
      fontSize: "13px",
      cursor: "pointer",
      marginBottom: "24px",
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
    registerRow: {
      textAlign: "center",
      fontSize: "14px",
      color: "#9d6f8a",
      marginTop: "20px",
    },
    tagline: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "12px",
      color: "#2d1a28",
      letterSpacing: "0.5px",
    },
  };

  return (
    <div style={S.root}>
      <div style={S.card}>
        <span style={S.logo}>🚀 Life Tracker</span>
        <div style={S.title}>Create account</div>
        <div style={S.sub}>Start your productivity journey today</div>

        {error && <div style={S.error}>⚠️ {error}</div>}

        <form onSubmit={handleRegister} noValidate>
          <div style={S.field}>
            <label style={S.label}>Full Name</label>
            <input
              style={S.input}
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={e => { setName(e.target.value); setError(""); }}
              autoComplete="name"
            />
          </div>

          <div style={S.field}>
            <label style={S.label}>Email Address</label>
            <input
              style={S.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              autoComplete="email"
            />
          </div>

          <div style={S.field}>
            <label style={S.label}>Password</label>
            <div style={S.inputWrap}>
              <input
                style={S.inputWithBtn}
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                autoComplete="new-password"
              />
              <button
                type="button"
                style={S.eyeBtn}
                onClick={() => setShowPassword(p => !p)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {password && (
              <>
                <div style={S.strengthTrack}>
                  <div style={S.strengthFill} />
                </div>
                <div style={S.strengthLabel}>{strengthLabel}</div>
              </>
            )}
          </div>

          <div style={S.field}>
            <label style={S.label}>Confirm Password</label>
            <div style={S.inputWrap}>
              <input
                style={{
                  ...S.inputWithBtn,
                  borderColor: confirmPassword && confirmPassword !== password
                    ? "rgba(239,68,68,0.5)"
                    : confirmPassword && confirmPassword === password
                    ? "rgba(16,185,129,0.4)"
                    : "rgba(236,72,153,0.18)",
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); setError(""); }}
                autoComplete="new-password"
              />
              {confirmPassword && (
                <span style={{ ...S.eyeBtn, cursor: "default", fontSize: "14px" }}>
                  {confirmPassword === password ? "✅" : "❌"}
                </span>
              )}
            </div>
          </div>

          <button type="submit" style={S.submitBtn} disabled={loading}>
            {loading ? "Creating account…" : "Create Account →"}
          </button>
        </form>

        <div style={S.registerRow}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#ec4899", fontWeight: 600, textDecoration: "none" }}>
            Sign in
          </Link>
        </div>
        <div style={S.tagline}>Organize your goals beautifully 🌟</div>
      </div>
    </div>
  );
}