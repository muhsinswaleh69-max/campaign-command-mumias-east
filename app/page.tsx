"use client";
import { useEffect, useState } from "react";

// ===== DATA =====
const WARDS: Record<string, string[]> = {
  "Lusheya/Lubinu": ["LUBINU PRIMARY","LUSHEYA PRIMARY","INDANGALASIA","KAMASHIA","EKERO","SHIANDA","SHIANDA POLY","KHAIMBA","MUMIAS MUSLIM","EMUSOMA","BUKOYWA","LUBINU SEC","SHIANDA SEC","EKERO SEC","LUSHEYA SEC","BUKOLE","MABOLE"],
  "Malaha/Isongo/Makunga": ["MALAHA PRI","ISONGO PRI","MAKUNGA PRI","SHISENYE","MURONI","EMUTETEMO","MARABA SEC","MARABA PRI","EPANJA","PETROS","ISANGO","BUMWENDE","EMABANGA","ESHISENYE","KHUNGOYOKOSI","MALAHA SEC","MAKUNGA SEC","ISONGO SEC","MALAHA POLY"],
  "East Wanga": ["MUKAMBI","MUNG'ANG'A","BUMINI PRI","MWITOTI","RISE AND SHINE","KHAUNGA","MAHOLA","KHABAKAYA","ELUCHE","KHABONDI","EBUBERE","MUNGABIRA","MALAHA MARKET","BUMINI SEC","MUNG'ANG'A HC","BOOKER ACADEMY"],
};
const ALL_CENTRES = Object.values(WARDS).flat();

type Captain = { id: string; name: string; phone: string; ward: string; centre: string; confirmed: number; contacted: number };
type Activity = { id: string; ward: string; centre: string; type: string; attended: number; confirmed: number; date: string; note: string };

const SEED_CAPTAINS: Captain[] = [
  { id: "1", name: "Wycliffe Barasa", phone: "0722 123 456", ward: "Lusheya/Lubinu", centre: "LUBINU PRIMARY", confirmed: 182, contacted: 240 },
  { id: "2", name: "Mary Nekesa", phone: "0701 234 567", ward: "Lusheya/Lubinu", centre: "SHIANDA", confirmed: 145, contacted: 190 },
  { id: "3", name: "Kevin Wanjala", phone: "0712 345 678", ward: "Malaha/Isongo/Makunga", centre: "MALAHA PRI", confirmed: 210, contacted: 280 },
  { id: "4", name: "Faith Nasimiyu", phone: "0733 456 789", ward: "Malaha/Isongo/Makunga", centre: "MAKUNGA PRI", confirmed: 98, contacted: 150 },
  { id: "5", name: "Peter Oduor", phone: "0725 567 890", ward: "East Wanga", centre: "MUKAMBI", confirmed: 165, contacted: 210 },
  { id: "6", name: "Grace Achieng", phone: "0700 678 901", ward: "East Wanga", centre: "KHAUNGA", confirmed: 76, contacted: 120 },
];
const SEED_ACTIVITIES: Activity[] = [
  { id: "a1", ward: "Lusheya/Lubinu", centre: "LUBINU PRIMARY", type: "Baraza", attended: 120, confirmed: 48, date: "Today", note: "Boda riders promised support" },
  { id: "a2", ward: "Malaha/Isongo/Makunga", centre: "MALAHA PRI", type: "Football Final", attended: 300, confirmed: 95, date: "Yesterday", note: "Youth tournament final, very strong" },
  { id: "a3", ward: "East Wanga", centre: "MUKAMBI", type: "Church Visit", attended: 180, confirmed: 62, date: "Yesterday", note: "Pastor welcomed candidate" },
];

export default function CampaignCommand() {
  const [tab, setTab] = useState("Dashboard");
  const [captains, setCaptains] = useState<Captain[]>(SEED_CAPTAINS);
  const [activities, setActivities] = useState<Activity[]>(SEED_ACTIVITIES);
  const [wardFilter, setWardFilter] = useState("All Wards");
  const [showAddCaptain, setShowAddCaptain] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);

  // Form states
  const [cName, setCName] = useState(""); const [cPhone, setCPhone] = useState(""); const [cWard, setCWard] = useState("Lusheya/Lubinu"); const [cCentre, setCCentre] = useState(WARDS["Lusheya/Lubinu"][0]);
  const [aWard, setAWard] = useState("Lusheya/Lubinu"); const [aCentre, setACentre] = useState(WARDS["Lusheya/Lubinu"][0]); const [aType, setAType] = useState("Baraza"); const [aAttended, setAAttended] = useState(""); const [aConfirmed, setAConfirmed] = useState(""); const [aNote, setANote] = useState("");
  const [vCaptain, setVCaptain] = useState(""); const [vContacted, setVContacted] = useState(""); const [vConfirmed, setVConfirmed] = useState(""); const [vTransport, setVTransport] = useState("");

  useEffect(() => {
    const savedC = localStorage.getItem("cc_captains"); if (savedC) setCaptains(JSON.parse(savedC));
    const savedA = localStorage.getItem("cc_activities"); if (savedA) setActivities(JSON.parse(savedA));
  }, []);
  useEffect(() => { localStorage.setItem("cc_captains", JSON.stringify(captains)); }, [captains]);
  useEffect(() => { localStorage.setItem("cc_activities", JSON.stringify(activities)); }, [activities]);

  const filteredCaptains = wardFilter === "All Wards" ? captains : captains.filter(c => c.ward === wardFilter);
  const totalConfirmed = captains.reduce((s, c) => s + c.confirmed, 0);
  const totalContacted = captains.reduce((s, c) => s + c.contacted, 0);
  const totalActivities = activities.length;
  const conversion = totalContacted ? ((totalConfirmed / totalContacted) * 100).toFixed(1) : "0";
  const centresCovered = new Set(captains.map(c => c.centre)).size;
  const topCaptain = [...captains].sort((a, b) => b.confirmed - a.confirmed)[0];

  function wardStats(ward: string) {
    const cs = captains.filter(c => c.ward === ward);
    return {
      confirmed: cs.reduce((s, c) => s + c.confirmed, 0),
      contacted: cs.reduce((s, c) => s + c.contacted, 0),
      captains: cs.length,
      centres: new Set(cs.map(c => c.centre)).size,
      totalCentres: WARDS[ward].length,
      activities: activities.filter(a => a.ward === ward).length,
    };
  }

  const addCaptain = () => {
    if (!cName) return alert("Enter captain name");
    setCaptains([...captains, { id: Date.now().toString(), name: cName, phone: cPhone, ward: cWard, centre: cCentre, confirmed: 0, contacted: 0 }]);
    setCName(""); setCPhone(""); setShowAddCaptain(false);
  };
  const addActivity = () => {
    setActivities([{ id: Date.now().toString(), ward: aWard, centre: aCentre, type: aType, attended: Number(aAttended || 0), confirmed: Number(aConfirmed || 0), date: "Today", note: aNote }, ...activities]);
    setAAttended(""); setAConfirmed(""); setANote(""); setShowAddActivity(false);
  };
  const addContact = () => {
    if (!vCaptain) return alert("Select captain");
    setCaptains(captains.map(c => c.id === vCaptain ? { ...c, contacted: c.contacted + Number(vContacted || 0), confirmed: c.confirmed + Number(vConfirmed || 0) } : c));
    setVContacted(""); setVConfirmed(""); setVTransport(""); setShowAddContact(false);
  };

  const inputStyle: any = { width: "100%", padding: 12, borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, background: "#fff" };
  const btnGreen: any = { background: "#16a34a", color: "#fff", border: "none", padding: "12px 16px", borderRadius: 12, fontWeight: 800, cursor: "pointer" };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui", paddingBottom: 40 }}>
      <div style={{ background: "#0f172a", color: "#fff", padding: "14px 16px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, background: "#16a34a", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎯</div>
            <div><div style={{ fontWeight: 900, fontSize: 18 }}>CAMPAIGN COMMAND</div><div style={{ fontSize: 11, opacity: 0.7 }}>Mumias East • UDA • 2027 General Election</div></div>
          </div>
          <div style={{ background: "#dc2626", padding: "5px 10px", borderRadius: 20, fontSize: 11, fontWeight: 800 }}>● LIVE GROUND</div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px" }}>
        {/* HERO */}
        <div style={{ background: "linear-gradient(135deg,#0f172a 0%,#14532d 60%,#16a34a 100%)", color: "#fff", borderRadius: 20, padding: 24, marginTop: 20, textAlign: "center", boxShadow: "0 12px 30px rgba(0,0,0,0.18)" }}>
          <div style={{ fontSize: 12, letterSpacing: 2, opacity: 0.8, fontWeight: 700 }}>MUMIAS EAST CONSTITUENCY • 3 WARDS • 52 CENTRES</div>
          <div style={{ fontSize: 40, fontWeight: 900, margin: "10px 0 4px" }}>{totalConfirmed.toLocaleString()} <span style={{ fontSize: 18, opacity: 0.7 }}>Confirmed Votes</span></div>
          <div style={{ fontSize: 14, opacity: 0.9 }}>{totalContacted.toLocaleString()} contacted • {conversion}% saying YES • {centresCovered} / 52 centres covered</div>
          <div style={{ background: "rgba(255,255,255,0.2)", height: 10, borderRadius: 10, marginTop: 14, overflow: "hidden" }}><div style={{ width: `${Math.min(100, (centresCovered / 52) * 100)}%`, background: "#facc15", height: 10 }} /></div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
            <span style={{ background: "#fff", color: "#111", padding: "5px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{captains.length} Captains Active</span>
            <span style={{ background: "#fff", color: "#111", padding: "5px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{totalActivities} Activities</span>
            <span style={{ background: "#facc15", color: "#111", padding: "5px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>Top: {topCaptain?.name} — {topCaptain?.confirmed} votes</span>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "20px 0", flexWrap: "wrap" }}>
          {["Dashboard", "Captains", "Activities", "Election Day"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 18px", borderRadius: 30, background: tab === t ? "#16a34a" : "#fff", color: tab === t ? "#fff" : "#334155", border: "1px solid #e2e8f0", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>{t}</button>
          ))}
        </div>

        {tab === "Dashboard" && (
          <>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 16 }}>
              <button onClick={() => setShowAddContact(true)} style={btnGreen}>+ Add Voter Report</button>
              <button onClick={() => setShowAddActivity(true)} style={{ ...btnGreen, background: "#0f172a" }}>+ Add Activity</button>
              <button onClick={() => setShowAddCaptain(true)} style={{ ...btnGreen, background: "#f59e0b" }}>+ Add Captain</button>
            </div>
            {Object.keys(WARDS).map(ward => {
              const s = wardStats(ward);
              const pct = s.totalCentres ? Math.round((s.centres / s.totalCentres) * 100) : 0;
              const status = pct >= 70 ? "STRONG" : pct >= 40 ? "WATCH" : "DANGER";
              const statusColor = pct >= 70 ? "#16a34a" : pct >= 40 ? "#f59e0b" : "#dc2626";
              return (
                <div key={ward} style={{ background: "#fff", borderRadius: 20, padding: 20, marginTop: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ margin: 0 }}>{ward}</h3><span style={{ background: statusColor, color: "#fff", padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 800 }}>{status}</span></div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
                    <div style={{ background: "#f0fdf4", padding: "10px 14px", borderRadius: 12 }}><b>{s.confirmed.toLocaleString()}</b><div style={{ fontSize: 11, color: "#64748b" }}>Confirmed Votes</div></div>
                    <div style={{ background: "#eff6ff", padding: "10px 14px", borderRadius: 12 }}><b>{s.contacted.toLocaleString()}</b><div style={{ fontSize: 11, color: "#64748b" }}>Contacted</div></div>
                    <div style={{ background: "#fefce8", padding: "10px 14px", borderRadius: 12 }}><b>{s.centres} / {s.totalCentres}</b><div style={{ fontSize: 11, color: "#64748b" }}>Centres Covered</div></div>
                    <div style={{ background: "#fdf2f8", padding: "10px 14px", borderRadius: 12 }}><b>{s.activities}</b><div style={{ fontSize: 11, color: "#64748b" }}>Activities</div></div>
                  </div>
                  <div style={{ background: "#f1f5f9", height: 10, borderRadius: 10, marginTop: 12 }}><div style={{ width: `${pct}%`, background: statusColor, height: 10, borderRadius: 10 }} /></div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>{pct}% coverage • {s.captains} captains active</div>
                </div>
              );
            })}
            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 16, padding: 16, marginTop: 16 }}>
              <b style={{ color: "#9a3412" }}>⚠️ RED LIST — Centres with NO captain yet</b>
              <div style={{ fontSize: 13, marginTop: 6, color: "#7c2d12" }}>{ALL_CENTRES.filter(c => !captains.some(cap => cap.centre === c)).slice(0, 8).join(", ")} {ALL_CENTRES.filter(c => !captains.some(cap => cap.centre === c)).length > 8 ? `+ ${ALL_CENTRES.filter(c => !captains.some(cap => cap.centre === c)).length - 8} more` : ""}</div>
            </div>
          </>
        )}

        {tab === "Captains" && (
          <>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 12 }}>
              <select value={wardFilter} onChange={e => setWardFilter(e.target.value)} style={{ padding: 11, borderRadius: 12, border: "1px solid #e2e8f0", fontWeight: 700 }}><option>All Wards</option>{Object.keys(WARDS).map(w => <option key={w}>{w}</option>)}</select>
              <button onClick={() => setShowAddCaptain(true)} style={btnGreen}>+ Add Captain</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
              {filteredCaptains.sort((a, b) => b.confirmed - a.confirmed).map((c, i) => (
                <div key={c.id} style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><b>{c.name}</b><span style={{ background: i === 0 ? "#facc15" : "#e2e8f0", padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 800 }}>#{i + 1}</span></div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{c.ward} • {c.centre}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>📞 {c.phone}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}><span style={{ background: "#f0fdf4", padding: "6px 10px", borderRadius: 10, fontSize: 12, fontWeight: 700 }}>{c.confirmed} Confirmed</span><span style={{ background: "#eff6ff", padding: "6px 10px", borderRadius: 10, fontSize: 12 }}>{c.contacted} Contacted</span></div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "Activities" && (
          <>
            <div style={{ textAlign: "center", marginBottom: 12 }}><button onClick={() => setShowAddActivity(true)} style={btnGreen}>+ Log Activity</button></div>
            {activities.map(a => (
              <div key={a.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginTop: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><b>{a.type} — {a.centre}</b><span style={{ fontSize: 11, color: "#64748b" }}>{a.date}</span></div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{a.ward}</div>
                <div style={{ marginTop: 8, fontSize: 13 }}>👥 {a.attended} attended • ✅ {a.confirmed} confirmed YES</div>
                <div style={{ fontSize: 13, color: "#334155", marginTop: 4 }}>📝 {a.note}</div>
              </div>
            ))}
          </>
        )}

        {tab === "Election Day" && (
          <div style={{ background: "#fff", borderRadius: 20, padding: 20, marginTop: 10 }}>
            <h3 style={{ marginTop: 0 }}>Election Day Checklist — 95 Streams</h3>
            {[
              "1. 5:00 AM — All 95 agents checked in via WhatsApp",
              "2. 6:00 AM — Polling stations open, agent confirms his stream",
              "3. 12:00 PM — Midday turnout report per ward",
              "4. 5:00 PM — Polls close, agent stays for counting",
              "5. Counting — Agent photographs Form 34A and sends to Tally Centre",
              "6. Tally Centre enters results into Hakitally — live for all to see",
              "7. No agent leaves until 34A is photographed",
            ].map(s => <div key={s} style={{ padding: "12px 0", borderBottom: "1px solid #f1f5f9", fontSize: 14 }}>{s}</div>)}
            <div style={{ background: "#f0fdf4", padding: 14, borderRadius: 12, marginTop: 14, fontSize: 13 }}><b>Agents needed:</b> 95 • <b>Captains:</b> {captains.length} • <b>Centres:</b> 52 • <b>Tally Centre:</b> Mumias Town — 3 people</div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {showAddCaptain && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 50 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 20, width: "100%", maxWidth: 420 }}>
            <h3 style={{ marginTop: 0 }}>Add Centre Captain</h3>
            <input style={inputStyle} placeholder="Full Name *" value={cName} onChange={e => setCName(e.target.value)} /><div style={{ height: 10 }} />
            <input style={inputStyle} placeholder="Phone e.g. 0722..." value={cPhone} onChange={e => setCPhone(e.target.value)} /><div style={{ height: 10 }} />
            <select style={inputStyle} value={cWard} onChange={e => { setCWard(e.target.value); setCCentre(WARDS[e.target.value][0]); }}>{Object.keys(WARDS).map(w => <option key={w}>{w}</option>)}</select><div style={{ height: 10 }} />
            <select style={inputStyle} value={cCentre} onChange={e => setCCentre(e.target.value)}>{WARDS[cWard].map(c => <option key={c}>{c}</option>)}</select>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}><button onClick={addCaptain} style={{ ...btnGreen, flex: 1 }}>Save Captain</button><button onClick={() => setShowAddCaptain(false)} style={{ padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", flex: 1 }}>Cancel</button></div>
          </div>
        </div>
      )}
      {showAddActivity && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 50 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 20, width: "100%", maxWidth: 420 }}>
            <h3 style={{ marginTop: 0 }}>Log Activity</h3>
            <select style={inputStyle} value={aType} onChange={e => setAType(e.target.value)}><option>Baraza</option><option>Church Visit</option><option>Mosque Visit</option><option>Football Final</option><option>Market Visit</option><option>Chama Meeting</option><option>Door to Door</option></select><div style={{ height: 10 }} />
            <select style={inputStyle} value={aWard} onChange={e => { setAWard(e.target.value); setACentre(WARDS[e.target.value][0]); }}>{Object.keys(WARDS).map(w => <option key={w}>{w}</option>)}</select><div style={{ height: 10 }} />
            <select style={inputStyle} value={aCentre} onChange={e => setACentre(e.target.value)}>{WARDS[aWard].map(c => <option key={c}>{c}</option>)}</select><div style={{ height: 10 }} />
            <input style={inputStyle} placeholder="How many attended?" type="number" value={aAttended} onChange={e => setAAttended(e.target.value)} /><div style={{ height: 10 }} />
            <input style={inputStyle} placeholder="How many said YES?" type="number" value={aConfirmed} onChange={e => setAConfirmed(e.target.value)} /><div style={{ height: 10 }} />
            <input style={inputStyle} placeholder="Note e.g. Pastor welcomed us" value={aNote} onChange={e => setANote(e.target.value)} />
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}><button onClick={addActivity} style={{ ...btnGreen, flex: 1 }}>Save Activity</button><button onClick={() => setShowAddActivity(false)} style={{ padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", flex: 1 }}>Cancel</button></div>
          </div>
        </div>
      )}
      {showAddContact && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 50 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 20, width: "100%", maxWidth: 420 }}>
            <h3 style={{ marginTop: 0 }}>Add Voter Report</h3>
            <p style={{ fontSize: 13, color: "#64748b" }}>Captain reports from WhatsApp: "I met 25, 18 said YES"</p>
            <select style={inputStyle} value={vCaptain} onChange={e => setVCaptain(e.target.value)}><option value="">Select Captain</option>{captains.map(c => <option key={c.id} value={c.id}>{c.name} — {c.centre}</option>)}</select><div style={{ height: 10 }} />
            <input style={inputStyle} placeholder="How many contacted today?" type="number" value={vContacted} onChange={e => setVContacted(e.target.value)} /><div style={{ height: 10 }} />
            <input style={inputStyle} placeholder="How many confirmed YES?" type="number" value={vConfirmed} onChange={e => setVConfirmed(e.target.value)} /><div style={{ height: 10 }} />
            <input style={inputStyle} placeholder="How many need transport on voting day?" type="number" value={vTransport} onChange={e => setVTransport(e.target.value)} />
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}><button onClick={addContact} style={{ ...btnGreen, flex: 1 }}>Save Report</button><button onClick={() => setShowAddContact(false)} style={{ padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", flex: 1 }}>Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
