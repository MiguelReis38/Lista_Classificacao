import { useState, useEffect } from "react";

// ─── THEME ──────────────────────────────────────────────────────────
const GM = {
  green: "#ADFF2F", greenDark: "#7BBF00", black: "#080808", surface: "#111111",
  surface2: "#191919", border: "rgba(173,255,47,0.13)", borderHover: "rgba(173,255,47,0.32)",
  text: "#EFEFEF", muted: "#555", red: "#E24B4A", amber: "#EF9F27", blue: "#60B0FF",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#080808;color:#EFEFEF;font-family:'Barlow',sans-serif;min-height:100vh;}
input,select,textarea,button{font-family:'Barlow',sans-serif;}
::-webkit-scrollbar{width:3px;height:3px;}
::-webkit-scrollbar-thumb{background:rgba(173,255,47,0.25);border-radius:2px;}

/* ── AUTH ── */
.auth-field{position:relative;margin-bottom:0;}
.auth-field label{display:block;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ADFF2F;margin-bottom:8px;opacity:0.7;}
.auth-wrap{position:relative;display:flex;align-items:center;background:#0f0f0f;border:1px solid #1e1e1e;border-radius:10px;transition:border-color 0.25s,box-shadow 0.25s;overflow:hidden;}
.auth-wrap:focus-within{border-color:rgba(173,255,47,0.5);box-shadow:0 0 0 3px rgba(173,255,47,0.07),inset 0 0 20px rgba(173,255,47,0.03);}
.auth-icon{padding:0 14px 0 16px;color:#2a2a2a;font-size:16px;flex-shrink:0;transition:color 0.25s;pointer-events:none;}
.auth-wrap:focus-within .auth-icon{color:rgba(173,255,47,0.5);}
.auth-input{flex:1;background:transparent;border:none;color:#EFEFEF;padding:14px 14px 14px 0;font-size:15px;outline:none;caret-color:#ADFF2F;min-width:0;}
.auth-input::placeholder{color:#272727;}
.auth-input:-webkit-autofill,.auth-input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 100px #0f0f0f inset;-webkit-text-fill-color:#EFEFEF;transition:background-color 9999s;}
.auth-eye{background:none;border:none;color:#2a2a2a;cursor:pointer;padding:0 16px;font-size:16px;transition:color 0.2s;flex-shrink:0;}
.auth-eye:hover{color:#ADFF2F;}
.auth-wrap::after{content:'';position:absolute;bottom:0;left:50%;right:50%;height:2px;background:linear-gradient(90deg,transparent,#ADFF2F,transparent);transition:left 0.35s,right 0.35s;border-radius:0 0 10px 10px;}
.auth-wrap:focus-within::after{left:10%;right:10%;}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes glow-pulse{0%,100%{box-shadow:0 0 20px rgba(173,255,47,0.15);}50%{box-shadow:0 0 40px rgba(173,255,47,0.35);}}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
@keyframes authSlideIn{from{opacity:0;transform:translateX(-24px);}to{opacity:1;transform:translateX(0);}}
@keyframes fieldPulse{0%,100%{opacity:0.04;}50%{opacity:0.1;}}
.auth-slide-in{animation:authSlideIn 0.4s cubic-bezier(0.22,1,0.36,1) both;}
.field-svg{animation:fieldPulse 4s ease-in-out infinite;}
@keyframes scanline{0%{top:-40%;}100%{top:110%;}}
.scan-line{position:absolute;left:0;right:0;height:40%;background:linear-gradient(to bottom,transparent,rgba(173,255,47,0.04),transparent);animation:scanline 3s linear infinite;pointer-events:none;}

/* GENERAL INPUTS */
.gm-input{background:#191919;border:0.5px solid rgba(173,255,47,0.18);border-radius:8px;color:#EFEFEF;padding:10px 14px;font-size:14px;width:100%;outline:none;transition:border 0.2s;}
.gm-input:focus{border-color:rgba(173,255,47,0.55);}
.gm-input::placeholder{color:#444;}
.gm-select{background:#191919;border:0.5px solid rgba(173,255,47,0.18);border-radius:8px;color:#EFEFEF;padding:10px 14px;font-size:14px;width:100%;outline:none;appearance:none;}

/* BUTTONS */
.btn-primary{background:#ADFF2F;color:#080808;border:none;border-radius:8px;padding:11px 22px;font-size:14px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:opacity 0.15s,transform 0.1s;letter-spacing:0.02em;}
.btn-primary:hover{opacity:0.88;}
.btn-primary:active{transform:scale(0.97);}
.btn-primary:disabled{opacity:0.45;cursor:not-allowed;}
.btn-outline{background:transparent;color:#ADFF2F;border:0.5px solid rgba(173,255,47,0.3);border-radius:8px;padding:10px 18px;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:background 0.2s;}
.btn-outline:hover{background:rgba(173,255,47,0.07);}
.btn-ghost{background:transparent;color:#555;border:0.5px solid rgba(255,255,255,0.07);border-radius:8px;padding:10px 18px;font-size:13px;cursor:pointer;transition:all 0.2s;}
.btn-ghost:hover{color:#EFEFEF;border-color:rgba(255,255,255,0.18);}
.btn-danger{background:transparent;color:#E24B4A;border:0.5px solid rgba(226,75,74,0.3);border-radius:8px;padding:10px 18px;font-size:13px;cursor:pointer;transition:background 0.2s;}
.btn-danger:hover{background:rgba(226,75,74,0.08);}
.btn-sm{padding:6px 12px!important;font-size:12px!important;}

/* CARDS & LAYOUT */
.card{background:#111111;border:0.5px solid rgba(173,255,47,0.13);border-radius:12px;padding:20px;}
.label{font-size:10px;font-weight:700;letter-spacing:0.1em;color:#444;text-transform:uppercase;margin-bottom:7px;}

/* BADGES */
.tag-a{background:rgba(173,255,47,0.1);color:#ADFF2F;font-size:10px;padding:2px 7px;border-radius:4px;font-weight:600;}
.tag-b{background:rgba(96,176,255,0.1);color:#60B0FF;font-size:10px;padding:2px 7px;border-radius:4px;font-weight:600;}
.tag-c{background:rgba(239,159,39,0.1);color:#EF9F27;font-size:10px;padding:2px 7px;border-radius:4px;font-weight:600;}
.tag-gl{background:rgba(226,75,74,0.1);color:#E24B4A;font-size:10px;padding:2px 7px;border-radius:4px;font-weight:600;}

/* AVATAR */
.avatar{border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;}

/* TABLES */
.tbl{width:100%;border-collapse:collapse;font-size:13px;}
.tbl th{color:#444;font-weight:600;font-size:10px;text-transform:uppercase;letter-spacing:0.08em;padding:9px 12px;text-align:left;border-bottom:0.5px solid rgba(173,255,47,0.08);}
.tbl td{padding:10px 12px;border-bottom:0.5px solid rgba(255,255,255,0.035);vertical-align:middle;}
.tbl tr:last-child td{border-bottom:none;}
.tbl tr:hover td{background:rgba(173,255,47,0.02);}

/* NAV */
.nav-item{padding:8px 14px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;transition:all 0.18s;color:#4a4a4a;border:none;background:none;display:flex;align-items:center;gap:9px;width:100%;}
.nav-item:hover{color:#EFEFEF;background:rgba(255,255,255,0.04);}
.nav-item.active{background:rgba(173,255,47,0.09);color:#ADFF2F;}

/* MISC */
.section-title{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:700;color:#EFEFEF;letter-spacing:0.5px;}
.metric{background:#191919;border-radius:10px;padding:16px;text-align:center;}
.metric-val{font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:800;color:#ADFF2F;line-height:1;}
.metric-label{font-size:10px;color:#444;margin-top:5px;text-transform:uppercase;letter-spacing:0.08em;}
.toggle{width:40px;height:22px;border-radius:11px;position:relative;cursor:pointer;transition:background 0.2s;flex-shrink:0;border:none;}
.toggle-dot{width:16px;height:16px;background:#fff;border-radius:50%;position:absolute;top:3px;transition:left 0.2s;}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.82);display:flex;align-items:center;justify-content:center;z-index:200;padding:20px;}
.modal{background:#111111;border:0.5px solid rgba(173,255,47,0.2);border-radius:16px;padding:28px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;}
.chip{display:inline-flex;align-items:center;gap:5px;background:rgba(173,255,47,0.07);border:0.5px solid rgba(173,255,47,0.18);border-radius:6px;padding:4px 10px;font-size:12px;color:#ADFF2F;}
.alert-error{background:rgba(226,75,74,0.08);border:0.5px solid rgba(226,75,74,0.25);border-radius:8px;padding:12px 16px;font-size:13px;color:#E24B4A;}
.alert-info{background:rgba(96,176,255,0.07);border:0.5px solid rgba(96,176,255,0.18);border-radius:8px;padding:12px 16px;font-size:13px;color:#60B0FF;}
.alert-success{background:rgba(173,255,47,0.07);border:0.5px solid rgba(173,255,47,0.2);border-radius:8px;padding:12px 16px;font-size:13px;color:#ADFF2F;}

@keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
.fade-in{animation:fadeIn 0.22s ease;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
.pulse{animation:pulse 1.8s infinite;}
`;

// ─── STORAGE ────────────────────────────────────────────────────────
async function dbGet(key) {
  try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; } catch { return null; }
}
async function dbSet(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); return true; } catch { return false; }
}
async function dbDel(key) {
  try { await window.storage.delete(key); return true; } catch { return false; }
}

// ─── UTILS ──────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);
const initials = (name) => name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
const calcAge = (dob) => {
  if (!dob) return "—";
  const d = new Date(dob), n = new Date();
  let a = n.getFullYear() - d.getFullYear();
  if (n < new Date(n.getFullYear(), d.getMonth(), d.getDate())) a--;
  return a;
};
const catTag = (cat) => {
  if (cat === "A") return <span className="tag-a">Cat. A</span>;
  if (cat === "B") return <span className="tag-b">Cat. B</span>;
  if (cat === "C") return <span className="tag-c">Cat. C</span>;
  return <span className="tag-gl">Goleiro</span>;
};
const AV_COLORS = {
  A: { bg: "rgba(173,255,47,0.14)", c: "#ADFF2F" },
  B: { bg: "rgba(96,176,255,0.14)", c: "#60B0FF" },
  C: { bg: "rgba(239,159,39,0.14)", c: "#EF9F27" },
  GL: { bg: "rgba(226,75,74,0.14)", c: "#E24B4A" },
};
const Avatar = ({ name, cat, size = 34, photo }) => {
  const c = AV_COLORS[cat] || AV_COLORS.A;
  return photo
    ? <img src={photo} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
    : <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.32, background: c.bg, color: c.c }}>{initials(name)}</div>;
};
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// ─── 20 SAMPLE PLAYERS ──────────────────────────────────────────────
const SAMPLE_PLAYERS = [
  { id: "sp01", name: "Carlos Ribeiro",   shirt: "10", dob: "1992-03-15", cat: "A",  photo: "" },
  { id: "sp02", name: "Marcos Ferreira",  shirt: "7",  dob: "1995-07-22", cat: "A",  photo: "" },
  { id: "sp03", name: "João Lopes",       shirt: "11", dob: "1990-11-08", cat: "A",  photo: "" },
  { id: "sp04", name: "Rafael Santos",    shirt: "9",  dob: "1997-01-30", cat: "A",  photo: "" },
  { id: "sp05", name: "André Nascimento", shirt: "8",  dob: "1993-06-14", cat: "B",  photo: "" },
  { id: "sp06", name: "Bruno Tavares",    shirt: "6",  dob: "1996-09-03", cat: "B",  photo: "" },
  { id: "sp07", name: "Lucas Monteiro",   shirt: "5",  dob: "1994-04-19", cat: "B",  photo: "" },
  { id: "sp08", name: "Felipe Duarte",    shirt: "4",  dob: "1998-12-25", cat: "B",  photo: "" },
  { id: "sp09", name: "Gustavo Silva",    shirt: "3",  dob: "1991-08-07", cat: "B",  photo: "" },
  { id: "sp10", name: "William Pires",    shirt: "2",  dob: "1999-05-11", cat: "C",  photo: "" },
  { id: "sp11", name: "Rodrigo Lima",     shirt: "14", dob: "2000-02-28", cat: "C",  photo: "" },
  { id: "sp12", name: "Eduardo Costa",    shirt: "16", dob: "1993-10-17", cat: "C",  photo: "" },
  { id: "sp13", name: "Thiago Nunes",     shirt: "17", dob: "1996-07-04", cat: "C",  photo: "" },
  { id: "sp14", name: "Danilo Vasconcelos", shirt: "18", dob: "1995-03-22", cat: "C", photo: "" },
  { id: "sp15", name: "Kleber Oliveira",  shirt: "19", dob: "2001-01-09", cat: "C",  photo: "" },
  { id: "sp16", name: "Nathan Lima",      shirt: "20", dob: "2002-08-16", cat: "C",  photo: "" },
  { id: "sp17", name: "Paulo Gouveia",    shirt: "1",  dob: "1990-05-03", cat: "GL", photo: "" },
  { id: "sp18", name: "Alex Lima",        shirt: "13", dob: "1994-11-21", cat: "GL", photo: "" },
  { id: "sp19", name: "Roberto Garcia",   shirt: "23", dob: "1997-09-14", cat: "GL", photo: "" },
  { id: "sp20", name: "Pedro Melo",       shirt: "12", dob: "1992-06-30", cat: "GL", photo: "" },
];

// ─── TEAM BUILD ─────────────────────────────────────────────────────
function buildTeams(present) {
  const gks = shuffle(present.filter(p => p.cat === "GL"));
  const out = shuffle(present.filter(p => p.cat !== "GL"));
  if (gks.length < 2) return null;
  const n = Math.min(gks.length, Math.floor((out.length + gks.length) / 6));
  if (n < 2) return null;

  // Main teams: Time 1, Time 2, …
  const teams = Array.from({ length: n }, (_, i) => ({
    id: uid(), number: i + 1, label: `Time ${i + 1}`, players: [gks[i]], borrowed: [],
  }));

  const leftoverPlayers = [];

  out.forEach((p, idx) => {
    const t = teams[idx % n];
    if (t.players.length < 6) t.players.push(p);
    else leftoverPlayers.push(p);
  });

  // Remaining goalkeepers not assigned to a main team
  gks.slice(n).forEach(p => leftoverPlayers.push(p));

  // Leftover team (reservas)
  if (leftoverPlayers.length > 0) {
    teams.push({
      id: uid(), number: n + 1, label: "Reservas", isReserve: true,
      players: leftoverPlayers, borrowed: [],
    });
  }

  return teams;
}

function genMatches(teams) {
  const m = [];
  for (let i = 0; i < teams.length - 1; i++)
    for (let j = i + 1; j < teams.length; j++)
      m.push({ id: uid(), homeId: teams[i].id, awayId: teams[j].id, homeScore: "", awayScore: "", events: [], confirmedPresence: [] });
  return m;
}

// ─── RANKING ────────────────────────────────────────────────────────
function computeRanking(players, rounds) {
  const s = {};
  players.forEach(p => { s[p.id] = { ...p, pts: 0, wins: 0, draws: 0, losses: 0, goals: 0, assists: 0, yellow: 0, red: 0, presence: 0, gkGA: 0, gkGames: 0 }; });
  rounds.filter(r => r.status === "done").forEach(round => {
    const borrowedSet = new Set();
    (round.teams || []).forEach(t => t.players.forEach(p => { if (p.borrowedFrom) borrowedSet.add(p.id); }));
    // presence = confirmed physically present
    (round.confirmedPresence || round.present || []).forEach(pid => {
      if (s[pid]) { s[pid].presence++; s[pid].pts += 1; }
    });
    (round.matches || []).forEach(match => {
      if (match.homeScore === "" || match.awayScore === "") return;
      const hs = parseInt(match.homeScore), as_ = parseInt(match.awayScore);
      const ht = (round.teams || []).find(t => t.id === match.homeId);
      const at = (round.teams || []).find(t => t.id === match.awayId);
      if (!ht || !at) return;
      const hw = hs > as_, aw = as_ > hs, dr = hs === as_;
      const addPts = (team, won, draw) => {
        (team.players || []).forEach(p => {
          if (!s[p.id]) return;
          if (borrowedSet.has(p.id)) { s[p.id].pts += 1; return; }
          if (won) { s[p.id].pts += 3; s[p.id].wins++; }
          else if (draw) { s[p.id].pts += 1; s[p.id].draws++; }
          else s[p.id].losses++;
        });
      };
      addPts(ht, hw, dr); addPts(at, aw, dr);
      const hgk = (ht.players || []).find(p => p.cat === "GL");
      const agk = (at.players || []).find(p => p.cat === "GL");
      if (hgk && s[hgk.id]) { s[hgk.id].gkGA += as_; s[hgk.id].gkGames++; }
      if (agk && s[agk.id]) { s[agk.id].gkGA += hs; s[agk.id].gkGames++; }
      (match.events || []).forEach(ev => {
        if (!s[ev.playerId]) return;
        if (ev.type === "goal") s[ev.playerId].goals++;
        if (ev.type === "assist") s[ev.playerId].assists++;
        if (ev.type === "yellow") s[ev.playerId].yellow++;
        if (ev.type === "red") s[ev.playerId].red++;
      });
    });
  });
  return Object.values(s).sort((a, b) => b.pts - a.pts || b.goals - a.goals || a.name.localeCompare(b.name));
}

// ════════════════════════════════════════════════════════════════════
// AUTH SCREEN  — login | register+verify | forgot | reset
// ════════════════════════════════════════════════════════════════════
function AuthScreen({ onAuth }) {
  // flow: "login" | "register" | "verify" | "forgot" | "reset"
  const [flow, setFlow] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [focusField, setFocusField] = useState(null);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  // verification / reset code
  const [pendingCode, setPendingCode] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingUser, setPendingUser] = useState(null);
  const [codeInput, setCodeInput] = useState(["","","","","",""]);
  const [newPass, setNewPass] = useState("");
  const [codeTimer, setCodeTimer] = useState(60);

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const genCode = () => String(Math.floor(100000 + Math.random() * 900000));

  // countdown timer for code expiry
  useEffect(() => {
    if ((flow === "verify" || flow === "reset") && codeTimer > 0) {
      const t = setTimeout(() => setCodeTimer(v => v - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [flow, codeTimer]);

  const startTimer = () => setCodeTimer(60);

  // ── SUBMIT LOGIN ──
  const submitLogin = async () => {
    setError(""); setLoading(true);
    if (!form.email || !form.password) { setError("Preencha e-mail e senha."); setLoading(false); return; }
    const user = await dbGet(`user:${form.email}`);
    if (!user || user.password !== form.password) { setError("E-mail ou senha incorretos."); setLoading(false); return; }
    // allow legacy accounts created before verification system
    if (user.verified === false) {
      // re-send verification
      const code = genCode();
      await dbSet(`code:${user.email}`, { code, createdAt: Date.now(), type: "verify" });
      setPendingCode(code); setPendingEmail(user.email); setPendingUser(user);
      setCodeInput(["","","","","",""]); startTimer();
      setLoading(false);
      setFlow("verify"); return;
    }
    onAuth(user);
    setLoading(false);
  };

  // ── SUBMIT REGISTER → go to verify ──
  const submitRegister = async () => {
    setError(""); setLoading(true);
    if (!form.name || !form.email || !form.password) { setError("Preencha todos os campos."); setLoading(false); return; }
    if (form.password !== form.confirm) { setError("Senhas não coincidem."); setLoading(false); return; }
    if (form.password.length < 6) { setError("Mínimo 6 caracteres na senha."); setLoading(false); return; }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) { setError("E-mail inválido."); setLoading(false); return; }
    const ex = await dbGet(`user:${form.email}`);
    if (ex && ex.verified) { setError("E-mail já cadastrado."); setLoading(false); return; }
    const code = genCode();
    const draft = { id: uid(), name: form.name, email: form.email, password: form.password, plan: "free", createdAt: Date.now(), verified: false };
    await dbSet(`user:${form.email}`, draft);
    await dbSet(`code:${form.email}`, { code, createdAt: Date.now(), type: "verify" });
    setPendingCode(code);
    setPendingEmail(form.email);
    setPendingUser(draft);
    setCodeInput(["","","","","",""]);
    startTimer();
    setLoading(false);
    setFlow("verify");
  };

  // ── VERIFY CODE ──
  const submitVerify = async () => {
    setError(""); setLoading(true);
    const typed = codeInput.join("");
    if (typed.length < 6) { setError("Digite os 6 dígitos do código."); setLoading(false); return; }
    if (typed !== pendingCode) { setError("Código incorreto. Tente novamente."); setLoading(false); return; }
    if (codeTimer === 0) { setError("Código expirado. Reenvie um novo código."); setLoading(false); return; }
    const verified = { ...pendingUser, verified: true };
    await dbSet(`user:${pendingEmail}`, verified);
    await dbDel(`code:${pendingEmail}`);
    setLoading(false);
    setInfo("Conta verificada com sucesso!");
    setTimeout(() => onAuth(verified), 900);
  };

  // ── FORGOT PASSWORD → send code ──
  const submitForgot = async () => {
    setError(""); setLoading(true);
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRe.test(form.email)) { setError("Digite um e-mail válido."); setLoading(false); return; }
    const user = await dbGet(`user:${form.email}`);
    if (!user) { setError("Nenhuma conta com esse e-mail."); setLoading(false); return; }
    const code = genCode();
    await dbSet(`code:${form.email}`, { code, createdAt: Date.now(), type: "reset" });
    setPendingCode(code);
    setPendingEmail(form.email);
    setCodeInput(["","","","","",""]);
    startTimer();
    setLoading(false);
    setFlow("reset");
  };

  // ── RESET PASSWORD ──
  const submitReset = async () => {
    setError(""); setLoading(true);
    const typed = codeInput.join("");
    if (typed.length < 6) { setError("Digite os 6 dígitos do código."); setLoading(false); return; }
    if (typed !== pendingCode) { setError("Código incorreto."); setLoading(false); return; }
    if (codeTimer === 0) { setError("Código expirado. Solicite um novo."); setLoading(false); return; }
    if (!newPass || newPass.length < 6) { setError("Nova senha: mínimo 6 caracteres."); setLoading(false); return; }
    const user = await dbGet(`user:${pendingEmail}`);
    const updated = { ...user, password: newPass, verified: true };
    await dbSet(`user:${pendingEmail}`, updated);
    await dbDel(`code:${pendingEmail}`);
    setLoading(false);
    setInfo("Senha redefinida! Entrando...");
    setTimeout(() => onAuth(updated), 900);
  };

  // resend code
  const resendCode = async (type) => {
    const code = genCode();
    await dbSet(`code:${pendingEmail}`, { code, createdAt: Date.now(), type });
    setPendingCode(code);
    setCodeInput(["","","","","",""]);
    startTimer();
    setInfo("Novo código gerado!");
    setTimeout(() => setInfo(""), 3000);
  };

  // code input box handler
  const handleCodeDigit = (i, val) => {
    const d = val.replace(/\D/g,"").slice(-1);
    const next = [...codeInput]; next[i] = d;
    setCodeInput(next);
    if (d && i < 5) document.getElementById(`cd${i+1}`)?.focus();
  };
  const handleCodeKey = (i, e) => {
    if (e.key === "Backspace" && !codeInput[i] && i > 0) document.getElementById(`cd${i-1}`)?.focus();
  };

  // ─── STYLES ───────────────────────────────────────────────────────
  const S = {
    fw: (id) => ({
      display:"flex", alignItems:"center",
      background:"#0f0f0f",
      border: focusField===id ? "1px solid rgba(173,255,47,0.65)" : "1px solid #1e1e1e",
      borderRadius: 10,
      boxShadow: focusField===id ? "0 0 0 3px rgba(173,255,47,0.07), inset 0 0 14px rgba(173,255,47,0.03)" : "none",
      transition:"border-color 0.2s, box-shadow 0.2s",
      overflow:"hidden", position:"relative",
    }),
    icon: (id) => ({
      padding:"0 12px 0 14px", fontSize:15, flexShrink:0, userSelect:"none", pointerEvents:"none",
      color: focusField===id ? "rgba(173,255,47,0.55)" : "#282828",
      transition:"color 0.2s",
    }),
    inp: {
      flex:1, background:"transparent", border:"none", outline:"none",
      color:"#efefef", fontSize:15, padding:"14px 12px 14px 0",
      fontFamily:"'Barlow',sans-serif", caretColor:"#ADFF2F", minWidth:0,
    },
    lbl: {
      display:"block", fontSize:10, fontWeight:700, letterSpacing:"0.12em",
      textTransform:"uppercase", color:"#ADFF2F", opacity:0.65, marginBottom:7,
    },
    bar: (id) => ({
      position:"absolute", bottom:0,
      left: focusField===id ? "6%" : "50%",
      right: focusField===id ? "6%" : "50%",
      height:2,
      background:"linear-gradient(90deg,transparent,#ADFF2F,transparent)",
      transition:"left 0.3s, right 0.3s",
    }),
    eyeBtn: (active) => ({
      background:"none", border:"none", cursor:"pointer", padding:"0 14px",
      fontSize:13, flexShrink:0, color: active ? "#ADFF2F" : "#2a2a2a",
      transition:"color 0.2s", fontFamily:"monospace",
    }),
    btn: (disabled) => ({
      display:"flex", alignItems:"center", justifyContent:"center", gap:8,
      width:"100%", padding:"15px 0", marginTop:6,
      fontSize:14, fontWeight:800, letterSpacing:"0.09em",
      fontFamily:"'Barlow',sans-serif", border:"none", borderRadius:10,
      cursor: disabled ? "not-allowed" : "pointer",
      background: disabled ? "rgba(173,255,47,0.4)" : "#ADFF2F",
      color:"#080808",
      boxShadow: disabled ? "none" : "0 4px 28px rgba(173,255,47,0.32)",
      transition:"all 0.2s",
    }),
    link: {
      background:"none", border:"none", color:"rgba(173,255,47,0.55)", fontSize:12,
      cursor:"pointer", padding:0, textDecoration:"underline",
      fontFamily:"'Barlow',sans-serif", transition:"color 0.2s",
    },
    spinner: { width:14, height:14, borderRadius:"50%", border:"2px solid rgba(0,0,0,0.25)", borderTop:"2px solid #080808", animation:"spin 0.7s linear infinite" },
  };

  const InpField = ({ id, label, icon, type, value, onChange, onKD, extra }) => (
    <div>
      <div style={S.lbl}>{label}</div>
      <div style={S.fw(id)}>
        <span style={S.icon(id)}>{icon}</span>
        <input style={S.inp} type={type||"text"} value={value} onChange={onChange}
          onFocus={()=>setFocusField(id)} onBlur={()=>setFocusField(null)} onKeyDown={onKD}
          placeholder={id==="name"?"Seu nome completo":id==="email"?"seu@email.com":"••••••••"}
          autoComplete={id==="email"?"email":id==="name"?"name":flow==="register"||flow==="reset"?"new-password":"current-password"}
        />
        {extra}
        <div style={S.bar(id)}/>
      </div>
    </div>
  );

  const CodeBoxes = () => (
    <div style={{display:"flex",gap:8,justifyContent:"center",margin:"8px 0"}}>
      {codeInput.map((d,i)=>(
        <input key={i} id={`cd${i}`}
          value={d}
          onChange={e=>handleCodeDigit(i,e.target.value)}
          onKeyDown={e=>handleCodeKey(i,e)}
          maxLength={1} inputMode="numeric"
          style={{
            width:44, height:52, textAlign:"center", fontSize:22, fontWeight:700,
            fontFamily:"'Barlow Condensed',sans-serif",
            background:"#0f0f0f", border: d ? "1px solid rgba(173,255,47,0.55)" : "1px solid #1e1e1e",
            borderRadius:9, color:"#ADFF2F", outline:"none",
            boxShadow: d ? "0 0 0 2px rgba(173,255,47,0.08)" : "none",
            transition:"border-color 0.2s, box-shadow 0.2s",
            caretColor:"#ADFF2F",
          }}
        />
      ))}
    </div>
  );

  // ─── PANELS ───────────────────────────────────────────────────────
  const RightPanel = () => (
    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:"#060606",borderLeft:"0.5px solid #0e0e0e",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",left:0,right:0,height:"40%",background:"linear-gradient(to bottom,transparent,rgba(173,255,47,0.035),transparent)",animation:"scanline 3s linear infinite",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"22%",left:"18%",width:320,height:320,borderRadius:"50%",background:"radial-gradient(circle,rgba(173,255,47,0.07) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <svg viewBox="0 0 400 400" style={{width:"78%",maxWidth:340,animation:"fieldPulse 4s ease-in-out infinite"}} xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="16" width="368" height="368" rx="8" fill="none" stroke="#ADFF2F" strokeWidth="1.5"/>
        <circle cx="200" cy="200" r="72" fill="none" stroke="#ADFF2F" strokeWidth="1.5"/>
        <line x1="200" y1="16" x2="200" y2="384" stroke="#ADFF2F" strokeWidth="1"/>
        <rect x="16" y="128" width="94" height="144" fill="none" stroke="#ADFF2F" strokeWidth="1.5"/>
        <rect x="290" y="128" width="94" height="144" fill="none" stroke="#ADFF2F" strokeWidth="1.5"/>
        <rect x="16" y="162" width="46" height="76" fill="none" stroke="#ADFF2F" strokeWidth="1"/>
        <rect x="338" y="162" width="46" height="76" fill="none" stroke="#ADFF2F" strokeWidth="1"/>
        <circle cx="200" cy="200" r="5" fill="#ADFF2F"/>
        <circle cx="76" cy="200" r="4" fill="none" stroke="#ADFF2F" strokeWidth="1"/>
        <circle cx="324" cy="200" r="4" fill="none" stroke="#ADFF2F" strokeWidth="1"/>
        <path d="M16 36 Q16 16 36 16" fill="none" stroke="#ADFF2F" strokeWidth="1"/>
        <path d="M364 16 Q384 16 384 36" fill="none" stroke="#ADFF2F" strokeWidth="1"/>
        <path d="M384 364 Q384 384 364 384" fill="none" stroke="#ADFF2F" strokeWidth="1"/>
        <path d="M36 384 Q16 384 16 364" fill="none" stroke="#ADFF2F" strokeWidth="1"/>
      </svg>
      <div style={{position:"absolute",bottom:30,left:0,right:0,textAlign:"center"}}>
        <div style={{fontSize:11,color:"#181818",letterSpacing:"0.22em",textTransform:"uppercase",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600}}>Organize · Sorteie · Pontue</div>
      </div>
      <div style={{position:"absolute",top:20,right:20,background:"rgba(173,255,47,0.05)",border:"0.5px solid rgba(173,255,47,0.12)",borderRadius:6,padding:"4px 10px",fontSize:10,color:"rgba(173,255,47,0.3)",letterSpacing:"0.1em"}}>v2.0</div>
    </div>
  );

  const Logo = () => (
    <div style={{marginBottom:38}}>
      <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:7}}>
        <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(173,255,47,0.1)",border:"1px solid rgba(173,255,47,0.22)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,animation:"glow-pulse 3s ease-in-out infinite"}}>⚽</div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:34,fontWeight:800,color:"#ADFF2F",letterSpacing:1,lineHeight:1}}>GolMestre</div>
      </div>
      <div style={{color:"#252525",fontSize:11,letterSpacing:"0.14em"}}>SISTEMA DE CAMPEONATO INDIVIDUAL</div>
    </div>
  );

  const ErrMsg = ({msg}) => msg ? (
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"11px 15px",background:"rgba(226,75,74,0.08)",border:"1px solid rgba(226,75,74,0.2)",borderRadius:9,fontSize:13,color:"#E24B4A"}}>⚠ {msg}</div>
  ) : null;

  const InfoMsg = ({msg}) => msg ? (
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"11px 15px",background:"rgba(173,255,47,0.07)",border:"1px solid rgba(173,255,47,0.2)",borderRadius:9,fontSize:13,color:"#ADFF2F"}}>✓ {msg}</div>
  ) : null;

  const BackLink = ({to, label}) => (
    <button style={S.link} onClick={()=>{setFlow(to);setError("");setInfo("");setCodeInput(["","","","","",""]);}}>{label}</button>
  );

  // ─── CODEBOX PANEL (shared by verify + reset) ─────────────────────
  const CodePanel = ({ title, subtitle, onSubmit, showNewPass, type }) => (
    <div style={{display:"flex",flexDirection:"column",gap:18}}>
      <div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:700,color:"#efefef",marginBottom:5}}>{title}</div>
        <div style={{fontSize:13,color:"#333",lineHeight:1.6}}>{subtitle}</div>
      </div>

      {/* mock email notification */}
      <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"flex-start",gap:12}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(173,255,47,0.08)",border:"1px solid rgba(173,255,47,0.18)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16}}>✉</div>
        <div>
          <div style={{fontSize:9,color:"#2a2a2a",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Código enviado para</div>
          <div style={{fontSize:14,color:"#efefef",fontWeight:600}}>{pendingEmail}</div>
          <div style={{fontSize:11,color:"#252525",marginTop:3}}>Verifique sua caixa de entrada e spam</div>
        </div>
      </div>

      {/* DEV HELPER — código visível já que não há e-mail real */}
      <div style={{background:"rgba(173,255,47,0.05)",border:"1px dashed rgba(173,255,47,0.25)",borderRadius:10,padding:"14px 16px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,height:2,background:"#ADFF2F",width:`${(codeTimer/60)*100}%`,transition:"width 1s linear",borderRadius:"2px 0 0 0"}}/>
        <div style={{fontSize:9,color:"rgba(173,255,47,0.4)",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8}}>
          Código de verificação (simulado — em produção seria enviado por e-mail)
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:32,fontWeight:800,color:"#ADFF2F",letterSpacing:8,lineHeight:1}}>{pendingCode}</div>
          <div style={{fontSize:10,color:codeTimer<10?"#E24B4A":"#333",transition:"color 0.3s"}}>
            {codeTimer > 0 ? `${codeTimer}s` : "EXPIRADO"}
          </div>
        </div>
      </div>

      <div>
        <div style={S.lbl}>Digite o código de 6 dígitos</div>
        <CodeBoxes/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
          <div style={{fontSize:11,color:codeTimer<10&&codeTimer>0?"#E24B4A":"#2a2a2a",transition:"color 0.3s",fontWeight:codeTimer<10?"600":"400"}}>
            {codeTimer > 0 ? `Expira em ${codeTimer}s` : <span style={{color:"#E24B4A"}}>⚠ Código expirado</span>}
          </div>
          <button style={S.link} onClick={()=>resendCode(type)}>↺ Reenviar código</button>
        </div>
      </div>

      {showNewPass && (
        <div>
          <div style={S.lbl}>Nova senha</div>
          <div style={S.fw("newpass")}>
            <span style={S.icon("newpass")}>🔑</span>
            <input style={S.inp} type={showPass2?"text":"password"} value={newPass}
              onChange={e=>setNewPass(e.target.value)}
              onFocus={()=>setFocusField("newpass")} onBlur={()=>setFocusField(null)}
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
            />
            <button type="button" style={S.eyeBtn(showPass2)}
              onMouseDown={e=>{e.preventDefault();setShowPass2(v=>!v);}}>
              {showPass2?"●":"○"}
            </button>
            <div style={S.bar("newpass")}/>
          </div>
        </div>
      )}

      <ErrMsg msg={error}/>
      <InfoMsg msg={info}/>

      <button type="button" style={S.btn(loading)} onClick={onSubmit} disabled={loading}>
        {loading ? <><div style={S.spinner}/> Verificando...</> : type==="verify" ? "VERIFICAR CONTA" : "REDEFINIR SENHA"}
      </button>
      <div style={{textAlign:"center"}}>
        <BackLink to="login" label="← Voltar ao login"/>
      </div>
    </div>
  );

  // ─── RENDER ───────────────────────────────────────────────────────
  return (
    <div style={{minHeight:"100vh",display:"flex",background:"#080808",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"-15%",left:"-8%",width:560,height:560,borderRadius:"50%",background:"radial-gradient(circle,rgba(173,255,47,0.05) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-18%",right:"-4%",width:480,height:480,borderRadius:"50%",background:"radial-gradient(circle,rgba(173,255,47,0.04) 0%,transparent 65%)",pointerEvents:"none"}}/>

      {/* LEFT PANEL */}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 56px",maxWidth:520,position:"relative",zIndex:2}}>
        <div style={{width:"100%",maxWidth:360,animation:"authSlideIn 0.4s cubic-bezier(0.22,1,0.36,1) both"}}>
          <Logo/>

          {/* ── VERIFY ── */}
          {flow === "verify" && (
            <CodePanel title="Verifique seu e-mail" type="verify"
              subtitle="Insira o código de 6 dígitos para ativar sua conta."
              onSubmit={submitVerify} showNewPass={false}/>
          )}

          {/* ── RESET ── */}
          {flow === "reset" && (
            <CodePanel title="Redefinir senha" type="reset"
              subtitle="Insira o código recebido e escolha uma nova senha."
              onSubmit={submitReset} showNewPass={true}/>
          )}

          {/* ── FORGOT ── */}
          {flow === "forgot" && (
            <div style={{display:"flex",flexDirection:"column",gap:20}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{width:38,height:38,borderRadius:"50%",background:"rgba(173,255,47,0.08)",border:"1px solid rgba(173,255,47,0.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🔐</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:700,color:"#efefef"}}>Esqueceu a senha?</div>
                </div>
                <div style={{fontSize:13,color:"#333",lineHeight:1.7}}>Informe seu e-mail e um código será gerado para redefinir a senha.</div>
              </div>
              <InpField id="email" label="E-mail cadastrado" icon="✉" type="email"
                value={form.email} onChange={set("email")}
                onKD={e=>e.key==="Enter"&&submitForgot()}/>
              <ErrMsg msg={error}/>
              <button type="button" style={S.btn(loading)} onClick={submitForgot} disabled={loading}>
                {loading ? <><div style={S.spinner}/> Aguarde...</> : "ENVIAR CÓDIGO"}
              </button>
              <div style={{textAlign:"center"}}>
                <BackLink to="login" label="← Voltar ao login"/>
              </div>
            </div>
          )}

          {/* ── LOGIN / REGISTER ── */}
          {(flow === "login" || flow === "register") && (
            <>
              {/* TAB SWITCH */}
              <div style={{display:"flex",marginBottom:32,background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:12,padding:4}}>
                {[["login","Entrar"],["register","Criar conta"]].map(([m,label])=>(
                  <button key={m} onClick={()=>{setFlow(m);setError("");setInfo("");}}
                    style={{flex:1,padding:"11px 0",borderRadius:9,border:"none",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Barlow',sans-serif",
                      background:flow===m?"#ADFF2F":"transparent",color:flow===m?"#080808":"#2a2a2a",
                      letterSpacing:"0.02em",transition:"all 0.22s",boxShadow:flow===m?"0 2px 16px rgba(173,255,47,0.32)":"none"}}>
                    {label}
                  </button>
                ))}
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:20}}>
                {flow === "register" && (
                  <InpField id="name" label="Nome completo" icon="👤"
                    value={form.name} onChange={set("name")}/>
                )}
                <InpField id="email" label="E-mail" icon="✉" type="email"
                  value={form.email} onChange={set("email")}/>
                <InpField id="password" label="Senha" icon="🔑"
                  type={showPass?"text":"password"}
                  value={form.password} onChange={set("password")}
                  onKD={e=>e.key==="Enter"&&(flow==="login"?submitLogin():null)}
                  extra={
                    <button type="button" style={S.eyeBtn(showPass)}
                      onMouseDown={e=>{e.preventDefault();setShowPass(v=>!v);}}>
                      {showPass?"●":"○"}
                    </button>
                  }
                />
                {flow === "register" && (
                  <InpField id="confirm" label="Confirmar senha" icon="🔑" type="password"
                    value={form.confirm} onChange={set("confirm")}
                    onKD={e=>e.key==="Enter"&&submitRegister()}/>
                )}

                {flow === "register" && !error && (
                  <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"rgba(96,176,255,0.06)",border:"1px solid rgba(96,176,255,0.15)",borderRadius:9,fontSize:12,color:"#60B0FF"}}>
                    ✉ Um código de verificação será gerado após o cadastro.
                  </div>
                )}

                <ErrMsg msg={error}/>
                <InfoMsg msg={info}/>

                <button type="button"
                  style={S.btn(loading)}
                  onClick={flow==="login"?submitLogin:submitRegister}
                  disabled={loading}>
                  {loading
                    ? <><div style={S.spinner}/> Aguarde...</>
                    : flow==="login" ? "ENTRAR" : "CRIAR CONTA"}
                </button>

                {/* forgot password link */}
                {flow === "login" && (
                  <div style={{textAlign:"center",marginTop:4}}>
                    <button
                      style={{
                        background:"none",border:"none",cursor:"pointer",padding:"6px 0",
                        color:"rgba(173,255,47,0.5)",fontSize:13,fontFamily:"'Barlow',sans-serif",
                        transition:"color 0.2s",letterSpacing:"0.01em",
                      }}
                      onMouseEnter={e=>e.target.style.color="rgba(173,255,47,0.9)"}
                      onMouseLeave={e=>e.target.style.color="rgba(173,255,47,0.5)"}
                      onClick={()=>{setFlow("forgot");setError("");setInfo("");setForm(p=>({...p,password:""}));}}>
                      Esqueceu sua senha?
                    </button>
                  </div>
                )}
              </div>

              {/* player access */}
              <div style={{marginTop:32,paddingTop:20,borderTop:"1px solid #111"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#ADFF2F",boxShadow:"0 0 8px #ADFF2F",flexShrink:0}}/>
                  <div style={{fontSize:10,color:"#222",textTransform:"uppercase",letterSpacing:"0.12em",fontWeight:700}}>Acesso de jogador</div>
                </div>
                <div style={{fontSize:12,color:"#1a1a1a",lineHeight:1.7}}>Use o link compartilhado pelo organizador para ver a classificação.</div>
              </div>
            </>
          )}
        </div>
      </div>

      <RightPanel/>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// PLAYER PUBLIC VIEW
// ════════════════════════════════════════════════════════════════════
function PlayerView({ champId, onBack }) {
  const [champ, setChamp] = useState(null);
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);
  useEffect(() => {
    (async () => {
      const c = await dbGet(`champ:${champId}`);
      const p = await dbGet(`players:${champId}`) || [];
      const r = await dbGet(`rounds:${champId}`) || [];
      setChamp(c); setPlayers(p); setRounds(r);
    })();
  }, [champId]);
  const ranking = computeRanking(players, rounds);
  if (!champ) return <div style={{ padding: 40, textAlign: "center", color: GM.muted }}>Campeonato não encontrado.</div>;
  return (
    <div style={{ minHeight: "100vh", padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 32, fontWeight: 800, color: GM.green }}>⚽ GolMestre</div>
        <div style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>{champ.name}</div>
        <div style={{ fontSize: 13, color: GM.muted }}>Classificação geral</div>
      </div>
      <div className="card">
        <table className="tbl">
          <thead><tr><th style={{width:32}}>#</th><th>Jogador</th><th style={{width:54,textAlign:"center"}}>Cat</th><th style={{width:48,textAlign:"center"}}>Pts</th><th style={{width:36,textAlign:"center"}}>G</th></tr></thead>
          <tbody>{ranking.map((r,i) => (
            <tr key={r.id}>
              <td style={{fontFamily:"'Barlow Condensed'",fontWeight:700,fontSize:16,color:i===0?GM.green:i===1?"#C0C0C0":i===2?"#CD7F32":GM.muted}}>{i+1}</td>
              <td><div style={{display:"flex",alignItems:"center",gap:9}}><Avatar name={r.name} cat={r.cat} photo={r.photo} size={28}/><span style={{fontSize:13,fontWeight:500}}>{r.name}</span></div></td>
              <td style={{textAlign:"center"}}>{catTag(r.cat)}</td>
              <td style={{textAlign:"center",fontFamily:"'Barlow Condensed'",fontSize:20,fontWeight:700,color:GM.green}}>{r.pts}</td>
              <td style={{textAlign:"center",fontSize:12,color:GM.muted}}>{r.goals}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <button className="btn-ghost" onClick={onBack} style={{marginTop:20}}>← Voltar</button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// CHAMPIONSHIP ACTION MODAL (click on champ name)
// ════════════════════════════════════════════════════════════════════
function ChampActionModal({ champ, onClose, onRename, onFinish, onReopen, onDelete }) {
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState(champ.name);
  const [confirmDel, setConfirmDel] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 700 }}>{champ.name}</div>
            <div style={{ fontSize: 11, color: GM.muted, marginTop: 2 }}>
              {champ.status === "finished" ? "🏁 Finalizado" : "🟢 Em andamento"}
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: GM.muted, cursor: "pointer", fontSize: 18 }}>✕</button>
        </div>

        {!renaming && !confirmDel && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button className="btn-outline" style={{ justifyContent: "flex-start" }} onClick={() => setRenaming(true)}>
              ✏️ &nbsp;Renomear campeonato
            </button>
            {champ.status !== "finished" ? (
              <button className="btn-outline" style={{ justifyContent: "flex-start" }} onClick={onFinish}>
                🏁 &nbsp;Finalizar campeonato
              </button>
            ) : (
              <button className="btn-outline" style={{ justifyContent: "flex-start", color: "#ADFF2F" }} onClick={onReopen}>
                🔄 &nbsp;Reabrir campeonato
              </button>
            )}
            <button className="btn-danger" style={{ justifyContent: "flex-start" }} onClick={() => setConfirmDel(true)}>
              🗑️ &nbsp;Excluir campeonato
            </button>
          </div>
        )}

        {renaming && (
          <div>
            <div className="label">Novo nome</div>
            <input className="gm-input" value={newName} onChange={e => setNewName(e.target.value)} autoFocus
              onKeyDown={e => e.key === "Enter" && newName.trim() && onRename(newName.trim())} style={{ marginBottom: 12 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-primary" onClick={() => newName.trim() && onRename(newName.trim())}>Salvar</button>
              <button className="btn-ghost" onClick={() => setRenaming(false)}>Cancelar</button>
            </div>
          </div>
        )}

        {confirmDel && (
          <div>
            <div className="alert-error" style={{ marginBottom: 16 }}>Tem certeza? Todos os dados serão apagados permanentemente.</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-danger" onClick={onDelete}>Excluir definitivamente</button>
              <button className="btn-ghost" onClick={() => setConfirmDel(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════════════════════════
export default function App() {
  const [user, setUser] = useState(null);
  const [champs, setChamps] = useState([]);
  const [activeChamp, setActiveChamp] = useState(null);
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [nav, setNav] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [publicView, setPublicView] = useState(null);
  const [champModal, setChampModal] = useState(false);
  const [showNewChamp, setShowNewChamp] = useState(false);
  const [newChampName, setNewChampName] = useState("");

  useEffect(() => {
    (async () => {
      const session = await dbGet("session");
      if (session) { const u = await dbGet(`user:${session.email}`); if (u) await doLoadUser(u); }
      setLoading(false);
    })();
  }, []);

  const doLoadUser = async (u) => {
    setUser(u);
    await dbSet("session", { email: u.email });
    const cs = await dbGet(`champs:${u.id}`) || [];
    setChamps(cs);
    if (cs.length > 0) await doLoadChamp(cs[0].id);
  };

  const doLoadChamp = async (id) => {
    const c = await dbGet(`champ:${id}`);
    if (!c) return;
    let p = await dbGet(`players:${id}`) || [];
    // inject sample players if empty
    if (p.length === 0) { p = SAMPLE_PLAYERS; await dbSet(`players:${id}`, p); }
    const r = await dbGet(`rounds:${id}`) || [];
    setActiveChamp(c); setPlayers(p); setRounds(r); setNav("dashboard");
  };

  const saveChamp = async (c) => { await dbSet(`champ:${c.id}`, c); setActiveChamp(c); };
  const savePlayers = async (p) => { if (!activeChamp) return; await dbSet(`players:${activeChamp.id}`, p); setPlayers(p); };
  const saveRounds = async (r) => { if (!activeChamp) return; await dbSet(`rounds:${activeChamp.id}`, r); setRounds(r); };

  const createChamp = async (name) => {
    if (!name.trim()) return;
    const c = { id: uid(), name: name.trim(), status: "active", createdAt: Date.now(), organizerId: user.id };
    const updated = [c, ...champs];
    await dbSet(`champs:${user.id}`, updated);
    await dbSet(`champ:${c.id}`, c);
    // pre-load sample players
    await dbSet(`players:${c.id}`, SAMPLE_PLAYERS);
    setChamps(updated);
    await doLoadChamp(c.id);
    setShowNewChamp(false); setNewChampName("");
  };

  const renameChamp = async (name) => {
    const updated = { ...activeChamp, name };
    await saveChamp(updated);
    setChamps(cs => cs.map(c => c.id === activeChamp.id ? updated : c));
    await dbSet(`champs:${user.id}`, champs.map(c => c.id === activeChamp.id ? updated : c));
    setChampModal(false);
  };

  const finishChamp = async () => {
    const updated = { ...activeChamp, status: "finished", finishedAt: Date.now() };
    await saveChamp(updated);
    setChamps(cs => cs.map(c => c.id === activeChamp.id ? updated : c));
    setChampModal(false);
  };

  const reopenChamp = async () => {
    const updated = { ...activeChamp, status: "active", finishedAt: null };
    await saveChamp(updated);
    setChamps(cs => cs.map(c => c.id === activeChamp.id ? updated : c));
    setChampModal(false);
  };

  const deleteChamp = async () => {
    await dbDel(`champ:${activeChamp.id}`);
    await dbDel(`players:${activeChamp.id}`);
    await dbDel(`rounds:${activeChamp.id}`);
    const updated = champs.filter(c => c.id !== activeChamp.id);
    await dbSet(`champs:${user.id}`, updated);
    setChamps(updated);
    setActiveChamp(null); setPlayers([]); setRounds([]);
    if (updated.length > 0) await doLoadChamp(updated[0].id);
    setChampModal(false);
  };

  const logout = async () => { await dbDel("session"); setUser(null); setActiveChamp(null); setPlayers([]); setRounds([]); };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080808", position: "relative", overflow: "hidden" }}>
      {/* ambient glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(173,255,47,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      {/* scan line */}
      <div className="scan-line" />
      {/* field art */}
      <svg viewBox="0 0 400 400" style={{ position: "absolute", width: 480, opacity: 0.035 }} className="field-svg" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="40" width="320" height="320" rx="4" fill="none" stroke="#ADFF2F" strokeWidth="2"/>
        <circle cx="200" cy="200" r="60" fill="none" stroke="#ADFF2F" strokeWidth="2"/>
        <line x1="200" y1="40" x2="200" y2="360" stroke="#ADFF2F" strokeWidth="1.5"/>
        <rect x="40" y="140" width="80" height="120" fill="none" stroke="#ADFF2F" strokeWidth="1.5"/>
        <rect x="280" y="140" width="80" height="120" fill="none" stroke="#ADFF2F" strokeWidth="1.5"/>
        <circle cx="200" cy="200" r="3" fill="#ADFF2F"/>
      </svg>
      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        {/* logo badge */}
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, borderRadius: "50%", background: "rgba(173,255,47,0.08)", border: "1px solid rgba(173,255,47,0.2)", marginBottom: 20, animation: "glow-pulse 2s ease-in-out infinite" }}>
          <span style={{ fontSize: 32 }}>⚽</span>
        </div>
        <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 34, fontWeight: 800, color: GM.green, letterSpacing: 1 }}>GolMestre</div>
        <div style={{ fontSize: 11, color: "#333", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 6, marginBottom: 28 }}>Sistema de campeonato individual</div>
        {/* spinner ring */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #1a1a1a", borderTop: `2px solid ${GM.green}`, animation: "spin 0.8s linear infinite" }} />
          <div style={{ fontSize: 11, color: "#2a2a2a", letterSpacing: "0.14em", textTransform: "uppercase" }}>Carregando</div>
        </div>
      </div>
    </div>
  );

  if (publicView) return <PlayerView champId={publicView} onBack={() => setPublicView(null)} />;
  if (!user) return <AuthScreen onAuth={doLoadUser} />;

  const ranking = computeRanking(players, rounds);

  const navItems = [
    { id: "dashboard", icon: "ti-layout-dashboard", label: "Dashboard" },
    { id: "players",   icon: "ti-users",            label: "Jogadores" },
    { id: "sorteio",   icon: "ti-shuffle",           label: "Sorteio dos Times" },
    { id: "matches",   icon: "ti-ball-football",     label: "Partidas" },
    { id: "ranking",   icon: "ti-trophy",            label: "Classificação" },
    { id: "history",   icon: "ti-history",           label: "Histórico" },
    { id: "plans",     icon: "ti-star",              label: "Planos" },
  ];

  return (
    <>
      <style>{css}</style>
      {/* TOP BAR */}
      <div style={{ background: GM.black, borderBottom: `0.5px solid #181818`, padding: "0 20px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 800, color: GM.green, letterSpacing: 1 }}>⚽ GolMestre</div>
          {/* champ selector */}
          {activeChamp ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button onClick={() => setChampModal(true)}
                style={{ background: "#111", border: "0.5px solid #222", borderRadius: 7, color: "#EFEFEF", padding: "5px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Barlow'" }}>
                {activeChamp.name}
                {activeChamp.status === "finished" && <span style={{ fontSize: 10, color: GM.amber }}>FINALIZADO</span>}
                <span style={{ color: "#333", fontSize: 11 }}>▾</span>
              </button>
              {champs.length > 1 && (
                <select style={{ background: "#111", border: "0.5px solid #1e1e1e", borderRadius: 7, color: "#444", padding: "5px 10px", fontSize: 12, cursor: "pointer", fontFamily: "'Barlow'" }}
                  value={activeChamp.id} onChange={e => doLoadChamp(e.target.value)}>
                  {champs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              )}
              <button className="btn-ghost btn-sm" onClick={() => setShowNewChamp(true)}>+ Novo</button>
            </div>
          ) : (
            <button className="btn-primary btn-sm" onClick={() => setShowNewChamp(true)}>+ Criar campeonato</button>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 12, color: "#2a2a2a" }}>{user.name}</span>
          <button className="btn-ghost btn-sm" onClick={logout}>Sair</button>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 54px)" }}>
        {/* SIDEBAR */}
        <nav style={{ width: 196, background: "#0a0a0a", borderRight: "0.5px solid #161616", padding: "16px 10px", display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}>
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${nav === item.id ? "active" : ""}`} onClick={() => setNav(item.id)}>
              <i className={`ti ${item.icon}`} style={{ fontSize: 15 }} aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* MAIN */}
        <main style={{ flex: 1, padding: "24px 28px", overflow: "auto" }} className="fade-in" key={nav}>
          {!activeChamp ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>⚽</div>
                <div className="section-title" style={{ marginBottom: 8 }}>Nenhum campeonato</div>
                <div style={{ color: GM.muted, fontSize: 14, marginBottom: 20 }}>Crie seu primeiro campeonato para começar</div>
                <button className="btn-primary" onClick={() => setShowNewChamp(true)}>Criar campeonato</button>
              </div>
            </div>
          ) : nav === "dashboard" ? <Dashboard players={players} rounds={rounds} ranking={ranking} activeChamp={activeChamp} saveChamp={saveChamp} setNav={setNav} />
          : nav === "players"   ? <Players players={players} savePlayers={savePlayers} />
          : nav === "sorteio"   ? <Sorteio players={players} rounds={rounds} saveRounds={saveRounds} />
          : nav === "matches"   ? <Matches rounds={rounds} players={players} saveRounds={saveRounds} />
          : nav === "ranking"   ? <Ranking ranking={ranking} rounds={rounds} saveRounds={saveRounds} players={players} savePlayers={savePlayers} />
          : nav === "history"   ? <History rounds={rounds} players={players} />
          : nav === "plans"     ? <Plans user={user} />
          : null}
        </main>
      </div>

      {/* CHAMP ACTION MODAL */}
      {champModal && activeChamp && (
        <ChampActionModal champ={activeChamp} onClose={() => setChampModal(false)}
          onRename={renameChamp} onFinish={finishChamp} onReopen={reopenChamp} onDelete={deleteChamp} />
      )}

      {/* NEW CHAMP MODAL */}
      {showNewChamp && (
        <div className="modal-overlay" onClick={() => setShowNewChamp(false)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="section-title" style={{ marginBottom: 20 }}>Novo campeonato</div>
            <div className="label">Nome</div>
            <input className="gm-input" placeholder="Ex: Copa Verde da Várzea 2025" value={newChampName} onChange={e => setNewChampName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && createChamp(newChampName)} autoFocus style={{ marginBottom: 16 }} />
            <div className="alert-info" style={{ marginBottom: 16, fontSize: 12 }}>
              💡 20 jogadores de exemplo serão adicionados automaticamente para você conhecer o sistema.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-primary" onClick={() => createChamp(newChampName)}>Criar</button>
              <button className="btn-ghost" onClick={() => setShowNewChamp(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════════
function Dashboard({ players, rounds, ranking, activeChamp, saveChamp, setNav }) {
  const done = rounds.filter(r => r.status === "done");
  const totalGoals = done.flatMap(r => (r.matches||[]).flatMap(m => (m.events||[]).filter(e=>e.type==="goal"))).length;
  const topScorer = ranking.find(p => p.goals > 0);
  const gks = ranking.filter(p=>p.cat==="GL"&&p.gkGames>0).map(p=>({...p,avg:p.gkGames?(p.gkGA/p.gkGames):999})).sort((a,b)=>a.avg-b.avg);
  const luva = gks[0];

  const exportData = () => {
    const content = [
      `CAMPEONATO: ${activeChamp.name}`,
      `Gerado: ${new Date().toLocaleDateString('pt-BR')}`,
      `Status: ${activeChamp.status==="finished"?"Finalizado":"Em andamento"}`,
      `Rodadas: ${done.length} | Gols: ${totalGoals}`,
      ``,
      `=== CLASSIFICAÇÃO ===`,
      ...ranking.map((p,i) => `${i+1}. ${p.name} (${p.cat}) — ${p.pts}pts | ${p.wins}V ${p.draws}E ${p.losses}D | ${p.goals}G ${p.assists}A | Pres:${p.presence}`),
      ``,
      `=== ARTILHARIA ===`,
      ...ranking.filter(p=>p.goals>0).map((p,i)=>`${i+1}. ${p.name} — ${p.goals} gols`),
      ``,
      `=== LUVA DE OURO ===`,
      ...gks.map((p,i)=>`${i+1}. ${p.name} — ${p.avg.toFixed(1)} gols/jogo (${p.gkGames} jogos)`),
    ].join('\n');
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
    a.download = `${activeChamp.name.replace(/\s+/g,'_')}.txt`; a.click();
  };

  return (
    <div>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div className="section-title">{activeChamp.name}</div>
            {activeChamp.status==="finished" && <span style={{fontSize:11,color:GM.amber,background:"rgba(239,159,39,0.1)",padding:"2px 8px",borderRadius:4,fontWeight:600}}>FINALIZADO</span>}
          </div>
          <div style={{color:GM.muted,fontSize:12,marginTop:4}}>Pontos corridos · {done.length} rodada{done.length!==1?"s":""} concluída{done.length!==1?"s":""}</div>
        </div>
        <button className="btn-outline" onClick={exportData}><i className="ti ti-file-export" aria-hidden="true"/> Exportar</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:22}}>
        {[
          {label:"Jogadores",val:players.length,sub:"cadastrados"},
          {label:"Rodadas",val:done.length,sub:"concluídas"},
          {label:"Gols totais",val:totalGoals,sub:"no campeonato"},
          {label:"Artilheiro",val:topScorer?topScorer.goals:0,sub:topScorer?topScorer.name.split(" ")[0]:"—"},
        ].map(m=>(
          <div className="metric" key={m.label}>
            <div className="metric-val">{m.val}</div>
            <div className="metric-label">{m.label}</div>
            <div style={{fontSize:10,color:"#333",marginTop:3}}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:14,marginBottom:14}}>
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div className="label" style={{margin:0}}>Top classificação</div>
            <button className="btn-ghost btn-sm" onClick={()=>{}}>ver tudo →</button>
          </div>
          <table className="tbl" style={{tableLayout:"fixed"}}>
            <thead><tr>
              <th style={{width:28}}>#</th><th>Jogador</th>
              <th style={{width:48,textAlign:"center"}}>Cat</th>
              <th style={{width:44,textAlign:"center"}}>Pts</th>
              <th style={{width:30,textAlign:"center"}}>G</th>
            </tr></thead>
            <tbody>
              {ranking.slice(0,8).map((p,i)=>(
                <tr key={p.id}>
                  <td style={{fontFamily:"'Barlow Condensed'",fontWeight:700,fontSize:16,color:i===0?GM.green:i===1?"#C0C0C0":i===2?"#CD7F32":GM.muted}}>{i+1}</td>
                  <td><div style={{display:"flex",alignItems:"center",gap:8}}><Avatar name={p.name} cat={p.cat} photo={p.photo} size={26}/><span style={{fontSize:13}}>{p.name}</span></div></td>
                  <td style={{textAlign:"center"}}>{catTag(p.cat)}</td>
                  <td style={{textAlign:"center",fontFamily:"'Barlow Condensed'",fontSize:18,fontWeight:700,color:GM.green}}>{p.pts}</td>
                  <td style={{textAlign:"center",fontSize:12,color:GM.muted}}>{p.goals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div className="card">
            <div className="label" style={{marginBottom:10}}>🥅 Artilharia</div>
            {ranking.filter(p=>p.goals>0).slice(0,5).map((p,i)=>(
              <div key={p.id} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:i<4?"0.5px solid rgba(255,255,255,0.03)":"none"}}>
                <div style={{fontFamily:"'Barlow Condensed'",fontSize:17,fontWeight:700,color:GM.green,minWidth:22}}>{p.goals}</div>
                <Avatar name={p.name} cat={p.cat} photo={p.photo} size={22}/>
                <div style={{fontSize:12}}>{p.name}</div>
              </div>
            ))}
            {ranking.filter(p=>p.goals>0).length===0&&<div style={{fontSize:12,color:GM.muted}}>Sem gols registrados.</div>}
          </div>
          <div className="card" style={{borderColor:"rgba(226,75,74,0.18)"}}>
            <div className="label" style={{marginBottom:10,color:GM.red}}>🧤 Luva de ouro</div>
            {luva?(
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <Avatar name={luva.name} cat="GL" photo={luva.photo} size={32}/>
                <div><div style={{fontSize:13,fontWeight:500}}>{luva.name}</div>
                  <div style={{fontSize:11,color:GM.muted}}>{luva.avg.toFixed(1)} gols/jogo · {luva.gkGames} jgs</div></div>
              </div>
            ):<div style={{fontSize:12,color:GM.muted}}>Sem dados ainda.</div>}
          </div>
        </div>
      </div>

      <div style={{display:"flex",gap:8}}>
        <button className="btn-primary" onClick={()=>{}}>
          <i className="ti ti-shuffle" aria-hidden="true"/> Ir para Sorteio
        </button>
        <button className="btn-outline" onClick={()=>{}}>
          <i className="ti ti-ball-football" aria-hidden="true"/> Ver partidas
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// PLAYERS
// ════════════════════════════════════════════════════════════════════
function Players({ players, savePlayers }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name:"",shirt:"",dob:"",cat:"A",photo:"" });
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState("");

  const open = (p=null) => {
    setForm(p?{name:p.name,shirt:p.shirt||"",dob:p.dob||"",cat:p.cat,photo:p.photo||""}:{name:"",shirt:"",dob:"",cat:"A",photo:""});
    setPreview(p?.photo||""); setModal(p||"new");
  };

  const save = async () => {
    if (!form.name.trim()) return;
    if (modal==="new") await savePlayers([...players,{id:uid(),...form}]);
    else await savePlayers(players.map(p=>p.id===modal.id?{...p,...form}:p));
    setModal(null);
  };

  const remove = async id => await savePlayers(players.filter(p=>p.id!==id));

  const handlePhoto = e => {
    const file = e.target.files[0]; if(!file) return;
    const r=new FileReader(); r.onload=ev=>{setPreview(ev.target.result);setForm(p=>({...p,photo:ev.target.result}));}; r.readAsDataURL(file);
  };

  const f = k => e => setForm(p=>({...p,[k]:e.target.value}));
  const filtered = players.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div className="section-title">Jogadores <span style={{color:GM.muted,fontSize:16}}>({players.length})</span></div>
        <button className="btn-primary" onClick={()=>open()}>+ Adicionar</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:18}}>
        {["A","B","C","GL"].map(cat=>(
          <div className="metric" key={cat}>
            <div className="metric-val">{players.filter(p=>p.cat===cat).length}</div>
            <div className="metric-label">Cat. {cat}</div>
          </div>
        ))}
      </div>

      <input className="gm-input" placeholder="Buscar jogador..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:280,marginBottom:14}}/>

      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <table className="tbl" style={{tableLayout:"fixed"}}>
          <thead><tr>
            <th style={{width:50,padding:"10px 14px"}}>Foto</th>
            <th>Jogador</th>
            <th style={{width:50,textAlign:"center"}}>#</th>
            <th style={{width:56,textAlign:"center"}}>Idade</th>
            <th style={{width:72,textAlign:"center"}}>Cat</th>
            <th style={{width:80,textAlign:"right",padding:"8px 14px"}}>Ações</th>
          </tr></thead>
          <tbody>
            {filtered.map(p=>(
              <tr key={p.id}>
                <td style={{padding:"9px 14px"}}><Avatar name={p.name} cat={p.cat} photo={p.photo}/></td>
                <td style={{fontWeight:500}}>{p.name}</td>
                <td style={{textAlign:"center",color:GM.muted}}>{p.shirt||"—"}</td>
                <td style={{textAlign:"center",color:GM.muted}}>{calcAge(p.dob)}</td>
                <td style={{textAlign:"center"}}>{catTag(p.cat)}</td>
                <td style={{textAlign:"right",padding:"9px 14px"}}>
                  <button onClick={()=>open(p)} style={{background:"none",border:"none",color:GM.muted,cursor:"pointer",fontSize:14,padding:4}}><i className="ti ti-edit" aria-hidden="true"/></button>
                  <button onClick={()=>remove(p.id)} style={{background:"none",border:"none",color:GM.red,cursor:"pointer",fontSize:14,padding:4}}><i className="ti ti-trash" aria-hidden="true"/></button>
                </td>
              </tr>
            ))}
            {filtered.length===0&&<tr><td colSpan={6} style={{textAlign:"center",padding:28,color:GM.muted}}>Nenhum jogador encontrado.</td></tr>}
          </tbody>
        </table>
      </div>

      {modal&&(
        <div className="modal-overlay" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="section-title" style={{marginBottom:20}}>{modal==="new"?"Novo jogador":"Editar jogador"}</div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:4}}>
                <div style={{cursor:"pointer"}} onClick={()=>document.getElementById("ph-input").click()}>
                  {preview?<img src={preview} style={{width:60,height:60,borderRadius:"50%",objectFit:"cover",border:`1.5px solid ${GM.border}`}}/>
                    :<div style={{width:60,height:60,borderRadius:"50%",background:"#191919",border:"1.5px dashed #2a2a2a",display:"flex",alignItems:"center",justifyContent:"center",color:"#333",fontSize:20}}>📷</div>}
                  <input id="ph-input" type="file" accept="image/*" style={{display:"none"}} onChange={handlePhoto}/>
                </div>
                <div style={{fontSize:12,color:GM.muted}}>Clique para<br/>adicionar foto</div>
              </div>
              <div><div className="label">Nome</div><input className="gm-input" value={form.name} onChange={f("name")} placeholder="Nome completo"/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div><div className="label">Nº camiseta</div><input className="gm-input" value={form.shirt} onChange={f("shirt")} placeholder="10" type="number"/></div>
                <div><div className="label">Data de nascimento</div><input className="gm-input" value={form.dob} onChange={f("dob")} type="date"/></div>
              </div>
              <div><div className="label">Categoria</div>
                <select className="gm-select" value={form.cat} onChange={f("cat")}>
                  <option value="A">Categoria A</option><option value="B">Categoria B</option>
                  <option value="C">Categoria C</option><option value="GL">Goleiro</option>
                </select>
              </div>
              <div style={{display:"flex",gap:8,marginTop:4}}>
                <button className="btn-primary" onClick={save}>Salvar</button>
                <button className="btn-ghost" onClick={()=>setModal(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// SORTEIO DOS TIMES (replaced Presence)
// ════════════════════════════════════════════════════════════════════
function Sorteio({ players, rounds, saveRounds }) {
  // step: "select_round" | "select_present" | "teams" | "confirm_presence"
  const [step, setStep] = useState("select_round");
  const [roundId, setRoundId] = useState(null);
  const [present, setPresent] = useState([]);
  const [confirmedPresence, setConfirmedPresence] = useState([]);
  const [error, setError] = useState("");

  const openRound = (r) => {
    setRoundId(r.id);
    setPresent(r.present || []);
    setConfirmedPresence(r.confirmedPresence || []);
    setError("");
    if (r.teams && r.teams.length > 0) setStep("confirm_presence");
    else setStep("select_present");
  };

  const newRound = async () => {
    const r = { id: uid(), number: rounds.length + 1, status: "open", present: [], confirmedPresence: [], teams: null, matches: [] };
    const updated = [...rounds, r];
    await saveRounds(updated);
    setRoundId(r.id); setPresent([]); setConfirmedPresence([]); setError("");
    setStep("select_present");
  };

  const currentRound = rounds.find(r => r.id === roundId);
  const gkCount = players.filter(p => present.includes(p.id) && p.cat === "GL").length;
  const totalPresent = present.length;

  const savePresent = async () => {
    const updated = rounds.map(r => r.id === roundId ? { ...r, present } : r);
    await saveRounds(updated);
  };

  const draw = async () => {
    const pp = players.filter(p => present.includes(p.id));
    const result = buildTeams(pp);
    if (!result) { setError("Mínimo de 2 goleiros e jogadores suficientes para montar times (6 por time)."); return; }
    setError("");
    const matches = genMatches(result);
    const updated = rounds.map(r => r.id === roundId ? { ...r, present, teams: result, matches, status: "in_progress", confirmedPresence: [] } : r);
    await saveRounds(updated);
    setConfirmedPresence([]);
    setStep("confirm_presence");
  };

  const toggleConfirmed = (pid) => {
    setConfirmedPresence(p => p.includes(pid) ? p.filter(x => x !== pid) : [...p, pid]);
  };

  const saveConfirmedPresence = async () => {
    const updated = rounds.map(r => r.id === roundId ? { ...r, confirmedPresence } : r);
    await saveRounds(updated);
  };

  const finishRound = async () => {
    const updated = rounds.map(r => r.id === roundId ? { ...r, status: "done", confirmedPresence } : r);
    await saveRounds(updated);
    setStep("select_round");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div className="section-title">Sorteio dos Times</div>
        <button className="btn-primary" onClick={newRound}><i className="ti ti-plus" aria-hidden="true"/> Nova rodada</button>
      </div>

      {rounds.length === 0 && <div className="alert-info">Nenhuma rodada criada. Clique em "Nova rodada" para começar.</div>}

      <div style={{ display: "flex", gap: 16 }}>
        {/* Round list */}
        {rounds.length > 0 && (
          <div style={{ width: 148, flexShrink: 0 }}>
            <div className="label" style={{ marginBottom: 8 }}>Rodadas</div>
            {rounds.map(r => (
              <button key={r.id} onClick={() => openRound(r)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "8px 11px", borderRadius: 7, border: "0.5px solid",
                  borderColor: r.id === roundId ? GM.green : "#1e1e1e", background: r.id === roundId ? "rgba(173,255,47,0.07)" : "transparent",
                  color: r.id === roundId ? GM.green : GM.muted, fontSize: 13, cursor: "pointer", marginBottom: 3, fontFamily: "'Barlow'" }}>
                <span>Rodada {r.number}</span>
                <span style={{ fontSize: 9, padding: "2px 5px", borderRadius: 3,
                  background: r.status === "done" ? "rgba(173,255,47,0.12)" : r.status === "in_progress" ? "rgba(239,159,39,0.12)" : "rgba(255,255,255,0.04)",
                  color: r.status === "done" ? GM.green : r.status === "in_progress" ? GM.amber : "#333" }}>
                  {r.status === "done" ? "✓ ok" : r.status === "in_progress" ? "• em jogo" : "— aberta"}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* STEP: select_present */}
        {step === "select_present" && currentRound && (
          <div style={{ flex: 1 }}>
            <div className="card" style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Quem vai jogar hoje?</div>
                  <div style={{ fontSize: 12, color: GM.muted, marginTop: 3 }}>
                    {totalPresent} selecionado{totalPresent !== 1 ? "s" : ""} · {gkCount} goleiro{gkCount !== 1 ? "s" : ""}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-ghost btn-sm" onClick={() => setPresent(players.map(p => p.id))}>Todos</button>
                  <button className="btn-ghost btn-sm" onClick={() => setPresent([])}>Limpar</button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 6 }}>
                {players.map(p => {
                  const on = present.includes(p.id);
                  return (
                    <div key={p.id} onClick={() => setPresent(prev => on ? prev.filter(x => x !== p.id) : [...prev, p.id])}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: 8, cursor: "pointer",
                        border: `0.5px solid ${on ? "rgba(173,255,47,0.28)" : "#1a1a1a"}`, background: on ? "rgba(173,255,47,0.04)" : "#111" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <Avatar name={p.name} cat={p.cat} photo={p.photo} size={28}/>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                          <div style={{ fontSize: 10, color: GM.muted }}>Cat. {p.cat} · #{p.shirt||"—"}</div>
                        </div>
                      </div>
                      <div className="toggle" style={{ background: on ? GM.green : "#222" }}>
                        <div className="toggle-dot" style={{ left: on ? 21 : 3 }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {error && <div className="alert-error" style={{ marginBottom: 12 }}>{error}</div>}

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {gkCount >= 2 ? (
                <button className="btn-primary" onClick={draw}>
                  <i className="ti ti-shuffle" aria-hidden="true"/> Sortear times ({totalPresent} jogadores)
                </button>
              ) : (
                <div className="alert-info">Selecione pelo menos 2 goleiros para sortear.</div>
              )}
              <button className="btn-ghost btn-sm" onClick={savePresent}>Salvar seleção</button>
            </div>
          </div>
        )}

        {/* STEP: confirm_presence (after draw — who actually showed up) */}
        {step === "confirm_presence" && currentRound && currentRound.teams && (
          <div style={{ flex: 1 }}>
            {/* show the teams */}
            <div className="card" style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Times sorteados — Rodada {currentRound.number}</div>
                  <div style={{ fontSize: 12, color: GM.muted, marginTop: 2 }}>{currentRound.teams.filter(t=>!t.isReserve).length} times + {currentRound.teams.find(t=>t.isReserve) ? "reservas" : "sem reservas"} · {currentRound.matches?.length || 0} partidas</div>
                </div>
                <button className="btn-ghost btn-sm" onClick={() => setStep("select_present")}>
                  ↺ Ressortear
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 10 }}>
                {currentRound.teams.map((team, ti) => (
                  <div key={team.id} style={{ background: "#191919", borderRadius: 9, padding: 12, border: "0.5px solid #1e1e1e" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: team.isReserve ? GM.amber : ["#ADFF2F","#EFEFEF","#EF9F27","#60B0FF","#E24B4A"][ti] || GM.green }}>
                      {team.label} {team.isReserve && <span style={{fontSize:10,color:GM.amber}}>(reservas)</span>}
                    </div>
                    {(team.players || []).map(p => (
                      <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 7, padding: "3px 0" }}>
                        <Avatar name={p.name} cat={p.cat} photo={p.photo} size={20}/>
                        <div style={{ fontSize: 12 }}>{p.name.split(" ")[0]} {p.borrowedFrom ? <span style={{ fontSize: 9, color: GM.amber }}>(emp)</span> : ""}</div>
                        {p.cat === "GL" && <span className="tag-gl" style={{ fontSize: 9, padding: "1px 4px" }}>GL</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* confirm presence physically */}
            <div className="card" style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>✅ Confirmar presença no jogo</div>
                  <div style={{ fontSize: 12, color: GM.muted, marginTop: 2 }}>
                    Marque quem realmente compareceu · {confirmedPresence.length} confirmado{confirmedPresence.length !== 1 ? "s" : ""}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn-ghost btn-sm" onClick={() => setConfirmedPresence((currentRound.present || []))}>Todos sorteo</button>
                  <button className="btn-ghost btn-sm" onClick={() => setConfirmedPresence([])}>Limpar</button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 5 }}>
                {players.filter(p => (currentRound.present || []).includes(p.id)).map(p => {
                  const on = confirmedPresence.includes(p.id);
                  return (
                    <div key={p.id} onClick={() => toggleConfirmed(p.id)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 11px", borderRadius: 7, cursor: "pointer",
                        border: `0.5px solid ${on ? "rgba(173,255,47,0.25)" : "#1a1a1a"}`, background: on ? "rgba(173,255,47,0.04)" : "#111" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Avatar name={p.name} cat={p.cat} photo={p.photo} size={24}/>
                        <span style={{ fontSize: 12, fontWeight: 500 }}>{p.name}</span>
                      </div>
                      <div className="toggle" style={{ background: on ? GM.green : "#222" }}>
                        <div className="toggle-dot" style={{ left: on ? 21 : 3 }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-primary" onClick={saveConfirmedPresence}>
                <i className="ti ti-check" aria-hidden="true"/> Salvar presenças
              </button>
              {currentRound.status === "in_progress" && (
                <button className="btn-outline" onClick={finishRound}>
                  <i className="ti ti-flag" aria-hidden="true"/> Concluir rodada
                </button>
              )}
            </div>
          </div>
        )}

        {step === "select_round" && rounds.length > 0 && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", color: GM.muted }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>👈</div>
              <div style={{ fontSize: 14 }}>Selecione uma rodada</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// MATCH EDIT MODAL — per-player stats + borrow
// ════════════════════════════════════════════════════════════════════
function MatchEditModal({ match, round, allPlayers, onSave, onClose }) {
  const getTeam = id => (round.teams || []).find(t => t.id === id);
  const ht = getTeam(match.homeId), at = getTeam(match.awayId);

  // local state: scores (start 0×0 if no score yet)
  const [homeScore, setHomeScore] = useState(match.homeScore !== "" ? match.homeScore : "0");
  const [awayScore, setAwayScore] = useState(match.awayScore !== "" ? match.awayScore : "0");

  // per-player stats: { [playerId]: { goals, yellow, red } }
  const buildInitialStats = () => {
    const stats = {};
    const all = [...(ht?.players||[]), ...(at?.players||[])];
    all.forEach(p => { stats[p.id] = { goals: 0, yellow: 0, red: 0 }; });
    (match.events || []).forEach(ev => {
      if (!stats[ev.playerId]) stats[ev.playerId] = { goals: 0, yellow: 0, red: 0 };
      if (ev.type === "goal") stats[ev.playerId].goals++;
      if (ev.type === "yellow") stats[ev.playerId].yellow++;
      if (ev.type === "red") stats[ev.playerId].red++;
    });
    return stats;
  };
  const [stats, setStats] = useState(buildInitialStats);

  // borrow: add player from reserve/other team to this match
  const [borrowTeamSide, setBorrowTeamSide] = useState(null); // "home"|"away"
  const [borrowPlayerId, setBorrowPlayerId] = useState("");

  const allMatchPlayerIds = new Set([...(ht?.players||[]).map(p=>p.id), ...(at?.players||[]).map(p=>p.id)]);
  const borrowablePlayers = allPlayers.filter(p => !allMatchPlayerIds.has(p.id));

  const addBorrow = async () => {
    if (!borrowPlayerId || !borrowTeamSide) return;
    const p = allPlayers.find(x => x.id === borrowPlayerId);
    if (!p) return;
    const teamId = borrowTeamSide === "home" ? match.homeId : match.awayId;
    const borrowedPlayer = { ...p, borrowedFrom: "borrow" };
    // add to the team's player list in round
    const newTeams = (round.teams || []).map(t =>
      t.id === teamId ? { ...t, players: [...t.players, borrowedPlayer] } : t
    );
    const newStats = { ...stats, [p.id]: { goals: 0, yellow: 0, red: 0 } };
    setStats(newStats);
    onSave({ teams: newTeams, match: { homeScore, awayScore, events: statsToEvents(newStats) } });
    setBorrowPlayerId(""); setBorrowTeamSide(null);
  };

  // Auto-compute score from per-player goals
  const computeScore = (st, teamPlayers) => {
    return (teamPlayers || []).reduce((sum, p) => sum + (st[p.id]?.goals || 0), 0);
  };

  const setStat = (pid, field, val) => {
    const n = Math.max(0, parseInt(val) || 0);
    setStats(s => {
      const next = { ...s, [pid]: { ...(s[pid]||{goals:0,yellow:0,red:0}), [field]: n } };
      if (field === "goals") {
        // recompute scores
        const hs = computeScore(next, ht?.players);
        const as_ = computeScore(next, at?.players);
        setHomeScore(String(hs));
        setAwayScore(String(as_));
      }
      return next;
    });
  };

  const statsToEvents = (st) => {
    const evs = [];
    Object.entries(st).forEach(([pid, v]) => {
      for (let i = 0; i < (v.goals||0); i++) evs.push({ id: uid(), playerId: pid, type: "goal" });
      for (let i = 0; i < (v.yellow||0); i++) evs.push({ id: uid(), playerId: pid, type: "yellow" });
      for (let i = 0; i < (v.red||0); i++) evs.push({ id: uid(), playerId: pid, type: "red" });
    });
    return evs;
  };

  const save = () => {
    onSave({ teams: round.teams, match: { homeScore, awayScore, events: statsToEvents(stats) } });
  };

  const renderTeamStats = (team) => {
    if (!team) return null;
    return (team.players || []).map(p => {
      const st = stats[p.id] || { goals: 0, yellow: 0, red: 0 };
      return (
        <div key={p.id} style={{ display: "grid", gridTemplateColumns: "1fr 60px 52px 52px", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "0.5px solid #1a1a1a" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar name={p.name} cat={p.cat} photo={p.photo} size={24}/>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>{p.name.split(" ")[0]}</div>
              {p.borrowedFrom && <div style={{ fontSize: 9, color: GM.amber }}>emprestado</div>}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 12 }}>⚽</span>
            <input type="number" min="0" value={st.goals} onChange={e => setStat(p.id,"goals",e.target.value)}
              style={{ width: 34, textAlign: "center", background: "#191919", border: "0.5px solid #2a2a2a", borderRadius: 5, color: GM.green, fontSize: 14, fontWeight: 700, padding: "3px 0", outline: "none" }}/>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 12 }}>🟨</span>
            <input type="number" min="0" max="2" value={st.yellow} onChange={e => setStat(p.id,"yellow",e.target.value)}
              style={{ width: 28, textAlign: "center", background: "#191919", border: "0.5px solid #2a2a2a", borderRadius: 5, color: GM.amber, fontSize: 14, fontWeight: 700, padding: "3px 0", outline: "none" }}/>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 12 }}>🟥</span>
            <input type="number" min="0" max="1" value={st.red} onChange={e => setStat(p.id,"red",e.target.value)}
              style={{ width: 28, textAlign: "center", background: "#191919", border: "0.5px solid #2a2a2a", borderRadius: 5, color: GM.red, fontSize: 14, fontWeight: 700, padding: "3px 0", outline: "none" }}/>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 560 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div className="section-title">Editar partida</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: GM.muted, cursor: "pointer", fontSize: 18 }}>✕</button>
        </div>

        {/* Score */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 12, marginBottom: 20, background: "#191919", borderRadius: 10, padding: "14px 18px" }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{ht?.label}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="number" min="0" value={homeScore} onChange={e => setHomeScore(e.target.value)}
              style={{ width: 48, textAlign: "center", background: "#111", border: `1px solid ${GM.border}`, borderRadius: 7, color: GM.green, fontSize: 26, fontFamily: "'Barlow Condensed'", fontWeight: 800, padding: "5px 0", outline: "none" }}/>
            <span style={{ color: "#333", fontSize: 16 }}>×</span>
            <input type="number" min="0" value={awayScore} onChange={e => setAwayScore(e.target.value)}
              style={{ width: 48, textAlign: "center", background: "#111", border: `1px solid ${GM.border}`, borderRadius: 7, color: GM.green, fontSize: 26, fontFamily: "'Barlow Condensed'", fontWeight: 800, padding: "5px 0", outline: "none" }}/>
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, textAlign: "right" }}>{at?.label}</div>
        </div>

        {/* Headers legend */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 52px 52px", gap: 8, padding: "0 0 6px", marginBottom: 4 }}>
          <div style={{ fontSize: 10, color: GM.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Jogador</div>
          <div style={{ fontSize: 10, color: GM.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Gols</div>
          <div style={{ fontSize: 10, color: GM.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Amarelo</div>
          <div style={{ fontSize: 10, color: GM.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Verm.</div>
        </div>

        {/* Home team */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: GM.green, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" }}>{ht?.label}</div>
          {renderTeamStats(ht)}
        </div>

        {/* Away team */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: "#EFEFEF", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" }}>{at?.label}</div>
          {renderTeamStats(at)}
        </div>

        {/* Borrow player */}
        {borrowablePlayers.length > 0 && (
          <div style={{ background: "#191919", borderRadius: 9, padding: 14, marginBottom: 18, border: "0.5px solid #2a2a2a" }}>
            <div style={{ fontSize: 11, color: GM.amber, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10, textTransform: "uppercase" }}>Adicionar jogador emprestado</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8 }}>
              <select className="gm-select" style={{ fontSize: 12, padding: "7px 10px" }}
                value={borrowTeamSide || ""} onChange={e => setBorrowTeamSide(e.target.value)}>
                <option value="">Para qual time?</option>
                <option value="home">{ht?.label}</option>
                <option value="away">{at?.label}</option>
              </select>
              <select className="gm-select" style={{ fontSize: 12, padding: "7px 10px" }}
                value={borrowPlayerId} onChange={e => setBorrowPlayerId(e.target.value)}>
                <option value="">Selecionar jogador...</option>
                {borrowablePlayers.map(p => <option key={p.id} value={p.id}>{p.name} ({p.cat})</option>)}
              </select>
              <button className="btn-outline btn-sm" onClick={addBorrow}>+ Emp.</button>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-primary" onClick={save}>Salvar partida</button>
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// MATCHES
// ════════════════════════════════════════════════════════════════════
function Matches({ rounds, players, saveRounds }) {
  const [selRound, setSelRound] = useState(null);
  const [editMatch, setEditMatch] = useState(null);

  const round = rounds.find(r => r.id === selRound) || rounds.find(r => r.status === "in_progress") || rounds[rounds.length - 1];

  useEffect(() => { if (round && !selRound) setSelRound(round.id); }, [rounds.length]);

  const finishRound = async () => {
    await saveRounds(rounds.map(r => r.id === round.id ? { ...r, status: "done" } : r));
  };

  const handleSave = async ({ teams, match: matchData }) => {
    const updated = rounds.map(r => r.id !== round?.id ? r : {
      ...r,
      teams,
      matches: r.matches.map(m => m.id === editMatch.id
        ? { ...m, homeScore: matchData.homeScore, awayScore: matchData.awayScore, events: matchData.events }
        : m
      )
    });
    await saveRounds(updated);
    setEditMatch(null);
  };

  if (!round || !round.teams || round.teams.length === 0)
    return <div className="alert-info">Faça o sorteio na tela "Sorteio dos Times" primeiro.</div>;

  const getTeam = id => (round.teams || []).find(t => t.id === id);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div className="section-title">Partidas</div>
        <div style={{ display: "flex", gap: 8 }}>
          <select className="gm-select" style={{ width: "auto", padding: "6px 12px", fontSize: 13 }}
            value={selRound || ""} onChange={e => setSelRound(e.target.value)}>
            {rounds.map(r => <option key={r.id} value={r.id}>Rodada {r.number}</option>)}
          </select>
          {round.status === "in_progress" && (
            <button className="btn-primary btn-sm" onClick={finishRound}>
              <i className="ti ti-flag" aria-hidden="true"/> Concluir rodada
            </button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {(round.matches || []).map(match => {
          const ht = getTeam(match.homeId), at = getTeam(match.awayId);
          if (!ht || !at) return null;
          const goalEvents = (match.events||[]).filter(e=>e.type==="goal");
          const yellowEvents = (match.events||[]).filter(e=>e.type==="yellow");
          const redEvents = (match.events||[]).filter(e=>e.type==="red");
          const hasScore = match.homeScore !== "" && match.awayScore !== "";
          return (
            <div key={match.id} className="card" style={{ padding: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 14, marginBottom: (match.events||[]).length>0 ? 12 : 0 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{ht.label}</div>
                  <div style={{ fontSize: 10, color: GM.muted, marginTop: 2 }}>{(ht.players||[]).map(p=>p.name.split(" ")[0]).join(", ")}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 28, fontWeight: 800, color: hasScore ? GM.green : "#2a2a2a", letterSpacing: 2 }}>
                    {hasScore ? `${match.homeScore} × ${match.awayScore}` : "— × —"}
                  </div>
                  <button onClick={() => setEditMatch(match)}
                    style={{ marginTop: 4, background: "none", border: "0.5px solid #2a2a2a", borderRadius: 5, color: GM.muted, cursor: "pointer", fontSize: 11, padding: "3px 10px", fontFamily: "'Barlow'" }}>
                    ✏️ Editar partida
                  </button>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{at.label}</div>
                  <div style={{ fontSize: 10, color: GM.muted, marginTop: 2 }}>{(at.players||[]).map(p=>p.name.split(" ")[0]).join(", ")}</div>
                </div>
              </div>

              {(match.events||[]).length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, borderTop: "0.5px solid #1a1a1a", paddingTop: 10 }}>
                  {goalEvents.map(ev => { const p=players.find(x=>x.id===ev.playerId); return p ? <div key={ev.id} className="chip" style={{fontSize:11}}>⚽ {p.name.split(" ")[0]}</div> : null; })}
                  {yellowEvents.map(ev => { const p=players.find(x=>x.id===ev.playerId); return p ? <div key={ev.id} className="chip" style={{fontSize:11,background:"rgba(239,159,39,0.08)",borderColor:"rgba(239,159,39,0.2)",color:GM.amber}}>🟨 {p.name.split(" ")[0]}</div> : null; })}
                  {redEvents.map(ev => { const p=players.find(x=>x.id===ev.playerId); return p ? <div key={ev.id} className="chip" style={{fontSize:11,background:"rgba(226,75,74,0.08)",borderColor:"rgba(226,75,74,0.2)",color:GM.red}}>🟥 {p.name.split(" ")[0]}</div> : null; })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {editMatch && (
        <MatchEditModal
          match={editMatch}
          round={round}
          allPlayers={players}
          onSave={handleSave}
          onClose={() => setEditMatch(null)}
        />
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// RANKING
// ════════════════════════════════════════════════════════════════════
function Ranking({ ranking, rounds, saveRounds, players, savePlayers }) {
  const [tab, setTab] = useState("geral");
  const [editPlayer, setEditPlayer] = useState(null);
  // adjustment: extra pts stored on the player object itself
  const [adjForm, setAdjForm] = useState({ pts: 0, goals: 0, assists: 0, yellow: 0, red: 0, note: "" });

  const gks = ranking.filter(p=>p.cat==="GL"&&p.gkGames>0).map(p=>({...p,avg:p.gkGames?p.gkGA/p.gkGames:999})).sort((a,b)=>a.avg-b.avg);
  const scorers = ranking.filter(p=>p.goals>0).sort((a,b)=>b.goals-a.goals);
  const TABS = [["geral","Classificação"],["artilharia","Artilharia"],["luva","Luva de Ouro"],["cartoes","Cartões"]];

  const openEdit = (p) => {
    const base = players.find(x => x.id === p.id);
    const adj = base?.adjustment || { pts: 0, goals: 0, assists: 0, yellow: 0, red: 0, note: "" };
    setAdjForm({ pts: adj.pts||0, goals: adj.goals||0, assists: adj.assists||0, yellow: adj.yellow||0, red: adj.red||0, note: adj.note||"" });
    setEditPlayer(p);
  };

  const saveAdj = async () => {
    const updated = players.map(p => p.id === editPlayer.id
      ? { ...p, adjustment: { pts: Number(adjForm.pts)||0, goals: Number(adjForm.goals)||0, assists: Number(adjForm.assists)||0, yellow: Number(adjForm.yellow)||0, red: Number(adjForm.red)||0, note: adjForm.note } }
      : p
    );
    await savePlayers(updated);
    setEditPlayer(null);
  };

  // Apply adjustments to displayed ranking
  const displayRanking = ranking.map(p => {
    const base = players.find(x => x.id === p.id);
    const adj = base?.adjustment || {};
    return {
      ...p,
      pts: p.pts + (adj.pts||0),
      goals: p.goals + (adj.goals||0),
      assists: p.assists + (adj.assists||0),
      yellow: p.yellow + (adj.yellow||0),
      red: p.red + (adj.red||0),
      hasAdj: !!(adj.pts||adj.goals||adj.assists||adj.yellow||adj.red),
    };
  }).sort((a,b) => b.pts-a.pts || b.goals-a.goals || a.name.localeCompare(b.name));

  const fAdj = k => e => setAdjForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div>
      <div className="section-title" style={{ marginBottom: 18 }}>Classificação</div>
      <div style={{ display: "flex", gap: 4, marginBottom: 18, background: "#111", padding: 4, borderRadius: 9, width: "fit-content" }}>
        {TABS.map(([id,label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ padding: "7px 16px", borderRadius: 7, border: "none", fontSize: 13, fontWeight: 600, fontFamily: "'Barlow'", cursor: "pointer", transition: "all 0.18s",
              background: tab===id ? GM.green : "transparent", color: tab===id ? GM.black : GM.muted }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "geral" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="tbl" style={{ tableLayout: "fixed" }}>
            <thead><tr>
              <th style={{width:36,padding:"10px 14px"}}>#</th><th>Jogador</th>
              <th style={{width:56,textAlign:"center"}}>Cat</th><th style={{width:50,textAlign:"center"}}>Pts</th>
              <th style={{width:34,textAlign:"center"}}>V</th><th style={{width:34,textAlign:"center"}}>E</th><th style={{width:34,textAlign:"center"}}>D</th>
              <th style={{width:34,textAlign:"center"}}>G</th><th style={{width:34,textAlign:"center"}}>A</th><th style={{width:44,textAlign:"center"}}>Pres</th>
              <th style={{width:44,textAlign:"center"}}></th>
            </tr></thead>
            <tbody>
              {displayRanking.map((p,i)=>(
                <tr key={p.id}>
                  <td style={{padding:"10px 14px",fontFamily:"'Barlow Condensed'",fontSize:17,fontWeight:700,color:i===0?GM.green:i===1?"#C0C0C0":i===2?"#CD7F32":GM.muted}}>{i+1}</td>
                  <td><div style={{display:"flex",alignItems:"center",gap:9}}>
                    <Avatar name={p.name} cat={p.cat} photo={p.photo} size={28}/>
                    <div>
                      <div style={{fontSize:13,fontWeight:500}}>{p.name}</div>
                      {p.hasAdj && <div style={{fontSize:9,color:GM.amber}}>✱ ajuste manual</div>}
                    </div>
                  </div></td>
                  <td style={{textAlign:"center"}}>{catTag(p.cat)}</td>
                  <td style={{textAlign:"center",fontFamily:"'Barlow Condensed'",fontSize:19,fontWeight:700,color:GM.green}}>{p.pts}</td>
                  <td style={{textAlign:"center",fontSize:12,color:GM.muted}}>{p.wins}</td>
                  <td style={{textAlign:"center",fontSize:12,color:GM.muted}}>{p.draws}</td>
                  <td style={{textAlign:"center",fontSize:12,color:GM.muted}}>{p.losses}</td>
                  <td style={{textAlign:"center",fontSize:12}}>{p.goals}</td>
                  <td style={{textAlign:"center",fontSize:12}}>{p.assists}</td>
                  <td style={{textAlign:"center",fontSize:12,color:GM.muted}}>{p.presence}</td>
                  <td style={{textAlign:"center"}}>
                    <button onClick={() => openEdit(p)}
                      style={{ background: "none", border: "0.5px solid #2a2a2a", borderRadius: 5, color: GM.muted, cursor: "pointer", fontSize: 11, padding: "3px 7px", fontFamily: "'Barlow'" }}
                      title="Corrigir pontuação">✏️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "artilharia" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="tbl">
            <thead><tr><th style={{width:36,padding:"10px 14px"}}>#</th><th>Jogador</th><th style={{width:60,textAlign:"center"}}>Cat</th><th style={{width:60,textAlign:"center"}}>Gols</th><th style={{width:60,textAlign:"center"}}>Assist.</th></tr></thead>
            <tbody>
              {scorers.length===0&&<tr><td colSpan={5} style={{textAlign:"center",padding:28,color:GM.muted}}>Nenhum gol registrado.</td></tr>}
              {scorers.map((p,i)=>(
                <tr key={p.id}>
                  <td style={{padding:"10px 14px",fontFamily:"'Barlow Condensed'",fontSize:17,fontWeight:700,color:i===0?GM.green:i===1?"#C0C0C0":i===2?"#CD7F32":GM.muted}}>{i+1}</td>
                  <td><div style={{display:"flex",alignItems:"center",gap:9}}><Avatar name={p.name} cat={p.cat} photo={p.photo} size={28}/><div style={{fontSize:13,fontWeight:500}}>{p.name}</div></div></td>
                  <td style={{textAlign:"center"}}>{catTag(p.cat)}</td>
                  <td style={{textAlign:"center",fontFamily:"'Barlow Condensed'",fontSize:22,fontWeight:700,color:GM.green}}>{p.goals}</td>
                  <td style={{textAlign:"center",fontSize:13,color:GM.muted}}>{p.assists}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "luva" && (
        <div>
          <div className="alert-info" style={{ marginBottom: 14, fontSize: 12 }}>Menor média de gols sofridos por jogo = melhor goleiro.</div>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <table className="tbl">
              <thead><tr><th style={{width:36,padding:"10px 14px"}}>#</th><th>Goleiro</th><th style={{width:70,textAlign:"center"}}>Jogos</th><th style={{width:80,textAlign:"center"}}>Gols sofridos</th><th style={{width:90,textAlign:"center"}}>Média/jogo</th></tr></thead>
              <tbody>
                {gks.length===0&&<tr><td colSpan={5} style={{textAlign:"center",padding:28,color:GM.muted}}>Nenhum dado.</td></tr>}
                {gks.map((p,i)=>(
                  <tr key={p.id}>
                    <td style={{padding:"10px 14px",fontFamily:"'Barlow Condensed'",fontSize:17,fontWeight:700,color:i===0?GM.red:GM.muted}}>{i+1}</td>
                    <td><div style={{display:"flex",alignItems:"center",gap:9}}><Avatar name={p.name} cat="GL" photo={p.photo} size={28}/><div style={{fontSize:13,fontWeight:500}}>{p.name}</div></div></td>
                    <td style={{textAlign:"center",fontSize:13}}>{p.gkGames}</td>
                    <td style={{textAlign:"center",fontSize:13}}>{p.gkGA}</td>
                    <td style={{textAlign:"center",fontFamily:"'Barlow Condensed'",fontSize:20,fontWeight:700,color:i===0?GM.red:GM.muted}}>{p.avg.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "cartoes" && (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="tbl">
            <thead><tr><th style={{padding:"10px 14px"}}>Jogador</th><th style={{width:60,textAlign:"center"}}>Cat</th><th style={{width:80,textAlign:"center"}}>🟨</th><th style={{width:80,textAlign:"center"}}>🟥</th></tr></thead>
            <tbody>
              {ranking.filter(p=>p.yellow>0||p.red>0).map(p=>(
                <tr key={p.id}>
                  <td style={{padding:"10px 14px"}}><div style={{display:"flex",alignItems:"center",gap:9}}><Avatar name={p.name} cat={p.cat} photo={p.photo} size={28}/><div style={{fontSize:13,fontWeight:500}}>{p.name}</div></div></td>
                  <td style={{textAlign:"center"}}>{catTag(p.cat)}</td>
                  <td style={{textAlign:"center",fontFamily:"'Barlow Condensed'",fontSize:20,fontWeight:700,color:GM.amber}}>{p.yellow}</td>
                  <td style={{textAlign:"center",fontFamily:"'Barlow Condensed'",fontSize:20,fontWeight:700,color:GM.red}}>{p.red}</td>
                </tr>
              ))}
              {ranking.filter(p=>p.yellow>0||p.red>0).length===0&&<tr><td colSpan={4} style={{textAlign:"center",padding:28,color:GM.muted}}>Nenhum cartão registrado.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT POINTS MODAL */}
      {editPlayer && (
        <div className="modal-overlay" onClick={() => setEditPlayer(null)}>
          <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <div className="section-title">Corrigir pontuação</div>
                <div style={{ fontSize: 12, color: GM.muted, marginTop: 3 }}>{editPlayer.name}</div>
              </div>
              <button onClick={() => setEditPlayer(null)} style={{ background: "none", border: "none", color: GM.muted, cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>
            <div className="alert-info" style={{ marginBottom: 16, fontSize: 12 }}>
              Use valores positivos para adicionar ou negativos para remover. Ex: <strong>-2</strong> remove 2 pontos. Os ajustes somam sobre a pontuação calculada automaticamente.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              {[["pts","Pontos (±)","#ADFF2F"],["goals","Gols (±)","#ADFF2F"],["assists","Assist. (±)","#ADFF2F"],["yellow","Amarelos (±)","#EF9F27"],["red","Vermelhos (±)","#E24B4A"]].map(([k,label,color]) => (
                <div key={k}>
                  <div className="label" style={{ color }}>{label}</div>
                  <input type="number" className="gm-input" value={adjForm[k]} onChange={fAdj(k)} style={{ textAlign: "center", fontSize: 18, fontWeight: 700, color }}/>
                </div>
              ))}
              <div>
                <div className="label">Motivo (opcional)</div>
                <input type="text" className="gm-input" value={adjForm.note} onChange={fAdj("note")} placeholder="Ex: erro de contagem R2"/>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-primary" onClick={saveAdj}>Salvar ajuste</button>
              <button className="btn-ghost" onClick={() => setEditPlayer(null)}>Cancelar</button>
              <button className="btn-danger btn-sm" onClick={() => { setAdjForm({pts:0,goals:0,assists:0,yellow:0,red:0,note:""}); }} style={{ marginLeft: "auto" }}>Zerar ajuste</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// HISTORY
// ════════════════════════════════════════════════════════════════════
function History({ rounds, players }) {
  const done = rounds.filter(r => r.status === "done");
  return (
    <div>
      <div className="section-title" style={{ marginBottom: 20 }}>Histórico de rodadas</div>
      {done.length === 0 && <div className="alert-info">Nenhuma rodada concluída ainda.</div>}
      {done.map(round => {
        const totalGoals = (round.matches||[]).flatMap(m=>(m.events||[]).filter(e=>e.type==="goal")).length;
        return (
          <div key={round.id} className="card" style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>Rodada {round.number}</div>
                <div style={{ fontSize: 11, color: GM.muted, marginTop: 2 }}>
                  {(round.confirmedPresence||round.present||[]).length} jogadores presentes · {totalGoals} gols · {(round.matches||[]).length} partidas
                </div>
              </div>
              <span style={{ fontSize: 10, color: GM.green, background: "rgba(173,255,47,0.08)", padding: "3px 9px", borderRadius: 5 }}>Concluída</span>
            </div>
            {(round.matches||[]).map(match => {
              const ht = (round.teams||[]).find(t=>t.id===match.homeId), at = (round.teams||[]).find(t=>t.id===match.awayId);
              if (!ht||!at) return null;
              return (
                <div key={match.id} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 10, padding: "7px 10px", background: "#191919", borderRadius: 7, marginBottom: 5 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{ht.label}</div>
                  <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 20, fontWeight: 700, color: GM.green }}>{match.homeScore} × {match.awayScore}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, textAlign: "right" }}>{at.label}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// PLANS
// ════════════════════════════════════════════════════════════════════
function Plans({ user }) {
  const PLANS = [
    { id:"free", name:"Amador", price:"Grátis", color:GM.muted, feats:["Jogadores ilimitados","1 campeonato ativo","Classificação básica","Presença e sorteio","Sorteio de times","Histórico de rodadas"], missing:["Exportar estatísticas","Múltiplos campeonatos","Foto dos jogadores"] },
    { id:"pro", name:"Pro", price:"R$ 29/mês", color:GM.green, featured:true, feats:["Jogadores ilimitados","Múltiplos campeonatos","Exportar estatísticas","Foto dos jogadores","Luva de ouro + artilharia","Histórico completo"], missing:[] },
    { id:"liga", name:"Liga", price:"R$ 79/mês", color:GM.blue, feats:["Tudo do Pro","Multi-organizadores","Link público jogadores","Suporte prioritário","Histórico de temporadas"], missing:[] },
  ];
  return (
    <div>
      <div className="section-title" style={{ marginBottom: 6 }}>Planos GolMestre</div>
      <div style={{ color: GM.muted, fontSize: 13, marginBottom: 24 }}>Sistema completo de campeonato individual de futebol society.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        {PLANS.map(plan => (
          <div key={plan.id} style={{ background: "#111", border: `0.5px solid ${plan.featured?GM.green:"#1e1e1e"}`, borderRadius: 13, padding: 22, position: "relative" }}>
            {plan.featured && <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: GM.green, color: GM.black, fontSize: 10, fontWeight: 800, padding: "3px 14px", borderRadius: 20, letterSpacing: "0.08em" }}>MAIS POPULAR</div>}
            <div style={{ fontFamily: "'Barlow Condensed'", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{plan.name}</div>
            <div style={{ fontSize: 21, fontWeight: 600, color: plan.color, marginBottom: 18 }}>{plan.price}</div>
            {plan.feats.map(f => <div key={f} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7, fontSize: 12 }}><span style={{ color: plan.color }}>✓</span>{f}</div>)}
            {plan.missing.map(f => <div key={f} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7, fontSize: 12, opacity: 0.25 }}><span>✕</span>{f}</div>)}
            <button className={plan.featured?"btn-primary":"btn-outline"} style={{ width: "100%", justifyContent: "center", marginTop: 18 }}>
              {user?.plan === plan.id ? "Plano atual" : plan.id === "free" ? "Usar grátis" : "Assinar"}
            </button>
          </div>
        ))}
      </div>
      <div className="alert-success" style={{ fontSize: 12 }}>🎉 Todas as funcionalidades estão liberadas gratuitamente durante o período de lançamento!</div>
    </div>
  );
}
