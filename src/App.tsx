import { useEffect, useState } from "react";
import { type Page } from "./data";
import { hashFromPage, pageFromHash } from "./lib/routing";
import { safeGetLocalStorage, safeSetLocalStorage } from "./lib/storage";
import { applyTheme, getInitialTheme } from "./lib/theme";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { PhotoGenerator } from "./components/PhotoGenerator";
import { HorseGenerator } from "./components/HorseGenerator";
import { FoodWheel } from "./components/FoodWheel";
import { LoveHub } from "./components/LoveHub";
import { Bucketlist } from "./components/Bucketlist";
import { Wishlist } from "./components/Wishlist";
import { PinLockScreen } from "./components/PinLockScreen";
import { InstallModal } from "./components/InstallModal";

const UNLOCKED_STORAGE_KEY = "aap.unlocked.v1";

const pageTitles: Record<Page, string> = {
  home: "Silly aap site",
  photos: "Lou generator",
  horse: "Peirt generator",
  food: "WTF gaan wij eten",
  love: "Love hub",
  bucketlist: "Onze bucketlist",
  wishlist: "Eva's wishlist"
};

function goTo(page: Page) {
  window.location.hash = hashFromPage(page);
}

export function App() {
  const [isUnlocked, setIsUnlocked] = useState(() => safeGetLocalStorage(UNLOCKED_STORAGE_KEY) === "true");
  const [page, setPage] = useState<Page>(() => pageFromHash(window.location.hash));
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  useEffect(() => {
    applyTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    const syncPage = () => setPage(pageFromHash(window.location.hash));
    window.addEventListener("hashchange", syncPage);

    if (!window.location.hash) {
      window.history.replaceState(null, "", hashFromPage("home"));
    }

    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  useEffect(() => {
    if (!isUnlocked) {
      document.title = "Silly aap site 🔒";
    } else {
      document.title = `${pageTitles[page]} | Eva`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isUnlocked, page]);

  const handleUnlock = () => {
    safeSetLocalStorage(UNLOCKED_STORAGE_KEY, "true");
    setIsUnlocked(true);
  };

  const handleLock = () => {
    safeSetLocalStorage(UNLOCKED_STORAGE_KEY, "false");
    setIsUnlocked(false);
  };

  if (!isUnlocked) {
    return <PinLockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div className="app-shell">
      <Header
        activePage={page}
        onNavigate={goTo}
        onLock={handleLock}
        onOpenInstall={() => setIsInstallModalOpen(true)}
      />
      <main id="main-content">
        {page === "home" && <Home onNavigate={goTo} onOpenInstall={() => setIsInstallModalOpen(true)} />}
        {page === "photos" && <PhotoGenerator />}
        {page === "horse" && <HorseGenerator />}
        {page === "food" && <FoodWheel />}
        {page === "love" && <LoveHub />}
        {page === "bucketlist" && <Bucketlist />}
        {page === "wishlist" && <Wishlist />}
      </main>

      <InstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
}

export default App;
