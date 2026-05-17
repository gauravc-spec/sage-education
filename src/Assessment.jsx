import { useState } from "react";

// ─────────────────────────────────────────
// GOOGLE FORM SUBMISSION
// ─────────────────────────────────────────
const FORM_ACTION = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScoZS3JTdxpwc_qLCSWhj5Nrz7GN0faa_ai7aYBeFnLZBJi0w/formResponse";

async function submitToGoogleForms(answers) {
  const formData = new FormData();
  for (const [key, val] of Object.entries(answers)) {
    if (val !== undefined && val !== null && val !== "") {
      formData.append(key, val);
    }
  }
  try {
    await fetch(FORM_ACTION, { method: "POST", body: formData, mode: "no-cors" });
  } catch (e) {
    // no-cors always throws — that's expected, form still submits
  }
}

// ─────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────
const pink = "#E8197D";
const pinkL = "#FFE4F2";
const navy = "#0F172A";
const grey = "#64748B";
const greyL = "#F1F5F9";
const white = "#FFFFFF";
const green = "#10B981";
const F = "'DM Sans', 'Segoe UI', sans-serif";
const FD = "'Syne', 'DM Sans', sans-serif";

const s = {
  wrap: { minHeight:"100vh", background:"linear-gradient(135deg,#FFF0F8 0%,#F8FAFF 60%,#F0FFF8 100%)", fontFamily:F, padding:"0 0 60px" },
  topBar: { background:white, borderBottom:`3px solid ${pink}`, padding:"0 24px", position:"sticky", top:0, zIndex:99, boxShadow:"0 2px 16px rgba(232,25,125,0.1)" },
  topInner: { maxWidth:900, margin:"0 auto", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" },
  logo: { height:44, objectFit:"contain" },
  progress: { flex:1, margin:"0 24px" },
  progressBar: { height:6, background:"#E2E8F0", borderRadius:3, overflow:"hidden" },
  progressFill: (pct) => ({ height:"100%", background:`linear-gradient(90deg,${pink},#FF6EB4)`, width:`${pct}%`, borderRadius:3, transition:"width 0.4s ease" }),
  progressText: { fontSize:12, color:grey, marginTop:4, textAlign:"right" },
  card: { maxWidth:900, margin:"32px auto 0", padding:"0 16px" },
  sectionCard: { background:white, borderRadius:20, boxShadow:"0 4px 32px rgba(0,0,0,0.08)", overflow:"hidden" },
  sectionHeader: { background:`linear-gradient(135deg,${pink},#C2185B)`, padding:"32px 40px", color:white },
  sectionNum: { fontSize:12, fontWeight:700, letterSpacing:2, opacity:0.8, marginBottom:8, textTransform:"uppercase" },
  sectionTitle: { fontFamily:FD, fontSize:"clamp(20px,4vw,28px)", fontWeight:800, margin:"0 0 8px" },
  sectionDesc: { fontSize:14, opacity:0.9, lineHeight:1.7, margin:0 },
  sectionBody: { padding:"32px 40px" },
  label: { display:"block", fontSize:15, fontWeight:600, color:navy, marginBottom:8 },
  input: { width:"100%", border:`2px solid #E2E8F0`, borderRadius:12, padding:"14px 16px", fontSize:15, fontFamily:F, outline:"none", boxSizing:"border-box", transition:"border-color 0.2s", color:navy },
  textarea: { width:"100%", border:`2px solid #E2E8F0`, borderRadius:12, padding:"14px 16px", fontSize:15, fontFamily:F, outline:"none", boxSizing:"border-box", minHeight:100, resize:"vertical", color:navy },
  qRow: { marginBottom:24, padding:"20px", background:greyL, borderRadius:12 },
  qText: { fontSize:14, color:navy, fontWeight:500, marginBottom:12, lineHeight:1.5 },
  optionRow: { display:"flex", gap:8, flexWrap:"wrap" },
  optBtn: (sel) => ({
    padding:"8px 16px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:F, border:"none",
    background: sel ? pink : white,
    color: sel ? white : grey,
    boxShadow: sel ? `0 4px 12px ${pink}40` : "0 1px 4px rgba(0,0,0,0.08)",
    transition:"all 0.15s",
  }),
  gridTable: { width:"100%", borderCollapse:"collapse", fontSize:13 },
  gridTh: { padding:"10px 8px", background:`${pink}15`, color:pink, fontWeight:700, textAlign:"center", fontSize:12, borderBottom:`2px solid ${pink}20` },
  gridTd: { padding:"12px 8px", borderBottom:"1px solid #F0F0F0", textAlign:"center" },
  gridTdQ: { padding:"12px 8px", borderBottom:"1px solid #F0F0F0", textAlign:"left", fontSize:13, color:navy, fontWeight:500, lineHeight:1.4 },
  gridRadio: (sel) => ({
    width:22, height:22, borderRadius:"50%", border:`2px solid ${sel ? pink : "#CBD5E1"}`,
    background: sel ? pink : white, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
    margin:"0 auto", flexShrink:0, transition:"all 0.15s",
  }),
  navRow: { display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:32, paddingTop:24, borderTop:"1px solid #F0F0F0" },
  btnPrev: { background:"none", border:`2px solid ${pink}`, color:pink, borderRadius:12, padding:"12px 28px", fontFamily:F, fontSize:15, fontWeight:700, cursor:"pointer" },
  btnNext: { background:pink, color:white, border:"none", borderRadius:12, padding:"14px 36px", fontFamily:F, fontSize:16, fontWeight:700, cursor:"pointer", boxShadow:`0 6px 20px ${pink}40` },
  btnSubmit: { background:`linear-gradient(135deg,${green},#059669)`, color:white, border:"none", borderRadius:12, padding:"16px 48px", fontFamily:F, fontSize:17, fontWeight:800, cursor:"pointer", boxShadow:"0 6px 24px rgba(16,185,129,0.4)" },
  error: { color:"#EF4444", fontSize:13, marginTop:4 },
  required: { color:pink, marginLeft:2 },
  successWrap: { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:`linear-gradient(135deg,#FFF0F8,#F0FFF8)`, fontFamily:F, textAlign:"center", padding:24 },
  successCard: { background:white, borderRadius:24, padding:"60px 40px", maxWidth:540, boxShadow:"0 8px 48px rgba(0,0,0,0.12)" },
};

// ─────────────────────────────────────────
// QUESTION DATA
// ─────────────────────────────────────────
const RIASEC_OPTS = ["YES","PROBABLY YES","NEUTRAL","PROBABLY NO","NO"];
const STREAM_OPTS = ["DAMN SURE","YES","DON'T KNOW","NO"];
const SKILL_OPTS  = ["SURE","YES","NOT REALLY","NO"];
const DISC_OPTS   = ["ME","MOST OF THE TIMES ME","SOMETIMES ME","NOT ME"];
const CAREER_OPTS = ["Never Interested","Curious to Explore","Fascinated but Not as a Career","Interested as a Possible Career","Strongly Want to Pursue This Career"];

const RIASEC_QS = [
  {id:"entry.2117508378", q:"Would you like to know how machines work?"},
  {id:"entry.1403457617", q:"Would you like to analyse the structure of a molecule?"},
  {id:"entry.2031719057", q:"Would you like to do scientific experiments?"},
  {id:"entry.1611658598", q:"Would you like to design a magazine cover?"},
  {id:"entry.1752252924", q:"Would you like to counsel people in their life-issues?"},
  {id:"entry.82386440",   q:"Would you like to teach college students?"},
  {id:"entry.706786588",  q:"Would you like to be a part of business development team?"},
  {id:"entry.1605442442", q:"Would you like to plan marketing strategies for companies?"},
  {id:"entry.1983116928", q:"Would you like to create the budget of a company?"},
  {id:"entry.2062740662", q:"Would you like to be an engineer on construction site?"},
  {id:"entry.265421589",  q:"Would you like to work on innovative electronics system?"},
  {id:"entry.1175637981", q:"Would you like to work in armed forces?"},
  {id:"entry.348479546",  q:"Would you like to research on new medicines?"},
  {id:"entry.1799067960", q:"Would you like to design clothes and jewelleries?"},
  {id:"entry.1364334358", q:"Would you like to be part of diverse cultural organisation?"},
  {id:"entry.1136639172", q:"Would you like to campaign for social community welfare?"},
  {id:"entry.1875318005", q:"Would you like to fight commercial cases in court?"},
  {id:"entry.888525613",  q:"Would you like to be a teacher or professor?"},
  {id:"entry.327954271",  q:"Would you like to work as accounts manager in a bank?"},
  {id:"entry.866664357",  q:"Would you like to study more about robotics?"},
  {id:"entry.503564803",  q:"Would you like to be a part of bio-chemistry research team?"},
  {id:"entry.1849976054", q:"Would you like to study about human cells and anatomy?"},
  {id:"entry.138570383",  q:"Would you like to work in a forensics research lab?"},
  {id:"entry.1686932874", q:"Would you like to create package designs for products?"},
  {id:"entry.1403673100", q:"Would you like to write script for a television show?"},
  {id:"entry.641924496",  q:"Would you like to analyse a company's business strategy?"},
  {id:"entry.476610195",  q:"Would you like to be a statistics and data analyst for banks?"},
  {id:"entry.2131928427", q:"Would you like to work in automobile production factory?"},
  {id:"entry.655448934",  q:"Would you like to study deep about living organisms?"},
  {id:"entry.2109560747", q:"Would you like to design a billboard advertisement?"},
  {id:"entry.614680667",  q:"Would you like to be part of back-stage movie team?"},
  {id:"entry.956477795",  q:"Would you like to plan be a counsellor in a highschool?"},
  {id:"entry.417340698",  q:"Would you like to plan innovate the method of teaching?"},
  {id:"entry.1762235921", q:"Would you like to be a event management team-leader?"},
  {id:"entry.983549651",  q:"Would you like to convince people and sell them products?"},
  {id:"entry.9263202",    q:"Would you like to do extensive business calculations?"},
  {id:"entry.1097439242", q:"Would you like to read theories and lengthy books?"},
  {id:"entry.303270498",  q:"Would you like to explore more about drones and robots?"},
  {id:"entry.99235667",   q:"Would you like to design and make furniture and interiors?"},
  {id:"entry.1002135215", q:"Would you like to do laboratory tests and diagnosis?"},
  {id:"entry.1650866840", q:"Would you like to compose songs and musical beats?"},
  {id:"entry.720472902",  q:"Would you like to write poems, lyrics and stories?"},
  {id:"entry.1069907789", q:"Would you like to help people to get justice?"},
  {id:"entry.794602954",  q:"Would you like to work with social NGOs?"},
  {id:"entry.399877488",  q:"Would you like to give speeches in front of people?"},
  {id:"entry.811526799",  q:"Would you like to persuade others to your point of view?"},
  {id:"entry.1544073910", q:"Would you like to study 12 hours a day for civil services?"},
  {id:"entry.1984095465", q:"Would you like to work in a normal simple 9 to 5 job?"},
];

const STREAM_QS = [
  {id:"entry.234295014",  q:"Study how car mechanism works and design automobiles."},
  {id:"entry.480471154",  q:"Study human behaviour and mental health."},
  {id:"entry.1677510392", q:"Be a executive chef at a restaurant."},
  {id:"entry.222339956",  q:"Learn how mobile phones and electronics works."},
  {id:"entry.917477102",  q:"Work as police or any local forces."},
  {id:"entry.1872307094", q:"Handle stock input-output of a business."},
  {id:"entry.1915172747", q:"Learn coding and make websites."},
  {id:"entry.1830574932", q:"Serve nation in armed forces."},
  {id:"entry.1858455318", q:"Know how import-export system of India works."},
  {id:"entry.193444268",  q:"Do complex mathematics."},
  {id:"entry.1342394982", q:"Be a professional beauty expert."},
  {id:"entry.1170060284", q:"Convince customers and sell products."},
  {id:"entry.1218036297", q:"Know more about computer and data science."},
  {id:"entry.188928210",  q:"Design new trendy cloths and apparels."},
  {id:"entry.1143546110", q:"Handle financial accounts for organisations."},
  {id:"entry.874611705",  q:"Understand and solve complex physics."},
  {id:"entry.133502127",  q:"Design interior of a house."},
  {id:"entry.1883836614", q:"Make strategies to grow your business enterprise."},
  {id:"entry.1033877971", q:"Explore the science behind electricity and electronics."},
  {id:"entry.1470992884", q:"Draw paintings and create artistic things."},
  {id:"entry.178812831",  q:"Study how stock market works."},
  {id:"entry.1871605882", q:"Learn complex algebra and statistics."},
  {id:"entry.1875374889", q:"Choreograph a dance drama act."},
  {id:"entry.108422128",  q:"Deal in buying and selling of companies."},
  {id:"entry.425675492",  q:"Join merchant navy and be captain of commercial ships."},
  {id:"entry.1388596863", q:"Learn about science and technology used in constructions."},
  {id:"entry.376082361",  q:"Write a script of movie or a TV show."},
  {id:"entry.1095432201", q:"Learn about tax system of India."},
  {id:"entry.2036810588", q:"Explore and understand complex architecture."},
  {id:"entry.1154612487", q:"Shoot a movie or a short film."},
  {id:"entry.1983872181", q:"Deal how economy of countries rise and fall."},
  {id:"entry.266851010",  q:"Explore more about big machineries and robotics."},
  {id:"entry.1756662177", q:"To be a actor dancer or a singer."},
  {id:"entry.1982633048", q:"To do complex calculations in more than seven digits."},
  {id:"entry.312918797",  q:"Explore science of space sky sea and universe."},
  {id:"entry.94199510",   q:"Do complex accounting and book-reporting."},
  {id:"entry.743249265",  q:"Work in film industry stage management crew."},
  {id:"entry.1204914509", q:"Know all things about constitution of India."},
  {id:"entry.801364792",  q:"Study human body anatomy deeply."},
  {id:"entry.2045880921", q:"Manage events and celebrities."},
  {id:"entry.1374070134", q:"To study laws and policies of the country."},
  {id:"entry.155017252",  q:"Do experiments with chemicals."},
  {id:"entry.167738692",  q:"Be artificial intelligence or IoT expert."},
  {id:"entry.1339257224", q:"Master the languages and grammar."},
  {id:"entry.1480974467", q:"Calculate the mathematically complex claims for insurance."},
  {id:"entry.1724213523", q:"Cure human ailments through exercises."},
  {id:"entry.1313067134", q:"Create fictional content and stories."},
  {id:"entry.822080114",  q:"Solve and investigate criminal cases."},
  {id:"entry.2111572756", q:"Travel in airplanes as air hostess or cabin crew."},
  {id:"entry.2128815971", q:"Study deeply about plants and micro-organisms."},
  {id:"entry.809648477",  q:"Deeply explore the periodic table and chemical elements."},
  {id:"entry.1506747436", q:"Research on literature and write books and stories."},
  {id:"entry.620465296",  q:"Know laws, rules, regulations of company."},
  {id:"entry.1028056811", q:"Study how medicines are made from plants and animals."},
  {id:"entry.1294405769", q:"Do influencer marketing on social media."},
  {id:"entry.160042961",  q:"Learn the technology behind process of a DNA test."},
  {id:"entry.1670063765", q:"Operate surgery and cooperate operations."},
  {id:"entry.605870195",  q:"Learn about space technology and astrophysics."},
  {id:"entry.1993914385", q:"Research on events and write news articles."},
  {id:"entry.156439922",  q:"Do marketing and advertising campaigns for company."},
  {id:"entry.1969271620", q:"Learn technology behind blood test and X-ray machines."},
  {id:"entry.886531426",  q:"Be journalist on news TV channel."},
  {id:"entry.1941860983", q:"Plan infrastructure for city constructions."},
  {id:"entry.894189812",  q:"Prepare advertisement for commercial products."},
  {id:"entry.1064171010", q:"Caress and treat animals and be a animal doctor."},
  {id:"entry.387498472",  q:"Want to be medical doctor."},
  {id:"entry.130703967",  q:"An eminent political lawyer."},
  {id:"entry.1923282426", q:"Learn about medicines and pharmaceutical science."},
  {id:"entry.620852603",  q:"Manage restaurant and hotel chains."},
  {id:"entry.14851742",   q:"Explore more about farming and agriculture."},
  {id:"entry.603149967",  q:"Analyse the bills and acts passed by legislature."},
  {id:"entry.1072959813", q:"Study yoga and be physical trainer."},
  {id:"entry.1659689329", q:"Serve nation in Indian air force."},
  {id:"entry.1922171732", q:"Learn about food nutritions and food technology."},
  {id:"entry.1096529748", q:"Be a pastry chef at a hotel."},
  {id:"entry.1798280736", q:"Fly in aeroplane as pilot."},
  {id:"entry.1134591220", q:"Know about drugs-design chemistry."},
  {id:"entry.1608563440", q:"Do biological research and lab work."},
  {id:"entry.1351279126", q:"Handle complex data and statistics."},
  {id:"entry.640842130",  q:"Be a sportsman and physical trainer."},
  {id:"entry.1323615476", q:"Study about nature environment and climate."},
  {id:"entry.1460707556", q:"Study about archaeology and historical events and thesis."},
  {id:"entry.1605931824", q:"Be a guide in tourism company."},
  {id:"entry.1369157229", q:"Learn making softwares and mobile applications."},
  {id:"entry.1138179987", q:"Get involve in politics and parliamentary studies."},
  {id:"entry.1642315295", q:"Study about human behaviour and psychology."},
  {id:"entry.39426246",   q:"Lead a business team."},
];

const SKILL_QS = [
  {id:"entry.2055001762", q:"Can you talk in front of audience smoothly and host shows?"},
  {id:"entry.433362184",  q:"Can you solve complex calculations correctly?"},
  {id:"entry.426924892",  q:"Can you convince people to your idea?"},
  {id:"entry.1602910789", q:"Can you remember dates in history?"},
  {id:"entry.1848897582", q:"Can you give speech in-front of audience easily?"},
  {id:"entry.1357106546", q:"Can you solve equations in chemistry good?"},
  {id:"entry.1869205526", q:"Can you draw or paint easily?"},
  {id:"entry.90310701",   q:"Can you remember names of organisms and process easily?"},
  {id:"entry.1447852416", q:"Can you understand and solve physics?"},
  {id:"entry.1126503907", q:"Can you perform art forms like dance, drama & music confidently?"},
  {id:"entry.1569168929", q:"Can you understand and calculate mean mode median fast?"},
  {id:"entry.145605789",  q:"Can you remember terms in geography and economics?"},
  {id:"entry.589668335",  q:"Can you do geometry accurately?"},
  {id:"entry.1189313616", q:"Can you give presentations easily?"},
  {id:"entry.1139156926", q:"Can you do creative stuffs with clay and craft paper?"},
  {id:"entry.373784764",  q:"Can you solve maths in the physics easily?"},
  {id:"entry.78050403",   q:"Can you understand and remember rules in grammar correctly?"},
  {id:"entry.1675605286", q:"Can you understand and explain the biological process easily?"},
  {id:"entry.500140157",  q:"Can you create poems and interesting stories?"},
  {id:"entry.359386478",  q:"Can you keep records accurately?"},
  {id:"entry.1748702688", q:"Can you solve mensuration based question smooth?"},
  {id:"entry.1880586277", q:"Can you by-heart and speak poems in orals?"},
  {id:"entry.801923247",  q:"Can you solve trigonometry easily?"},
  {id:"entry.1564949957", q:"Can you make pretty design cards?"},
  {id:"entry.1285626189", q:"Can you debate strongly and prove your point correct?"},
];

const DISC_QS = [
  {id:"entry.1025139414", q:"I always prefer to start with the pros and cons of a problem."},
  {id:"entry.540923845",  q:"I am a silent supporter of those I care about."},
  {id:"entry.1804685313", q:"I enjoy it when others notice and compliment my accomplishments."},
  {id:"entry.1417025634", q:"I am concerned with procedures and rules."},
  {id:"entry.1968183941", q:"I prefer stable environments over changing ones."},
  {id:"entry.1488865871", q:"I am frequently assertive, commanding, and decisive."},
  {id:"entry.60155967",   q:"I consider myself to be a well-organized and disciplined individual."},
  {id:"entry.661194040",  q:"I deal with situations calmly and quietly."},
  {id:"entry.1235717722", q:"I enjoy doing multiple tasks at once."},
  {id:"entry.540316164",  q:"I frequently prefer to read for long periods of time."},
  {id:"entry.1133757093", q:"I have a high sense of self-worth and believe that everything I do is always correct."},
  {id:"entry.1802592111", q:"I identify as an extrovert."},
  {id:"entry.1644317307", q:"I like to lead a team and seek to avoid being under someone's authority."},
  {id:"entry.1632074161", q:"I often like to contemplate deep on issues."},
  {id:"entry.824393371",  q:"I am motivated by stability and no-change."},
  {id:"entry.760228936",  q:"I like to motivate people."},
  {id:"entry.403138486",  q:"I love tasks, order, and details."},
  {id:"entry.1809812988", q:"I am concerned with stability and minimal risk."},
  {id:"entry.409728133",  q:"I love to meet new people."},
  {id:"entry.1665343596", q:"I make decisions based on emotions rather than logic."},
  {id:"entry.1545737949", q:"I often enjoy working in a team."},
  {id:"entry.1907489452", q:"I am driven by quality and accuracy."},
  {id:"entry.23142631",   q:"I enjoy influencing and inspiring people."},
  {id:"entry.710040268",  q:"I often feel I have people's admiration and likeliness."},
  {id:"entry.2110362277", q:"I prefer being a member of a team over leading the team."},
  {id:"entry.2060907688", q:"I love to analyse data and situations."},
  {id:"entry.1801903642", q:"I am motivated by friends and acquaintances."},
  {id:"entry.109337100",  q:"I prefer personal involvement rather than group discussions."},
  {id:"entry.969022652",  q:"I prioritise tasks over people and myself."},
  {id:"entry.1124053278", q:"I seek enthusiasm in people and situations, rather than data and logic."},
  {id:"entry.1178888833", q:"I prefer sincerity and do things on my own."},
  {id:"entry.872408673",  q:"I am driven by success and power."},
  {id:"entry.1716158190", q:"I enjoy small groups of people."},
  {id:"entry.160091312",  q:"I tend to be the life of the party."},
  {id:"entry.100478276",  q:"I thrive in a challenge-based environment."},
  {id:"entry.1009573759", q:"I typically do not take big risks."},
  {id:"entry.1820434401", q:"I usually look forward to getting work done by others and getting a precise result."},
  {id:"entry.1474303054", q:"I prefer specifics over generalizations."},
  {id:"entry.917110921",  q:"I am optimistic about others."},
  {id:"entry.1228370897", q:"I am usually concerned with being number 1."},
];

const CAREER_QS = [
  {id:"entry.1360807461", q:"Design websites, apps or digital platforms"},
  {id:"entry.1040899423", q:"Develop artificial intelligence and smart technologies"},
  {id:"entry.478950464",  q:"Study coding, software and computer systems"},
  {id:"entry.632259183",  q:"Research diseases, medicines and healthcare treatments"},
  {id:"entry.824629583",  q:"Work in hospitals, laboratories or healthcare services"},
  {id:"entry.1186256265", q:"Study genetics, biotechnology and life sciences"},
  {id:"entry.2020198461", q:"Explore space science, astronomy and satellites"},
  {id:"entry.1255831338", q:"Research physics, chemistry or advanced scientific theories"},
  {id:"entry.132013992",  q:"Work on environmental conservation and climate solutions"},
  {id:"entry.797911834",  q:"Design machines, automobiles or robotics systems"},
  {id:"entry.1679834248", q:"Build bridges, roads or large infrastructure projects"},
  {id:"entry.1788107635", q:"Study architecture, interior design and urban planning"},
  {id:"entry.900137311",  q:"Analyse data, statistics and business trends"},
  {id:"entry.1871500886", q:"Learn about stock markets, investments and finance"},
  {id:"entry.153146400",  q:"Manage companies, businesses or start-ups"},
  {id:"entry.1736413851", q:"Work in banking, accounting or financial consulting"},
  {id:"entry.99930960",   q:"Study economics, trade and global markets"},
  {id:"entry.908292400",  q:"Handle law, courts and legal problem-solving"},
  {id:"entry.679703792",  q:"Work in government administration or civil services"},
  {id:"entry.2082024203", q:"Study international relations, politics or diplomacy"},
  {id:"entry.1754579877", q:"Teach, mentor or guide students academically"},
  {id:"entry.1597112923", q:"Study psychology, counselling and human behaviour"},
  {id:"entry.1724683294", q:"Write articles, blogs, books or news reports"},
  {id:"entry.1277370052", q:"Create advertisements, branding or marketing campaigns"},
  {id:"entry.48131892",   q:"Work in filmmaking, acting or media production"},
  {id:"entry.2012904065", q:"Explore music, dance, theatre or performing arts"},
  {id:"entry.1612501545", q:"Manage social media, digital content or influencing"},
  {id:"entry.431115420",  q:"Organise events, public relations or corporate communications"},
  {id:"entry.1584430896", q:"Work in hospitality, tourism or travel management"},
  {id:"entry.1702851391", q:"Help communities through social work and public service"},
];

const SUBJECT_OPTS = ["Maths","Science","English","Computer","Social science","Hindi / English / Sanskrit","Drawing"];
const SUBJECT_OPTS_LEAST = ["Maths","Science","English","Computer","Social science","Hindi / Marathi / Sanskrit","Drawing"];
const SCIENCE_OPTS = ["Maths","Chemistry","Biology","Physics"];

// ─────────────────────────────────────────
// REUSABLE COMPONENTS
// ─────────────────────────────────────────

function GridSection({ questions, options, answers, onChange, twoCol }) {
  const cols = twoCol ? 2 : 1;
  const chunkSize = twoCol ? Math.ceil(questions.length / 2) : questions.length;
  const chunks = twoCol
    ? [questions.slice(0, chunkSize), questions.slice(chunkSize)]
    : [questions];

  return (
    <div style={{ overflowX:"auto" }}>
      {chunks.map((chunk, ci) => (
        <table key={ci} style={{ ...s.gridTable, marginBottom: ci === 0 && twoCol ? 24 : 0 }}>
          <thead>
            <tr>
              <th style={{ ...s.gridTh, textAlign:"left", width:"40%" }}>Question</th>
              {options.map(o => <th key={o} style={s.gridTh}>{o}</th>)}
            </tr>
          </thead>
          <tbody>
            {chunk.map((q, idx) => (
              <tr key={q.id} style={{ background: idx % 2 === 0 ? white : greyL }}>
                <td style={s.gridTdQ}>{q.q}</td>
                {options.map(o => (
                  <td key={o} style={s.gridTd}>
                    <div
                      style={s.gridRadio(answers[q.id] === o)}
                      onClick={() => onChange(q.id, o)}
                    >
                      {answers[q.id] === o && <div style={{ width:10, height:10, borderRadius:"50%", background:white }} />}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}

function SelectDropdown({ id, options, value, onChange, label }) {
  return (
    <div style={{ marginBottom:20 }}>
      <label style={s.label}>{label}<span style={s.required}>*</span></label>
      <select
        value={value || ""}
        onChange={e => onChange(id, e.target.value)}
        style={{ ...s.input, cursor:"pointer" }}
        onFocus={e => e.target.style.borderColor = pink}
        onBlur={e => e.target.style.borderColor = "#E2E8F0"}
      >
        <option value="">— Select —</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─────────────────────────────────────────
// SECTION COMPONENTS
// ─────────────────────────────────────────

function Sec1({ ans, setAns }) {
  const fields = [
    { id:"entry.573461586",  label:"Name of the student",     type:"text",     required:true },
    { id:"entry.301593382",  label:"Name of the school / Board", type:"text",  required:true },
    { id:"entry.5800063",    label:"Career role model",        type:"text",     required:true },
    { id:"entry.574477456",  label:"Interests / Hobbies",      type:"textarea", required:true },
    { id:"entry.1343955672", label:"Achievement",              type:"textarea", required:true },
    { id:"entry.972517876",  label:"Mobile number",            type:"text",     required:true },
  ];
  return (
    <div>
      {fields.map(f => (
        <div key={f.id} style={{ marginBottom:20 }}>
          <label style={s.label}>{f.label}<span style={s.required}>*</span></label>
          {f.type === "textarea"
            ? <textarea style={s.textarea} value={ans[f.id]||""} onChange={e => setAns(p=>({...p,[f.id]:e.target.value}))}
                onFocus={e=>e.target.style.borderColor=pink} onBlur={e=>e.target.style.borderColor="#E2E8F0"} />
            : <input type="text" style={s.input} value={ans[f.id]||""} onChange={e => setAns(p=>({...p,[f.id]:e.target.value}))}
                onFocus={e=>e.target.style.borderColor=pink} onBlur={e=>e.target.style.borderColor="#E2E8F0"} />
          }
        </div>
      ))}
    </div>
  );
}

function SecGrid({ questions, options, ans, setAns }) {
  return <GridSection questions={questions} options={options} answers={ans} onChange={(id,v) => setAns(p=>({...p,[id]:v}))} />;
}

function Sec6({ ans, setAns }) {
  return (
    <div>
      <SelectDropdown id="entry.1957892885" options={SUBJECT_OPTS} value={ans["entry.1957892885"]} onChange={(id,v)=>setAns(p=>({...p,[id]:v}))} label="Your 1st most preferred subject" />
      <SelectDropdown id="entry.693493186"  options={SUBJECT_OPTS} value={ans["entry.693493186"]}  onChange={(id,v)=>setAns(p=>({...p,[id]:v}))} label="Your 2nd most preferred subject" />
      <SelectDropdown id="entry.1922199109" options={SUBJECT_OPTS} value={ans["entry.1922199109"]} onChange={(id,v)=>setAns(p=>({...p,[id]:v}))} label="Your 3rd most preferred subject" />
      <SelectDropdown id="entry.579802128"  options={SUBJECT_OPTS_LEAST} value={ans["entry.579802128"]} onChange={(id,v)=>setAns(p=>({...p,[id]:v}))} label="Your least preferred subject" />
      <SelectDropdown id="entry.208227657"  options={SCIENCE_OPTS} value={ans["entry.208227657"]}  onChange={(id,v)=>setAns(p=>({...p,[id]:v}))} label="Preferred science subject" />
      <div style={{ marginTop:32 }}>
        <p style={{ fontWeight:700, fontSize:15, color:navy, marginBottom:20 }}>Career Interest & Exploration Scale</p>
        <p style={{ fontSize:13, color:grey, marginBottom:20 }}>Rate each career field based on your interest:</p>
        {CAREER_QS.map((q,i) => (
          <div key={q.id} style={{ marginBottom:16, padding:"16px 20px", background: i%2===0 ? greyL : white, borderRadius:12, border:`1px solid ${ans[q.id]?"#E8197D20":"#F0F0F0"}` }}>
            <p style={{ fontSize:14, color:navy, fontWeight:500, marginBottom:10 }}>{q.q}</p>
            <div style={s.optionRow}>
              {CAREER_OPTS.map(o => (
                <button key={o} style={{ ...s.optBtn(ans[q.id]===o), fontSize:12, padding:"6px 12px" }} onClick={()=>setAns(p=>({...p,[q.id]:o}))}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sec7({ ans, setAns }) {
  const qs = [
    { id:"entry.1687531616", label:"Fast forward to 2034 — you've graduated and been out in the world for a decade. Paint a picture of your life. What job are you doing? Where are you living? What achievements are you proud of? Dream BIG!" },
    { id:"entry.746970427",  label:"What activities or subjects genuinely excite you and make you lose track of time?" },
    { id:"entry.371220661",  label:"If God offered you three skills as a gift, which ones would you choose to enhance your life and why?" },
    { id:"entry.2087405156", label:"Write all your queries about your career selection journey that you need SAGE to answer." },
  ];
  return (
    <div>
      {qs.map((q,i) => (
        <div key={q.id} style={{ marginBottom:28 }}>
          <label style={{ ...s.label, fontSize:14, lineHeight:1.6, marginBottom:12 }}>Q{i+1}: {q.label}</label>
          <textarea
            style={{ ...s.textarea, minHeight:120 }}
            value={ans[q.id]||""}
            onChange={e=>setAns(p=>({...p,[q.id]:e.target.value}))}
            placeholder="Write freely — no grammar pressure. The more you write, the better your report! 💙"
            onFocus={e=>e.target.style.borderColor=pink}
            onBlur={e=>e.target.style.borderColor="#E2E8F0"}
          />
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// SECTIONS CONFIG
// ─────────────────────────────────────────
const SECTIONS = [
  {
    num:"Section 1 of 7", title:"Let's Get to Know You", icon:"👋",
    desc:"Fill in your basic details. These help us personalise your career report just for you.",
    validate: (ans) => {
      const req = ["entry.573461586","entry.301593382","entry.5800063","entry.574477456","entry.1343955672","entry.972517876"];
      return req.every(k => ans[k] && ans[k].trim());
    },
    component: (ans, setAns) => <Sec1 ans={ans} setAns={setAns} />,
  },
  {
    num:"Section 2 of 7", title:"RIASEC Interest Assessment", icon:"🔍",
    desc:"This section explores your natural interests across 6 personality types.\n\nYES = firmly sure you like that activity | PROBABLY YES = probably like it | NEUTRAL = neither | PROBABLY NO = probably dislike | NO = firmly sure you dislike it",
    validate: (ans) => RIASEC_QS.every(q => ans[q.id]),
    component: (ans, setAns) => <SecGrid questions={RIASEC_QS} options={RIASEC_OPTS} ans={ans} setAns={setAns} />,
  },
  {
    num:"Section 3 of 7", title:"Stream Interest Assessment", icon:"🎯",
    desc:"These questions explore which vocational areas excite you most.\n\nDAMN SURE = absolutely certain you'd love this | YES = probably enjoy | DON'T KNOW = unsure | NO = certain you wouldn't enjoy",
    validate: (ans) => STREAM_QS.every(q => ans[q.id]),
    component: (ans, setAns) => <SecGrid questions={STREAM_QS} options={STREAM_OPTS} ans={ans} setAns={setAns} />,
  },
  {
    num:"Section 4 of 7", title:"Skills & Abilities Assessment", icon:"💡",
    desc:"Rate your own abilities honestly — not what you wish you could do, but what you can actually do right now.\n\nSURE = very well | YES = slightly | NOT REALLY = some basic ability | NO = cannot do this currently",
    validate: (ans) => SKILL_QS.every(q => ans[q.id]),
    component: (ans, setAns) => <SecGrid questions={SKILL_QS} options={SKILL_OPTS} ans={ans} setAns={setAns} />,
  },
  {
    num:"Section 5 of 7", title:"Personality & Behaviour Assessment", icon:"🧠",
    desc:"These statements describe different personality types. Select the option that matches YOU most accurately — be honest!\n\nME = all the time | MOST OF THE TIMES ME = more than half | SOMETIMES ME = occasionally | NOT ME = almost opposite",
    validate: (ans) => DISC_QS.every(q => ans[q.id]),
    component: (ans, setAns) => <SecGrid questions={DISC_QS} options={DISC_OPTS} ans={ans} setAns={setAns} />,
  },
  {
    num:"Section 6 of 7", title:"Subject Preferences & Career Interest Scale", icon:"📊",
    desc:"Almost done, Champ! 🎉 Rank your subjects and rate your interest in different career areas. Go with your gut — not your marks!",
    validate: (ans) => {
      const req = ["entry.1957892885","entry.693493186","entry.1922199109","entry.579802128","entry.208227657"];
      return req.every(k => ans[k]);
    },
    component: (ans, setAns) => <Sec6 ans={ans} setAns={setAns} />,
  },
  {
    num:"Section 7 of 7", title:"Open Reflection — Your Story", icon:"✍️",
    desc:"This is the most important section. Write freely and honestly. No grammar pressure — write in any language or style that feels natural.\n\nTeam SAGE reads every single word. 💙 The more you write, the better your report!",
    validate: () => true,
    component: (ans, setAns) => <Sec7 ans={ans} setAns={setAns} />,
  },
];

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────
export default function Assessment({ partnerLogo, partnerName }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const sec = SECTIONS[step];
  const pct = ((step) / SECTIONS.length) * 100;

  const next = () => {
    if (!sec.validate(ans)) {
      setError("⚠️ Please answer all questions in this section before continuing.");
      window.scrollTo({ top: 0, behavior:"smooth" });
      return;
    }
    setError("");
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior:"smooth" });
  };

  const prev = () => {
    setError("");
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior:"smooth" });
  };

  const submit = async () => {
    setSubmitting(true);
    await submitToGoogleForms(ans);
    setDone(true);
    window.scrollTo({ top: 0, behavior:"smooth" });
  };

  if (done) {
    return (
      <div style={s.successWrap}>
        <div style={s.successCard}>
          <div style={{ fontSize:64, marginBottom:16 }}>🚀</div>
          <h1 style={{ fontFamily:FD, fontSize:28, fontWeight:800, color:navy, marginBottom:12 }}>You're Amazing, Champ!</h1>
          <p style={{ color:grey, lineHeight:1.8, marginBottom:24 }}>
            Thank you for completing the SAGE Career Assessment. Your personalised psychometric career-discovery report is being prepared by Team SAGE.
          </p>
          <div style={{ background:pinkL, borderRadius:12, padding:"16px 20px", marginBottom:24 }}>
            <p style={{ color:pink, fontWeight:700, margin:0 }}>📅 Expect your report in 3–5 working days</p>
          </div>
          <p style={{ color:grey, fontSize:14 }}>
            Questions? Reach us at{" "}
            <a href="mailto:Sageducations@gmail.com" style={{ color:pink }}>Sageducations@gmail.com</a>
          </p>
          <p style={{ color:"#94A3B8", fontSize:13, marginTop:16, fontStyle:"italic" }}>
            "We let you know, your BRIGHT future" — Team SAGE
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={s.wrap}>
      {/* Top bar */}
      <div style={s.topBar}>
        <div style={s.topInner}>
          {partnerLogo
            ? <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <img src={partnerLogo} alt={partnerName} style={{ height:40, objectFit:"contain" }} onError={e=>e.currentTarget.style.display="none"} />
                <span style={{ fontSize:12, color:grey }}>Powered by SAGE</span>
              </div>
            : <img src="/Sage Ed - Logo.png" alt="SAGE Educations" style={s.logo} />
          }
          <div style={s.progress}>
            <div style={s.progressBar}><div style={s.progressFill(pct)} /></div>
            <div style={s.progressText}>Section {step+1} of {SECTIONS.length}</div>
          </div>
          <span style={{ fontSize:13, color:grey, whiteSpace:"nowrap" }}>⏱ 90–120 min</span>
        </div>
      </div>

      {/* Section card */}
      <div style={s.card}>
        {error && (
          <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:12, padding:"14px 20px", marginBottom:16, color:"#DC2626", fontSize:14 }}>
            {error}
          </div>
        )}

        <div style={s.sectionCard}>
          <div style={s.sectionHeader}>
            <div style={s.sectionNum}>{sec.num}</div>
            <h2 style={s.sectionTitle}>{sec.icon} {sec.title}</h2>
            <p style={s.sectionDesc}>{sec.desc}</p>
          </div>
          <div style={s.sectionBody}>
            {sec.component(ans, setAns)}

            <div style={s.navRow}>
              {step > 0
                ? <button style={s.btnPrev} onClick={prev}>← Previous</button>
                : <div />
              }
              {step < SECTIONS.length - 1
                ? <button style={s.btnNext} onClick={next}>Next Section →</button>
                : <button style={s.btnSubmit} onClick={submit} disabled={submitting}>
                    {submitting ? "Submitting... 🚀" : "Submit Assessment 🎉"}
                  </button>
              }
            </div>
          </div>
        </div>

        <p style={{ textAlign:"center", color:"#94A3B8", fontSize:13, marginTop:16 }}>
          🔒 Your responses are completely confidential and go directly to Team SAGE.
        </p>
      </div>
    </div>
  );
}
