import { Bookmark, Search, User, Briefcase, Heart, Globe, Sparkles, Zap, Flame, ShieldAlert, MapPin, ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import OrthodoxSaintTabs from "../../../../components/OrthodoxSaintTabs";
import orthodoxCalendarData from "../../../../data/orthodox_calendar_data.json";

interface PatronSaint {
  name: string;
  patronage: string;
  feastDay: string;
  tradition: string;
  category: "profession" | "ailment" | "nation" | "general" | "addiction" | "prayer" | "healing";
  country?: string;
  isCurated?: boolean;
  dateKey?: string;
}

export default function PatronSaintsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedCountry, setSelectedCountry] = useState<string>("All Countries");
  const [viewMode, setViewMode] = useState<"grid" | "world">("grid");

  const curatedPatrons: PatronSaint[] = useMemo(() => [
    { name: "St. Panteleimon", patronage: "Physicians, Midwives, and All Healing", feastDay: "July 27", tradition: "Orthodox", category: "healing", country: "Asia Minor", isCurated: true, dateKey: "07-27" },
    { name: "St. Luke the Apostle", patronage: "Artists, Physicians, Surgeons", feastDay: "October 18", tradition: "Orthodox", category: "profession", country: "Greece", isCurated: true, dateKey: "10-18" },
    { name: "St. Nicholas of Myra", patronage: "Children, Sailors, Travelers", feastDay: "December 6", tradition: "Orthodox", category: "general", country: "Lycia", isCurated: true, dateKey: "12-06" },
    { name: "St. George the Victory-Bearer", patronage: "Soldiers, Farmers, Scouts", feastDay: "April 23", tradition: "Orthodox", category: "profession", country: "Cappadocia", isCurated: true, dateKey: "04-23" },
    { name: "St. Barbara", patronage: "Architects, Engineers, Miners", feastDay: "December 4", tradition: "Orthodox", category: "profession", country: "Syria", isCurated: true, dateKey: "12-04" },
    { name: "St. Catherine of Alexandria", patronage: "Philosophers, Students, Librarians", feastDay: "November 25", tradition: "Orthodox", category: "profession", country: "Egypt", isCurated: true, dateKey: "11-25" },
    { name: "St. Blaise", patronage: "Ailments of the Throat", feastDay: "February 3", tradition: "Shared", category: "healing", country: "Armenia", isCurated: true, dateKey: "02-03" },
    { name: "St. Jude Thaddeus", patronage: "Lost Causes and Desperate Situations", feastDay: "June 19", tradition: "Shared", category: "prayer", country: "Judea", isCurated: true, dateKey: "06-19" },
    { name: "St. Christopher", patronage: "Travelers and Drivers", feastDay: "May 9", tradition: "Shared", category: "general", country: "Canaan", isCurated: true, dateKey: "05-09" },
    { name: "St. Andrew the Apostle", patronage: "Fishermen, Scotland, Greece, Russia", feastDay: "November 30", tradition: "Orthodox", category: "nation", country: "Greece", isCurated: true, dateKey: "11-30" },
    { name: "St. Patrick", patronage: "Ireland, Engineers", feastDay: "March 17", tradition: "Shared", category: "nation", country: "Ireland", isCurated: true, dateKey: "03-17" },
    { name: "St. Joseph the Hesychast", patronage: "Hesychasts, Monastics, and Prayer", feastDay: "August 16", tradition: "Orthodox", category: "prayer", country: "Greece", isCurated: true, dateKey: "08-16" },
    { name: "St. Nectarius of Aegina", patronage: "Cancer Patients and Heart Ailments", feastDay: "November 9", tradition: "Orthodox", category: "healing", country: "Greece", isCurated: true, dateKey: "11-09" },
    { name: "St. Paisios the Athonite", patronage: "Families, Radio Operators, and Spiritual Healing", feastDay: "July 12", tradition: "Orthodox", category: "healing", country: "Greece", isCurated: true, dateKey: "07-12" },
    { name: "St. Herman of Alaska", patronage: "North America", feastDay: "December 13", tradition: "Orthodox", category: "nation", country: "USA", isCurated: true, dateKey: "12-13" },
    { name: "St. Boniface of Tarsus", patronage: "Against Alcoholism and Addiction", feastDay: "December 19", tradition: "Orthodox", category: "addiction", country: "Cilicia", isCurated: true, dateKey: "12-19" },
    { name: "St. Mark of Ephesus", patronage: "Defenders of the Faith and Prayer", feastDay: "January 19", tradition: "Orthodox", category: "prayer", country: "Byzantium", isCurated: true, dateKey: "01-19" },
    { name: "St. Ephraim of Katounakia", patronage: "Obedience and Prayer of the Heart", feastDay: "February 27", tradition: "Orthodox", category: "prayer", country: "Greece", isCurated: true, dateKey: "02-27" },
    { name: "St. Mary of Egypt", patronage: "Penitents and Overcoming Lust/Addiction", feastDay: "April 1", tradition: "Orthodox", category: "addiction", country: "Egypt", isCurated: true, dateKey: "04-01" },
    { name: "St. Moses the Black", patronage: "Against Violence and For Addicts", feastDay: "August 28", tradition: "Orthodox", category: "addiction", country: "Egypt", isCurated: true, dateKey: "08-28" },
  ], []);

  const allSaints: PatronSaint[] = useMemo(() => {
    const list = [...curatedPatrons];
    
    const dbSaints = (orthodoxCalendarData as any[]).flatMap(day => {
      const names = day.saintsAndFeast.split(";").map((s: string) => s.trim());
      
      return names.map((name: string) => {
        let cat: PatronSaint["category"] = "general";
        let country = "Universal";
        
        const summary = day.summary.toLowerCase();
        const nLower = name.toLowerCase();

        // Enhanced Location Detection
        if (summary.includes("greece") || summary.includes("thessolonica") || summary.includes("athos") || summary.includes("corinth") || summary.includes("aegina") || summary.includes("patmos") || summary.includes("crete") || summary.includes("epirus") || summary.includes("larissa") || summary.includes("macedonia")) country = "Greece";
        if (summary.includes("russia") || summary.includes("moscow") || summary.includes("novgorod") || summary.includes("kiev") || summary.includes("valaam") || summary.includes("sarov") || summary.includes("petersburg") || summary.includes("solovki") || summary.includes("vladimir") || summary.includes("suzdal")) country = "Russia";
        if (summary.includes("serbia") || summary.includes("pech") || summary.includes("kosovo") || summary.includes("belgrade")) country = "Serbia";
        if (summary.includes("romania") || summary.includes("wallachia") || summary.includes("moldavia") || summary.includes("iasi")) country = "Romania";
        if (summary.includes("bulgaria") || summary.includes("rila") || summary.includes("tirnovo")) country = "Bulgaria";
        if (summary.includes("georgia") || summary.includes("iberia") || summary.includes("tbilisi") || summary.includes("mtskheta")) country = "Georgia";
        if (summary.includes("alaska") || summary.includes("america") || summary.includes("san francisco") || summary.includes("new york") || summary.includes("pennsylvania") || summary.includes("canada")) country = "North America";
        if (summary.includes("egypt") || summary.includes("alexandria") || summary.includes("thebaid") || summary.includes("nitria") || summary.includes("scetis")) country = "Egypt";
        if (summary.includes("syria") || summary.includes("antioch") || summary.includes("damascus") || summary.includes("edessa") || summary.includes("aleppo")) country = "Syria";
        if (summary.includes("cyprus") || summary.includes("paphos") || summary.includes("limassol")) country = "Cyprus";
        if (summary.includes("armenia") || summary.includes("aragats") || summary.includes("echmiadzin")) country = "Armenia";
        if (summary.includes("ethiopia") || summary.includes("axum")) country = "Ethiopia";
        if (summary.includes("scotland") || summary.includes("britain") || summary.includes("england") || summary.includes("ireland") || summary.includes("wales") || summary.includes("iona") || summary.includes("lindisfarne") || summary.includes("canterbury")) country = "British Isles";
        if (summary.includes("france") || summary.includes("gaul") || summary.includes("lyon") || summary.includes("tours") || summary.includes("paris")) country = "France";
        if (summary.includes("italy") || summary.includes("rome") || summary.includes("milan") || summary.includes("ravenna") || summary.includes("sicily") || summary.includes("bari")) country = "Italy";
        if (summary.includes("constantinople") || summary.includes("byzantium") || summary.includes("nicomedea") || summary.includes("ephesus") || summary.includes("sebastia") || summary.includes("chalcedon") || summary.includes("nicaea") || summary.includes("pontus") || summary.includes("cappadocia")) country = "Asia Minor";
        if (summary.includes("palestine") || summary.includes("jerusalem") || summary.includes("judea") || summary.includes("galilee") || summary.includes("bethlehem") || summary.includes("jordan") || summary.includes("sinai")) country = "Holy Land";
        if (summary.includes("spain") || summary.includes("iberian peninsula") || summary.includes("cordoba") || summary.includes("seville")) country = "Spain";
        if (summary.includes("germany") || summary.includes("saxony") || summary.includes("bavaria")) country = "Germany";
        if (summary.includes("india") || summary.includes("malabar")) country = "India";
        if (summary.includes("china") || summary.includes("beijing")) country = "China";
        if (summary.includes("japan")) country = "Japan";
        if (summary.includes("africa") || summary.includes("carthage") || summary.includes("libya") || summary.includes("numidia") || summary.includes("hippo")) country = "North Africa";
        if (summary.includes("albania")) country = "Albania";
        if (summary.includes("poland")) country = "Poland";
        if (summary.includes("czech") || summary.includes("slovakia") || summary.includes("moravia")) country = "Czechia/Slovakia";
        if (summary.includes("finland") || summary.includes("karelia")) country = "Finland";

        // Categorization
        if (summary.includes("heal") || summary.includes("physician") || summary.includes("unmercenary") || summary.includes("medicine")) cat = "healing";
        if (summary.includes("prayer") || summary.includes("hesychast") || summary.includes("ascetic") || summary.includes("hermit") || summary.includes("monk") || summary.includes("abbot")) cat = "prayer";
        if (summary.includes("repent") || summary.includes("addict") || summary.includes("conversion") || summary.includes("penitent")) cat = "addiction";
        if (summary.includes("patron") || summary.includes("protector")) cat = "nation";

        return {
          name: name,
          patronage: day.summary,
          feastDay: new Date(2024, parseInt(day.month) - 1, parseInt(day.date)).toLocaleDateString(undefined, { month: "long", day: "numeric" }),
          tradition: "Orthodox",
          category: cat,
          country: country,
          isCurated: false,
          dateKey: `${day.month.padStart(2, '0')}-${day.date.padStart(2, '0')}`
        };
      });
    });

    const seenNames = new Set(curatedPatrons.map(p => p.name.toLowerCase()));
    const uniqueDbSaints = dbSaints.filter(s => {
      if (seenNames.has(s.name.toLowerCase())) return false;
      seenNames.add(s.name.toLowerCase());
      return true;
    });

    return [...list, ...uniqueDbSaints];
  }, [curatedPatrons]);

  const countryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    allSaints.forEach(s => {
      if (s.country) {
        stats[s.country] = (stats[s.country] || 0) + 1;
      }
    });
    return Object.entries(stats)
      .sort((a, b) => b[1] - a[1])
      .filter(([name]) => name !== "Universal");
  }, [allSaints]);

  const countries = useMemo(() => {
    return ["All Countries", ...countryStats.map(s => s[0]).sort()];
  }, [countryStats]);

  const filteredSaints = useMemo(() => {
    return allSaints.filter(saint => {
      const matchesSearch = saint.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            saint.patronage.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || saint.category === activeCategory.toLowerCase();
      const matchesCountry = selectedCountry === "All Countries" || saint.country === selectedCountry;
      return matchesSearch && matchesCategory && matchesCountry;
    }).slice(0, 100);
  }, [searchQuery, activeCategory, selectedCountry, allSaints]);

  const categories = [
    { name: "All", icon: <User className="h-4 w-4" /> },
    { name: "Healing", icon: <Heart className="h-4 w-4" /> },
    { name: "Prayer", icon: <Flame className="h-4 w-4" /> },
    { name: "Addiction", icon: <ShieldAlert className="h-4 w-4" /> },
    { name: "Profession", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Nation", icon: <Globe className="h-4 w-4" /> },
  ];

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Saints", to: "/orthodox/saints" }, { label: "Patron Saints", to: "/orthodox/saints/patron-saints" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Patron Saints & Global Intercessors</h1>
        <OrthodoxSaintTabs />

        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
            <div className="flex-1 flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-primary)]/40 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search ALL saints by name or patronage..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)]/40 bg-[var(--card)] py-4 pl-10 pr-4 text-lg outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[var(--border)]/40 bg-[var(--card)] px-3 py-2">
                <MapPin className="h-5 w-5 text-[var(--accent)]" />
                <select 
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setViewMode("grid");
                  }}
                  className="bg-transparent outline-none text-sm font-medium text-[var(--text-secondary)] min-w-[160px]"
                >
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            
            <div className="flex gap-2 p-1 bg-[var(--card)] rounded-xl border border-[var(--border)]/20 self-start lg:self-center">
              <button 
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === "grid" ? "bg-[var(--accent)] text-white shadow-md" : "text-[var(--text-primary)]/60 hover:bg-[var(--accent)]/5"}`}
              >
                Directory
              </button>
              <button 
                onClick={() => setViewMode("world")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === "world" ? "bg-[var(--accent)] text-white shadow-md" : "text-[var(--text-primary)]/60 hover:bg-[var(--accent)]/5"}`}
              >
                World Map View
              </button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeCategory === cat.name 
                        ? "bg-[var(--accent)] text-white" 
                        : "bg-[var(--card)]/50 text-[var(--text-primary)]/70 hover:bg-[var(--accent)]/10 border border-[var(--border)]/20"
                    }`}
                  >
                    {cat.icon}
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]/60">
                <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                <span>
                  Searching {allSaints.length} saints across {countries.length - 1} regions.
                </span>
              </div>

              {filteredSaints.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredSaints.map((saint, idx) => (
                    <Link 
                      key={idx} 
                      to={`/orthodox/saints/synaxarion?date=${saint.dateKey}`}
                      className="block group"
                    >
                      <Card className={`h-full hover:border-[var(--accent)] transition-all hover:shadow-lg ${saint.isCurated ? "border-l-4 border-l-[var(--accent)]" : ""}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-heading text-xl text-[var(--text-secondary)] group-hover:text-[var(--accent)] line-clamp-2">{saint.name}</h3>
                              <ExternalLink className="h-4 w-4 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]/60">{saint.tradition}</span>
                              {saint.country && (
                                <span className="flex items-center gap-1 text-[10px] font-medium text-[var(--text-primary)]/50 italic">
                                  <MapPin className="h-2 w-2" /> {saint.country}
                                </span>
                              )}
                            </div>
                          </div>
                          {saint.isCurated && <Bookmark className="h-5 w-5 text-[var(--accent)] shrink-0" />}
                        </div>
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-[var(--text-primary)]/50 uppercase tracking-tighter">
                            {saint.isCurated ? "Patron Of:" : "Commemoration:"}
                          </p>
                          <p className="mt-1 text-base text-[var(--text-primary)]/90 leading-tight line-clamp-3">{saint.patronage}</p>
                        </div>
                        <div className="mt-auto pt-6 flex items-center justify-between border-t border-[var(--border)]/10">
                          <span className="text-xs font-medium text-[var(--text-primary)]/40">Feast: {saint.feastDay}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                            saint.category === "profession" ? "bg-blue-100 text-blue-700" :
                            saint.category === "healing" ? "bg-red-100 text-red-700" :
                            saint.category === "prayer" ? "bg-amber-100 text-amber-700" :
                            saint.category === "addiction" ? "bg-purple-100 text-purple-700" :
                            saint.category === "nation" ? "bg-green-100 text-green-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {saint.category}
                          </span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-20">
                  <p className="text-[var(--text-primary)]/50 italic">No saints found matching your selection.</p>
                </Card>
              )}
            </>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {countryStats.map(([name, count]) => (
                <button
                  key={name}
                  onClick={() => {
                    setSelectedCountry(name);
                    setViewMode("grid");
                  }}
                  className="group"
                >
                  <Card className="h-full hover:border-[var(--accent)] transition-all hover:shadow-md text-center py-8">
                    <div className="mx-auto h-12 w-12 rounded-full bg-[var(--accent)]/5 flex items-center justify-center group-hover:bg-[var(--accent)]/10 transition-colors">
                      <Globe className="h-6 w-6 text-[var(--accent)]" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg text-[var(--text-secondary)]">{name}</h3>
                    <p className="mt-1 text-sm font-bold text-[var(--accent)]">{count} Saints</p>
                    <p className="mt-2 text-xs text-[var(--text-primary)]/40 italic">View Local Saints &rarr;</p>
                  </Card>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
