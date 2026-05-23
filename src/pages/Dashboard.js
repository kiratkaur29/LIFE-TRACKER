import { useEffect, useState, useCallback } from "react";

// ─── CSS injected once ───────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a12;
    --surface: #12121e;
    --surface2: #1a1a2e;
    --border: rgba(255,255,255,0.07);
    --accent: #7c3aed;
    --accent2: #06b6d4;
    --accent3: #f59e0b;
    --text: #f1f5f9;
    --muted: #64748b;
    --danger: #ef4444;
    --success: #10b981;
    --sidebar-w: 240px;
    --radius: 16px;
    --font-body: 'Space Grotesk', sans-serif;
    --font-display: 'Syne', sans-serif;
  }

  .lt-app {
    min-height: 100vh;
    display: flex;
    background: var(--bg);
    font-family: var(--font-body);
    color: var(--text);
  }

  /* ── SIDEBAR ────────────────────────────────────────── */
  .lt-sidebar {
    width: var(--sidebar-w);
    min-height: 100vh;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 28px 16px;
    gap: 6px;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  .lt-logo {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 800;
    padding: 0 10px 20px;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .lt-nav-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 14px;
    border: none;
    border-radius: 12px;
    background: transparent;
    color: var(--muted);
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s ease;
    text-align: left;
    width: 100%;
  }
  .lt-nav-btn:hover { background: var(--surface2); color: var(--text); }
  .lt-nav-btn.active {
    background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1));
    color: var(--text);
    border: 1px solid rgba(124,58,237,0.3);
  }
  .lt-nav-icon { font-size: 18px; }

  .lt-sidebar-divider {
    height: 1px;
    background: var(--border);
    margin: 10px 0;
  }

  /* ── MAIN ────────────────────────────────────────────── */
  .lt-main {
    flex: 1;
    padding: 36px 40px;
    min-width: 0;
    overflow-y: auto;
  }

  .lt-page-title {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 4px;
  }
  .lt-page-sub { color: var(--muted); font-size: 14px; margin-bottom: 28px; }

  /* ── CARDS ───────────────────────────────────────────── */
  .lt-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    margin-bottom: 20px;
  }
  .lt-card-title {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--muted);
    margin-bottom: 16px;
  }

  /* ── STATS ROW ───────────────────────────────────────── */
  .lt-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 14px;
    margin-bottom: 20px;
  }
  .lt-stat {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px 20px;
  }
  .lt-stat-val {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 4px;
  }
  .lt-stat-lbl { font-size: 12px; color: var(--muted); }

  /* ── PROGRESS BAR ────────────────────────────────────── */
  .lt-progress-track {
    height: 8px;
    background: var(--surface2);
    border-radius: 99px;
    overflow: hidden;
    margin: 10px 0 4px;
  }
  .lt-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    border-radius: 99px;
    transition: width 0.5s ease;
  }

  /* ── INPUT ROW ───────────────────────────────────────── */
  .lt-input-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 18px;
    align-items: center;
  }
  .lt-input {
    flex: 1;
    min-width: 160px;
    padding: 11px 14px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .lt-input:focus { border-color: var(--accent); }
  .lt-input::placeholder { color: var(--muted); }
  .lt-input-sm { max-width: 140px; flex: none; }
  select.lt-input { cursor: pointer; }

  /* ── BUTTONS ─────────────────────────────────────────── */
  .lt-btn {
    padding: 11px 20px;
    border: none;
    border-radius: 12px;
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s ease;
    white-space: nowrap;
  }
  .lt-btn-primary {
    background: linear-gradient(135deg, var(--accent), #5b21b6);
    color: white;
  }
  .lt-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .lt-btn-ghost {
    background: var(--surface2);
    color: var(--text);
    border: 1px solid var(--border);
  }
  .lt-btn-ghost:hover { background: var(--border); }
  .lt-btn-danger { background: rgba(239,68,68,0.12); color: var(--danger); border: 1px solid rgba(239,68,68,0.2); }
  .lt-btn-danger:hover { background: rgba(239,68,68,0.22); }
  .lt-btn-success { background: rgba(16,185,129,0.12); color: var(--success); border: 1px solid rgba(16,185,129,0.2); }
  .lt-btn-success:hover { background: rgba(16,185,129,0.22); }
  .lt-btn-sm { padding: 7px 12px; font-size: 12px; border-radius: 8px; }
  .lt-btn-icon { padding: 8px; border-radius: 8px; }

  /* ── SEARCH BAR ──────────────────────────────────────── */
  .lt-search-wrap { position: relative; flex: 1; min-width: 200px; }
  .lt-search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    font-size: 15px;
    pointer-events: none;
  }
  .lt-search { padding-left: 36px !important; }

  /* ── TASK LIST ───────────────────────────────────────── */
  .lt-task-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 8px;
    transition: all 0.18s ease;
    animation: slideIn 0.2s ease;
  }
  .lt-task-item:hover { border-color: rgba(124,58,237,0.3); }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .lt-task-check {
    width: 20px; height: 20px;
    border-radius: 6px;
    border: 2px solid var(--muted);
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
    transition: all 0.15s;
  }
  .lt-task-check.done {
    background: var(--success);
    border-color: var(--success);
    color: white;
  }
  .lt-task-text { flex: 1; font-size: 14px; }
  .lt-task-text.done { text-decoration: line-through; color: var(--muted); }
  .lt-task-meta { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
  .lt-badge {
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 99px;
    font-weight: 600;
  }
  .lt-badge-high { background: rgba(239,68,68,0.15); color: #f87171; }
  .lt-badge-medium { background: rgba(245,158,11,0.15); color: #fbbf24; }
  .lt-badge-low { background: rgba(16,185,129,0.15); color: #34d399; }
  .lt-badge-cat { background: rgba(124,58,237,0.15); color: #a78bfa; }
  .lt-task-date { font-size: 11px; color: var(--muted); }
  .lt-task-actions { display: flex; gap: 6px; opacity: 0; transition: opacity 0.15s; }
  .lt-task-item:hover .lt-task-actions { opacity: 1; }

  /* ── FILTER ROW ──────────────────────────────────────── */
  .lt-filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
  .lt-filter-chip {
    padding: 6px 14px;
    border-radius: 99px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--muted);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    font-family: var(--font-body);
    transition: all 0.15s;
  }
  .lt-filter-chip:hover, .lt-filter-chip.active {
    background: rgba(124,58,237,0.15);
    border-color: rgba(124,58,237,0.4);
    color: var(--text);
  }

  /* ── GREETING BANNER ─────────────────────────────────── */
  .lt-banner {
    background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1));
    border: 1px solid rgba(124,58,237,0.25);
    border-radius: var(--radius);
    padding: 20px 24px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  .lt-banner-greeting { font-size: 20px; font-weight: 700; }
  .lt-banner-quote { font-size: 13px; color: var(--muted); margin-top: 4px; }

  /* ── HABIT ITEM ──────────────────────────────────────── */
  .lt-habit-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 8px;
    transition: all 0.18s;
    animation: slideIn 0.2s ease;
  }
  .lt-habit-item:hover { border-color: rgba(245,158,11,0.3); }
  .lt-streak { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--accent3); font-weight: 600; }

  /* ── STUDY ITEM ──────────────────────────────────────── */
  .lt-study-item {
    padding: 18px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 10px;
    animation: slideIn 0.2s ease;
    transition: border-color 0.18s;
  }
  .lt-study-item:hover { border-color: rgba(6,182,212,0.3); }
  .lt-study-subject { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
  .lt-study-notes { font-size: 13px; color: var(--muted); margin-bottom: 8px; line-height: 1.5; }
  .lt-study-date { font-size: 12px; color: var(--accent2); font-weight: 500; }

  /* ── EXPENSE ─────────────────────────────────────────── */
  .lt-expense-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 8px;
    animation: slideIn 0.2s ease;
    transition: border-color 0.18s;
  }
  .lt-expense-item:hover { border-color: rgba(245,158,11,0.3); }
  .lt-expense-title { font-size: 14px; font-weight: 500; }
  .lt-expense-amt { font-size: 16px; font-weight: 700; color: var(--accent3); }
  .lt-total-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05));
    border: 1px solid rgba(245,158,11,0.2);
    border-radius: 12px;
    margin-bottom: 16px;
  }
  .lt-total-lbl { font-size: 13px; color: var(--muted); }
  .lt-total-val { font-family: var(--font-display); font-size: 24px; font-weight: 800; color: var(--accent3); }

  /* ── ATTENDANCE ──────────────────────────────────────── */
  .lt-att-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(38px, 1fr));
    gap: 6px;
    margin-top: 16px;
  }
  .lt-att-day {
    aspect-ratio: 1;
    border-radius: 8px;
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.15s;
    font-weight: 600;
  }
  .lt-att-day:hover { border-color: var(--accent); }
  .lt-att-day.present { background: rgba(16,185,129,0.2); border-color: rgba(16,185,129,0.4); color: var(--success); }
  .lt-att-day.absent  { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.3); color: var(--danger); }
  .lt-att-legend { display: flex; gap: 16px; margin-top: 14px; font-size: 12px; color: var(--muted); align-items: center; }
  .lt-att-dot { width: 10px; height: 10px; border-radius: 3px; }

  /* ── EMPTY STATE ─────────────────────────────────────── */
  .lt-empty {
    text-align: center;
    padding: 40px;
    color: var(--muted);
  }
  .lt-empty-icon { font-size: 40px; margin-bottom: 10px; }
  .lt-empty-text { font-size: 14px; }

  /* ── SETTINGS ────────────────────────────────────────── */
  .lt-setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
  }
  .lt-setting-row:last-child { border-bottom: none; }
  .lt-setting-label { font-size: 14px; font-weight: 500; }
  .lt-setting-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .lt-toggle {
    width: 44px; height: 24px;
    background: var(--surface2);
    border-radius: 99px;
    cursor: pointer;
    position: relative;
    border: 1px solid var(--border);
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .lt-toggle.on { background: var(--accent); border-color: var(--accent); }
  .lt-toggle::after {
    content: '';
    position: absolute;
    top: 3px; left: 3px;
    width: 16px; height: 16px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s;
  }
  .lt-toggle.on::after { transform: translateX(20px); }

  /* ── HAMBURGER (mobile) ──────────────────────────────── */
  .lt-ham {
    display: none;
    position: fixed;
    top: 16px; left: 16px;
    z-index: 200;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 8px 10px;
    cursor: pointer;
    color: var(--text);
    font-size: 18px;
  }
  .lt-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 99;
  }

  /* ── RESPONSIVE ──────────────────────────────────────── */
  @media (max-width: 768px) {
    .lt-sidebar {
      position: fixed;
      z-index: 100;
      transform: translateX(-100%);
      height: 100vh;
    }
    .lt-sidebar.open { transform: translateX(0); }
    .lt-ham { display: flex; align-items: center; }
    .lt-overlay.open { display: block; }
    .lt-main { padding: 20px 16px; padding-top: 64px; }
    .lt-stats { grid-template-columns: repeat(2, 1fr); }
    .lt-task-actions { opacity: 1; }
    .lt-input-row { flex-direction: column; }
    .lt-input { min-width: 100%; }
    .lt-input-sm { max-width: 100%; }
  }
`;

// ─── Inject styles ────────────────────────────────────────────────────────────
function useStyles() {
  useEffect(() => {
    const id = "lt-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = CSS;
      document.head.appendChild(tag);
    }
  }, []);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const QUOTES = [
  "Small progress is still progress 💪",
  "Discipline beats motivation 🔥",
  "Your future self will thank you ✨",
  "Consistency creates success 🌟",
  "Stay focused — one task at a time 🎯",
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning ☀️";
  if (h < 18) return "Good Afternoon 🌤️";
  return "Good Evening 🌙";
}

function useLocalState(key, defaultVal) {
  const [val, setVal] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? defaultVal; }
    catch { return defaultVal; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(val)); }, [key, val]);
  return [val, setVal];
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Badge({ priority }) {
  const cls = priority === "High" ? "lt-badge-high" : priority === "Medium" ? "lt-badge-medium" : "lt-badge-low";
  return <span className={`lt-badge ${cls}`}>{priority}</span>;
}

function EmptyState({ icon, text }) {
  return (
    <div className="lt-empty">
      <div className="lt-empty-icon">{icon}</div>
      <div className="lt-empty-text">{text}</div>
    </div>
  );
}

// ─── DASHBOARD TAB ────────────────────────────────────────────────────────────
function DashboardTab({ tasks, setTasks }) {
  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Work");
  const [deadline, setDeadline] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [editId, setEditId] = useState(null);

  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  const addTask = useCallback(() => {
    if (!taskInput.trim()) return;
    if (editId) {
      setTasks(tasks.map(t => t.id === editId ? { ...t, text: taskInput, priority, category, deadline } : t));
      setEditId(null);
    } else {
      setTasks([{ id: Date.now(), text: taskInput, completed: false, priority, category, deadline, time: new Date().toLocaleString() }, ...tasks]);
    }
    setTaskInput(""); setPriority("Medium"); setCategory("Work"); setDeadline("");
  }, [taskInput, priority, category, deadline, editId, tasks, setTasks]);

  const handleKey = (e) => { if (e.key === "Enter") addTask(); };

  const filteredTasks = tasks
    .filter(t => {
      const matchSearch = t.text.toLowerCase().includes(search.toLowerCase());
      if (filter === "Completed") return matchSearch && t.completed;
      if (filter === "Pending") return matchSearch && !t.completed;
      if (filter === "High" || filter === "Medium" || filter === "Low") return matchSearch && t.priority === filter;
      return matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "Newest") return b.id - a.id;
      if (sortBy === "Oldest") return a.id - b.id;
      if (sortBy === "Priority") return { High: 1, Medium: 2, Low: 3 }[a.priority] - { High: 1, Medium: 2, Low: 3 }[b.priority];
      return 0;
    });

  const completed = tasks.filter(t => t.completed).length;
  const progress = tasks.length ? (completed / tasks.length) * 100 : 0;

  return (
    <>
      <div className="lt-banner">
        <div>
          <div className="lt-banner-greeting">{getGreeting()}</div>
          <div className="lt-banner-quote">{quote}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>Overall Progress</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800 }}>{Math.round(progress)}%</div>
        </div>
      </div>

      <div className="lt-stats">
        {[
          { val: tasks.length, lbl: "Total Tasks", color: "var(--accent2)" },
          { val: completed, lbl: "Completed", color: "var(--success)" },
          { val: tasks.filter(t => !t.completed).length, lbl: "Pending", color: "var(--accent3)" },
          { val: tasks.filter(t => t.priority === "High").length, lbl: "High Priority", color: "var(--danger)" },
        ].map(s => (
          <div className="lt-stat" key={s.lbl}>
            <div className="lt-stat-val" style={{ color: s.color }}>{s.val}</div>
            <div className="lt-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="lt-card">
        <div style={{ marginBottom: 6, fontSize: 13, color: "var(--muted)", display: "flex", justifyContent: "space-between" }}>
          <span>Progress</span><span>{completed}/{tasks.length} tasks done</span>
        </div>
        <div className="lt-progress-track">
          <div className="lt-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="lt-card">
        <div className="lt-card-title">Add Task</div>
        <div className="lt-input-row">
          <input
            className="lt-input"
            placeholder="What needs to be done? (Press Enter)"
            value={taskInput}
            onChange={e => setTaskInput(e.target.value)}
            onKeyDown={handleKey}
            style={{ flex: 2 }}
          />
          <select className="lt-input lt-input-sm" value={priority} onChange={e => setPriority(e.target.value)}>
            <option>High</option><option>Medium</option><option>Low</option>
          </select>
          <select className="lt-input lt-input-sm" value={category} onChange={e => setCategory(e.target.value)}>
            <option>Work</option><option>Study</option><option>Personal</option><option>Health</option>
          </select>
          <input type="date" className="lt-input lt-input-sm" value={deadline} onChange={e => setDeadline(e.target.value)} />
          <button className="lt-btn lt-btn-primary" onClick={addTask}>{editId ? "Update" : "Add Task"}</button>
        </div>
      </div>

      <div className="lt-card">
        <div className="lt-input-row" style={{ marginBottom: 12 }}>
          <div className="lt-search-wrap">
            <span className="lt-search-icon">🔍</span>
            <input className="lt-input lt-search" placeholder="Search tasks…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="lt-input lt-input-sm" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option>Newest</option><option>Oldest</option><option>Priority</option>
          </select>
          {tasks.length > 0 && (
            <button className="lt-btn lt-btn-danger lt-btn-sm" onClick={() => { if (window.confirm("Clear all tasks?")) setTasks([]); }}>Clear All</button>
          )}
        </div>

        <div className="lt-filter-row">
          {["All", "Pending", "Completed", "High", "Medium", "Low"].map(f => (
            <button key={f} className={`lt-filter-chip ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>

        {filteredTasks.length === 0
          ? <EmptyState icon="📭" text={search ? "No tasks match your search" : "No tasks here. Add one above!"} />
          : filteredTasks.map(t => (
            <div className="lt-task-item" key={t.id}>
              <div className={`lt-task-check ${t.completed ? "done" : ""}`} onClick={() => setTasks(tasks.map(x => x.id === t.id ? { ...x, completed: !x.completed } : x))}>
                {t.completed ? "✓" : ""}
              </div>
              <div style={{ flex: 1 }}>
                <div className={`lt-task-text ${t.completed ? "done" : ""}`}>{t.text}</div>
                <div className="lt-task-meta" style={{ marginTop: 4 }}>
                  <Badge priority={t.priority} />
                  <span className="lt-badge lt-badge-cat">{t.category}</span>
                  {t.deadline && <span className="lt-task-date">📅 {t.deadline}</span>}
                </div>
              </div>
              <div className="lt-task-actions">
                <button className="lt-btn lt-btn-ghost lt-btn-sm lt-btn-icon" onClick={() => {
                  setTaskInput(t.text); setPriority(t.priority); setCategory(t.category); setDeadline(t.deadline || ""); setEditId(t.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}>✏️</button>
                <button className="lt-btn lt-btn-danger lt-btn-sm lt-btn-icon" onClick={() => setTasks(tasks.filter(x => x.id !== t.id))}>🗑️</button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}

// ─── STUDY TAB ────────────────────────────────────────────────────────────────
function StudyTab() {
  const [subjects, setSubjects] = useLocalState("subjects", []);
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState("");
  const [revisionDate, setRevisionDate] = useState("");

  const add = () => {
    if (!subject.trim()) return;
    setSubjects([{ id: Date.now(), subject, notes, revisionDate }, ...subjects]);
    setSubject(""); setNotes(""); setRevisionDate("");
  };

  const today = new Date().toISOString().split("T")[0];
  const due = subjects.filter(s => s.revisionDate && s.revisionDate <= today).length;

  return (
    <>
      <div className="lt-stats">
        <div className="lt-stat"><div className="lt-stat-val" style={{ color: "var(--accent2)" }}>{subjects.length}</div><div className="lt-stat-lbl">Subjects</div></div>
        <div className="lt-stat"><div className="lt-stat-val" style={{ color: "var(--danger)" }}>{due}</div><div className="lt-stat-lbl">Revision Due</div></div>
      </div>
      <div className="lt-card">
        <div className="lt-card-title">Add Subject</div>
        <div className="lt-input-row">
          <input className="lt-input" placeholder="Subject name" value={subject} onChange={e => setSubject(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} />
          <input className="lt-input" placeholder="Notes / topics" value={notes} onChange={e => setNotes(e.target.value)} style={{ flex: 2 }} />
          <input type="date" className="lt-input lt-input-sm" value={revisionDate} onChange={e => setRevisionDate(e.target.value)} />
          <button className="lt-btn lt-btn-primary" onClick={add}>Add</button>
        </div>
      </div>
      {subjects.length === 0
        ? <EmptyState icon="📚" text="No subjects added yet" />
        : subjects.map(s => {
          const overdue = s.revisionDate && s.revisionDate < today;
          return (
            <div className="lt-study-item" key={s.id} style={overdue ? { borderColor: "rgba(239,68,68,0.3)" } : {}}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div className="lt-study-subject">{s.subject}</div>
                  {s.notes && <div className="lt-study-notes">{s.notes}</div>}
                  {s.revisionDate && (
                    <div className="lt-study-date">
                      {overdue ? "⚠️ Overdue: " : "📅 Revision: "}{s.revisionDate}
                    </div>
                  )}
                </div>
                <button className="lt-btn lt-btn-danger lt-btn-sm" onClick={() => setSubjects(subjects.filter(x => x.id !== s.id))}>Delete</button>
              </div>
            </div>
          );
        })
      }
    </>
  );
}

// ─── ATTENDANCE TAB ───────────────────────────────────────────────────────────
function AttendanceTab() {
  const [attendance, setAttendance] = useLocalState("attendance", {});
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const days = getDaysInMonth(year, month);
  const monthName = now.toLocaleString("default", { month: "long" });

  const toggle = (day) => {
    const key = `${year}-${month}-${day}`;
    const cur = attendance[key];
    const next = cur === "present" ? "absent" : cur === "absent" ? undefined : "present";
    setAttendance(prev => {
      const copy = { ...prev };
      if (next === undefined) delete copy[key]; else copy[key] = next;
      return copy;
    });
  };

  const presentCount = Object.values(attendance).filter(v => v === "present").length;
  const absentCount = Object.values(attendance).filter(v => v === "absent").length;
  const pct = presentCount + absentCount > 0 ? Math.round((presentCount / (presentCount + absentCount)) * 100) : 0;

  return (
    <>
      <div className="lt-stats">
        <div className="lt-stat"><div className="lt-stat-val" style={{ color: "var(--success)" }}>{presentCount}</div><div className="lt-stat-lbl">Present</div></div>
        <div className="lt-stat"><div className="lt-stat-val" style={{ color: "var(--danger)" }}>{absentCount}</div><div className="lt-stat-lbl">Absent</div></div>
        <div className="lt-stat"><div className="lt-stat-val" style={{ color: "var(--accent2)" }}>{pct}%</div><div className="lt-stat-lbl">Attendance %</div></div>
      </div>
      <div className="lt-card">
        <div className="lt-card-title">{monthName} {year} — Click day to toggle</div>
        <div className="lt-att-grid">
          {Array.from({ length: days }, (_, i) => i + 1).map(day => {
            const key = `${year}-${month}-${day}`;
            const status = attendance[key];
            return (
              <div key={day} className={`lt-att-day ${status || ""}`} onClick={() => toggle(day)} title={`Day ${day}`}>
                {day}
              </div>
            );
          })}
        </div>
        <div className="lt-att-legend">
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div className="lt-att-dot" style={{ background: "rgba(16,185,129,0.5)" }} />Present</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div className="lt-att-dot" style={{ background: "rgba(239,68,68,0.5)" }} />Absent</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div className="lt-att-dot" style={{ background: "var(--border)" }} />Not marked</div>
        </div>
      </div>
    </>
  );
}

// ─── HABITS TAB ───────────────────────────────────────────────────────────────
function HabitsTab() {
  const [habits, setHabits] = useLocalState("habits", []);
  const [habit, setHabit] = useState("");

  const add = () => {
    if (!habit.trim()) return;
    setHabits([{ id: Date.now(), name: habit, done: false, streak: 0, lastDone: null }, ...habits]);
    setHabit("");
  };

  const toggle = (id) => {
    setHabits(habits.map(h => h.id === id ? { ...h, done: !h.done, streak: h.done ? Math.max(0, h.streak - 1) : h.streak + 1 } : h));
  };

  const doneCount = habits.filter(h => h.done).length;
  const maxStreak = habits.reduce((m, h) => Math.max(m, h.streak), 0);

  return (
    <>
      <div className="lt-stats">
        <div className="lt-stat"><div className="lt-stat-val" style={{ color: "var(--accent3)" }}>{habits.length}</div><div className="lt-stat-lbl">Total Habits</div></div>
        <div className="lt-stat"><div className="lt-stat-val" style={{ color: "var(--success)" }}>{doneCount}</div><div className="lt-stat-lbl">Done Today</div></div>
        <div className="lt-stat"><div className="lt-stat-val" style={{ color: "var(--danger)" }}>{maxStreak}</div><div className="lt-stat-lbl">Best Streak</div></div>
      </div>
      <div className="lt-card">
        <div className="lt-card-title">New Habit</div>
        <div className="lt-input-row">
          <input className="lt-input" placeholder="e.g. Read 30 min, Drink water…" value={habit} onChange={e => setHabit(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} />
          <button className="lt-btn lt-btn-primary" onClick={add}>Add Habit</button>
        </div>
      </div>
      {habits.length === 0
        ? <EmptyState icon="🔥" text="No habits tracked. Start building one!" />
        : habits.map(h => (
          <div className="lt-habit-item" key={h.id}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, textDecoration: h.done ? "line-through" : "none", color: h.done ? "var(--muted)" : "var(--text)" }}>{h.name}</div>
              <div className="lt-streak">🔥 {h.streak} day streak</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className={`lt-btn lt-btn-sm ${h.done ? "lt-btn-ghost" : "lt-btn-success"}`} onClick={() => toggle(h.id)}>
                {h.done ? "Undo" : "✓ Done"}
              </button>
              <button className="lt-btn lt-btn-danger lt-btn-sm" onClick={() => setHabits(habits.filter(x => x.id !== h.id))}>Delete</button>
            </div>
          </div>
        ))
      }
    </>
  );
}

// ─── EXPENSES TAB ─────────────────────────────────────────────────────────────
function ExpensesTab() {
  const [expenses, setExpenses] = useLocalState("expenses", []);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categ, setCateg] = useState("Food");

  const add = () => {
    if (!title.trim() || !amount) return;
    setExpenses([{ id: Date.now(), title, amount: Number(amount), category: categ }, ...expenses]);
    setTitle(""); setAmount(""); setCateg("Food");
  };

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <>
      <div className="lt-total-bar">
        <div><div className="lt-total-lbl">Total Spent</div><div className="lt-total-val">₹{total.toLocaleString()}</div></div>
        <div style={{ textAlign: "right" }}><div className="lt-total-lbl">{expenses.length} entries</div></div>
      </div>
      <div className="lt-card">
        <div className="lt-card-title">Add Expense</div>
        <div className="lt-input-row">
          <input className="lt-input" placeholder="Expense title" value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} />
          <input type="number" className="lt-input lt-input-sm" placeholder="Amount ₹" value={amount} onChange={e => setAmount(e.target.value)} />
          <select className="lt-input lt-input-sm" value={categ} onChange={e => setCateg(e.target.value)}>
            {["Food", "Transport", "Study", "Entertainment", "Health", "Other"].map(c => <option key={c}>{c}</option>)}
          </select>
          <button className="lt-btn lt-btn-primary" onClick={add}>Add</button>
        </div>
      </div>
      {expenses.length === 0
        ? <EmptyState icon="💸" text="No expenses recorded yet" />
        : expenses.map(e => (
          <div className="lt-expense-item" key={e.id}>
            <div>
              <div className="lt-expense-title">{e.title}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{e.category}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="lt-expense-amt">₹{e.amount.toLocaleString()}</div>
              <button className="lt-btn lt-btn-danger lt-btn-sm" onClick={() => setExpenses(expenses.filter(x => x.id !== e.id))}>Delete</button>
            </div>
          </div>
        ))
      }
    </>
  );
}

// ─── SETTINGS TAB ─────────────────────────────────────────────────────────────
function SettingsTab({ darkMode, setDarkMode }) {
  const clearAll = () => {
    if (window.confirm("This will erase ALL your data. Are you sure?")) {
      ["tasks", "subjects", "habits", "expenses", "attendance"].forEach(k => localStorage.removeItem(k));
      window.location.reload();
    }
  };

  return (
    <div className="lt-card">
      <div className="lt-card-title">Preferences</div>
      <div className="lt-setting-row">
        <div><div className="lt-setting-label">Dark Mode</div><div className="lt-setting-sub">Switch between dark and light theme</div></div>
        <div className={`lt-toggle ${darkMode ? "on" : ""}`} onClick={() => setDarkMode(!darkMode)} />
      </div>
      <div className="lt-setting-row">
        <div><div className="lt-setting-label">Clear All Data</div><div className="lt-setting-sub">Permanently delete all tasks, habits & expenses</div></div>
        <button className="lt-btn lt-btn-danger lt-btn-sm" onClick={clearAll}>Reset</button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", icon: "📋", label: "Dashboard" },
  { id: "study",     icon: "📚", label: "Study Tracker" },
  { id: "attendance",icon: "📅", label: "Attendance" },
  { id: "habits",    icon: "🔥", label: "Habits" },
  { id: "expenses",  icon: "💰", label: "Expenses" },
  null,
  { id: "settings",  icon: "⚙️", label: "Settings" },
];

export default function Dashboard() {
  useStyles();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useLocalState("darkMode", true);
  const [tasks, setTasks] = useLocalState("tasks", []);

  // Apply light mode to body
  useEffect(() => {
    document.body.style.background = darkMode ? "#0a0a12" : "#f1f5f9";
    if (!darkMode) {
      document.documentElement.style.setProperty("--bg", "#f1f5f9");
      document.documentElement.style.setProperty("--surface", "#ffffff");
      document.documentElement.style.setProperty("--surface2", "#f8fafc");
      document.documentElement.style.setProperty("--border", "rgba(0,0,0,0.08)");
      document.documentElement.style.setProperty("--text", "#0f172a");
      document.documentElement.style.setProperty("--muted", "#94a3b8");
    } else {
      document.documentElement.style.setProperty("--bg", "#0a0a12");
      document.documentElement.style.setProperty("--surface", "#12121e");
      document.documentElement.style.setProperty("--surface2", "#1a1a2e");
      document.documentElement.style.setProperty("--border", "rgba(255,255,255,0.07)");
      document.documentElement.style.setProperty("--text", "#f1f5f9");
      document.documentElement.style.setProperty("--muted", "#64748b");
    }
  }, [darkMode]);

  const PAGE_TITLES = {
    dashboard: ["📋 Task Dashboard", "Manage your tasks and track progress"],
    study: ["📚 Study Tracker", "Track subjects and revision schedules"],
    attendance: ["📅 Attendance", "Monitor your daily attendance"],
    habits: ["🔥 Habit Tracker", "Build and maintain daily habits"],
    expenses: ["💰 Expenses", "Track your spending"],
    settings: ["⚙️ Settings", "Customize your experience"],
  };

  const [title, subtitle] = PAGE_TITLES[activeTab];

  const navigate = (id) => { setActiveTab(id); setSidebarOpen(false); };

  return (
    <div className="lt-app">
      {/* Hamburger */}
      <button className="lt-ham" onClick={() => setSidebarOpen(true)}>☰</button>

      {/* Overlay */}
      <div className={`lt-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <nav className={`lt-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="lt-logo">🚀 Life Tracker</div>
        {NAV.map((item, i) =>
          item === null
            ? <div className="lt-sidebar-divider" key={`div-${i}`} />
            : (
              <button
                key={item.id}
                className={`lt-nav-btn ${activeTab === item.id ? "active" : ""}`}
                onClick={() => navigate(item.id)}
              >
                <span className="lt-nav-icon">{item.icon}</span>
                {item.label}
              </button>
            )
        )}
      </nav>

      {/* Main */}
      <main className="lt-main">
        <div className="lt-page-title">{title}</div>
        <div className="lt-page-sub">{subtitle}</div>

        {activeTab === "dashboard"  && <DashboardTab tasks={tasks} setTasks={setTasks} />}
        {activeTab === "study"      && <StudyTab />}
        {activeTab === "attendance" && <AttendanceTab />}
        {activeTab === "habits"     && <HabitsTab />}
        {activeTab === "expenses"   && <ExpensesTab />}
        {activeTab === "settings"   && <SettingsTab darkMode={darkMode} setDarkMode={setDarkMode} />}
      </main>
    </div>
  );
}