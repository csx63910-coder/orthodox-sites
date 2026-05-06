import { orthodoxMasterCommemorations2026 } from "./orthodoxMasterCalendar2026";
import { orthodoxSaints } from "./hubData";

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

const shortMonth = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

export const synaxarionByMonth = orthodoxMasterCommemorations2026;

export const allSaintMentions = Object.entries(orthodoxMasterCommemorations2026).flatMap(([month, entries]) =>
  entries.flatMap((entry) => {
    const match = entry.match(/^([A-Za-z]+)\s(\d+):\s(.+)$/);
    const label = match ? match[3] : entry;
    return label
      .split(";")
      .map((name) => name.trim().replace(/\.$/, ""))
      .filter((name) => name.length > 2)
      .map((name) => ({ month, day: match ? Number(match[2]) : 0, name }));
  })
);

export const nameLookupList = [...new Set(allSaintMentions.map((item) => item.name))].sort((a, b) => a.localeCompare(b));

export const getSaintOfToday = () => {
  const now = new Date();
  const month = monthOrder[now.getMonth()];
  const day = now.getDate();
  const prefix = `${shortMonth[now.getMonth()]} ${day}:`;
  const exact = synaxarionByMonth[month].find((entry) => entry.startsWith(prefix));
  return {
    month,
    day,
    text: exact ?? `No specific entry mapped for ${month} ${day} in current static dataset.`,
  };
};

export const patronSaintProfiles = orthodoxSaints.map((saint) => ({
  name: saint.name,
  slug: saint.slug,
  patronage: saint.patronage,
  feastDay: saint.feastDay,
  path: `/orthodox/saints/${saint.slug}`,
}));
