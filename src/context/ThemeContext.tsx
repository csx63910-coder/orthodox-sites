import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  defaultTheme,
  themeByName,
  themes,
  type ThemeDefinition,
  type ThemeName,
} from "../styles/themes";

type ThemeContextValue = {
  currentTheme: ThemeDefinition;
  setTheme: (themeName: ThemeName) => void;
  themes: ThemeDefinition[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "ancient-path-theme";

const applyThemeToDocument = (theme: ThemeDefinition) => {
  const root = document.documentElement;
  root.style.setProperty("--bg-primary", theme.colors.bgPrimary);
  root.style.setProperty("--bg-secondary", theme.colors.bgSecondary);
  root.style.setProperty("--text-primary", theme.colors.textPrimary);
  root.style.setProperty("--text-secondary", theme.colors.textSecondary);
  root.style.setProperty("--sidebar", theme.colors.sidebar);
  root.style.setProperty("--card", theme.colors.card);
  root.style.setProperty("--border", theme.colors.border);
  root.style.setProperty("--accent", theme.colors.accent);
  root.style.setProperty("--accent-secondary", theme.colors.accentSecondary);
  root.style.setProperty("--button-from", theme.colors.buttonFrom);
  root.style.setProperty("--button-to", theme.colors.buttonTo);
  root.style.setProperty("--pattern", theme.pattern);
};

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme.value);

  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (storedTheme) {
      setThemeName(storedTheme);
    }
  }, []);

  const currentTheme = useMemo(() => themeByName(themeName), [themeName]);

  useEffect(() => {
    applyThemeToDocument(currentTheme);
    localStorage.setItem(STORAGE_KEY, currentTheme.value);
  }, [currentTheme]);

  const value = useMemo(
    () => ({
      currentTheme,
      setTheme: setThemeName,
      themes,
    }),
    [currentTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};