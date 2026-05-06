import {
  BookOpen,
  CalendarDays,
  Church,
  Compass,
  GraduationCap,
  HandHeart,
  Landmark,
  MapPinned,
  Music,
  Paintbrush,
  Search,
  ScrollText,
  Sparkles,
  TentTree,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SidebarSection = {
  title: string;
  path: string;
  icon: LucideIcon;
  subItems: string[];
};

export type PageContent = {
  title: string;
  subtitle: string;
  paragraphs: string[];
  quote?: string;
  quoteSource?: string;
  items: { title: string; description: string }[];
};

export const orthodoxSections: SidebarSection[] = [
  {
    title: "Holy Scripture",
    path: "/orthodox/scripture",
    icon: BookOpen,
    subItems: ["Septuagint Old Testament", "New Testament", "Daily Scripture Readings", "Commandments"],
  },
  {
    title: "Liturgical Calendar",
    path: "/orthodox/calendar",
    icon: CalendarDays,
    subItems: [
      "Greek Orthodox Calendar",
      "Serbian Orthodox Calendar",
      "Russian Orthodox Calendar",
      "Armenian Apostolic Calendar",
      "Antiochian Orthodox Calendar",
      "Fasting Calendar",
      "Feast Days & Saints",
      "Pascha Calculator",
    ],
  },
  {
    title: "Prayer Book",
    path: "/orthodox/prayers",
    icon: HandHeart,
    subItems: [
      "Morning Prayers",
      "Evening Prayers",
      "Midnight Office",
      "Akathist Hymns",
      "Jesus Prayer Guide",
      "Prayers Before Communion",
      "Prayer Rope Guide",
      "Prayers by Jurisdiction: Greek, Slavonic, Serbian, Armenian, Antiochian",
    ],
  },
  {
    title: "Divine Liturgy",
    path: "/orthodox/liturgy",
    icon: Church,
    subItems: [
      "Liturgy of St. John Chrysostom",
      "Liturgy of St. Basil the Great",
      "Liturgy of St. James",
      "Presanctified Liturgy",
      "Armenian Badarak",
      "Liturgical Texts (Original + English)",
    ],
  },
  {
    title: "Hymns & Chant",
    path: "/orthodox/chant",
    icon: Music,
    subItems: [
      "Byzantine Chant",
      "Znamenny Chant (Russian)",
      "Serbian Chant",
      "Armenian Sharakan",
      "Antiochian Orthodox Chant",
      "Arabic Liturgical Hymns",
    ],
  },
  {
    title: "Iconography",
    path: "/orthodox/icons",
    icon: Paintbrush,
    subItems: ["Icon Gallery", "Theology of Icons", "Iconography by Tradition", "Miraculous Icons", "Home Icon Corner Guide"],
  },
  {
    title: "Catechism & Teaching",
    path: "/orthodox/catechism",
    icon: GraduationCap,
    subItems: [
      "What is Orthodoxy?",
      "Seven Ecumenical Councils",
      "Church Fathers Library",
      "Philokalia Excerpts",
      "Holy Mysteries (Sacraments)",
      "Jurisdictional Differences",
      "Convert's Guide",
    ],
  },
  {
    title: "Saints",
    path: "/orthodox/saints",
    icon: Sparkles,
    subItems: ["Lives of the Saints (Synaxarion)", "Saint of the Day", "Name Saint", "Patron Saints"],
  },
  {
    title: "Home Worship",
    path: "/orthodox/home-worship",
    icon: TentTree,
    subItems: [
      "Prayer Corner Setup",
      "Family Devotions",
      "Fasting Guidelines",
      "Preparing for Confession",
      "Preparing for Communion",
    ],
  },
  {
    title: "Parish Finder",
    path: "/orthodox/parishes",
    icon: MapPinned,
    subItems: ["Greek Orthodox", "Serbian Orthodox", "Russian Orthodox (ROCOR/OCA/MP)", "Armenian Apostolic", "Antiochian Orthodox"],
  },
  {
    title: "Resources",
    path: "/orthodox/resources",
    icon: Compass,
    subItems: ["Recommended Books", "Podcasts & Lectures", "Monastery Directory", "Pilgrimage Sites", "Downloadable PDFs"],
  },
];

export const catholicSections: SidebarSection[] = [
  {
    title: "Holy Scripture",
    path: "/catholic/scripture",
    icon: BookOpen,
    subItems: ["Full Catholic Bible (73 Books)", "Douay-Rheims Version", "NAB / RSV-CE", "Latin Vulgate", "Daily Mass Readings", "Bible Study Guides"],
  },
  {
    title: "Liturgical Calendar",
    path: "/catholic/calendar",
    icon: CalendarDays,
    subItems: ["Roman Calendar (Ordinary Form)", "Traditional Calendar (1962)", "Fasting & Abstinence", "Holy Days of Obligation", "Feast Days & Solemnities", "Liturgical Season Tracker"],
  },
  {
    title: "Prayer Book",
    path: "/catholic/prayers",
    icon: HandHeart,
    subItems: [
      "Morning Offering",
      "Evening Prayers",
      "The Holy Rosary",
      "Chaplet of Divine Mercy",
      "Angelus / Regina Caeli",
      "Stations of the Cross",
      "Litanies",
      "Novenas Library",
      "Act of Contrition",
      "Communion Prayers",
      "Latin Prayers",
      "Examination of Conscience",
    ],
  },
  {
    title: "The Holy Mass",
    path: "/catholic/mass",
    icon: Church,
    subItems: ["Ordinary Form (full text)", "Extraordinary Form / TLM", "Order of Mass Explained", "Latin-English Side by Side", "Mass Responses Guide", "How to Follow a Latin Mass"],
  },
  {
    title: "Sacred Music",
    path: "/catholic/music",
    icon: Music,
    subItems: ["Gregorian Chant Library", "Traditional Hymns", "Polyphonic Sacred Music", "Marian Hymns"],
  },
  {
    title: "Sacred Art",
    path: "/catholic/art",
    icon: Paintbrush,
    subItems: ["Art Gallery", "Stained Glass Collection", "Statuary & Sculpture", "Marian Art"],
  },
  {
    title: "Catechism & Doctrine",
    path: "/catholic/catechism",
    icon: GraduationCap,
    subItems: ["Catechism of the Catholic Church", "Baltimore Catechism", "Seven Sacraments", "Papal Encyclicals", "Doctors of the Church", "Apologetics", "RCIA / Convert's Guide"],
  },
  {
    title: "Saints",
    path: "/catholic/saints",
    icon: Sparkles,
    subItems: ["Lives of the Saints", "Saint of the Day", "Patron Saints", "Canonization Process", "Marian Apparitions"],
  },
  {
    title: "Devotions",
    path: "/catholic/devotions",
    icon: ScrollText,
    subItems: ["Sacred Heart", "Immaculate Heart", "First Fridays / First Saturdays", "Brown Scapular", "Miraculous Medal", "Eucharistic Adoration", "Indulgences Guide"],
  },
  {
    title: "Home Faith Life",
    path: "/catholic/home-faith",
    icon: TentTree,
    subItems: ["Home Altar Setup", "Family Devotions", "Fasting Guidelines", "Confession Guide", "Sacrament Preparation"],
  },
  {
    title: "Parish & Mass Finder",
    path: "/catholic/parishes",
    icon: MapPinned,
    subItems: ["Ordinary Form Parishes", "TLM Locations", "Adoration Chapels", "Retreat Centers"],
  },
  {
    title: "Resources",
    path: "/catholic/resources",
    icon: Compass,
    subItems: ["Recommended Books", "Podcasts & Lectures", "Monastery Directory", "Pilgrimage Sites", "Vatican Documents", "Downloadable PDFs"],
  },
];

const scriptureQuote = "In the beginning was the Word, and the Word was with God, and the Word was God. - John 1:1";

export const orthodoxContent: Record<string, PageContent> = {
  dashboard: {
    title: "Orthodox Temple",
    subtitle: "Standing in the unbroken life of prayer, sacrament, and holy tradition.",
    paragraphs: [
      "The Orthodox Church preserves the apostolic faith in worship, doctrine, and ascetic life. This space gathers liturgical texts, daily prayers, and sacred teaching in one contemplative setting.",
      "Move through Scripture, calendar, saints, and hymnody as you would walk through the narthex into the nave: slowly, reverently, and with the expectation of encounter.",
    ],
    quote: "O Heavenly King, Comforter, Spirit of Truth, come and abide in us.",
    quoteSource: "Trisagion Prayers",
    items: orthodoxSections.slice(0, 6).map((section) => ({ title: section.title, description: section.subItems[0] })),
  },
  scripture: {
    title: "Holy Scripture",
    subtitle: "Septuagint witness and apostolic proclamation in daily prayer.",
    paragraphs: [
      "Orthodox reading of Scripture is ecclesial and liturgical. The Septuagint remains the primary Old Testament source in the Church's hymnography and lectionary life.",
      "Sample reading: John 1:1-18 speaks of the eternal Logos who became flesh, while Psalm 50(51) forms the daily cry of repentance: 'Have mercy on me, O God, according to Thy great mercy.'",
      "The Gospel is interpreted with the Fathers, preserving the mind of the Church in humility and doxology.",
    ],
    quote: scriptureQuote,
    quoteSource: "Divine Liturgy Gospel Reading",
    items: orthodoxSections[0].subItems.map((title) => ({ title, description: "Curated patristic notes and liturgical reading guides." })),
  },
  calendar: {
    title: "Liturgical Calendar",
    subtitle: "Sanctifying time through feasts, fasts, and daily remembrance of saints.",
    paragraphs: [
      "Orthodox calendars differ by jurisdiction and reckoning, yet they are united in rhythm: Pascha as the radiant center, the Twelve Great Feasts, and weekly commemorations.",
      "Fasting seasons train the heart through simplicity and mercy. The cycle of saints teaches us that holiness is lived in every land and century.",
    ],
    items: orthodoxSections[1].subItems.map((title) => ({ title, description: "Current observance notes and concise pastoral guidance." })),
  },
  prayers: {
    title: "Prayer Book",
    subtitle: "The breath of the Church in morning, evening, and ceaseless invocation.",
    paragraphs: [
      "Begin with the Trisagion prayers, continue with psalmody, and end with thanksgiving. A classic Orthodox rule includes morning and evening prayers with the Jesus Prayer throughout the day.",
      "Jesus Prayer: 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.' Pray with attention and repentance, often using a prayer rope.",
    ],
    quote: "Our Father, Who art in heaven, hallowed be Thy name...",
    quoteSource: "The Lord's Prayer",
    items: [
      { title: "Morning Prayers", description: "Standard Orthodox morning rule with the Trisagion and prayers of thanksgiving." },
      { title: "Evening Prayers", description: "20 essential prayers for the end of the day, including St. Macarius and the examination of conscience." },
      { title: "Midnight Office", description: "Mesonyktikon: The 20 core components of the midnight vigil for daily, Saturday, and Sunday use." },
      { title: "Akathist Hymns", description: "A library of 20 Akathists to Christ, the Theotokos, and the Saints." },
      { title: "Jesus Prayer Guide", description: "The practice of hesychasm and the ceaseless prayer of the heart." },
      { title: "Prayers Before Communion", description: "Preparation for the Holy Mysteries with confession and devotion." },
      { title: "Prayer Rope Guide", description: "Interactive guide to using the Chotki or Komboskini for prayer." },
      { title: "Prayers by Jurisdiction: Greek, Slavonic, Serbian, Armenian, Antiochian", description: "Specific jurisdictional variations and traditional prayer rules." },
    ],
  },
  liturgy: {
    title: "Divine Liturgy",
    subtitle: "The Eucharistic ascent of the Church in thanksgiving and glory.",
    paragraphs: [
      "The Divine Liturgy is the heart of Orthodox life, where heaven and earth meet in the celebration of the Holy Eucharist.",
      "The Liturgy of St. John Chrysostom is the ordinary eucharistic service on most Sundays and weekdays, while St. Basil's liturgy appears on appointed great days.",
      "The Presanctified Liturgy marks Great Lent with compunction and solemn beauty, revealing a profoundly ascetical Eucharistic atmosphere.",
    ],
    items: [
      { 
        title: "Liturgy of St. John Chrysostom", 
        description: "The primary Eucharistic service of the Orthodox Church, celebrated on most Sundays.",
        path: "st-john-chrysostom"
      },
      { 
        title: "Liturgy of St. Basil the Great", 
        description: "A majestic and cosmic service used on the Sundays of Great Lent and other specific feasts.",
        path: "st-basil-the-great"
      },
      { 
        title: "Liturgy of St. James", 
        description: "The most ancient liturgy, celebrated on the feast day of the Brother of the Lord.",
        path: "st-james"
      },
      { 
        title: "Presanctified Liturgy", 
        description: "A unique Lenten service for the distribution of previously consecrated Holy Gifts.",
        path: "presanctified"
      },
      { 
        title: "Armenian Badarak", 
        description: "The distinct and soaring liturgical tradition of the Armenian Apostolic Church.",
        path: "armenian-badarak"
      },
      { 
        title: "Liturgical Texts (Original + English)", 
        description: "Bilingual and parallel texts for study and liturgical participation.",
        path: "liturgical-texts"
      },
    ],
  },
  chant: {
    title: "Hymns & Chant",
    subtitle: "The sung theology of the Church across languages and traditions.",
    paragraphs: [
      "Byzantine and Slavic chant systems carry doctrine through melody, preserving scriptural and patristic language in communal memory.",
      "The Octoechos cycle offers eight tones that color weekly worship, inviting attentive listening and active participation.",
    ],
    items: orthodoxSections[4].subItems.map((title) => ({ title, description: "Audio references and short historical notes." })),
  },
  icons: {
    title: "Iconography",
    subtitle: "Windows into the Kingdom through matter transfigured by grace.",
    paragraphs: [
      "Icons are not merely illustrations but theological testimony to the Incarnation. Because the Word became flesh, sacred image can proclaim the Gospel.",
      "A home icon corner anchors daily prayer and teaches the faith through beauty and reverence.",
    ],
    items: orthodoxSections[5].subItems.map((title) => ({ title, description: "Guides to icon symbolism and devotional use." })),
  },
  "icon-gallery": {
    title: "Icon Gallery",
    subtitle: "A collection of sacred images from the ICONSAINT dataset.",
    paragraphs: [
      "This gallery presents icons of Christ, the Theotokos, and saints from the Orthodox tradition. Each image carries theological meaning and invites veneration.",
      "Icons are written according to ancient canons, using natural materials and time-honored techniques that have been passed down through generations.",
    ],
    quote: "The icon is a window to heaven.",
    quoteSource: "St. John of Damascus",
    items: [
      { title: "Christ Pantocrator", description: "The Almighty Ruler of All, depicted in majesty." },
      { title: "The Theotokos", description: "Icons of the Mother of God in various traditional styles." },
      { title: "Saints of the Church", description: "Martyrs, confessors, and holy ascetics." },
      { title: "Feast Day Icons", description: "Icons depicting the twelve Great Feasts." },
    ],
  },
  "theology-of-icons": {
    title: "Theology of Icons",
    subtitle: "Understanding the spiritual significance of sacred images.",
    paragraphs: [
      "The Seventh Ecumenical Council defended the veneration of icons against iconoclasm, affirming that Christ can be depicted because He became incarnate.",
      "Icons are not worshipped but venerated with relative honor, which passes to the prototype they represent.",
    ],
    quote: "The honor given to the image passes to the prototype.",
    quoteSource: "St. Basil the Great",
    items: [
      { title: "Incarnation and Image", description: "Why the Word becoming flesh makes sacred images possible." },
      { title: "Veneration vs Worship", description: "The theological distinction between latria and proskynesis." },
      { title: "Icon as Scripture", description: "How icons teach theology through color and form." },
      { title: "Council of Nicaea II", description: "The definitive defense of icons in 787 AD." },
    ],
  },
  "iconography-by-tradition": {
    title: "Iconography by Tradition",
    subtitle: "Distinct styles across the Orthodox world.",
    paragraphs: [
      "Different cultures have developed unique iconographic styles while maintaining theological unity. Byzantine, Russian, Greek, and Coptic traditions each contribute to the richness of Orthodox art.",
      "Understanding these traditions helps appreciate the universal yet diverse expression of Orthodox faith.",
    ],
    items: [
      { title: "Byzantine Style", description: "The classical tradition originating in Constantinople." },
      { title: "Russian Style", description: "Distinctive features of Novgorod, Moscow, and St. Petersburg schools." },
      { title: "Greek Style", description: "Cretan and Macedonian traditions of icon writing." },
      { title: "Other Traditions", description: "Serbian, Romanian, Armenian, and Ethiopian iconography." },
    ],
  },
  "miraculous-icons": {
    title: "Miraculous Icons",
    subtitle: "Icons through which God has worked wonders.",
    paragraphs: [
      "Throughout history, certain icons have been associated with miracles, healings, and divine intervention. These wonderworking icons are venerated with special reverence.",
      "The stories of miraculous icons testify to God's continuing presence and power in the world through sacred images.",
    ],
    quote: "The icon is not dead matter, but a living presence.",
    quoteSource: "Orthodox Tradition",
    items: [
      { title: "The Vladimir Icon", description: "One of the most revered icons of the Theotokos." },
      { title: "The Iveron Icon", description: "The Portaitissa, guardian of Mount Athos." },
      { title: "The Pantanassa", description: "Wonderworking icon of the Theotokos." },
      { title: "Other Miraculous Icons", description: "Stories of icons associated with miracles." },
    ],
  },
  "home-icon-corner-guide": {
    title: "Home Icon Corner Guide",
    subtitle: "Creating a sacred space for family prayer.",
    paragraphs: [
      "Every Orthodox home should have a prayer corner with icons as its focal point. This sacred space becomes the heart of domestic spiritual life.",
      "A well-arranged icon corner includes an icon of Christ, the Theotokos, the patron saint of the family, and a vigil lamp or candle.",
    ],
    items: [
      { title: "Essential Icons", description: "Which icons every home should have." },
      { title: "Arrangement", description: "How to organize icons in the prayer corner." },
      { title: "Vigil Lamp", description: "The significance of the eternal flame." },
      { title: "Prayer Practices", description: "Daily prayers before the icons." },
    ],
  },
  catechism: {
    title: "Catechism & Teaching",
    subtitle: "Receiving doctrine as life in Christ, not abstract theory.",
    paragraphs: [
      "Orthodox catechesis joins doctrinal clarity with liturgical participation and ascetical practice. The Fathers are read with prayerful attention.",
      "The Seven Ecumenical Councils defend the confession that Christ is fully God and fully man, and that true worship follows true doctrine.",
    ],
    items: orthodoxSections[6].subItems.map((title) => ({ title, description: "Foundational texts and concise introductions." })),
  },
  saints: {
    title: "Saints",
    subtitle: "A cloud of witnesses from martyrs, monastics, hierarchs, and holy families.",
    paragraphs: [
      "The Synaxarion forms daily memory of sanctity. Saints such as St. Basil the Great, St. Mary of Egypt, and St. Seraphim of Sarov reveal the many paths of repentance and love.",
      "Name day observance roots identity in baptismal vocation and ecclesial belonging.",
    ],
    items: orthodoxSections[7].subItems.map((title) => ({ title, description: "Biographies, prayers, and commemoration notes." })),
  },
  "home-worship": {
    title: "Home Worship",
    subtitle: "Bringing liturgical rhythm into family and domestic life.",
    paragraphs: [
      "A prayer corner with icons, vigil lamp, and Scripture can become the spiritual heart of the home. Begin simply and remain consistent.",
      "Family devotions, fasting disciplines, and preparation for confession and communion cultivate gentleness, patience, and joy.",
    ],
    items: orthodoxSections[8].subItems.map((title) => ({ title, description: "Step-by-step practical guides for faithful households." })),
  },
  parishes: {
    title: "Parish Finder (WIP)",
    subtitle: "Sacramental communities near you — Coming Soon.",
    paragraphs: [
      "The Parish Finder is currently under development. We are working on a comprehensive directory to help you find canonical Orthodox communities and liturgical schedules in your region.",
      "In the meantime, please refer to official jurisdictional websites (GOARCH, OCA, ROCOR, etc.) to find a local parish and connect with a priest.",
    ],
    items: [
      { title: "Jurisdictional Directories", description: "Links to official parish search tools for major Orthodox jurisdictions." },
      { title: "Visit Preparation", description: "Tips for visiting a new parish and speaking with clergy." },
    ],
  },
  resources: {
    title: "Resources (WIP)",
    subtitle: "A curated library of formation materials — Coming Soon.",
    paragraphs: [
      "Our resource library is being expanded to include trusted books, lectures, and pilgrimage tools to support your spiritual growth.",
      "We are carefully selecting materials that align with Holy Tradition to ensure you have access to reliable and soul-profiting content.",
    ],
    items: [
      { title: "Patristic Library", description: "Classic texts from the Holy Fathers of the Church." },
      { title: "Modern Introductions", description: "Trustworthy contemporary voices on Orthodox life." },
      { title: "Pilgrimage Tools", description: "Guides for visiting sacred sites and monasteries." },
    ],
  },
  "prayer-corner-setup": {
    title: "Prayer Corner Setup",
    subtitle: "Carving out a spiritual sanctuary within the walls of a busy household.",
    paragraphs: [
      "Creating a prayer corner is more than a simple home improvement project; it is the intentional act of carving out a 'spiritual sanctuary' within the walls of a busy household. This topic explores how to designate a specific area—traditionally known as an 'icon corner' or a 'little church'—that serves as a visual and physical anchor for the family’s daily life. It asks the reader to look at their living space not just as a place of rest or entertainment, but as a site of active devotion, providing a roadmap to transform a quiet corner into a dedicated portal for reflection and peace.",
      "The practical guide focuses on the selection of a location that balances accessibility with solemnity. It isn’t enough to just find an empty shelf; the topic delves into how to choose a spot that is prominent enough to remind the household of their values throughout the day, yet secluded enough to offer a reprieve from the noise of televisions or kitchen chores. By clearing this space of secular clutter—like mail, keys, or electronics—the household creates a 'holy threshold' that signals to the mind and body that it is time to transition from worldly stress to a state of spiritual presence.",
      "Beyond the physical location, the topic covers the 'sensory architecture' of the space, including the arrangement of icons, oil lamps, and incense. These elements are not merely decorative; they are tools meant to engage all the senses. The guide explains the hierarchy of placement—positioning central figures of faith at eye level to draw the focus inward—and the use of a 'lampada' (oil lamp) or candle to represent an unextinguished light of hope. This approach turns a static corner into a living, breathing part of the home that requires regular care and attention.",
      "Consistency and stewardship are also major themes of this setup. The guide emphasizes that a prayer corner is a space that must be 'kept,' much like a garden. This involves the daily ritual of lighting the lamp, refreshing any flowers, and keeping the area clean as an expression of reverence. By establishing these small, repeatable actions, the household reinforces the idea that their spiritual life is a continuous thread woven through their daily routine, rather than a separate activity reserved only for specific days of the week.",
      "The Question Everyone Asks: 'Why does it have to face East?' When setting up a prayer corner, almost everyone inevitably asks why the Eastward orientation is so heavily emphasized. The Symbolic Reason: The East is traditionally associated with the 'Dayspring' or the rising sun. Just as the sun chases away the darkness of night, the direction represents the light of truth and the hope of a new beginning. It is a symbolic way for the household to align themselves with the source of light. The Practicality: While the guide encourages an East-facing setup to mirror the architecture of historic churches, it also provides a 'grace clause.' If the layout of an apartment or house makes a true Eastern orientation impossible (for example, if the only available corner faces North or West), the guide clarifies that the intent of the heart and the sincerity of the space are far more important than a compass reading. The goal is to face toward a sense of peace, wherever that may be located in your specific floor plan.",
      "Ultimately, the topic serves as a bridge between abstract belief and tangible practice. It provides a framework that is grounded in tradition but flexible enough for modern living, ensuring that anyone—regardless of the size of their home—can create a dignified space for quietude. By following these steps, a household doesn't just decorate a room; they establish a permanent reminder that even in the midst of a chaotic world, there is always a place to return to for stillness.",
    ],
    items: [
      { 
        title: "The Question Everyone Asks: 'Why does it have to face East?'", 
        description: "The Symbolic Reason: The East is traditionally associated with the 'Dayspring' or the rising sun. Just as the sun chases away the darkness of night, the direction represents the light of truth and the hope of a new beginning. It is a symbolic way for the household to align themselves with the source of light." 
      },
      { 
        title: "The Practicality of Orientation", 
        description: "While the guide encourages an East-facing setup to mirror church architecture, it provides a 'grace clause.' If the layout of your house makes a true Eastern orientation impossible, the intent of the heart and the sincerity of the space are far more important than a compass reading." 
      },
      { 
        title: "Sensory Architecture", 
        description: "Positioning central figures of faith at eye level and using a 'lampada' (oil lamp) or candle to represent an unextinguished light of hope." 
      },
      { 
        title: "A Holy Threshold", 
        description: "Clearing the space of secular clutter—like mail, keys, or electronics—signals to the mind and body that it is time to transition from worldly stress to spiritual presence." 
      }
    ],
  },
  "family-devotions": {
    title: "Family Devotions",
    subtitle: "The heartbeat of a household, acting as a vital bridge between communal worship and private life.",
    paragraphs: [
      "Family devotions are the heartbeat of a household, acting as a vital bridge between communal worship and the private interior life. This topic provides a practical roadmap for transforming a home into a 'domestic church' where faith is lived out in real-time, rather than just discussed on Sundays. It focuses on the intentional gathering of the family to pray, read, and reflect, establishing a collective rhythm that aligns everyone’s focus toward a shared purpose. By carving out this time, a household moves from being a collection of busy individuals to a cohesive spiritual unit grounded in a common tradition.",
      "The guide emphasizes the importance of a structured but flexible routine, moving away from the pressure of 'spontaneous inspiration' which often fails during a stressful work week. Instead, it suggests leaning on established tools—such as a prayer book, a daily reading from a liturgical calendar, or the lives of the saints—to provide a consistent framework. This takes the burden of 'performance' off the parents, allowing the family to step into a pre-existing stream of wisdom. By anchoring these moments to existing habits, like immediately after dinner or right before bed, the ritual becomes as natural and expected as a shared meal.",
      "Engagement across different ages is a primary focus of this roadmap. For households with children, the guide moves away from dry, academic lectures and toward active, tactile participation. This might include a child being responsible for lighting the beeswax candles, a teenager reading a short passage, or everyone joining in a familiar chant or hymn. The goal is to cultivate an environment where faith is 'caught, not taught,' allowing younger members to witness their parents in a state of genuine reverence, which provides a far more powerful witness than words alone.",
      "Creating a sensory-rich environment is essential for keeping the family grounded during these moments. Utilizing the home’s established prayer corner, the guide suggests incorporating physical actions—like standing together, bowing, or using incense—to signal to the brain that this time is 'set apart' from the noise of the day. These physical cues help transition the mind away from digital distractions and into a state of communal presence. It turns the devotion from a mere mental exercise into a holistic experience that involves the body, the eyes, and even the sense of smell.",
      "Finally, the topic addresses the reality of modern fatigue and the inevitable 'off days.' It offers strategies for maintaining consistency without falling into a spirit of legalism or guilt. If the family is exhausted or getting home late, the guide suggests a 'short-form' version—perhaps just a single prayer and a moment of silence—rather than skipping the practice entirely. This approach fosters resilience, teaching that the rhythm of devotion is a safety net to fall into during hard times, rather than a heavy burden to carry.",
      "The Question Everyone Asks: 'How do I handle kids who won't sit still or keep interrupting?' When starting family devotions, 100% of parents will eventually ask this, often out of a sense of frustration or a fear that they are 'failing' at the ritual. The Reason: We often have an idealized, 'picture-perfect' image of devotions where everyone is silent and solemn. In reality, children are sensory learners and have high energy; their movement is a natural part of their development, not necessarily a sign of disrespect. The Practicality: The guide reframes this as an opportunity rather than a distraction. Instead of demanding a 'statue-like' stillness that leads to resentment, it suggests giving restless children a physical task (like holding an icon or a candle) or allowing them to stand or prostrate. By integrating their energy into the prayer rather than fighting against it, the household learns that 'faithful' doesn't have to mean 'perfectly quiet.'",
    ],
    items: [
      { 
        title: "The Question Everyone Asks: 'How do I handle kids who won't sit still?'", 
        description: "Children are sensory learners and have high energy; their movement is a natural part of their development, not necessarily a sign of disrespect. Instead of demanding 'statue-like' stillness, give them physical tasks like holding an icon or a candle." 
      },
      { 
        title: "Integrating Energy", 
        description: "By integrating a child's energy into the prayer rather than fighting against it, the household learns that 'faithful' doesn't have to mean 'perfectly quiet.'" 
      },
      { 
        title: "Caught, Not Taught", 
        description: "Allowing younger members to witness their parents in a state of genuine reverence provides a far more powerful witness than words alone." 
      },
      { 
        title: "Resilience Over Legalism", 
        description: "On 'off days,' a 'short-form' version—perhaps just a single prayer and a moment of silence—is better than skipping the practice entirely, fostering resilience over guilt." 
      }
    ],
  },
  "fasting-guidelines": {
    title: "Fasting Guidelines",
    subtitle: "A spiritual 'reboot' designed to lighten the body so the soul can focus on things above.",
    paragraphs: [
      "Fasting Guidelines: A Practical Path for the Home. Fasting is far more than a restrictive diet; it is a spiritual 'reboot' designed to lighten the body so the soul can focus on things above. This guide provides a roadmap for households to navigate the various fasting seasons, turning the kitchen and the dining table into tools for self-discipline. It moves the focus away from 'what we can’t have' and toward 'why we are doing it,' helping families use physical hunger as a reminder of their spiritual hunger for a more meaningful life.",
      "Practical implementation starts with the household calendar. The guide suggests marking out fasting periods—whether they are the major seasonal fasts or the regular weekly observances—to help the family prepare mentally and logistically. By stocking the pantry with simple, plant-based staples ahead of time, a household removes the stress of 'emergency' meal planning, which often leads to frustration. The goal is to simplify life, reducing the time spent on elaborate cooking so that more time can be dedicated to prayer and acts of kindness.",
      "Engaging children in fasting requires a balance of firmness and gentleness. The guide emphasizes that fasting should never become a source of resentment or 'performative' suffering. Instead, it suggests age-appropriate adjustments, such as giving up a specific favorite treat or a form of entertainment, rather than following a strict adult regimen. This teaches the core lesson of fasting—prioritizing spiritual growth over immediate physical gratification—without overwhelming a child’s developing relationship with their faith.",
      "A successful fasting household also focuses on 'fasting of the tongue' and the eyes. The guide explains that abstaining from certain foods is meaningless if the home remains filled with gossip, arguments, or excessive digital noise. By pairing the physical fast with a 'media fast' or a renewed commitment to kind speech, the household ensures that the external discipline leads to an internal transformation. It turns the fasting period into a time of domestic peace and intentional silence.",
      "The Common Question: 'What if I accidentally eat something I wasn't supposed to?' This is the number one source of anxiety for anyone trying to follow a fast, especially for families with young children or those attending social events. The Reason: We often view fasting as a 'pass/fail' exam where one mistake ruins the entire effort. This creates a spirit of legalism that can lead to giving up entirely after a single slip-up. The Practicality: The guide clarifies that fasting is a marathon, not a sprint. If you accidentally eat something restricted, the advice is simple: don't dwell on it, don't let it become a source of prideful guilt, and simply resume the fast at the very next meal. The focus remains on the effort and the direction of the heart rather than a perfect 'clean sheet' record.",
    ],
    items: [
      { 
        title: "The Common Question: 'What if I accidentally eat something restricted?'", 
        description: "We often view fasting as a 'pass/fail' exam where one mistake ruins the entire effort. This creates a spirit of legalism that can lead to giving up entirely after a single slip-up." 
      },
      { 
        title: "A Marathon, Not a Sprint", 
        description: "If you accidentally eat something restricted, don't dwell on it or let it become a source of prideful guilt. Simply resume the fast at the very next meal. The focus is on the effort and the direction of the heart." 
      },
      { 
        title: "Fasting of the Tongue", 
        description: "Abstaining from food is meaningless if the home remains filled with gossip. External discipline must lead to internal transformation through kind speech and intentional silence." 
      },
      { 
        title: "Simplifying Life", 
        description: "Reducing time spent on elaborate cooking so that more time can be dedicated to prayer and acts of kindness is a core goal of the fast." 
      }
    ],
  },
  "preparing-for-confession": {
    title: "Preparing for Confession",
    subtitle: "A 'spiritual hospital' where we identify and treat the wounds of the soul.",
    paragraphs: [
      "Preparing for Confession: The Spiritual Hospital. Preparing for confession is the act of taking an honest 'inventory' of one’s life in a supportive, healing environment. Rather than a courtroom where one is judged, this topic frames confession as a 'spiritual hospital' where the household learns to identify and treat the wounds caused by mistakes and shortcomings. The guide provides a step-by-step approach to help family members approach this ritual with a sense of relief rather than dread, emphasizing that the goal is the restoration of peace and clarity.",
      "The preparation begins with a quiet examination of conscience. This isn't about wallowing in shame, but about looking at one’s relationships—with family, friends, and the self—and identifying where things have gone off-track. The guide suggests using a list of prompts or a prayer of reflection to help surface things that may have been buried under the busyness of life. By writing these points down, an individual can enter the session with a clear mind, ensuring that the most pressing burdens are addressed.",
      "For a household, preparation also involves reconciliation at home. The guide emphasizes that before one can seek forgiveness in a formal setting, they should first seek it from those they live with. This might mean a parent apologizing to a child for a loss of temper, or siblings resolving a long-standing argument. By making reconciliation a normal, household habit, the formal act of confession becomes a natural extension of a life lived in a state of constant 'turning back' toward what is good.",
      "Finally, the guide covers the 'aftercare' of the experience. It explains that the feeling of lightness following confession should be protected. It suggests a period of quiet reflection or a family meal to celebrate the 'fresh start.' This reinforces the idea that confession is a positive, life-giving tool that helps the family stay spiritually healthy and connected, rather than a heavy or frightening obligation.",
      "The Common Question: 'What if I forget to mention a specific mistake?' Almost everyone approaching confession worries that a forgotten detail will 'invalidate' the process or leave them stuck with the weight of that error. The Reason: This stems from a fear that the ritual is a mechanical process where the 'right words' act as a key, and forgetting one word keeps the door locked. The Practicality: The guide reassures the household that if a mistake was truly forgotten—not intentionally hidden—it is covered by the general sincerity of the act. If you remember it later, you can simply mention it the next time you go. The focus is on the honesty of the current moment, not on a perfect memory of every single past event.",
    ],
    items: [
      { 
        title: "The Question Everyone Asks: 'What if I forget to mention a specific mistake?'", 
        description: "Almost everyone worries that a forgotten detail will 'invalidate' the process. This stems from a fear that the ritual is mechanical, where forgetting one word keeps the door locked." 
      },
      { 
        title: "Sincerity Over Perfection", 
        description: "If a mistake was truly forgotten—not intentionally hidden—it is covered by the general sincerity of the act. You can simply mention it the next time you go. The focus is on the honesty of the current moment." 
      },
      { 
        title: "The Spiritual Hospital", 
        description: "Confession is not a courtroom for judgment, but a healing environment where the soul's wounds are treated to restore peace and clarity." 
      },
      { 
        title: "Home Reconciliation", 
        description: "Before seeking formal forgiveness, practice it at home by apologizing to those you live with, making reconciliation a natural extension of your daily life." 
      }
    ],
  },
  "preparing-for-communion": {
    title: "Preparing for Communion",
    subtitle: "Readying the 'home of the soul' for a significant spiritual encounter.",
    paragraphs: [
      "Preparing for Communion: Welcoming the Guest. Preparing for Communion is the practice of readying the 'home of the soul' for a significant spiritual encounter. This guide treats the approach to the chalice as the focal point of the week, helping the household align their physical and spiritual lives to receive this gift with awareness and awe. It moves beyond the mechanical 'going to church' and provides a roadmap for a deep, intentional preparation that begins days in advance.",
      "Practical preparation involves a 'rhythm of readiness' that includes specific prayers and a physical fast. The guide explains the tradition of the 'Eucharistic Fast'—abstaining from food and drink from a certain point (usually midnight) before receiving—as a way of physically making room for what is spiritual. This isn't meant to be a grueling endurance test but a sensory reminder that the upcoming event is the most important part of the day, taking priority even over our most basic needs.",
      "The guide also emphasizes the 'prayer of the heart' during the days leading up to the service. It suggests reading specific 'Prayers of Preparation' as a family, which help to foster a spirit of humility and gratitude. These prayers act as a bridge, moving the family’s focus from the chores and stresses of the work week toward a state of quiet expectation. By reading them aloud together, the household creates a shared atmosphere of reverence that carries over into the communal worship.",
      "Equally important is the social preparation. The guide notes that one cannot truly participate in a communal ritual while harboring ill will toward a neighbor or family member. It encourages a 'clearing of the air' within the household, ensuring that any lingering tensions are resolved before approaching the service. This ensures that when the family stands together in worship, they do so with a 'clean heart' and a unified spirit, making the experience a true act of community.",
      "The Common Question: 'Am I ever \"good enough\" to participate?' This is the most frequent question asked by those who feel overwhelmed by their own imperfections or a sense of unworthiness. The Reason: It’s easy to feel that we must achieve a state of 'perfection' before we are allowed to participate in such a sacred event. This often leads to people staying away because they feel they haven't 'earned' it. The Practicality: The guide reframes the entire concept: no one is ever truly 'worthy' in a transactional sense. Instead, we approach because we are needy. Just as a sick person doesn't wait to be healthy before going to the doctor, the household is encouraged to see the ritual as a source of strength and healing for the imperfect, rather than a reward for the perfect. The only real requirement is a sincere desire and a heart that is trying to turn toward the light.",
    ],
    items: [
      { 
        title: "The Common Question: 'Am I ever \"good enough\" to participate?'", 
        description: "It’s easy to feel that we must achieve a state of 'perfection' before we are allowed to participate. This often leads to people staying away because they feel they haven't 'earned' it." 
      },
      { 
        title: "Approaching in Need", 
        description: "No one is ever truly 'worthy' in a transactional sense. We approach because we are needy. Just as a sick person goes to the doctor, the chalice is a source of strength for the imperfect." 
      },
      { 
        title: "Eucharistic Fast", 
        description: "Abstaining from food and drink is a sensory reminder that receiving the Guest is the day's highest priority, physically making room for what is spiritual." 
      },
      { 
        title: "Unified Worship", 
        description: "By resolving tensions at home before the service, the family stands in worship with a unified spirit, making the experience a true act of communal love." 
      }
    ],
  },
};

export const catholicContent: Record<string, PageContent> = {
  dashboard: {
    title: "Catholic Cathedral",
    subtitle: "Living the sacramental life of the Church in word, worship, and mission.",
    paragraphs: [
      "The Catholic tradition treasures Scripture, apostolic teaching, sacred liturgy, and devotions that have formed saints in every era.",
      "This space gathers essential prayers, Mass resources, doctrine, and spiritual practices for daily discipleship.",
    ],
    quote: "Ad majorem Dei gloriam.",
    quoteSource: "For the greater glory of God",
    items: catholicSections.slice(0, 6).map((section) => ({ title: section.title, description: section.subItems[0] })),
  },
  scripture: {
    title: "Holy Scripture",
    subtitle: "The 73-book canon proclaimed in liturgy and studied in the Church.",
    paragraphs: [
      "Catholic biblical life centers on proclamation in the Mass and prayerful meditation in lectio divina. Multiple approved translations serve devotional and academic needs.",
      "Sample reading: John 1:1-18 reveals the eternal Word made flesh. Psalm 51 anchors penitential prayer in every age.",
    ],
    quote: scriptureQuote,
    quoteSource: "Prologue of St. John",
    items: catholicSections[0].subItems.map((title) => ({ title, description: "Translation notes and trusted study references." })),
  },
  calendar: {
    title: "Liturgical Calendar",
    subtitle: "Following Christ through Advent, Christmas, Lent, Easter, and Ordinary Time.",
    paragraphs: [
      "The Roman calendar orders worship with solemnities, feasts, memorials, and weekdays. The 1962 calendar remains central for many communities attached to the traditional liturgy.",
      "Fasting and abstinence cultivate conversion and charity, especially in Lent and on Fridays.",
    ],
    items: catholicSections[1].subItems.map((title) => ({ title, description: "Seasonal overviews and observance references." })),
  },
  prayers: {
    title: "Prayer Book",
    subtitle: "A treasury of prayers for home, parish, and personal devotion.",
    paragraphs: [
      "Common prayers include the Our Father, Hail Mary, Glory Be, and Apostle's Creed. The Rosary and Divine Mercy Chaplet shape meditative prayer through mysteries of Christ.",
      "Hail Mary: 'Hail Mary, full of grace, the Lord is with thee... pray for us sinners, now and at the hour of our death. Amen.'",
    ],
    items: catholicSections[2].subItems.map((title) => ({ title, description: "Traditional text, practice guide, and devotional notes." })),
  },
  mass: {
    title: "The Holy Mass",
    subtitle: "Source and summit of Christian life in sacrifice and communion.",
    paragraphs: [
      "The Ordinary Form and Extraordinary Form each preserve the central Eucharistic mystery: Christ offering Himself for the life of the world.",
      "Learning responses, gestures, and the structure of the rite helps worship become attentive, fruitful, and deeply participatory.",
    ],
    items: catholicSections[3].subItems.map((title) => ({ title, description: "Ritual texts and catechetical explanation." })),
  },
  music: {
    title: "Sacred Music",
    subtitle: "Gregorian chant and sacred repertoire in service of prayer.",
    paragraphs: [
      "Gregorian chant remains a normative musical language of Roman liturgy, joined by hymnody and sacred polyphony that elevate contemplation.",
      "Marian hymns and seasonal chants support both parish liturgy and private devotion.",
    ],
    items: catholicSections[4].subItems.map((title) => ({ title, description: "Listening guides, texts, and historical context." })),
  },
  art: {
    title: "Sacred Art",
    subtitle: "Beauty that teaches, remembers, and leads the heart to God.",
    paragraphs: [
      "Catholic art includes icons, frescoes, sculpture, and stained glass as visual catechesis for worshipping communities.",
      "Marian art in particular has shaped devotion through symbols of purity, motherhood, and intercession.",
    ],
    items: catholicSections[5].subItems.map((title) => ({ title, description: "Gallery notes and theological interpretation." })),
  },
  catechism: {
    title: "Catechism & Doctrine",
    subtitle: "Learning the faith through Scripture, Tradition, and magisterial teaching.",
    paragraphs: [
      "The Catechism of the Catholic Church summarizes doctrine, sacramental life, prayer, and moral teaching with biblical and patristic depth.",
      "RCIA and apologetics resources support both new converts and lifelong Catholics seeking deeper understanding.",
    ],
    items: catholicSections[6].subItems.map((title) => ({ title, description: "Core documents and study pathways." })),
  },
  saints: {
    title: "Saints",
    subtitle: "Witnesses of holiness from martyrs, mystics, pastors, and missionaries.",
    paragraphs: [
      "Figures such as St. Augustine, St. Therese of Lisieux, and St. Maximilian Kolbe show the Gospel embodied in different charisms and cultures.",
      "The canonization process discerns heroic virtue and signs of intercession for the whole Church.",
    ],
    items: catholicSections[7].subItems.map((title) => ({ title, description: "Biographical snapshots and devotional helps." })),
  },
  devotions: {
    title: "Devotions",
    subtitle: "Popular piety rooted in Eucharistic and sacramental life.",
    paragraphs: [
      "Sacred Heart and Immaculate Heart devotions form the believer in trust, reparative love, and consecration.",
      "Eucharistic Adoration and First Friday practices deepen communion with Christ's merciful heart.",
    ],
    items: catholicSections[8].subItems.map((title) => ({ title, description: "Prayers, theology, and practical observance." })),
  },
  "home-faith": {
    title: "Home Faith Life",
    subtitle: "Forming a domestic church through daily rhythms of grace.",
    paragraphs: [
      "A home altar, family prayer schedule, and sacramental preparation practices make faith visible and livable in ordinary routines.",
      "Confession and fasting disciplines strengthen mercy, accountability, and spiritual maturity.",
    ],
    items: catholicSections[9].subItems.map((title) => ({ title, description: "Household practices for all life stages." })),
  },
  parishes: {
    title: "Parish & Mass Finder",
    subtitle: "Connecting to local sacramental communities and retreat spaces.",
    paragraphs: [
      "Parishes are the ordinary place for worship, catechesis, and works of mercy. Locate communities by liturgical form and pastoral needs.",
      "Retreat centers and adoration chapels offer structured silence and renewal.",
    ],
    items: catholicSections[10].subItems.map((title) => ({ title, description: "Directory categories and visit preparation notes." })),
  },
  resources: {
    title: "Resources",
    subtitle: "Trusted study materials, talks, and official documents.",
    paragraphs: [
      "A mature reading plan balances Scripture, catechism, spiritual classics, and Church documents. Podcasts and lecture series can supplement parish formation.",
      "Pilgrimage to shrines and monasteries joins learning with embodied prayer.",
    ],
    items: catholicSections[11].subItems.map((title) => ({ title, description: "Carefully curated links and download collections." })),
  },
};

export const sharedHeritageItems = [
  {
    title: "Early Church History",
    description: "From Pentecost to the patristic era, tracing apostolic succession, catechesis, and the spread of the Gospel across the Mediterranean world.",
  },
  {
    title: "The Undivided Church (First 1000 Years)",
    description: "A common inheritance of councils, creeds, sacramental worship, and monastic witness before later divisions emerged.",
  },
  {
    title: "The Great Schism Explained",
    description: "Historical, theological, and political factors around 1054 and after, presented with clarity and charity.",
  },
  {
    title: "Shared Saints (Pre-1054)",
    description: "St. Athanasius, St. John Chrysostom, St. Gregory the Great, St. Benedict, and countless holy witnesses honored by both traditions.",
  },
  {
    title: "Ecumenical Councils",
    description: "The first seven councils and their enduring doctrinal definitions on Christology, Trinity, and worship.",
  },
  {
    title: "Nicene Creed and Filioque",
    description: "Comparison of creed formulations, historical development, and contemporary theological dialogue.",
  },
  {
    title: "Shared Scripture",
    description: "A common biblical core centered on Christ, with overlapping liturgical proclamation and reverence for the apostolic witness.",
  },
  {
    title: "Ecumenical Dialogue Today",
    description: "Official conversations, local friendships, and shared prayer intentions aimed at healing memory and seeking unity in truth.",
  },
];

export const topNavLinks = [
  { label: "Home", path: "/", icon: Landmark },
  { label: "Orthodox", path: "/orthodox", icon: Church },
  { label: "Catholic", path: "/catholic", icon: Church },
  { label: "Shared", path: "/shared", icon: HandHeart },
  { label: "Search", path: "/search", icon: Search },
  { label: "Candle", path: "/candle", icon: Sparkles },
];