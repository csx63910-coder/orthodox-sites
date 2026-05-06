export type Verse = { verse: number; text: string };
export type Chapter = { chapter: number; verses: Verse[] };
export type Book = { name: string; slug: string; testament: "OT" | "NT" | "DC"; chapters: Chapter[] };
export type TranslationData = { translation: string; books: Book[] };

const genesis: Book = {
  name: "Genesis",
  slug: "genesis",
  testament: "OT",
  chapters: [
    {
      chapter: 1,
      verses: [
        { verse: 1, text: "In the beginning God created the heaven and the earth." },
        { verse: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep." },
        { verse: 3, text: "And God said, Let there be light: and there was light." },
        { verse: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
        { verse: 5, text: "And God called the light Day, and the darkness he called Night." },
        { verse: 6, text: "And God said, Let there be a firmament in the midst of the waters." },
        { verse: 7, text: "And God made the firmament, and divided the waters which were under the firmament from the waters above." },
        { verse: 8, text: "And God called the firmament Heaven." },
        { verse: 9, text: "And God said, Let the waters under the heaven be gathered together unto one place." },
        { verse: 10, text: "And God called the dry land Earth; and the gathering together of the waters called he Seas." },
        { verse: 11, text: "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit." },
        { verse: 12, text: "And the earth brought forth grass, and herb yielding seed after his kind." },
        { verse: 13, text: "And the evening and the morning were the third day." },
        { verse: 14, text: "And God said, Let there be lights in the firmament of heaven to divide day from night." },
        { verse: 15, text: "And let them be for lights in the firmament of the heaven to give light upon the earth." },
        { verse: 16, text: "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night." },
        { verse: 17, text: "And God set them in the firmament of the heaven to give light upon the earth." },
        { verse: 18, text: "And to rule over the day and over the night, and to divide the light from the darkness." },
        { verse: 19, text: "And the evening and the morning were the fourth day." },
        { verse: 20, text: "And God said, Let the waters bring forth abundantly the moving creature that hath life." },
        { verse: 21, text: "And God created great whales, and every living creature that moveth." },
        { verse: 22, text: "And God blessed them, saying, Be fruitful, and multiply." },
        { verse: 23, text: "And the evening and the morning were the fifth day." },
        { verse: 24, text: "And God said, Let the earth bring forth the living creature after his kind." },
        { verse: 25, text: "And God made the beast of the earth after his kind." },
        { verse: 26, text: "And God said, Let us make man in our image, after our likeness." },
        { verse: 27, text: "So God created man in his own image, in the image of God created he him." },
        { verse: 28, text: "And God blessed them, and God said unto them, Be fruitful, and multiply." },
        { verse: 29, text: "And God said, Behold, I have given you every herb bearing seed." },
        { verse: 30, text: "And to every beast of the earth, and to every fowl of the air, I have given every green herb for meat." },
        { verse: 31, text: "And God saw every thing that he had made, and, behold, it was very good." },
      ],
    },
    {
      chapter: 2,
      verses: [
        { verse: 1, text: "Thus the heavens and the earth were finished, and all the host of them." },
        { verse: 2, text: "And on the seventh day God ended his work which he had made; and he rested." },
        { verse: 3, text: "And God blessed the seventh day, and sanctified it." },
        { verse: 4, text: "These are the generations of the heavens and of the earth when they were created." },
        { verse: 5, text: "And every plant of the field before it was in the earth..." },
        { verse: 6, text: "But there went up a mist from the earth, and watered the whole face of the ground." },
        { verse: 7, text: "And the Lord God formed man of the dust of the ground, and breathed into his nostrils the breath of life." },
        { verse: 8, text: "And the Lord God planted a garden eastward in Eden." },
        { verse: 9, text: "And out of the ground made the Lord God to grow every tree that is pleasant to the sight." },
        { verse: 10, text: "And a river went out of Eden to water the garden." },
        { verse: 11, text: "The name of the first is Pison." },
        { verse: 12, text: "And the gold of that land is good." },
        { verse: 13, text: "And the name of the second river is Gihon." },
        { verse: 14, text: "And the name of the third river is Hiddekel." },
        { verse: 15, text: "And the Lord God took the man, and put him into the garden of Eden to dress it and to keep it." },
        { verse: 16, text: "And the Lord God commanded the man, saying, Of every tree of the garden thou mayest freely eat." },
        { verse: 17, text: "But of the tree of the knowledge of good and evil, thou shalt not eat of it." },
        { verse: 18, text: "And the Lord God said, It is not good that the man should be alone." },
        { verse: 19, text: "And out of the ground the Lord God formed every beast of the field." },
        { verse: 20, text: "And Adam gave names to all cattle, and to the fowl of the air." },
        { verse: 21, text: "And the Lord God caused a deep sleep to fall upon Adam." },
        { verse: 22, text: "And the rib, which the Lord God had taken from man, made he a woman." },
        { verse: 23, text: "And Adam said, This is now bone of my bones, and flesh of my flesh." },
        { verse: 24, text: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife." },
        { verse: 25, text: "And they were both naked, the man and his wife, and were not ashamed." },
      ],
    },
    {
      chapter: 3,
      verses: [
        { verse: 1, text: "Now the serpent was more subtil than any beast of the field." },
        { verse: 2, text: "And the woman said unto the serpent, We may eat of the fruit of the trees of the garden." },
        { verse: 3, text: "But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it." },
        { verse: 4, text: "And the serpent said unto the woman, Ye shall not surely die." },
        { verse: 5, text: "For God doth know that in the day ye eat thereof, then your eyes shall be opened." },
        { verse: 6, text: "And when the woman saw that the tree was good for food, she took of the fruit thereof." },
        { verse: 7, text: "And the eyes of them both were opened, and they knew that they were naked." },
        { verse: 8, text: "And they heard the voice of the Lord God walking in the garden in the cool of the day." },
        { verse: 9, text: "And the Lord God called unto Adam, and said unto him, Where art thou?" },
        { verse: 10, text: "And he said, I heard thy voice in the garden, and I was afraid." },
        { verse: 11, text: "Who told thee that thou wast naked?" },
        { verse: 12, text: "And the man said, The woman whom thou gavest to be with me, she gave me of the tree." },
        { verse: 13, text: "And the Lord God said unto the woman, What is this that thou hast done?" },
        { verse: 14, text: "And the Lord God said unto the serpent, Because thou hast done this, thou art cursed." },
        { verse: 15, text: "And I will put enmity between thee and the woman, and between thy seed and her seed." },
        { verse: 16, text: "Unto the woman he said, I will greatly multiply thy sorrow and thy conception." },
        { verse: 17, text: "Unto Adam he said, Cursed is the ground for thy sake." },
        { verse: 18, text: "Thorns also and thistles shall it bring forth to thee." },
        { verse: 19, text: "In the sweat of thy face shalt thou eat bread, till thou return unto the ground." },
        { verse: 20, text: "And Adam called his wife's name Eve; because she was the mother of all living." },
        { verse: 21, text: "Unto Adam also and to his wife did the Lord God make coats of skins, and clothed them." },
        { verse: 22, text: "And the Lord God said, Behold, the man is become as one of us, to know good and evil." },
        { verse: 23, text: "Therefore the Lord God sent him forth from the garden of Eden." },
        { verse: 24, text: "So he drove out the man; and he placed at the east of the garden of Eden cherubims." },
      ],
    },
  ],
};

const john: Book = {
  name: "John",
  slug: "john",
  testament: "NT",
  chapters: [
    {
      chapter: 1,
      verses: [
        { verse: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
        { verse: 2, text: "The same was in the beginning with God." },
        { verse: 3, text: "All things were made by him; and without him was not any thing made that was made." },
        { verse: 4, text: "In him was life; and the life was the light of men." },
        { verse: 5, text: "And the light shineth in darkness; and the darkness comprehended it not." },
        { verse: 6, text: "There was a man sent from God, whose name was John." },
        { verse: 7, text: "The same came for a witness, to bear witness of the Light." },
        { verse: 8, text: "He was not that Light, but was sent to bear witness of that Light." },
        { verse: 9, text: "That was the true Light, which lighteth every man that cometh into the world." },
        { verse: 10, text: "He was in the world, and the world was made by him, and the world knew him not." },
        { verse: 11, text: "He came unto his own, and his own received him not." },
        { verse: 12, text: "But as many as received him, to them gave he power to become the sons of God." },
        { verse: 13, text: "Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God." },
        { verse: 14, text: "And the Word was made flesh, and dwelt among us." },
        { verse: 15, text: "John bare witness of him, and cried, saying, This was he of whom I spake." },
        { verse: 16, text: "And of his fulness have all we received, and grace for grace." },
        { verse: 17, text: "For the law was given by Moses, but grace and truth came by Jesus Christ." },
        { verse: 18, text: "No man hath seen God at any time; the only begotten Son... hath declared him." },
      ],
    },
    {
      chapter: 2,
      verses: [
        { verse: 1, text: "And the third day there was a marriage in Cana of Galilee." },
        { verse: 2, text: "And both Jesus was called, and his disciples, to the marriage." },
        { verse: 3, text: "And when they wanted wine, the mother of Jesus saith unto him, They have no wine." },
        { verse: 4, text: "Jesus saith unto her, Woman, what have I to do with thee? mine hour is not yet come." },
        { verse: 5, text: "His mother saith unto the servants, Whatsoever he saith unto you, do it." },
        { verse: 6, text: "There were set there six waterpots of stone." },
        { verse: 7, text: "Jesus saith unto them, Fill the waterpots with water." },
        { verse: 8, text: "And he saith unto them, Draw out now, and bear unto the governor of the feast." },
        { verse: 9, text: "When the ruler of the feast had tasted the water that was made wine..." },
        { verse: 10, text: "Thou hast kept the good wine until now." },
      ],
    },
    {
      chapter: 3,
      verses: [
        { verse: 1, text: "There was a man of the Pharisees, named Nicodemus, a ruler of the Jews." },
        { verse: 2, text: "The same came to Jesus by night, and said unto him, Rabbi..." },
        { verse: 3, text: "Except a man be born again, he cannot see the kingdom of God." },
        { verse: 4, text: "Nicodemus saith unto him, How can a man be born when he is old?" },
        { verse: 5, text: "Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God." },
        { verse: 16, text: "For God so loved the world, that he gave his only begotten Son." },
        { verse: 17, text: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved." },
      ],
    },
  ],
};

const matthew: Book = {
  name: "Matthew",
  slug: "matthew",
  testament: "NT",
  chapters: [1, 2, 3, 4, 5].map((chapter) => ({
    chapter,
    verses: [
      { verse: 1, text: `Matthew ${chapter}:1 sample verse text for reader demonstration.` },
      { verse: 2, text: `Matthew ${chapter}:2 sample verse text for reader demonstration.` },
      { verse: 3, text: `Matthew ${chapter}:3 sample verse text for reader demonstration.` },
      { verse: 4, text: `Matthew ${chapter}:4 sample verse text for reader demonstration.` },
      { verse: 5, text: `Matthew ${chapter}:5 sample verse text for reader demonstration.` },
    ],
  })),
};

const psalm51: Book = {
  name: "Psalms",
  slug: "psalms",
  testament: "OT",
  chapters: [
    {
      chapter: 51,
      verses: [
        { verse: 1, text: "Have mercy upon me, O God, according to thy lovingkindness." },
        { verse: 2, text: "Wash me thoroughly from mine iniquity, and cleanse me from my sin." },
        { verse: 3, text: "For I acknowledge my transgressions: and my sin is ever before me." },
        { verse: 10, text: "Create in me a clean heart, O God; and renew a right spirit within me." },
        { verse: 11, text: "Cast me not away from thy presence; and take not thy holy spirit from me." },
        { verse: 12, text: "Restore unto me the joy of thy salvation." },
      ],
    },
  ],
};

const isaiah53: Book = {
  name: "Isaiah",
  slug: "isaiah",
  testament: "OT",
  chapters: [
    {
      chapter: 53,
      verses: [
        { verse: 1, text: "Who hath believed our report? and to whom is the arm of the LORD revealed?" },
        { verse: 3, text: "He is despised and rejected of men; a man of sorrows." },
        { verse: 5, text: "But he was wounded for our transgressions, he was bruised for our iniquities." },
        { verse: 6, text: "All we like sheep have gone astray." },
        { verse: 7, text: "He was oppressed, and he was afflicted, yet he opened not his mouth." },
        { verse: 11, text: "By his knowledge shall my righteous servant justify many." },
      ],
    },
  ],
};

const romans8: Book = {
  name: "Romans",
  slug: "romans",
  testament: "NT",
  chapters: [
    {
      chapter: 8,
      verses: [
        { verse: 1, text: "There is therefore now no condemnation to them which are in Christ Jesus." },
        { verse: 11, text: "If the Spirit of him that raised up Jesus from the dead dwell in you..." },
        { verse: 18, text: "The sufferings of this present time are not worthy to be compared with the glory." },
        { verse: 28, text: "And we know that all things work together for good to them that love God." },
        { verse: 38, text: "Neither death, nor life... shall be able to separate us from the love of God." },
      ],
    },
  ],
};

const revelation1: Book = {
  name: "Revelation",
  slug: "revelation",
  testament: "NT",
  chapters: [
    {
      chapter: 1,
      verses: [
        { verse: 1, text: "The Revelation of Jesus Christ, which God gave unto him." },
        { verse: 3, text: "Blessed is he that readeth, and they that hear the words of this prophecy." },
        { verse: 8, text: "I am Alpha and Omega, the beginning and the ending, saith the Lord." },
        { verse: 17, text: "Fear not; I am the first and the last." },
        { verse: 18, text: "I am he that liveth, and was dead; and, behold, I am alive for evermore." },
      ],
    },
  ],
};

const loadedBooks = [genesis, psalm51, isaiah53, matthew, john, romans8, revelation1];

export const orthodoxTranslations: TranslationData[] = [
  { translation: "Septuagint", books: loadedBooks },
  { translation: "King James Version", books: loadedBooks },
  { translation: "NKJV", books: loadedBooks },
  { translation: "OSB", books: loadedBooks },
  { translation: "RSV", books: loadedBooks },
];

export const catholicTranslations: TranslationData[] = [
  { translation: "Douay-Rheims", books: loadedBooks },
  { translation: "King James Version", books: loadedBooks },
  { translation: "RSV-CE", books: loadedBooks },
  { translation: "NAB", books: loadedBooks },
  { translation: "Vulgate (Latin)", books: loadedBooks },
];

export const scriptureReferencePreview: Record<string, string> = {
  "John 3:16": "For God so loved the world, that he gave his only begotten Son...",
  "John 1:1": "In the beginning was the Word, and the Word was with God, and the Word was God.",
  "Psalm 50": "Have mercy upon me, O God, according to thy loving-kindness.",
  "Genesis 1:1": "In the beginning God created the heaven and the earth.",
};

export const allBookCatalog = [
  { name: "Genesis", slug: "genesis", testament: "OT" as const },
  { name: "Exodus", slug: "exodus", testament: "OT" as const },
  { name: "Psalms", slug: "psalms", testament: "OT" as const },
  { name: "Isaiah", slug: "isaiah", testament: "OT" as const },
  { name: "Matthew", slug: "matthew", testament: "NT" as const },
  { name: "John", slug: "john", testament: "NT" as const },
  { name: "Romans", slug: "romans", testament: "NT" as const },
  { name: "Revelation", slug: "revelation", testament: "NT" as const },
  { name: "Wisdom", slug: "wisdom", testament: "DC" as const },
  { name: "Sirach", slug: "sirach", testament: "DC" as const },
];
