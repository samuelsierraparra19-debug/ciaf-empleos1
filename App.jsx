import { useState, useEffect, useRef } from "react";

// ─── CIAF Brand Colors ───────────────────────────────────────────────────────
// Navy: #0a1f5c  |  Cyan/Teal: #00b4d8  |  Green accent: #00c897
// Dark navy: #060f2e  |  Mid navy: #122272  |  White: #ffffff
// ─────────────────────────────────────────────────────────────────────────────

const JOBS = [
  { id: 1, title: "Desarrollador Frontend Jr.", company: "TechCo", logo: "TC", location: "Bogotá", type: "Tiempo completo", career: "Sistemas", level: "Técnico", match: 95, tags: ["React", "CSS", "Git"] },
  { id: 2, title: "Analista de Datos", company: "DataVision", logo: "DV", location: "Remoto", type: "Prácticas", career: "Sistemas", level: "Tecnólogo", match: 88, tags: ["Excel", "Python", "SQL"] },
  { id: 3, title: "Diseñador UX/UI", company: "CreativeHub", logo: "CH", location: "Medellín", type: "Medio tiempo", career: "Diseño", level: "Técnico", match: 76, tags: ["Figma", "Illustrator"] },
  { id: 4, title: "Asistente Contable", company: "FinanzasPro", logo: "FP", location: "Bogotá", type: "Prácticas", career: "Contabilidad", level: "Tecnólogo", match: 82, tags: ["Excel", "SAP"] },
  { id: 5, title: "Community Manager", company: "BrandLab", logo: "BL", location: "Remoto", type: "Freelance", career: "Marketing", level: "Técnico", match: 70, tags: ["Instagram", "Canva", "Métricas"] },
  { id: 6, title: "Soporte TI", company: "NetSolve", logo: "NS", location: "Bogotá", type: "Tiempo completo", career: "Sistemas", level: "Técnico", match: 91, tags: ["Redes", "Windows", "Soporte"] },
  { id: 7, title: "Auxiliar Administrativo", company: "GestiónPlus", logo: "GP", location: "Medellín", type: "Tiempo completo", career: "Administración", level: "Técnico", match: 79, tags: ["Word", "Excel", "Atención al cliente"] },
  { id: 8, title: "Técnico en Electrónica", company: "ElectroSol", logo: "ES", location: "Cali", type: "Tiempo completo", career: "Electrónica", level: "Técnico", match: 85, tags: ["Arduino", "Circuitos", "Soldadura"] },
];

const STEPS = [
  { icon: "👤", title: "Crea tu perfil", desc: "Agrega tus habilidades, proyectos y logros académicos en minutos." },
  { icon: "🎯", title: "Match inteligente", desc: "Nuestro sistema te conecta con ofertas que realmente se ajustan a ti." },
  { icon: "✅", title: "Validación docente", desc: "Tus profesores avalan tus competencias y potencian tu perfil." },
  { icon: "🚀", title: "Consigue el empleo", desc: "Postúlate con un perfil que habla por ti y destaca entre los demás." },
];

const STATS = [
  { value: "1,200+", label: "Estudiantes activos" },
  { value: "340+", label: "Empresas aliadas" },
  { value: "89%", label: "Tasa de match" },
  { value: "48h", label: "Tiempo promedio de respuesta" },
];

function getInitials(name) {
  if (!name) return "??";
  return name.trim().split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function getMatchColor(percent) {
  if (percent >= 90) return "#00c897";
  if (percent >= 75) return "#00b4d8";
  return "#fbbf24";
}

function MatchBar({ percent }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { setTimeout(() => setWidth(percent), 200); }, [percent]);
  const color = getMatchColor(percent);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${width}%`, background: color, borderRadius: 99, transition: "width 0.8s cubic-bezier(.4,2,.6,1)" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color, minWidth: 36 }}>{percent}%</span>
    </div>
  );
}

function JobCard({ job, onApply }) {
  const [hovered, setHovered] = useState(false);
  const matchColor = getMatchColor(job.match);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(0,180,216,0.07)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(0,180,216,0.4)" : "rgba(255,255,255,0.09)"}`,
        borderRadius: 16,
        padding: "20px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {job.match >= 90 && (
        <div style={{ position: "absolute", top: 12, right: 12, background: "#00c897", color: "#060f2e", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 99, letterSpacing: 1 }}>
          TOP MATCH
        </div>
      )}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #00b4d8, #0a1f5c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#fff", flexShrink: 0 }}>
          {job.logo}
        </div>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#f0f4ff", lineHeight: 1.2 }}>{job.title}</div>
          <div style={{ fontSize: 13, color: "#7a90b8", marginTop: 3 }}>{job.company} · {job.location}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: "rgba(0,180,216,0.15)", color: "#00b4d8", border: "1px solid rgba(0,180,216,0.25)", fontWeight: 600 }}>{job.type}</span>
        <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: "rgba(255,255,255,0.05)", color: "#7a90b8", border: "1px solid rgba(255,255,255,0.09)", fontWeight: 600 }}>{job.career}</span>
        {job.tags.map(t => (
          <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: "rgba(255,255,255,0.04)", color: "#5a6e90", fontWeight: 500 }}>{t}</span>
        ))}
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: "#4a5e7a", marginBottom: 5, fontWeight: 600, letterSpacing: 0.5 }}>COMPATIBILIDAD</div>
        <MatchBar percent={job.match} />
      </div>
      <button
        onClick={() => onApply(job)}
        style={{
          width: "100%", padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
          background: hovered ? "linear-gradient(90deg, #00b4d8, #00c897)" : "rgba(255,255,255,0.06)",
          color: hovered ? "#060f2e" : "#c0d0e8", fontWeight: 700, fontSize: 13,
          transition: "all 0.25s ease", letterSpacing: 0.5,
        }}
      >
        {hovered ? "Postularme ahora →" : "Ver oferta"}
      </button>
    </div>
  );
}

// ─── PROFILE VIEW (shown after form completion) ───────────────────────────────
function ProfileView({ profileData, onClose, onGoToJobs }) {
  const initials = getInitials(profileData.name);
  const skills = profileData.skills ? profileData.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
  const matchedJobs = JOBS.filter(j =>
    skills.some(sk => j.tags.some(t => t.toLowerCase().includes(sk.toLowerCase()))) ||
    (profileData.career && j.career.toLowerCase().includes(profileData.career.toLowerCase()))
  ).slice(0, 4);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,15,46,0.92)", backdropFilter: "blur(14px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflowY: "auto" }}>
      <div style={{ background: "linear-gradient(160deg, #0d1e4a 0%, #060f2e 100%)", border: "1px solid rgba(0,180,216,0.3)", borderRadius: 24, maxWidth: 540, width: "100%", position: "relative", overflow: "hidden" }}>

        {/* Top accent bar */}
        <div style={{ height: 4, background: "linear-gradient(90deg, #00b4d8, #00c897, #0a1f5c)" }} />

        <div style={{ padding: "32px 36px 36px" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.07)", border: "none", color: "#7a90b8", fontSize: 16, cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

          {/* Avatar + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #00b4d8, #122272)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#fff", fontFamily: "'Syne', sans-serif", flexShrink: 0, border: "3px solid rgba(0,180,216,0.4)" }}>
              {initials}
            </div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#f0f4ff", lineHeight: 1.1 }}>{profileData.name || "Estudiante CIAF"}</div>
              <div style={{ fontSize: 14, color: "#00b4d8", fontWeight: 600, marginTop: 4 }}>{profileData.career || "Carrera CIAF"}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00c897", display: "inline-block" }} />
                <span style={{ fontSize: 12, color: "#00c897", fontWeight: 600 }}>Perfil activo</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {profileData.bio && (
            <div style={{ background: "rgba(0,180,216,0.07)", border: "1px solid rgba(0,180,216,0.15)", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#4a6080", fontWeight: 700, letterSpacing: 0.8, marginBottom: 6 }}>SOBRE MÍ</div>
              <div style={{ fontSize: 14, color: "#c0d4f0", lineHeight: 1.6 }}>"{profileData.bio}"</div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#4a6080", fontWeight: 700, letterSpacing: 0.8, marginBottom: 10 }}>HABILIDADES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {skills.map((sk, i) => (
                  <span key={i} style={{ padding: "5px 12px", borderRadius: 99, background: "rgba(0,180,216,0.12)", border: "1px solid rgba(0,180,216,0.25)", color: "#00b4d8", fontSize: 13, fontWeight: 600 }}>{sk}</span>
                ))}
              </div>
            </div>
          )}

          {/* Match stat */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[
              { label: "Matches", value: matchedJobs.length || "12" },
              { label: "Compatibilidad", value: "89%" },
              { label: "Estado", value: "Activo" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 8px", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: i === 0 ? "#00c897" : i === 1 ? "#00b4d8" : "#fbbf24" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#4a6080", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Top matched jobs preview */}
          {matchedJobs.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "#4a6080", fontWeight: 700, letterSpacing: 0.8, marginBottom: 10 }}>OFERTAS PARA TI</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {matchedJobs.map(j => (
                  <div key={j.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 14px" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#d0e0f8" }}>{j.title}</div>
                      <div style={{ fontSize: 11, color: "#5a6e90" }}>{j.company} · {j.location}</div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: getMatchColor(j.match), background: `${getMatchColor(j.match)}18`, padding: "3px 8px", borderRadius: 99 }}>{j.match}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => { onClose(); onGoToJobs(); }}
              style={{ flex: 2, padding: "13px 0", borderRadius: 12, border: "none", background: "linear-gradient(90deg, #00b4d8, #00c897)", color: "#060f2e", fontSize: 14, cursor: "pointer", fontWeight: 800, fontFamily: "inherit" }}
            >
              Ver todos mis matches →
            </button>
            <button
              onClick={onClose}
              style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "none", color: "#7a90b8", fontSize: 14, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE BUILDER (step-by-step form) ──────────────────────────────────────
function ProfileBuilder({ onClose, onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", career: "", skills: "", bio: "" });
  const fields = [
    { key: "name", label: "¿Cuál es tu nombre completo?", placeholder: "Ej: María Fernanda González", icon: "👤" },
    { key: "career", label: "¿Qué carrera estudias en CIAF?", placeholder: "Ej: Tecnología en Sistemas", icon: "🎓" },
    { key: "skills", label: "¿Cuáles son tus habilidades clave?", placeholder: "Ej: React, Figma, Python, Excel...", icon: "⚡" },
    { key: "bio", label: "Cuéntanos algo sobre ti", placeholder: "Tu historia en una frase...", icon: "✍️" },
  ];
  const current = fields[step];
  const done = step === fields.length;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,15,46,0.9)", backdropFilter: "blur(12px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "linear-gradient(160deg, #0d1e4a 0%, #060f2e 100%)", border: "1px solid rgba(0,180,216,0.25)", borderRadius: 24, padding: 40, maxWidth: 460, width: "100%", position: "relative", overflow: "hidden" }}>

        {/* Top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #00b4d8, #00c897)" }} />

        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.07)", border: "none", color: "#7a90b8", fontSize: 16, cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

        {/* Logo mini */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#00b4d8,#0a1f5c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>💼</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, color: "#7a90b8", letterSpacing: -0.3 }}>Bolsa de Empleo <span style={{ color: "#00b4d8" }}>CIAF</span></span>
        </div>

        {!done ? (
          <>
            {/* Progress */}
            <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
              {fields.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= step ? "#00b4d8" : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />
              ))}
            </div>
            <div style={{ fontSize: 32, marginBottom: 10 }}>{current.icon}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 21, fontWeight: 700, color: "#f0f4ff", marginBottom: 6 }}>{current.label}</div>
            <div style={{ fontSize: 12, color: "#4a6080", marginBottom: 22 }}>Paso {step + 1} de {fields.length}</div>
            <input
              value={data[current.key]}
              onChange={e => setData({ ...data, [current.key]: e.target.value })}
              onKeyDown={e => { if (e.key === "Enter" && data[current.key]) { step < fields.length - 1 ? setStep(s => s + 1) : setStep(fields.length); } }}
              placeholder={current.placeholder}
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,180,216,0.25)", borderRadius: 12, padding: "14px 16px", color: "#f0f4ff", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              autoFocus
            />
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#7a90b8", fontSize: 14, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>← Atrás</button>
              )}
              <button
                disabled={!data[current.key]}
                onClick={() => { step < fields.length - 1 ? setStep(s => s + 1) : setStep(fields.length); }}
                style={{ flex: 2, padding: "13px 0", borderRadius: 12, border: "none", background: data[current.key] ? "linear-gradient(90deg,#00b4d8,#00c897)" : "rgba(255,255,255,0.07)", color: data[current.key] ? "#060f2e" : "#4a6080", fontSize: 14, cursor: data[current.key] ? "pointer" : "not-allowed", fontWeight: 800, fontFamily: "inherit", transition: "all 0.2s" }}
              >
                {step < fields.length - 1 ? "Siguiente →" : "Crear perfil 🚀"}
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 14 }}>🎉</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#00b4d8", marginBottom: 8 }}>¡Perfil creado, {data.name.split(" ")[0]}!</div>
            <div style={{ fontSize: 14, color: "#7a90b8", marginBottom: 28, lineHeight: 1.6 }}>
              Hemos encontrado <strong style={{ color: "#f0f4ff" }}>12 ofertas</strong> compatibles con tu perfil.
            </div>
            <button
              onClick={() => { onComplete(data); onClose(); }}
              style={{ width: "100%", padding: "14px 0", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#00b4d8,#00c897)", color: "#060f2e", fontSize: 15, cursor: "pointer", fontWeight: 800, fontFamily: "inherit" }}
            >
              Ver mi perfil →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [filter, setFilter] = useState({ career: "all", type: "all" });
  const [showBuilder, setShowBuilder] = useState(false);
  const [profile, setProfile] = useState(null);
  const [showProfileView, setShowProfileView] = useState(false);
  const [notification, setNotification] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredJobs = JOBS.filter(j =>
    (filter.career === "all" || j.career === filter.career) &&
    (filter.type === "all" || j.type === filter.type)
  );

  const tabs = [
    { id: "inicio", label: "Inicio" },
    { id: "ofertas", label: "Ofertas" },
    { id: "como-funciona", label: "¿Cómo funciona?" },
    { id: "estadisticas", label: "Impacto" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #060f2e; color: #f0f4ff; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
        .syne { font-family: 'Syne', sans-serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #060f2e; }
        ::-webkit-scrollbar-thumb { background: rgba(0,180,216,0.4); border-radius: 99px; }
        input:focus { border-color: rgba(0,180,216,0.55) !important; box-shadow: 0 0 0 3px rgba(0,180,216,0.1) !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-10px); } }
        @keyframes slideIn { from { transform:translateX(90px); opacity:0; } to { transform:translateX(0); opacity:1; } }
        .fade-up { animation: fadeUp 0.65s ease forwards; }
        .float { animation: float 4.5s ease-in-out infinite; }
      `}</style>

      {/* NOTIFICATION */}
      {notification && (
        <div style={{ position: "fixed", top: 24, right: 24, zIndex: 9999, background: "#00c897", color: "#060f2e", padding: "14px 22px", borderRadius: 12, fontWeight: 700, fontSize: 14, animation: "slideIn 0.3s ease", boxShadow: "0 8px 32px rgba(0,200,151,0.3)" }}>
          {notification}
        </div>
      )}

      {/* MODALS */}
      {showBuilder && (
        <ProfileBuilder
          onClose={() => setShowBuilder(false)}
          onComplete={(data) => { setProfile(data); setShowProfileView(true); }}
        />
      )}
      {showProfileView && profile && (
        <ProfileView
          profileData={profile}
          onClose={() => setShowProfileView(false)}
          onGoToJobs={() => setActiveTab("ofertas")}
        />
      )}

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(6,15,46,0.9)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(0,180,216,0.12)", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setActiveTab("inicio")}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#00b4d8,#122272)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>
              💼
            </div>
            <span className="syne" style={{ fontWeight: 800, fontSize: 17, letterSpacing: -0.5, color: "#f0f4ff" }}>
              Bolsa de Empleo <span style={{ color: "#00b4d8" }}>CIAF</span>
            </span>
          </div>

          {/* Desktop tabs */}
          <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.04)", borderRadius: 99, padding: 4 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding: "7px 16px", borderRadius: 99, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit",
                background: activeTab === t.id ? "rgba(0,180,216,0.18)" : "none",
                color: activeTab === t.id ? "#00b4d8" : "#7a90b8",
                transition: "all 0.2s ease",
              }}>{t.label}</button>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {profile && (
              <button
                onClick={() => setShowProfileView(true)}
                style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #00b4d8, #122272)", border: "2px solid rgba(0,180,216,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", cursor: "pointer" }}
              >
                {getInitials(profile.name)}
              </button>
            )}
            <button
              onClick={() => setShowBuilder(true)}
              style={{ padding: "9px 20px", borderRadius: 99, border: "none", background: "linear-gradient(90deg,#00b4d8,#00c897)", color: "#060f2e", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}
            >
              {profile ? "Mi perfil →" : "Crear perfil →"}
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* ===== INICIO ===== */}
        {activeTab === "inicio" && (
          <div>
            <div style={{ paddingTop: 80, paddingBottom: 80, position: "relative" }}>
              {/* BG glows */}
              <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(ellipse, rgba(0,180,216,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: "20%", right: "5%", width: 300, height: 300, background: "radial-gradient(ellipse, rgba(0,200,151,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

              <div className="fade-up" style={{ textAlign: "center", position: "relative" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.25)", borderRadius: 99, padding: "6px 16px", marginBottom: 28, fontSize: 12, color: "#00b4d8", fontWeight: 700, letterSpacing: 1 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c897", display: "inline-block", animation: "pulse 2s infinite" }} />
                  BOLSA DE EMPLEO CIAF — BETA ACTIVA
                </div>

                <h1 className="syne" style={{ fontSize: "clamp(38px, 6vw, 70px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, marginBottom: 24, maxWidth: 820, margin: "0 auto 24px" }}>
                  Tu talento CIAF<br />
                  <span style={{ background: "linear-gradient(90deg, #00b4d8, #00c897)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    te abre las puertas
                  </span>
                </h1>

                <p style={{ fontSize: 18, color: "#7a90b8", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.65, fontWeight: 400 }}>
                  Conectamos estudiantes CIAF con empresas reales. Sin experiencia previa. Solo tu talento, habilidades y potencial.
                </p>

                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <button onClick={() => setShowBuilder(true)} style={{ padding: "14px 32px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#00b4d8,#00c897)", color: "#060f2e", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
                    Crear mi perfil gratis →
                  </button>
                  <button onClick={() => setActiveTab("ofertas")} style={{ padding: "14px 32px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.13)", background: "none", color: "#c0d4f0", fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
                    Ver ofertas →
                  </button>
                </div>
              </div>

              {/* Floating cards */}
              <div style={{ marginTop: 70, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                {JOBS.slice(0, 3).map((job, i) => (
                  <div key={job.id} className="float" style={{ animationDelay: `${i * 0.4}s` }}>
                    <JobCard job={job} onApply={() => showNotif(`✅ Postulación enviada a ${job.company}`)} />
                  </div>
                ))}
              </div>
            </div>

            {/* STATS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 80, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,180,216,0.1)", borderRadius: 20, padding: 32 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div className="syne" style={{ fontSize: 36, fontWeight: 800, background: ["linear-gradient(90deg,#00b4d8,#00c897)", "linear-gradient(90deg,#00c897,#0a1f5c)", "linear-gradient(90deg,#fbbf24,#00b4d8)", "linear-gradient(90deg,#00b4d8,#fbbf24)"][i], WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: "#4a6080", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CIAF brand stripe */}
            <div style={{ background: "linear-gradient(135deg, #0a1f5c 0%, #122272 50%, #0a1f5c 100%)", borderRadius: 20, padding: "36px 40px", marginBottom: 80, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20, border: "1px solid rgba(0,180,216,0.2)" }}>
              <div>
                <div className="syne" style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 6 }}>¿Ya eres egresado CIAF?</div>
                <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)" }}>Tu institución respalda tu perfil y te conecta con más de 340 empresas.</div>
              </div>
              <button onClick={() => setShowBuilder(true)} style={{ padding: "13px 28px", borderRadius: 12, border: "2px solid rgba(0,180,216,0.5)", background: "none", color: "#00b4d8", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                Registrarme →
              </button>
            </div>
          </div>
        )}

        {/* ===== OFERTAS ===== */}
        {activeTab === "ofertas" && (
          <div style={{ paddingTop: 48, paddingBottom: 80 }}>
            <div style={{ marginBottom: 32 }}>
              <h2 className="syne" style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, marginBottom: 8, color: "#f0f4ff" }}>Ofertas disponibles</h2>
              <p style={{ color: "#7a90b8", fontSize: 15 }}>{filteredJobs.length} oportunidades esperan tu postulación</p>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32, padding: "16px 20px", background: "rgba(255,255,255,0.02)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ fontSize: 13, color: "#4a6080", alignSelf: "center", fontWeight: 600 }}>Filtrar:</span>
              {["all", "Sistemas", "Diseño", "Contabilidad", "Marketing", "Administración", "Electrónica"].map(c => (
                <button key={c} onClick={() => setFilter(f => ({ ...f, career: c }))} style={{
                  padding: "6px 14px", borderRadius: 99, border: `1px solid ${filter.career === c ? "rgba(0,180,216,0.5)" : "rgba(255,255,255,0.08)"}`,
                  background: filter.career === c ? "rgba(0,180,216,0.12)" : "none",
                  color: filter.career === c ? "#00b4d8" : "#7a90b8", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                }}>{c === "all" ? "Todas" : c}</button>
              ))}
              <div style={{ width: 1, background: "rgba(255,255,255,0.08)", alignSelf: "stretch" }} />
              {["all", "Tiempo completo", "Medio tiempo", "Prácticas", "Freelance"].map(t => (
                <button key={t} onClick={() => setFilter(f => ({ ...f, type: t }))} style={{
                  padding: "6px 14px", borderRadius: 99, border: `1px solid ${filter.type === t ? "rgba(0,200,151,0.5)" : "rgba(255,255,255,0.08)"}`,
                  background: filter.type === t ? "rgba(0,200,151,0.1)" : "none",
                  color: filter.type === t ? "#00c897" : "#7a90b8", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                }}>{t === "all" ? "Todos los tipos" : t}</button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} onApply={() => showNotif(`✅ Postulación enviada a ${job.company}`)} />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div style={{ textAlign: "center", padding: 80, color: "#3a4e6a" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <div className="syne" style={{ fontSize: 20, fontWeight: 700, color: "#5a6e8a" }}>Sin resultados</div>
                <div style={{ fontSize: 14, marginTop: 8 }}>Intenta con otros filtros</div>
              </div>
            )}
          </div>
        )}

        {/* ===== CÓMO FUNCIONA ===== */}
        {activeTab === "como-funciona" && (
          <div style={{ paddingTop: 60, paddingBottom: 80 }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <h2 className="syne" style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.5, marginBottom: 12, color: "#f0f4ff" }}>
                Del aula al trabajo,<br />
                <span style={{ background: "linear-gradient(90deg,#00b4d8,#00c897)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  en 4 pasos
                </span>
              </h2>
              <p style={{ color: "#7a90b8", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>Un proceso diseñado para que el talento estudiantil brille sin necesitar años de experiencia.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 60 }}>
              {STEPS.map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 28, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -10, right: -6, fontSize: 80, opacity: 0.04, fontFamily: "'Syne', sans-serif", fontWeight: 900, color: "#00b4d8" }}>{i + 1}</div>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                  <div className="syne" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: "#e0eeff" }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: "#6a7e9a", lineHeight: 1.6 }}>{s.desc}</div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 2, background: `linear-gradient(90deg, ${["#00b4d8","#00c897","#fbbf24","#122272"][i]}, transparent)` }} />
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(0,180,216,0.04)", border: "1px solid rgba(0,180,216,0.12)", borderRadius: 24, padding: 40 }}>
              <h3 className="syne" style={{ fontSize: 26, fontWeight: 800, marginBottom: 28, letterSpacing: -0.5, color: "#f0f4ff" }}>Innovaciones de la plataforma</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                {[
                  { icon: "🤖", title: "Match automático", desc: "IA que conecta tu perfil con las mejores ofertas" },
                  { icon: "📂", title: "Portafolio digital", desc: "Muestra proyectos, evidencias y logros reales" },
                  { icon: "⭐", title: "Validación docente", desc: "Recomendaciones de tus profesores que avalan tus skills" },
                  { icon: "📊", title: "Retroalimentación", desc: "Las empresas te dan feedback para mejorar" },
                  { icon: "🏆", title: "Ranking estudiantil", desc: "Reputación basada en habilidades y evaluaciones" },
                  { icon: "🗺️", title: "Rutas de mejora", desc: "Plan personalizado para cerrar brechas de habilidades" },
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,180,216,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#d0e4f8", marginBottom: 4 }}>{f.title}</div>
                      <div style={{ fontSize: 12, color: "#4a6080", lineHeight: 1.5 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== ESTADÍSTICAS ===== */}
        {activeTab === "estadisticas" && (
          <div style={{ paddingTop: 60, paddingBottom: 80 }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <h2 className="syne" style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.5, marginBottom: 12, color: "#f0f4ff" }}>
                El <span style={{ background: "linear-gradient(90deg,#00b4d8,#00c897)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>impacto real</span>
              </h2>
              <p style={{ color: "#7a90b8", fontSize: 16 }}>Números que demuestran el valor de conectar talento estudiantil con el mundo laboral.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "32px 20px" }}>
                  <div className="syne" style={{ fontSize: 46, fontWeight: 800, background: ["linear-gradient(135deg,#00b4d8,#00c897)", "linear-gradient(135deg,#fbbf24,#00b4d8)", "linear-gradient(135deg,#00c897,#122272)", "linear-gradient(135deg,#00b4d8,#fbbf24)"][i], WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 14, color: "#6a7e9a", marginTop: 8 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Team */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: 40 }}>
              <h3 className="syne" style={{ fontSize: 24, fontWeight: 800, marginBottom: 28, letterSpacing: -0.5, color: "#f0f4ff" }}>Equipo Bolsa de Empleo CIAF</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                {[
                  { name: "María Fernanda", role: "Presentadora", icon: "🎤" },
                  { name: "Valeria Cuartas", role: "Presentadora", icon: "🎤" },
                  { name: "Juan Manuel", role: "Presentador", icon: "🎤" },
                  { name: "Samuel", role: "Desarrollador", icon: "💻" },
                  { name: "Nicolás", role: "Desarrollador", icon: "💻" },
                  { name: "Ana María", role: "Dev & Diseño", icon: "🎨" },
                  { name: "Luis Mario", role: "Desarrollador", icon: "💻" },
                  { name: "Camilo", role: "Desarrollador", icon: "💻" },
                  { name: "Ana María Toro", role: "Editora & Video", icon: "🎬" },
                  { name: "Danilo", role: "Video", icon: "🎬" },
                  { name: "Valeria", role: "Video", icon: "🎬" },
                  { name: "Mateo", role: "Guionista", icon: "✍️" },
                  { name: "Santiago", role: "Guionista", icon: "✍️" },
                  { name: "Alejandro", role: "Presentador", icon: "🎤" },
                ].map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, rgba(0,180,216,0.18), rgba(18,34,114,0.3))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{m.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#c0d4f0" }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: "#4a6080" }}>{m.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(0,180,216,0.1)", padding: "36px 24px", textAlign: "center", marginTop: 20 }}>
        <div className="syne" style={{ fontSize: 18, fontWeight: 800, marginBottom: 6, color: "#f0f4ff" }}>
          Bolsa de Empleo <span style={{ color: "#00b4d8" }}>CIAF</span>
        </div>
        <div style={{ fontSize: 12, color: "#2a3a5a", marginBottom: 10 }}>
          "No eres un estudiante más, eres talento en desarrollo" — CIAF 2025
        </div>
        <a href="https://ciaf.edu.co" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#00b4d8", textDecoration: "none", opacity: 0.7 }}>ciaf.edu.co</a>
      </footer>
    </>
  );
}
