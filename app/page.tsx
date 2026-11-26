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

  // Forms
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
  const input: any = { width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", marginTop: 6, boxSizing: "border-box" as any };
  const btnGreen: any = { background: "#16a34a", color: "#fff", border: "none", padding: "12px 16px", borderRadius: 12, fontWeight: 800, cursor: "pointer" };
  const btnRed: any = { background: "#fee2e2", color: "#dc2626", border: "none", padding: "6px 12px", borderRadius: 20, fontWeight: 800, cursor: "pointer", fontSize: 12 };

  const del = (list: any, set: any, id: number) => { if (confirm("Delete this? This cannot be undone.")) set(list.filter((x: any) => x.id !== id)); };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui", paddingBottom: 60 }}>
      <div style={{ background: "#0f172a", color: "#fff", padding: 16, textAlign: "center" }}>
        <div style={{ fontWeight: 900, fontSize: 22 }}>🎯 CAMPAIGN COMMAND</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Mumias East • UDA • 2027 • Add / Delete Live</div>
      </div>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: 16 }}>
        <div style={{ background: "linear-gradient(135deg,#0f172a,#16a34a)", color: "#fff", borderRadius: 20, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 42, fontWeight: 900 }}>{totalConfirmed} Confirmed Votes</div>
          <div>{totalContacted.toLocaleString()} contacted • {captains.length} Captains • {activities.length} Activities</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
            <button onClick={() => setShow(show === "captain" ? "" : "captain")} style={btnGreen}>+ Add Captain</button>
            <button onClick={() => setShow(show === "activity" ? "" : "activity")} style={{ ...btnGreen, background: "#1e3a8a" }}>+ Add Activity</button>
            <button onClick={() => setShow(show === "report" ? "" : "report")} style={{ ...btnGreen, background: "#facc15", color: "#111" }}>+ Add Voter Report</button>
          </div>
        </div>

        {show === "captain" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginTop: 12 }}>
            <b>Sign Up New Captain</b>
            <input style={input} placeholder="Full name e.g. Mary Nekesa" value={cName} onChange={(e) => setCName(e.target.value)} />
            <input style={input} placeholder="Phone e.g. 0712345678" value={cPhone} onChange={(e) => setCPhone(e.target.value)} />
            <select style={input} value={cWard} onChange={(e) => { setCWard(e.target.value); setCCentre(CENTRES[e.target.value][0]); }}><option value="">Select Ward</option>{WARDS.map((w) => <option key={w}>{w}</option>)}</select>
            <select style={input} value={cCentre} onChange={(e) => setCCentre(e.target.value)}>{CENTRES[cWard].map((c: string) => <option key={c}>{c}</option>)}</select>
            <button style={{ ...btnGreen, width: "100%", marginTop: 12 }} onClick={() => { if (!cName) return alert("Enter name"); setCaptains([...captains, { id: Date.now(), name: cName, phone: cPhone, ward: cWard, centre: cCentre, confirmed: 0 }]); setCName(""); setCPhone(""); setShow(""); }}>✅ Save Captain</button>
          </div>
        )}
        {show === "activity" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginTop: 12 }}>
            <b>Add Activity</b>
            <input style={input} placeholder="Activity title e.g. Door-to-door Shibale" value={aTitle} onChange={(e) => setATitle(e.target.value)} />
            <select style={input} value={aWard} onChange={(e) => setAWard(e.target.value)}>{WARDS.map((w) => <option key={w}>{w}</option>)}</select>
            <input style={input} type="date" value={aDate} onChange={(e) => setADate(e.target.value)} />
            <input style={input} type="number" placeholder="People attended" value={aPeople} onChange={(e) => setAPeople(Number(e.target.value))} />
            <button style={{ ...btnGreen, width: "100%", marginTop: 12, background: "#1e3a8a" }} onClick={() => { if (!aTitle) return alert("Enter title"); setActivities([...activities, { id: Date.now(), title: aTitle, ward: aWard, date: aDate, people: aPeople }]); setATitle(""); setShow(""); }}>✅ Save Activity</button>
          </div>
        )}
        {show === "report" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginTop: 12 }}>
            <b>Add Voter Report (Individual Voter Batch)</b>
            <select style={input} value={rCaptain} onChange={(e) => setRCaptain(e.target.value)}>{captains.map((c) => <option key={c.id}>{c.name}</option>)}</select>
            <input style={input} placeholder="Polling centre" value={rCentre} onChange={(e) => setRCentre(e.target.value)} />
            <input style={input} type="number" placeholder="Contacted" value={rContacted} onChange={(e) => setRContacted(Number(e.target.value))} />
            <input style={input} type="number" placeholder="Confirmed YES" value={rConfirmed} onChange={(e) => setRConfirmed(Number(e.target.value))} />
            <button style={{ ...btnGreen, width: "100%", marginTop: 12, background: "#facc15", color: "#111" }} onClick={() => { setReports([...reports, { id: Date.now(), captain: rCaptain, centre: rCentre, contacted: rContacted, confirmed: rConfirmed }]); setShow(""); }}>✅ Save Report</button>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "18px 0" }}>
          {["Dashboard", "Captains", "Activities", "Reports"].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 16px", borderRadius: 30, background: tab === t ? "#16a34a" : "#fff", color: tab === t ? "#fff" : "#333", border: "1px solid #e2e8f0", fontWeight: 800, cursor: "pointer" }}>{t}</button>
          ))}
        </div>

        {tab === "Captains" && captains.map((c) => (
          <div key={c.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginTop: 10, display: "flex", justifyContent: "space-between" }}>
            <div><b>{c.name}</b><div style={{ fontSize: 12, color: "#64748b" }}>{c.ward} • {c.centre} • {c.phone}</div><div style={{ marginTop: 6 }}>✅ {c.confirmed} confirmed</div></div>
            <button style={btnRed} onClick={() => del(captains, setCaptains, c.id)}>🗑 Delete</button>
          </div>
        ))}
        {tab === "Activities" && activities.map((a) => (
          <div key={a.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginTop: 10, display: "flex", justifyContent: "space-between" }}>
            <div><b>{a.title}</b><div style={{ fontSize: 12, color: "#64748b" }}>{a.ward} • {a.date}</div><div style={{ marginTop: 6 }}>👥 {a.people} people</div></div>
            <button style={btnRed} onClick={() => del(activities, setActivities, a.id)}>🗑 Delete</button>
          </div>
        ))}
        {tab === "Reports" && reports.map((r) => (
          <div key={r.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginTop: 10, display: "flex", justifyContent: "space-between" }}>
            <div><b>{r.centre}</b><div style={{ fontSize: 12, color: "#64748b" }}>By {r.captain}</div><div style={{ marginTop: 6 }}>📞 {r.contacted} contacted • ✅ {r.confirmed} YES</div></div>
            <button style={btnRed} onClick={() => del(reports, setReports, r.id)}>🗑 Delete</button>
          </div>
        ))}
        {tab === "Dashboard" && (
          <div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 16 }}><b>How to use tomorrow:</b><div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6 }}>1. Click <b>+ Add Captain</b> → sign up captain on the spot, with phone + ward + centre<br />2. Click <b>+ Add Activity</b> → log baraza / door-to-door<br />3. Click <b>+ Add Voter Report</b> → captain reports how many contacted / YES<br />4. To remove a wrong entry, go to Captains / Activities / Reports tab → <b>🗑 Delete</b> → Confirm<br />All data saves in this browser automatically.</div></div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginTop: 12 }}><b>Latest Reports</b>{reports.slice(-3).map((r) => <div key={r.id} style={{ marginTop: 8 }}>✅ {r.confirmed} YES from {r.centre} by {r.captain}</div>)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
