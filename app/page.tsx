"use client";
import { useEffect, useState } from "react";

type Captain = { id: number; name: string; phone: string; ward: string; centre: string; confirmed: number };
type Activity = { id: number; title: string; ward: string; date: string; people: number };
type Report = { id: number; captain: string; centre: string; contacted: number; confirmed: number };

const WARDS = ["Lusheya/Lubinu", "Malaha/Isongo/Makunga", "East Wanga"];
const CENTRES: any = {
  "Lusheya/Lubinu": ["LUBINU PRIMARY", "LUSHEYA PRIMARY", "KHOLERA", "MUSANGO", "ST MARYS LUBINU"],
  "Malaha/Isongo/Makunga": ["MALAHA PRI", "ISONGO PRI", "MAKUNGA PRI", "KHAUNDA", "MUSANGO"],
  "East Wanga": ["MUKAMBI", "ELUKHARI", "MUMIAS TOWN", "SHIBALE", "MATAWA"],
};

export default function Page() {
  const [tab, setTab] = useState("Dashboard");
  const [show, setShow] = useState("");
  const [captains, setCaptains] = useState<Captain[]>([
    { id: 1, name: "Wycliffe Barasa", phone: "0712000001", ward: "Lusheya/Lubinu", centre: "LUBINU PRIMARY", confirmed: 182 },
    { id: 2, name: "Kevin Wanjala", phone: "0712000002", ward: "Malaha/Isongo/Makunga", centre: "MALAHA PRI", confirmed: 210 },
    { id: 3, name: "Peter Oduor", phone: "0712000003", ward: "East Wanga", centre: "MUKAMBI", confirmed: 165 },
  ]);
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, title: "Door-to-door Lubinu", ward: "Lusheya/Lubinu", date: "2026-11-28", people: 45 },
    { id: 2, title: "Youth Meeting Malaha", ward: "Malaha/Isongo/Makunga", date: "2026-11-29", people: 80 },
    { id: 3, title: "Market Baraza East Wanga", ward: "East Wanga", date: "2026-11-30", people: 120 },
  ]);
  const [reports, setReports] = useState<Report[]>([
    { id: 1, captain: "Wycliffe Barasa", centre: "LUBINU PRIMARY", contacted: 250, confirmed: 182 },
    { id: 2, captain: "Kevin Wanjala", centre: "MALAHA PRI", contacted: 300, confirmed: 210 },
  ]);

  const [cName, setCName] = useState(""); const [cPhone, setCPhone] = useState(""); const [cWard, setCWard] = useState(WARDS[0]); const [cCentre, setCCentre] = useState(CENTRES[WARDS[0]][0]);
  const [aTitle, setATitle] = useState(""); const [aWard, setAWard] = useState(WARDS[0]); const [aDate, setADate] = useState("2026-11-28"); const [aPeople, setAPeople] = useState(20);
  const [rCaptain, setRCaptain] = useState("Wycliffe Barasa"); const [rCentre, setRCentre] = useState("LUBINU PRIMARY"); const [rContacted, setRContacted] = useState(50); const [rConfirmed, setRConfirmed] = useState(30);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("cc_captains"); if (c) setCaptains(JSON.parse(c));
      const a = localStorage.getItem("cc_activities"); if (a) setActivities(JSON.parse(a));
      const r = localStorage.getItem("cc_reports"); if (r) setReports(JSON.parse(r));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem("cc_captains", JSON.stringify(captains)); }, [captains, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem("cc_activities", JSON.stringify(activities)); }, [activities, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem("cc_reports", JSON.stringify(reports)); }, [reports, loaded]);

  const totalConfirmed = reports.reduce((s, r) => s + r.confirmed, 0) + captains.reduce((s, c) => s + c.confirmed, 0);
  const totalContacted = reports.reduce((s, r) => s + r.contacted, 0) + 640;
  const pct = Math.min(100, Math.round((totalConfirmed / 15000) * 100));
  const initials = (n: string) => n.split(" ").map(x => x[0]).slice(0, 2).join("").toUpperCase();
  const input: any = { width: "100%", padding: "14px", borderRadius: 14, border: "1px solid #e5e7eb", marginTop: 8, boxSizing: "border-box" as any, fontSize: 15, outline: "none", background: "#f9fafb" };
  const card: any = { background: "#fff", borderRadius: 22, padding: 18, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" };
  const del = (list: any, set: any, id: number) => { if (confirm("Delete this?")) set(list.filter((x: any) => x.id !== id)); };
  const wardColor: any = { "Lusheya/Lubinu": "#16a34a", "Malaha/Isongo/Makunga": "#f59e0b", "East Wanga": "#2563eb" };

  return (
    <div style={{ minHeight: "100vh", background: "#fff7ed", fontFamily: "system-ui", paddingBottom: 40 }}>
      {/* TOP BAR */}
      <div style={{ background: "#111827", color: "#fff", padding: "14px 16px", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#facc15", color: "#111", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18 }}>BW</div>
            <div><div style={{ fontWeight: 900, fontSize: 15, lineHeight: 1.1 }}>BENJAMIN NJOMO<br />WASHIALI</div><div style={{ fontSize: 11, color: "#facc15", fontWeight: 700 }}>MUMIAS EAST • UDA • 2027</div></div>
          </div>
          <div style={{ background: "#16a34a", padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 800 }}>● LIVE</div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
        {/* HERO */}
        <div style={{ background: "linear-gradient(135deg,#111827 0%,#1f2937 45%,#14532d 100%)", color: "#fff", borderRadius: 28, padding: 24, position: "relative", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}>
          <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160, borderRadius: "50%", background: "#facc15", opacity: 0.15 }} />
          <div style={{ position: "absolute", right: 40, bottom: -40, width: 120, height: 120, borderRadius: "50%", background: "#16a34a", opacity: 0.2 }} />
          <div style={{ background: "#facc15", color: "#111", display: "inline-block", padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 900 }}>🗳️ VOTE WASHIALI • MUMIAS EAST</div>
          <div style={{ fontSize: 26, fontWeight: 800, marginTop: 14, lineHeight: 1.1 }}>Hon. Benjamin Njomo<br />Washiali for MP</div>
          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>Strong leadership. Real development. Mumias East forward.</div>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.12)", borderRadius: 18, padding: 14, textAlign: "center", backdropFilter: "blur(10px)" }}><div style={{ fontSize: 26, fontWeight: 900 }}>{totalConfirmed.toLocaleString()}</div><div style={{ fontSize: 11, opacity: 0.8 }}>✅ Confirmed Votes</div></div>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.12)", borderRadius: 18, padding: 14, textAlign: "center" }}><div style={{ fontSize: 26, fontWeight: 900 }}>{totalContacted.toLocaleString()}</div><div style={{ fontSize: 11, opacity: 0.8 }}>📞 Contacted</div></div>
            <div style={{ flex: 1, background: "#facc15", color: "#111", borderRadius: 18, padding: 14, textAlign: "center" }}><div style={{ fontSize: 26, fontWeight: 900 }}>{captains.length}</div><div style={{ fontSize: 11, fontWeight: 700 }}>👥 Captains</div></div>
          </div>
          <div style={{ marginTop: 16 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700 }}><span>Target: 15,000 votes</span><span>{pct}%</span></div><div style={{ height: 10, background: "rgba(255,255,255,0.2)", borderRadius: 20, marginTop: 6, overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#facc15,#16a34a)", borderRadius: 20 }} /></div></div>
        </div>

        {/* QUICK ACTIONS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
          <button onClick={() => setShow(show === "captain" ? "" : "captain")} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 18, padding: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(22,163,74,0.3)" }}>👤<br />+ Captain</button>
          <button onClick={() => setShow(show === "activity" ? "" : "activity")} style={{ background: "#111827", color: "#fff", border: "none", borderRadius: 18, padding: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}>📅<br />+ Activity</button>
          <button onClick={() => setShow(show === "report" ? "" : "report")} style={{ background: "#facc15", color: "#111", border: "none", borderRadius: 18, padding: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 20px rgba(250,204,21,0.4)" }}>🗳️<br />+ Report</button>
        </div>

        {/* FORMS */}
        {show === "captain" && (<div style={{ ...card, marginTop: 14 }}><b>👤 Sign Up New Captain</b><div style={{ fontSize: 13, color: "#6b7280" }}>For Hon. Washiali's team</div><input style={input} placeholder="Full name — e.g. Mary Nekesa" value={cName} onChange={(e) => setCName(e.target.value)} /><input style={input} placeholder="Phone — 0712345678" value={cPhone} onChange={(e) => setCPhone(e.target.value)} /><select style={input} value={cWard} onChange={(e) => { setCWard(e.target.value); setCCentre(CENTRES[e.target.value][0]); }}>{WARDS.map((w) => <option key={w}>{w}</option>)}</select><select style={input} value={cCentre} onChange={(e) => setCCentre(e.target.value)}>{CENTRES[cWard].map((c: string) => <option key={c}>{c}</option>)}</select><button style={{ width: "100%", marginTop: 12, background: "#16a34a", color: "#fff", border: "none", padding: 14, borderRadius: 14, fontWeight: 900, cursor: "pointer" }} onClick={() => { if (!cName) return alert("Enter name"); setCaptains([...captains, { id: Date.now(), name: cName, phone: cPhone, ward: cWard, centre: cCentre, confirmed: 0 }]); setCName(""); setCPhone(""); setShow(""); }}>✅ Save Captain</button></div>)}
        {show === "activity" && (<div style={{ ...card, marginTop: 14 }}><b>📅 Add Activity</b><input style={input} placeholder="Title — e.g. Door-to-door Shibale" value={aTitle} onChange={(e) => setATitle(e.target.value)} /><select style={input} value={aWard} onChange={(e) => setAWard(e.target.value)}>{WARDS.map((w) => <option key={w}>{w}</option>)}</select><input style={input} type="date" value={aDate} onChange={(e) => setADate(e.target.value)} /><input style={input} type="number" value={aPeople} onChange={(e) => setAPeople(Number(e.target.value))} /><button style={{ width: "100%", marginTop: 12, background: "#111827", color: "#fff", border: "none", padding: 14, borderRadius: 14, fontWeight: 900, cursor: "pointer" }} onClick={() => { if (!aTitle) return alert("Enter title"); setActivities([...activities, { id: Date.now(), title: aTitle, ward: aWard, date: aDate, people: aPeople }]); setATitle(""); setShow(""); }}>✅ Save Activity</button></div>)}
        {show === "report" && (<div style={{ ...card, marginTop: 14 }}><b>🗳️ Add Voter Report</b><select style={input} value={rCaptain} onChange={(e) => setRCaptain(e.target.value)}>{captains.map((c) => <option key={c.id}>{c.name}</option>)}</select><input style={input} placeholder="Polling centre" value={rCentre} onChange={(e) => setRCentre(e.target.value)} /><input style={input} type="number" value={rContacted} onChange={(e) => setRContacted(Number(e.target.value))} /><input style={input} type="number" value={rConfirmed} onChange={(e) => setRConfirmed(Number(e.target.value))} /><button style={{ width: "100%", marginTop: 12, background: "#facc15", color: "#111", border: "none", padding: 14, borderRadius: 14, fontWeight: 900, cursor: "pointer" }} onClick={() => { setReports([...reports, { id: Date.now(), captain: rCaptain, centre: rCentre, contacted: rContacted, confirmed: rConfirmed }]); setShow(""); }}>✅ Save Report</button></div>)}

        {/* TABS */}
        <div style={{ display: "flex", gap: 8, marginTop: 18, background: "#fff", padding: 6, borderRadius: 30, boxShadow: "0 4px 15px rgba(0,0,0,0.06)" }}>
          {["Dashboard", "Captains", "Activities", "Reports"].map((t) => (<button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "10px 6px", borderRadius: 20, background: tab === t ? "#111827" : "transparent", color: tab === t ? "#fff" : "#374151", border: "none", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>{t}</button>))}
        </div>

        {tab === "Dashboard" && (
          <div style={{ marginTop: 14 }}>
            <div style={{ ...card }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b>🏆 Top Captains</b><span style={{ fontSize: 12, background: "#fef3c7", padding: "4px 10px", borderRadius: 20, fontWeight: 700 }}>This Week</span></div>
              {[...captains].sort((a, b) => b.confirmed - a.confirmed).map((c, i) => (<div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}><div style={{ width: 36, height: 36, borderRadius: "50%", background: i === 0 ? "#facc15" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12 }}>{i === 0 ? "👑" : initials(c.name)}</div><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div><div style={{ fontSize: 12, color: "#6b7280" }}>{c.centre}</div></div><b style={{ color: "#16a34a" }}>{c.confirmed} ✅</b></div>))}
            </div>
            <div style={{ ...card, marginTop: 14 }}><b>📊 By Ward</b>{WARDS.map((w) => { const v = captains.filter((c) => c.ward === w).reduce((s, c) => s + c.confirmed, 0); const max = 300; return (<div key={w} style={{ marginTop: 12 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}><span>{w}</span><span>{v} votes</span></div><div style={{ height: 8, background: "#f3f4f6", borderRadius: 20, marginTop: 5, overflow: "hidden" }}><div style={{ width: `${Math.min(100, (v / max) * 100)}%`, height: "100%", background: wardColor[w], borderRadius: 20 }} /></div></div>); })}</div>
            <div style={{ ...card, marginTop: 14 }}><b>Latest Reports</b>{reports.slice(-3).map((r) => (<div key={r.id} style={{ marginTop: 10, background: "#f0fdf4", padding: 12, borderRadius: 14 }}>✅ <b>{r.confirmed} YES</b> from {r.centre} <span style={{ color: "#6b7280", fontSize: 12 }}>by {r.captain}</span></div>))}</div>
          </div>
        )}

        {tab === "Captains" && captains.map((c) => (<div key={c.id} style={{ ...card, marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}><div style={{ width: 52, height: 52, borderRadius: "50%", background: wardColor[c.ward], color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>{initials(c.name)}</div><div style={{ flex: 1 }}><b>{c.name}</b><div style={{ fontSize: 12, color: "#6b7280" }}>📍 {c.ward} • {c.centre}<br />📞 {c.phone}</div><div style={{ marginTop: 6 }}><span style={{ background: "#dcfce7", color: "#166534", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 800 }}>✅ {c.confirmed} confirmed</span></div></div><button onClick={() => del(captains, setCaptains, c.id)} style={{ background: "#fee2e2", color: "#dc2626", border: "none", padding: "8px 12px", borderRadius: 20, fontWeight: 800, cursor: "pointer" }}>🗑</button></div>))}
        {tab === "Activities" && activities.map((a) => (<div key={a.id} style={{ ...card, marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}><div style={{ width: 52, height: 52, borderRadius: 16, background: "#111827", color: "#facc15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📅</div><div style={{ flex: 1 }}><b>{a.title}</b><div style={{ fontSize: 12, color: "#6b7280" }}>{a.ward} • {a.date}</div><div style={{ marginTop: 6 }}>👥 {a.people} people attended</div></div><button onClick={() => del(activities, setActivities, a.id)} style={{ background: "#fee2e2", color: "#dc2626", border: "none", padding: "8px 12px", borderRadius: 20, fontWeight: 800, cursor: "pointer" }}>🗑</button></div>))}
        {tab === "Reports" && reports.map((r) => (<div key={r.id} style={{ ...card, marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}><div style={{ width: 52, height: 52, borderRadius: 16, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🗳️</div><div style={{ flex: 1 }}><b>{r.centre}</b><div style={{ fontSize: 12, color: "#6b7280" }}>By {r.captain}</div><div style={{ marginTop: 6 }}>📞 {r.contacted} contacted • <b style={{ color: "#16a34a" }}>✅ {r.confirmed} YES for Washiali</b></div></div><button onClick={() => del(reports, setReports, r.id)} style={{ background: "#fee2e2", color: "#dc2626", border: "none", padding: "8px 12px", borderRadius: 20, fontWeight: 800, cursor: "pointer" }}>🗑</button></div>))}

        <div style={{ textAlign: "center", marginTop: 22, fontSize: 12, color: "#9ca3af" }}>Campaign Command • Hon. Benjamin Njomo Washiali • Mumias East 2027</div>
      </div>
    </div>
  );
}
