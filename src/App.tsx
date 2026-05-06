import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import BackToTop from "./components/BackToTop";
import CandlePage from "./app/candle/page";
import CatholicLayout from "./app/catholic/CatholicLayout";
import CatholicArtPage from "./app/catholic/art/page";
import CatholicCalendarPage from "./app/catholic/calendar/page";
import CatholicCatechismPage from "./app/catholic/catechism/page";
import CatholicDevotionsPage from "./app/catholic/devotions/page";
import CatholicHomeFaithPage from "./app/catholic/home-faith/page";
import CatholicMassPage from "./app/catholic/mass/page";
import CatholicMusicPage from "./app/catholic/music/page";
import CatholicParishesPage from "./app/catholic/parishes/page";
import CatholicPrayersPage from "./app/catholic/prayers/page";
import CatholicResourcesPage from "./app/catholic/resources/page";
import CatholicSaintsPage from "./app/catholic/saints/page";
import CatholicScripturePage from "./app/catholic/scripture/page";
import CatholicDashboardPage from "./app/catholic/page";
import OrthodoxLayout from "./app/orthodox/OrthodoxLayout";
import OrthodoxCalendarPage from "./app/orthodox/calendar/page";
import GreekOrthodoxCalendarPage from "./app/orthodox/calendar/greek-orthodox/page";
import SerbianOrthodoxCalendarPage from "./app/orthodox/calendar/serbian-orthodox/page";
import RussianOrthodoxCalendarPage from "./app/orthodox/calendar/russian-orthodox/page";
import ArmenianOrthodoxCalendarPage from "./app/orthodox/calendar/armenian-orthodox/page";
import AntiochianOrthodoxCalendarPage from "./app/orthodox/calendar/antiochian-orthodox/page";
import OrthodoxFastingCalendarPage from "./app/orthodox/calendar/fasting-calendar/page";
import FeastDaysSaintsPage from "./app/orthodox/calendar/feast-days-saints/page";
import PaschaCalculatorPage from "./app/orthodox/calendar/pascha-calculator/page";
import OrthodoxCatechismPage from "./app/orthodox/catechism/page";
import OrthodoxChantPage from "./app/orthodox/chant/page";
import ByzantineChantPage from "./app/orthodox/chant/byzantine/page";
import ZnamennyChantPage from "./app/orthodox/chant/znamenny/page";
import SerbianChantPage from "./app/orthodox/chant/serbian/page";
import ArmenianSharakanPage from "./app/orthodox/chant/armenian/page";
import AntiochianChantPage from "./app/orthodox/chant/antiochian/page";
import ArabicChantPage from "./app/orthodox/chant/arabic/page";
import OrthodoxHomeWorshipPage from "./app/orthodox/home-worship/page";
import OrthodoxIconsPage from "./app/orthodox/icons/page";
import IconGalleryPage from "./app/orthodox/icons/icon-gallery/page";
import TheologyOfIconsPage from "./app/orthodox/icons/theology-of-icons/page";
import IconographyByTraditionPage from "./app/orthodox/icons/iconography-by-tradition/page";
import MiraculousIconsPage from "./app/orthodox/icons/miraculous-icons/page";
import HomeIconCornerGuidePage from "./app/orthodox/icons/home-icon-corner-guide/page";
import OrthodoxLiturgyPage from "./app/orthodox/liturgy/page";
import OrthodoxParishesPage from "./app/orthodox/parishes/page";
import OrthodoxPrayersPage from "./app/orthodox/prayers/page";
import OrthodoxResourcesPage from "./app/orthodox/resources/page";
import OrthodoxSaintsPage from "./app/orthodox/saints/page";
import OrthodoxScripturePage from "./app/orthodox/scripture/page";
import SeptuagintOldTestamentPage from "./app/orthodox/scripture/septuagint-old-testament/page";
import OrthodoxNewTestamentPage from "./app/orthodox/scripture/new-testament/page";
import DailyScriptureReadingsPage from "./app/orthodox/scripture/daily-readings/page";
import CommandmentsPage from "./app/orthodox/scripture/commandments/page";
import PrayerCornerSetupPage from "./app/orthodox/home-worship/prayer-corner-setup";
import FamilyDevotionsPage from "./app/orthodox/home-worship/family-devotions";
import FastingGuidelinesPage from "./app/orthodox/home-worship/fasting-guidelines";
import PreparingForConfessionPage from "./app/orthodox/home-worship/preparing-for-confession";
import PreparingForCommunionPage from "./app/orthodox/home-worship/preparing-for-communion";
import OrthodoxDashboardPage from "./app/orthodox/page";
import LandingPage from "./app/page";
import SharedPage from "./app/shared/page";
import {
  AdminBibleImportPage,
  BookDetailPage,
  CatholicDeepIndex,
  ComparePage,
  ConvertGuidePage,
  CouncilDetailPage,
  CouncilIndexPage,
  FatherDetailPage,
  FathersIndexPage,
  FastingPage,
  FeastDetailPage,
  GlossaryDetailPage,
  GlossaryIndexPage,
  JurisdictionalDifferencesPage,
  MysteryPage,
  OrthodoxDeepIndex,
  PhilokaliaExcerptsPage,
  PrayerDetailPage,
  PrayerRopeInteractivePage,
  RosaryInteractivePage,
  SaintDetailPage,
  ScriptureReader,
  SearchPage,
  SharedRelatedSection,
  TodayDashboard,
  WhatIsOrthodoxyPage,
  LiturgyDetailPage,
} from "./app/addonPages";
import SynaxarionPage from "./app/orthodox/saints/tabs/SynaxarionPage";
import SaintOfDayPage from "./app/orthodox/saints/tabs/SaintOfDayPage";
import NameDayLookupPage from "./app/orthodox/saints/tabs/NameDayLookupPage";
import PatronSaintsPage from "./app/orthodox/saints/tabs/PatronSaintsPage";

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/shared"
            element={
              <>
                <SharedPage />
                <SharedRelatedSection />
              </>
            }
          />
          <Route path="/shared/compare/:topic" element={<ComparePage />} />
          <Route path="/candle" element={<CandlePage />} />
          <Route path="/glossary" element={<GlossaryIndexPage />} />
          <Route path="/glossary/:termSlug" element={<GlossaryDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin/import-bible" element={<AdminBibleImportPage />} />

          <Route path="/orthodox" element={<OrthodoxLayout />}>
            <Route index element={<OrthodoxDashboardPage />} />
            <Route path="today" element={<TodayDashboard tradition="orthodox" />} />
            <Route path="fasting" element={<FastingPage tradition="orthodox" />} />
            <Route path="scripture" element={<OrthodoxScripturePage />} />
            <Route path="scripture/septuagint-old-testament" element={<SeptuagintOldTestamentPage />} />
            <Route path="scripture/new-testament" element={<OrthodoxNewTestamentPage />} />
            <Route path="scripture/daily-readings" element={<DailyScriptureReadingsPage />} />
            <Route path="scripture/commandments" element={<CommandmentsPage />} />
            <Route path="scripture/reader" element={<ScriptureReader tradition="orthodox" />} />
            <Route path="scripture/:bookSlug/:chapterNumber" element={<ScriptureReader tradition="orthodox" />} />
            <Route path="calendar" element={<OrthodoxCalendarPage />} />
            <Route path="calendar/greek-orthodox" element={<GreekOrthodoxCalendarPage />} />
            <Route path="calendar/serbian-orthodox" element={<SerbianOrthodoxCalendarPage />} />
            <Route path="calendar/russian-orthodox" element={<RussianOrthodoxCalendarPage />} />
            <Route path="calendar/armenian-orthodox" element={<ArmenianOrthodoxCalendarPage />} />
            <Route path="calendar/antiochian-orthodox" element={<AntiochianOrthodoxCalendarPage />} />
            <Route path="calendar/fasting-calendar" element={<OrthodoxFastingCalendarPage />} />
            <Route path="calendar/feast-days-saints" element={<FeastDaysSaintsPage />} />
            <Route path="calendar/pascha-calculator" element={<PaschaCalculatorPage />} />
            <Route path="calendar/feasts/:feastSlug" element={<FeastDetailPage tradition="orthodox" />} />
            <Route path="prayers" element={<OrthodoxPrayersPage />} />
            <Route path="prayers/prayer-rope/interactive" element={<PrayerRopeInteractivePage />} />
            <Route path="prayers/:prayerSlug" element={<PrayerDetailPage tradition="orthodox" />} />
            <Route path="liturgy" element={<OrthodoxLiturgyPage />} />
            <Route path="liturgy/:liturgySlug" element={<LiturgyDetailPage />} />
            <Route path="chant" element={<OrthodoxChantPage />} />
            <Route path="chant/byzantine" element={<ByzantineChantPage />} />
            <Route path="chant/znamenny" element={<ZnamennyChantPage />} />
            <Route path="chant/serbian" element={<SerbianChantPage />} />
            <Route path="chant/armenian" element={<ArmenianSharakanPage />} />
            <Route path="chant/antiochian" element={<AntiochianChantPage />} />
            <Route path="chant/arabic" element={<ArabicChantPage />} />
            <Route path="icons" element={<OrthodoxIconsPage />} />
            <Route path="icons/icon-gallery" element={<IconGalleryPage />} />
            <Route path="icons/theology-of-icons" element={<TheologyOfIconsPage />} />
            <Route path="icons/iconography-by-tradition" element={<IconographyByTraditionPage />} />
            <Route path="icons/miraculous-icons" element={<MiraculousIconsPage />} />
            <Route path="icons/home-icon-corner-guide" element={<HomeIconCornerGuidePage />} />
            <Route path="catechism" element={<OrthodoxCatechismPage />} />
            <Route path="catechism/what-is-orthodoxy" element={<WhatIsOrthodoxyPage />} />
            <Route path="catechism/fathers" element={<FathersIndexPage />} />
            <Route path="catechism/fathers/:fatherSlug" element={<FatherDetailPage />} />
            <Route path="catechism/councils" element={<CouncilIndexPage />} />
            <Route path="catechism/councils/:councilSlug" element={<CouncilDetailPage />} />
            <Route path="catechism/philokalia" element={<PhilokaliaExcerptsPage />} />
            <Route path="catechism/mysteries" element={<Navigate to="/orthodox/catechism" replace />} />
            <Route path="catechism/mysteries/:mysterySlug" element={<MysteryPage tradition="orthodox" />} />
            <Route path="catechism/jurisdictions" element={<JurisdictionalDifferencesPage />} />
            <Route path="catechism/convert-guide" element={<ConvertGuidePage />} />
            <Route path="saints" element={<OrthodoxSaintsPage />} />
            <Route path="saints/synaxarion" element={<SynaxarionPage />} />
            <Route path="saints/saint-of-the-day" element={<SaintOfDayPage />} />
            <Route path="saints/name-day-lookup" element={<NameDayLookupPage />} />
            <Route path="saints/patron-saints" element={<PatronSaintsPage />} />
            <Route path="saints/:saintSlug" element={<SaintDetailPage tradition="orthodox" />} />
            <Route path="home-worship" element={<OrthodoxHomeWorshipPage />} />
            <Route path="home-worship/prayer-corner-setup" element={<PrayerCornerSetupPage />} />
            <Route path="home-worship/family-devotions" element={<FamilyDevotionsPage />} />
            <Route path="home-worship/fasting-guidelines" element={<FastingGuidelinesPage />} />
            <Route path="home-worship/preparing-for-confession" element={<PreparingForConfessionPage />} />
            <Route path="home-worship/preparing-for-communion" element={<PreparingForCommunionPage />} />
            <Route path="parishes" element={<OrthodoxParishesPage />} />
            <Route path="resources" element={<OrthodoxResourcesPage />} />
            <Route path="resources/books/:bookSlug" element={<BookDetailPage tradition="orthodox" />} />
            <Route path="deep-links" element={<OrthodoxDeepIndex />} />
          </Route>

          <Route path="/catholic" element={<CatholicLayout />}>
            <Route index element={<CatholicDashboardPage />} />
            <Route path="today" element={<TodayDashboard tradition="catholic" />} />
            <Route path="fasting" element={<FastingPage tradition="catholic" />} />
            <Route path="scripture" element={<CatholicScripturePage />} />
            <Route path="scripture/reader" element={<ScriptureReader tradition="catholic" />} />
            <Route path="scripture/:bookSlug/:chapterNumber" element={<ScriptureReader tradition="catholic" />} />
            <Route path="calendar" element={<CatholicCalendarPage />} />
            <Route path="calendar/feasts/:feastSlug" element={<FeastDetailPage tradition="catholic" />} />
            <Route path="prayers" element={<CatholicPrayersPage />} />
            <Route path="prayers/rosary/interactive" element={<RosaryInteractivePage />} />
            <Route path="prayers/:prayerSlug" element={<PrayerDetailPage tradition="catholic" />} />
            <Route path="mass" element={<CatholicMassPage />} />
            <Route path="music" element={<CatholicMusicPage />} />
            <Route path="art" element={<CatholicArtPage />} />
            <Route path="catechism" element={<CatholicCatechismPage />} />
            <Route path="catechism/sacraments/:mysterySlug" element={<MysteryPage tradition="catholic" />} />
            <Route path="saints" element={<CatholicSaintsPage />} />
            <Route path="saints/:saintSlug" element={<SaintDetailPage tradition="catholic" />} />
            <Route path="devotions" element={<CatholicDevotionsPage />} />
            <Route path="home-faith" element={<CatholicHomeFaithPage />} />
            <Route path="parishes" element={<CatholicParishesPage />} />
            <Route path="resources" element={<CatholicResourcesPage />} />
            <Route path="resources/books/:bookSlug" element={<BookDetailPage tradition="catholic" />} />
            <Route path="deep-links" element={<CatholicDeepIndex />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BackToTop />
      </HashRouter>
    </ThemeProvider>
  );
}
