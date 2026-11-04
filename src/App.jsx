import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ExperienceProvider } from "./context/ExperienceContext";
import { Layout } from "./components/Layout";
import {
  WelcomePage,
  IntroPage,
  ExperiencePage,
  ExtrasPage,
  EndPage,
} from "./pages/EntryPages";
import {
  TopicPage,
  LabsPage,
  LanguagesPage,
  LanguageLessonPage,
  ActivityPage,
} from "./pages/LearningPages";
import { SuccessPage, RewardPage } from "./pages/RewardPages";
import { LibraryPage, ArticlePage } from "./pages/LibraryPages";
import { AgendaPage } from "./pages/AgendaPage";
import { SchoolPage } from "./pages/SchoolPage";
export default function App() {
  return (
    <ExperienceProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path="norya" element={<IntroPage />} />
            <Route path="experiencias" element={<ExperiencePage />} />
            <Route path="labs" element={<TopicPage />} />
            <Route path="labs/:topicId" element={<LabsPage />} />
            <Route
              path="labs/:topicId/desafio/:index"
              element={<ActivityPage module="labs" />}
            />
            <Route path="idiomas" element={<LanguagesPage />} />
            <Route
              path="idiomas/:languageId"
              element={<LanguageLessonPage />}
            />
            <Route
              path="idiomas/:languageId/desafio/:index"
              element={<ActivityPage module="idiomas" />}
            />
            <Route path="conquista" element={<SuccessPage />} />
            <Route path="adesivo" element={<RewardPage />} />
            <Route path="explorar" element={<ExtrasPage />} />
            <Route path="biblioteca" element={<LibraryPage />} />
            <Route path="biblioteca/:contentId" element={<ArticlePage />} />
            <Route path="agenda" element={<AgendaPage />} />
            <Route path="escola" element={<SchoolPage />} />
            <Route path="fim" element={<EndPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </ExperienceProvider>
  );
}
