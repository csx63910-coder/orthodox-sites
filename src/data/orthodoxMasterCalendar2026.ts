import { greekCommemorations2026, greekMajorEvents2026 } from "./greekOrthodoxCalendar2026";
import { slavicDailyCommemorations2026, slavicFasts2026, slavicGreatFeasts2026 } from "./slavicCalendar2026";

const monthOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const shortToLong: Record<string, string> = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  March: "March",
  Apr: "April",
  April: "April",
  May: "May",
  Jun: "June",
  June: "June",
  Jul: "July",
  July: "July",
  Aug: "August",
  Sept: "September",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

const mergeCommemorations = () => {
  const output: Record<string, string[]> = Object.fromEntries(monthOrder.map((month) => [month, []])) as Record<string, string[]>;

  const pushEntries = (source: Record<string, string[]>) => {
    Object.entries(source).forEach(([month, entries]) => {
      entries.forEach((entry) => {
        const match = entry.match(/^([A-Za-z]+)\s(\d+):\s(.+)$/);
        if (!match) return;
        const monthName = shortToLong[match[1]] ?? month;
        output[monthName] = [...output[monthName], entry];
      });
    });
  };

  pushEntries(greekCommemorations2026);
  pushEntries(slavicDailyCommemorations2026);

  monthOrder.forEach((month) => {
    output[month] = [...new Set(output[month])];
  });

  return output;
};

const mergedGreatFeasts = [
  ...slavicGreatFeasts2026,
  ...greekMajorEvents2026.map((item) => `${item.date}: ${item.event}`),
];

export const orthodoxMasterCommemorations2026 = mergeCommemorations();
export const orthodoxMasterGreatFeasts2026 = [...new Set(mergedGreatFeasts)];
export const orthodoxMasterFasts2026 = slavicFasts2026;

export const orthodoxMasterSaintHighlights = [
  {
    title: "St. Basil the Great, St. John Chrysostom, St. Gregory the Theologian",
    description: "Patristic pillars commemorated prominently across Greek, Serbian, and Russian calendars.",
  },
  {
    title: "St. Sava of Serbia and St. Simeon the Myrrh-gusher",
    description: "Foundational Serbian saints included in the merged annual cycle.",
  },
  {
    title: "St. Seraphim of Sarov and St. Sergius of Radonezh",
    description: "Major Russian monastic saints represented in yearly commemorations.",
  },
  {
    title: "Theotokos Feasts and Paschal Cycle",
    description: "Annunciation, Dormition, Nativity of the Theotokos, and Pascha-linked observances are all included.",
  },
];
