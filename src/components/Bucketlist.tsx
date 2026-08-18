import { useMemo, useState } from "react";
import { initialBucketlist, type BucketItem } from "../data";
import { playPop, playSuccess } from "../lib/sound";
import { safeGetLocalStorage, safeSetLocalStorage } from "../lib/storage";

const BUCKETLIST_STORAGE_KEY = "aap.bucketlist.v1";

const categoryLabels: Record<string, string> = {
  movies: "Films & Series",
  food: "Eten & Drinken",
  trips: "Uitstapjes",
  fun: "Fun & Chaos",
  cozy: "Thuis & Chill"
};

export function Bucketlist() {
  const [items, setItems] = useState<BucketItem[]>(() => {
    try {
      const stored = safeGetLocalStorage(BUCKETLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as BucketItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return initialBucketlist;
  });

  const [statusFilter, setStatusFilter] = useState<"all" | "todo" | "done">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [newItemCat, setNewItemCat] = useState<BucketItem["category"]>("fun");

  const saveItems = (next: BucketItem[]) => {
    setItems(next);
    safeSetLocalStorage(BUCKETLIST_STORAGE_KEY, JSON.stringify(next));
  };

  const toggleItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    const willBeDone = item ? !item.done : false;

    if (willBeDone) {
      playSuccess();
    } else {
      playPop();
    }

    const next = items.map((i) => (i.id === id ? { ...i, done: !i.done } : i));
    saveItems(next);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newItemText.trim();
    if (!trimmed) return;

    playSuccess();
    const newItem: BucketItem = {
      id: `custom-${Date.now()}`,
      text: trimmed,
      done: false,
      category: newItemCat
    };

    saveItems([newItem, ...items]);
    setNewItemText("");
  };

  const handleResetToDefault = () => {
    if (window.confirm("Wil je de lijst terugzetten naar de originele items?")) {
      playPop();
      saveItems(initialBucketlist);
    }
  };

  const totalCount = items.length;
  const completedCount = items.filter((i) => i.done).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (statusFilter === "todo" && item.done) return false;
      if (statusFilter === "done" && !item.done) return false;
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return item.text.toLowerCase().includes(query);
      }
      return true;
    });
  }, [items, statusFilter, selectedCategory, searchQuery]);

  return (
    <section className="bucket-page page-enter" aria-labelledby="bucket-title">
      <div className="bucket-hero">
        <p className="eyebrow">onze avonturen & herinneringen</p>
        <h1 id="bucket-title">
          Onze bucketlist <span className="heart">{"\u2665"}</span>
        </h1>
        <p className="lead">
          alles wa wij hebbe gedaan en de chresi dingen die nog komen 😈
        </p>

        {/* Progress Card */}
        <div className="bucket-progress-card">
          <div className="progress-header">
            <span className="progress-title">Voortgang samen</span>
            <span className="progress-stats">
              <strong>{completedCount}</strong> van de {totalCount} afgevinkt ({progressPercent}%)
            </span>
          </div>
          <div className="progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="progress-caption">
            {completedCount > 0
              ? `Al ${completedCount} momenten en herinneringen afgevinkt`
              : "Tijd om herinneringen te maken!"}
          </p>
        </div>
      </div>

      {/* Add New Item */}
      <form className="bucket-add-form" onSubmit={handleAddItem}>
        <input
          type="text"
          className="bucket-input"
          placeholder="Nieuw ideetje toevoegen..."
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
        />
        <select
          className="bucket-select"
          value={newItemCat}
          onChange={(e) => setNewItemCat(e.target.value as BucketItem["category"])}
          aria-label="Kies categorie"
        >
          <option value="fun">Fun & Chaos</option>
          <option value="trips">Uitstapjes</option>
          <option value="food">Eten & Drinken</option>
          <option value="movies">Films & Series</option>
          <option value="cozy">Thuis & Chill</option>
        </select>
        <button type="submit" className="primary-action">
          Toevoegen
        </button>
      </form>

      {/* Filter Toolbar */}
      <div className="bucket-toolbar">
        <div className="bucket-filter-pills" role="tablist" aria-label="Status filters">
          <button
            type="button"
            className={statusFilter === "all" ? "filter-pill is-active" : "filter-pill"}
            onClick={() => {
              playPop();
              setStatusFilter("all");
            }}
          >
            Alles ({totalCount})
          </button>
          <button
            type="button"
            className={statusFilter === "todo" ? "filter-pill is-active" : "filter-pill"}
            onClick={() => {
              playPop();
              setStatusFilter("todo");
            }}
          >
            Nog te doen ({totalCount - completedCount})
          </button>
          <button
            type="button"
            className={statusFilter === "done" ? "filter-pill is-active" : "filter-pill"}
            onClick={() => {
              playPop();
              setStatusFilter("done");
            }}
          >
            Al gedaan ({completedCount})
          </button>
        </div>

        <div className="bucket-search-box">
          <input
            type="search"
            className="search-input"
            placeholder="Zoek in de lijst..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Zoek item"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="bucket-category-bar">
        <button
          type="button"
          className={selectedCategory === "all" ? "cat-chip is-active" : "cat-chip"}
          onClick={() => {
            playPop();
            setSelectedCategory("all");
          }}
        >
          Alle thema's
        </button>
        {Object.entries(categoryLabels).map(([catKey, label]) => (
          <button
            key={catKey}
            type="button"
            className={selectedCategory === catKey ? "cat-chip is-active" : "cat-chip"}
            onClick={() => {
              playPop();
              setSelectedCategory(catKey);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="bucket-list-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const catInfo = item.category ? categoryLabels[item.category] : null;
            return (
              <div
                key={item.id}
                className={item.done ? "bucket-item is-done" : "bucket-item"}
                onClick={() => toggleItem(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    toggleItem(item.id);
                  }
                }}
              >
                <div className="bucket-checkbox">
                  {item.done ? "✓" : ""}
                </div>
                <div className="bucket-item-content">
                  <span className="bucket-item-text">{item.text}</span>
                  {catInfo && (
                    <span className="bucket-item-cat">
                      {catInfo}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bucket-empty">
            <p>Geen items gevonden voor deze zoekopdracht / filter.</p>
          </div>
        )}
      </div>

      <div className="bucket-footer-actions">
        <button type="button" className="secondary-action reset-btn" onClick={handleResetToDefault}>
          Herstel standaard lijst
        </button>
      </div>
    </section>
  );
}
