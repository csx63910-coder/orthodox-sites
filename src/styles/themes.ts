export type ThemeName =
  | "byzantine-gold"
  | "crimson-ember"
  | "imperial-purple"
  | "alabaster-incense"
  | "midnight-mosaic";

export type ThemeDefinition = {
  name: string;
  value: ThemeName;
  colors: {
    bgPrimary: string;
    bgSecondary: string;
    textPrimary: string;
    textSecondary: string;
    sidebar: string;
    card: string;
    border: string;
    accent: string;
    accentSecondary: string;
    buttonFrom: string;
    buttonTo: string;
  };
  pattern: string;
};

export const themes: ThemeDefinition[] = [
  {
    name: "Byzantine Gold",
    value: "byzantine-gold",
    colors: {
      bgPrimary: "#1A1A2E",
      bgSecondary: "#16213E",
      textPrimary: "#F5E6CA",
      textSecondary: "#C9A84C",
      sidebar: "#0F0F23",
      card: "#1E1E3A",
      border: "#C9A84C",
      accent: "#C9A84C",
      accentSecondary: "#8B0000",
      buttonFrom: "#C9A84C",
      buttonTo: "#A07B2E",
    },
    pattern:
      "radial-gradient(circle at 20% 20%, rgba(201,168,76,0.14), transparent 40%), radial-gradient(circle at 80% 10%, rgba(139,0,0,0.14), transparent 35%)",
  },
  {
    name: "Crimson & Ember",
    value: "crimson-ember",
    colors: {
      bgPrimary: "#1C0A0A",
      bgSecondary: "#2D0F0F",
      textPrimary: "#FAE3D9",
      textSecondary: "#FF6B35",
      sidebar: "#120505",
      card: "#2D0F0F",
      border: "#DC3545",
      accent: "#DC3545",
      accentSecondary: "#FFD700",
      buttonFrom: "#DC3545",
      buttonTo: "#8B0000",
    },
    pattern:
      "radial-gradient(circle at 15% 25%, rgba(220,53,69,0.18), transparent 35%), radial-gradient(circle at 70% 5%, rgba(255,107,53,0.14), transparent 35%)",
  },
  {
    name: "Imperial Purple",
    value: "imperial-purple",
    colors: {
      bgPrimary: "#0D0221",
      bgSecondary: "#150535",
      textPrimary: "#E8D5B7",
      textSecondary: "#B388EB",
      sidebar: "#090118",
      card: "#1A0A3E",
      border: "#7B2D8E",
      accent: "#7B2D8E",
      accentSecondary: "#C9A84C",
      buttonFrom: "#7B2D8E",
      buttonTo: "#4A0E5C",
    },
    pattern:
      "radial-gradient(circle at 25% 10%, rgba(179,136,235,0.15), transparent 35%), radial-gradient(circle at 80% 25%, rgba(201,168,76,0.12), transparent 35%)",
  },
  {
    name: "Alabaster & Incense",
    value: "alabaster-incense",
    colors: {
      bgPrimary: "#FDF8F0",
      bgSecondary: "#F5EDE0",
      textPrimary: "#2C1810",
      textSecondary: "#6B4423",
      sidebar: "#F0E6D4",
      card: "#FFFFFF",
      border: "#8B4513",
      accent: "#8B4513",
      accentSecondary: "#C9A84C",
      buttonFrom: "#8B4513",
      buttonTo: "#5C2E0E",
    },
    pattern:
      "radial-gradient(circle at 15% 20%, rgba(139,69,19,0.08), transparent 35%), radial-gradient(circle at 75% 0%, rgba(201,168,76,0.12), transparent 35%)",
  },
  {
    name: "Midnight Mosaic",
    value: "midnight-mosaic",
    colors: {
      bgPrimary: "#0A0A0A",
      bgSecondary: "#141414",
      textPrimary: "#E0E0E0",
      textSecondary: "#00BFA6",
      sidebar: "#050505",
      card: "#1A1A1A",
      border: "#00BFA6",
      accent: "#00BFA6",
      accentSecondary: "#FFD700",
      buttonFrom: "#00BFA6",
      buttonTo: "#008B76",
    },
    pattern:
      "radial-gradient(circle at 30% 15%, rgba(0,191,166,0.12), transparent 35%), radial-gradient(circle at 80% 20%, rgba(220,53,69,0.12), transparent 35%)",
  },
];

export const defaultTheme = themes[0];

export const themeByName = (name: ThemeName) =>
  themes.find((theme) => theme.value === name) ?? defaultTheme;