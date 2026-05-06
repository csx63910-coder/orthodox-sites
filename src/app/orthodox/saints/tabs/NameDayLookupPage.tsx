import { useState } from "react";
import { Search, BookCopy, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Card from "../../../../components/Card";
import OrthodoxSaintTabs from "../../../../components/OrthodoxSaintTabs";
import orthodoxCalendarData from "../../../../data/orthodox_calendar_data.json";

// Mapping of Greeklish/Common variants to search terms
const NAME_VARIANTS: Record<string, string[]> = {
  "sotirios": ["sotirios", "sotiris", "soterios", "soter", "σωτήριος", "σωτήρης"],
  "sotiris": ["sotirios", "sotiris", "soterios", "soter", "σωτήριος", "σωτήρης"],
  "john": ["john", "ioannis", "yanis", "yiannis", "ιωάννης", "γιάννης"],
  "george": ["george", "georgios", "yiorgos", "yorgos", "γεώργιος", "γιώργος"],
  "nicholas": ["nicholas", "nicolaos", "nikolaos", "nikos", "νικόλαος", "νίκος"],
  "catherine": ["catherine", "katerina", "ekaterina", "aikaterini", "κατερίνα", "αικατερίνη"],
  "mary": ["mary", "maria", "panagia", "theotokos", "μαρία", "παναγία"],
  "peter": ["peter", "petros", "πέτρος"],
  "paul": ["paul", "pavlos", "παύλος"],
  "spyridon": ["spyridon", "spyros", "spiros", "σπυρίδων", "σπύρος"],
  "demetrios": ["demetrios", "dimitrios", "dimitris", "jimmy", "δημήτριος", "δημήτρης"],
  "konstantinos": ["konstantinos", "constantine", "costas", "kostas", "κωνσταντίνος", "κώστας"],
  "eleni": ["eleni", "helen", "elena", "ελένη"],
  "athanasios": ["athanasios", "thanasis", "nasos", "αθανάσιος", "θανάσης"],
  "vasilios": ["vasilios", "basil", "vassilis", "bill", "βασίλειος", "βασίλης"],
  "gregory": ["gregory", "grigorios", "γρηγόριος"],
  "andrew": ["andrew", "andreas", "ανδρέας"],
  "philip": ["philip", "philippos", "φίλιππος"],
  "thomas": ["thomas", "thomass", "θωμάς"],
  "stylianos": ["stylianos", "stelios", "στυλιανός", "στέλιος"],
  "paraskevi": ["paraskevi", "voula", "vivian", "παρασκευή"],
  "anastasia": ["anastasia", "tasia", "anastasios", "anastasis", "αναστασία", "αναστάσιος", "τάσος"],
  "theodore": ["theodore", "theodoros", "thodoris", "θεόδωρος", "θοδωρής"],
  "christos": ["christos", "chris", "χρήστος"],
  "panteleimon": ["panteleimon", "pantelis", "παντελεήμων", "παντελής"],
  "nektarios": ["nektarios", "nectarios", "νεκτάριος"],
  "paisios": ["paisios", "παΐσιος"],
  "porphyrios": ["porphyrios", "porfirios", "πορφύριος"],
  "iacovos": ["iacovos", "iakovo", "james", "ιάκωβος"],
};

export default function NameDayLookupPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (q: string) => {
    setQuery(q);
    const lowQ = q.toLowerCase().trim();
    
    if (lowQ.length < 2) {
      setResults([]);
      return;
    }

    // Find all potential search terms (the query itself + any aliases)
    const searchTerms = new Set([lowQ]);
    
    // Add variants if found
    Object.entries(NAME_VARIANTS).forEach(([key, variants]) => {
      if (lowQ.includes(key) || variants.some(v => lowQ.includes(v))) {
        variants.forEach(v => searchTerms.add(v));
        searchTerms.add(key);
      }
    });

    const filtered = (orthodoxCalendarData as any[]).filter((day: any) => {
      const text = (day.saintsAndFeast + " " + day.summary).toLowerCase();
      return Array.from(searchTerms).some(term => text.includes(term));
    }).slice(0, 50);

    setResults(filtered);
  };

  return (
    <main className="orthodox-pattern min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Orthodox", to: "/orthodox" }, { label: "Saints", to: "/orthodox/saints" }, { label: "Name Saint", to: "/orthodox/saints/name-day-lookup" }]} />
        <h1 className="font-heading text-4xl text-[var(--text-secondary)]">Name Saint</h1>
        <OrthodoxSaintTabs />

        <div className="mt-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-primary)]/40 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for your baptismal name (e.g., Nicholas, Catherine, John)..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)]/40 bg-[var(--card)] py-4 pl-10 pr-4 text-lg outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          {results.length > 0 ? (
            results.map((res, idx) => (
              <Link 
                key={idx} 
                to={`/orthodox/saints/synaxarion?date=${res.month.padStart(2, '0')}-${res.date.padStart(2, '0')}`}
                className="block"
              >
                <Card className="hover:border-[var(--accent)] transition-all group cursor-pointer hover:shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-xl text-[var(--text-secondary)] group-hover:text-[var(--accent)]">
                          {res.summary}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="mt-1 text-sm text-[var(--text-primary)]/70 line-clamp-2">
                        {res.saintsAndFeast}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="inline-block rounded-full bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-bold text-[var(--accent)]">
                        {new Date(2024, parseInt(res.month) - 1, parseInt(res.date)).toLocaleDateString(undefined, { month: "long", day: "numeric" })}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-[var(--text-primary)]/40 font-bold">
                        Feast Day
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : query.length >= 2 ? (
            <p className="text-center py-12 text-[var(--text-primary)]/50 italic">No saints found matching "{query}". Try a variation of the name.</p>
          ) : (
            <div className="text-center py-20">
              <div className="mx-auto h-16 w-16 rounded-full bg-[var(--accent)]/5 flex items-center justify-center">
                <BookCopy className="h-8 w-8 text-[var(--accent)]/40" />
              </div>
              <h2 className="mt-4 font-heading text-xl text-[var(--text-secondary)]">Find Your Name Saint</h2>
              <p className="mt-2 text-[var(--text-primary)]/60 max-w-md mx-auto">
                Enter your name above to find the holy men and women who share it, and discover when their feast days are celebrated.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
