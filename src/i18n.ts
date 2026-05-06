import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "brand": "The Ancient Path",
      "nav": {
        "home": "Home",
        "orthodox": "Orthodox",
        "catholic": "Catholic",
        "shared": "Shared Heritage",
        "search": "Search Hub",
        "candle": "Virtual Candle"
      },
      "landing": {
        "tagline": "Sanctuary of East and West",
        "title": "The Ancient Path",
        "description": "A Digital Sanctuary for Orthodox and Catholic Faith",
        "enter_orthodox": "Enter the Orthodox Temple ☦",
        "enter_catholic": "Enter the Catholic Cathedral ✝",
        "explore_shared": "Explore Our Shared Heritage",
        "dialogue_title": "Traditions in Reverent Dialogue",
        "dialogue_desc": "Each path keeps a living memory of the apostolic faith while witnessing to Christ in distinct liturgical tones.",
        "orthodox_card_title": "Orthodox Traditions ☦",
        "orthodox_card_desc": "Byzantine, Slavic, and ancient Eastern worship rooted in councils, fathers, and mystical theology.",
        "catholic_card_title": "Catholic Traditions ✝",
        "catholic_card_desc": "Roman liturgy, doctrinal continuity, and devotions that shaped saints across continents.",
        "shared_card_title": "Shared Heritage",
        "shared_card_desc": "A common first millennium, shared creedal foundations, and ongoing dialogue for unity.",
        "highlights_title": "Daily Highlight",
        "saint_title": "Today's Saint",
        "scripture_title": "Today's Scripture Reading",
        "fasting_title": "Fasting Information",
        "fasting_desc": "Observe with prayer, almsgiving, and gentleness. Consult your parish calendar for local guidance."
      },
      "shared_page": {
        "title": "Shared Heritage",
        "description": "A reverent study of the common foundation held by Orthodox and Catholic Christians, with honesty about differences and hope for deeper understanding.",
        "divider": "One Lord, One Faith"
      },
      "orthodox_page": {
        "title": "Orthodox Temple",
        "description": "Enter by the ancient path of prayer, Scripture, liturgy, and the witness of the saints. Explore our complete collection of resources below."
      },
      "catholic_page": {
        "title": "Catholic Cathedral",
        "description": "Living the sacramental life of the Church in word, worship, and mission."
      },
      "sections": {
        "holy_scripture": "Holy Scripture",
        "liturgical_calendar": "Liturgical Calendar",
        "prayer_book": "Prayer Book",
        "divine_liturgy": "Divine Liturgy",
        "hymns_chant": "Hymns & Chant",
        "iconography": "Iconography",
        "catechism_teaching": "Catechism & Teaching",
        "saints": "Saints",
        "home_worship": "Home Worship",
        "parish_finder": "Parish Finder",
        "resources": "Resources",
        "the_holy_mass": "The Holy Mass",
        "sacred_music": "Sacred Music",
        "sacred_art": "Sacred Art",
        "catechism_doctrine": "Catechism & Doctrine",
        "devotions": "Devotions",
        "home_faith_life": "Home Faith Life",
        "parish_mass_finder": "Parish & Mass Finder"
      },
      "sidebar": {
        "system_settings": "System Settings",
        "language": "Language",
        "theme": "Theme",
        "choose_atmosphere": "Choose Atmosphere",
        "open": "Open",
        "kyrie": "Kyrie Eleison"
      },
      "footer": {
        "about": "About",
        "contact": "Contact",
        "prayer_requests": "Prayer Requests",
        "donate": "Donate",
        "glory": "Built for the Glory of God",
        "copyright": "© {{year}} The Ancient Path"
      },
      "translator": {
        "title": "Global Translation",
        "info": "Translations include Bible verses, full life stories, and all tabs across the entire hub."
      },
      "content": {
        "orthodox": {
          "dashboard": {
            "title": "Orthodox Temple",
            "subtitle": "Standing in the unbroken life of prayer, sacrament, and holy tradition.",
            "p1": "The Orthodox Church preserves the apostolic faith in worship, doctrine, and ascetic life. This space gathers liturgical texts, daily prayers, and sacred teaching in one contemplative setting.",
            "p2": "Move through Scripture, calendar, saints, and hymnody as you would walk through the narthex into the nave: slowly, reverently, and with the expectation of encounter."
          }
        },
        "catholic": {
          "dashboard": {
            "title": "Catholic Cathedral",
            "subtitle": "Living the sacramental life of the Church in word, worship, and mission.",
            "p1": "The Catholic tradition treasures Scripture, apostolic teaching, sacred liturgy, and devotions that have formed saints in every era.",
            "p2": "This space gathers essential prayers, Mass resources, doctrine, and spiritual practices for daily discipleship."
          }
        }
      }
    }
  },
  el: {
    translation: {
      "brand": "Το Αρχαίο Μονοπάτι",
      "nav": {
        "home": "Αρχική",
        "orthodox": "Ορθόδοξα",
        "catholic": "Καθολικά",
        "shared": "Κοινή Κληρονομιά",
        "search": "Αναζήτηση",
        "candle": "Εικονικό Κερί"
      },
      "landing": {
        "tagline": "Καταφύγιο Ανατολής και Δύσης",
        "title": "Το Αρχαίο Μονοπάτι",
        "description": "Ένα Ψηφιακό Καταφύγιο για την Ορθόδοξη και Καθολική Πίστη",
        "enter_orthodox": "Είσοδος στον Ορθόδοξο Ναό ☦",
        "enter_catholic": "Είσοδος στον Καθολικό Καθεδρικό ✝",
        "explore_shared": "Εξερευνήστε την Κοινή μας Κληρονομιά",
        "dialogue_title": "Παραδόσεις σε Ευλαβικό Διάλογο",
        "dialogue_desc": "Κάθε μονοπάτι διατηρεί μια ζωντανή μνήμη της αποστολικής πίστης μαρτυρώντας τον Χριστό με ξεχωριστούς λειτουργικούς τόνους.",
        "orthodox_card_title": "Ορθόδοξες Παραδόσεις ☦",
        "orthodox_card_desc": "Βυζαντινή, σλαβική και αρχαία ανατολική λατρεία ριζωμένη σε συνόδους, πατέρες και μυστική θεολογία.",
        "catholic_card_title": "Καθολικές Παραδόσεις ✝",
        "catholic_card_desc": "Ρωμαϊκή λειτουργία, δογματική συνέχεια και ευλάβειες που διαμόρφωσαν αγίους σε όλες τις ηπείρους.",
        "shared_card_title": "Κοινή Κληρονομιά",
        "shared_card_desc": "Μια κοινή πρώτη χιλιετία, κοινά δογματικά θεμέλια και συνεχής διάλογος για την ενότητα.",
        "highlights_title": "Σημερινό Στιγμιότυπο",
        "saint_title": "Ο Άγιος της Ημέρας",
        "scripture_title": "Σημερινό Ανάγνωσμα",
        "fasting_title": "Πληροφορίες Νηστείας",
        "fasting_desc": "Τηρήστε με προσευχή, ελεημοσύνη και πραότητα. Συμβουλευτείτε το ημερολόγιο της ενορίας σας."
      },
      "shared_page": {
        "title": "Κοινή Κληρονομιά",
        "description": "Μια ευλαβική μελέτη των κοινών θεμελίων που κατέχουν οι Ορθόδοξοι και Καθολικοί Χριστιανοί, με ειλικρίνεια για τις διαφορές και ελπίδα για βαθύτερη κατανόηση.",
        "divider": "Εις Κύριος, Μία Πίστις"
      },
      "orthodox_page": {
        "title": "Ορθόδοξος Ναός",
        "description": "Εισέλθετε στο αρχαίο μονοπάτι της προσευχής, της Γραφής, της λειτουργίας και της μαρτυρίας των αγίων."
      },
      "catholic_page": {
        "title": "Καθολικός Καθεδρικός",
        "description": "Ζώντας τη μυστηριακή ζωή της Εκκλησίας σε λόγο, λατρεία και αποστολή."
      },
      "sections": {
        "holy_scripture": "Αγία Γραφή",
        "liturgical_calendar": "Λειτουργικό Ημερολόγιο",
        "prayer_book": "Προσευχητάριο",
        "divine_liturgy": "Θεία Λειτουργία",
        "hymns_chant": "Ύμνοι & Ψαλμωδία",
        "iconography": "Εικονογραφία",
        "catechism_teaching": "Κατήχηση & Διδασκαλία",
        "saints": "Άγιοι",
        "home_worship": "Κατ' Οίκον Λατρεία",
        "parish_finder": "Εύρεση Ενορίας",
        "resources": "Πηγές",
        "the_holy_mass": "Η Θεία Λειτουργία",
        "sacred_music": "Ιερή Μουσική",
        "sacred_art": "Ιερή Τέχνη",
        "catechism_doctrine": "Κατήχηση & Δόγμα",
        "devotions": "Ευλάβειες",
        "home_faith_life": "Πίστη στο Σπίτι",
        "parish_mass_finder": "Εύρεση Ενορίας & Μάζας"
      },
      "sidebar": {
        "system_settings": "Ρυθμίσεις Συστήματος",
        "language": "Γλώσσα",
        "theme": "Θέμα",
        "choose_atmosphere": "Επιλογή Ατμόσφαιρας",
        "open": "Άνοιγμα",
        "kyrie": "Κύριε Ελέησον"
      },
      "footer": {
        "about": "Σχετικά",
        "contact": "Επικοινωνία",
        "prayer_requests": "Αιτήματα Προσευχής",
        "donate": "Δωρεά",
        "glory": "Χτισμένο για τη Δόξα του Θεού",
        "copyright": "© {{year}} Το Αρχαίο Μονοπάτι"
      },
      "translator": {
        "title": "Παγκόσμια Μετάφραση",
        "info": "Οι μεταφράσεις περιλαμβάνουν εδάφια της Βίβλου, πλήρεις βιογραφίες αγίων και όλες τις καρτέλες."
      },
      "content": {
        "orthodox": {
          "dashboard": {
            "title": "Ορθόδοξος Ναός",
            "subtitle": "Στεκόμενοι στην αδιάλειπτη ζωή της προσευχής, των μυστηρίων και της ιεράς παράδοσης.",
            "p1": "Η Ορθόδοξη Εκκλησία διατηρεί την αποστολική πίστη στη λατρεία, το δόγμα και την ασκητική ζωή.",
            "p2": "Περιηγηθείτε στη Γραφή, το ημερολόγιο, τους αγίους και την υμνωδία όπως θα περπατούσατε από τον νάρθηκα στον κυρίως ναό."
          }
        },
        "catholic": {
          "dashboard": {
            "title": "Καθολικός Καθεδρικός",
            "subtitle": "Ζώντας τη μυστηριακή ζωή της Εκκλησίας σε λόγο, λατρεία και αποστολή.",
            "p1": "Η Καθολική παράδοση θησαυρίζει τη Γραφή, την αποστολική διδασκαλία, την ιερή λειτουργία και τις ευλάβειες.",
            "p2": "Αυτός ο χώρος συγκεντρώνει βασικές προσευχές, πόρους για τη Θεία Λειτουργία και δόγματα."
          }
        }
      }
    }
  },
  ru: {
    translation: {
      "brand": "Древний Путь",
      "nav": {
        "home": "Главная",
        "orthodox": "Православие",
        "catholic": "Католицизм",
        "shared": "Общее наследие",
        "search": "Поиск",
        "candle": "Виртуальная свеча"
      },
      "landing": {
        "tagline": "Убежище Востока и Запада",
        "title": "Древний Путь",
        "description": "Цифровое убежище для православной и католической веры",
        "enter_orthodox": "Войти в православный храм ☦",
        "enter_catholic": "Войти в католический собор ✝",
        "explore_shared": "Исследуйте наше общее наследие",
        "dialogue_title": "Традиции в благоговейном диалоге",
        "dialogue_desc": "Каждый путь хранит живую память об апостольской вере, свидетельствуя о Христе в различных литургических тонах.",
        "orthodox_card_title": "Православные традиции ☦",
        "orthodox_card_desc": "Византийское, славянское и древневосточное богослужение, уходящее корнями в соборы, отцов и мистическое богословие.",
        "catholic_card_title": "Католические традиции ✝",
        "catholic_card_desc": "Римская литургия, доктринальная преемственность и молитвенные практики, сформировавшие святых на разных континентах.",
        "shared_card_title": "Общее наследие",
        "shared_card_desc": "Общее первое тысячелетие, общие вероучительные основы и продолжающийся диалог ради единства.",
        "highlights_title": "Главное за день",
        "saint_title": "Святой дня",
        "scripture_title": "Сегодняшнее чтение Писания",
        "fasting_title": "Информация о посте",
        "fasting_desc": "Соблюдайте с молитвой, милостыней и кротостью. Обратитесь к календарю вашего прихода за руководством."
      },
      "shared_page": {
        "title": "Общее наследие",
        "description": "Благоговейное изучение общего фундамента, разделяемого православными и католическими христианами, с честностью в различиях и надеждой на более глубокое понимание.",
        "divider": "Один Господь, одна вера"
      },
      "orthodox_page": {
        "title": "Православный храм",
        "description": "Вступите на древний путь молитвы, Писания, литургии и свидетельства святых."
      },
      "catholic_page": {
        "title": "Католический собор",
        "description": "Жизнь в таинствах Церкви в слове, поклонении и миссии."
      },
      "sections": {
        "holy_scripture": "Священное Писание",
        "liturgical_calendar": "Литургический календарь",
        "prayer_book": "Молитвослов",
        "divine_liturgy": "Божественная литургия",
        "hymns_chant": "Песнопения",
        "iconography": "Иконопись",
        "catechism_teaching": "Катехизис и учение",
        "saints": "Святые",
        "home_worship": "Домашнее богослужение",
        "parish_finder": "Поиск прихода",
        "resources": "Ресурсы",
        "the_holy_mass": "Святая Месса",
        "sacred_music": "Духовная музыка",
        "sacred_art": "Священное искусство",
        "catechism_doctrine": "Катехизис и доктрина",
        "devotions": "Молитвенные практики",
        "home_faith_life": "Вера в доме",
        "parish_mass_finder": "Поиск прихода и мессы"
      },
      "sidebar": {
        "system_settings": "Системные настройки",
        "language": "Язык",
        "theme": "Тема",
        "choose_atmosphere": "Выбор атмосферы",
        "open": "Открыть",
        "kyrie": "Господи помилуй"
      },
      "footer": {
        "about": "О проекте",
        "contact": "Контакты",
        "prayer_requests": "Молитвенные прошения",
        "donate": "Пожертвовать",
        "glory": "Во славу Божию",
        "copyright": "© {{year}} Древний Путь"
      },
      "translator": {
        "title": "Глобальный перевод",
        "info": "Переводы включают библейские стихи, полные жития святых и все вкладки."
      },
      "content": {
        "orthodox": {
          "dashboard": {
            "title": "Православный храм",
            "subtitle": "Пребывание в непрерывной жизни молитвы, таинств и святого предания.",
            "p1": "Православная Церковь сохраняет апостольскую веру в богослужении, доктрине и аскетической жизни.",
            "p2": "Пройдите через Писание, календарь, жития святых и песнопения, как если бы вы входили из притвора в храм."
          }
        },
        "catholic": {
          "dashboard": {
            "title": "Католический собор",
            "subtitle": "Жизнь в таинствах Церкви в слове, поклонении и миссии.",
            "p1": "Католическая традиция хранит Писание, апостольское учение, священную литургию и молитвенные практики.",
            "p2": "Это пространство объединяет основные молитвы, литургические ресурсы и вероучение."
          }
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
