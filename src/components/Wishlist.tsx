import { useMemo, useState } from "react";
import { type WishItem } from "../data";
import { playPop, playSuccess } from "../lib/sound";
import { safeGetLocalStorage, safeSetLocalStorage } from "../lib/storage";

const WISHLIST_STORAGE_KEY = "aap.wishlist.v1";

const initialWishes: WishItem[] = [
  {
    id: "wish-1",
    title: "Leuke warme sloefjes",
    note: "Voor in de winter",
    priority: "must",
    done: false,
    createdAt: Date.now() - 100000
  },
  {
    id: "wish-2",
    title: "Lego set om samen te bouwen",
    note: "Botanical flowers ofzo 🌸",
    priority: "nice",
    done: false,
    createdAt: Date.now() - 50000
  }
];

const priorityLabels: Record<string, { label: string; emoji: string; colorClass: string }> = {
  must: { label: "Heel graag!", emoji: "💖", colorClass: "badge-must" },
  nice: { label: "Leuk ideetje", emoji: "✨", colorClass: "badge-nice" },
  dream: { label: "Droomcadeau", emoji: "🌟", colorClass: "badge-dream" }
};

export function Wishlist() {
  const [wishes, setWishes] = useState<WishItem[]>(() => {
    try {
      const stored = safeGetLocalStorage(WISHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as WishItem[];
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {}
    return initialWishes;
  });

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [priority, setPriority] = useState<WishItem["priority"]>("must");
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "done">("all");

  const saveWishes = (next: WishItem[]) => {
    setWishes(next);
    safeSetLocalStorage(WISHLIST_STORAGE_KEY, JSON.stringify(next));
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    playSuccess();
    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      title: trimmedTitle,
      note: note.trim() || undefined,
      priority,
      done: false,
      createdAt: Date.now()
    };

    saveWishes([newWish, ...wishes]);
    setTitle("");
    setNote("");
    setPriority("must");
  };

  const toggleDone = (id: string) => {
    const wish = wishes.find((w) => w.id === id);
    const nextDone = wish ? !wish.done : false;

    if (nextDone) {
      playSuccess();
    } else {
      playPop();
    }

    const next = wishes.map((w) => (w.id === id ? { ...w, done: nextDone } : w));
    saveWishes(next);
  };

  const deleteWish = (id: string) => {
    playPop();
    const next = wishes.filter((w) => w.id !== id);
    saveWishes(next);
  };

  const filteredWishes = useMemo(() => {
    return wishes.filter((w) => {
      if (statusFilter === "open" && w.done) return false;
      if (statusFilter === "done" && !w.done) return false;
      return true;
    });
  }, [wishes, statusFilter]);

  const openCount = wishes.filter((w) => !w.done).length;
  const doneCount = wishes.filter((w) => w.done).length;

  return (
    <section className="wishlist-page page-enter" aria-labelledby="wishlist-title">
      <div className="wishlist-hero">
        <p className="eyebrow">voor cadeautjes & wensen</p>
        <h1 id="wishlist-title">
          Eva's verlanglijstje <span className="heart">{"\u2665"}</span>
        </h1>
        <p className="lead">
          Alles wat je graag zou willen hebben voor verjaardagen, feestjes of zomaar als verrassing.
        </p>
      </div>

      {/* Add Wish Form */}
      <div className="wish-form-card">
        <h2>Nieuw cadeautje toevoegen 🛍️</h2>
        <form onSubmit={handleAddWish} className="wish-form">
          <div className="form-group">
            <label htmlFor="wish-title">Wat wil je graag?</label>
            <input
              id="wish-title"
              type="text"
              className="wish-input"
              placeholder="bv. die ene geurkaars, een boek, sloefjes..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="wish-note">Opmerking of link (optioneel)</label>
            <input
              id="wish-note"
              type="text"
              className="wish-input"
              placeholder="bv. maat M, roze kleur, of weblink"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Hoe graag wil je dit?</label>
            <div className="priority-options">
              {(["must", "nice", "dream"] as const).map((pKey) => {
                const info = priorityLabels[pKey];
                return (
                  <button
                    key={pKey}
                    type="button"
                    className={priority === pKey ? "priority-btn is-active" : "priority-btn"}
                    onClick={() => {
                      playPop();
                      setPriority(pKey);
                    }}
                  >
                    {info.emoji} {info.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button type="submit" className="primary-action wish-submit-btn">
            Zet op verlanglijstje ✨
          </button>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="wish-filter-bar">
        <div className="wish-filter-pills" role="tablist">
          <button
            type="button"
            className={statusFilter === "all" ? "filter-pill is-active" : "filter-pill"}
            onClick={() => {
              playPop();
              setStatusFilter("all");
            }}
          >
            Alles ({wishes.length})
          </button>
          <button
            type="button"
            className={statusFilter === "open" ? "filter-pill is-active" : "filter-pill"}
            onClick={() => {
              playPop();
              setStatusFilter("open");
            }}
          >
            Nog gewenst ({openCount})
          </button>
          <button
            type="button"
            className={statusFilter === "done" ? "filter-pill is-active" : "filter-pill"}
            onClick={() => {
              playPop();
              setStatusFilter("done");
            }}
          >
            Gekregen / Gekocht ({doneCount})
          </button>
        </div>
      </div>

      {/* Wish Items List */}
      <div className="wishes-grid">
        {filteredWishes.length > 0 ? (
          filteredWishes.map((item) => {
            const pInfo = item.priority ? priorityLabels[item.priority] : priorityLabels.must;
            return (
              <div key={item.id} className={item.done ? "wish-card is-done" : "wish-card"}>
                <div className="wish-card-main">
                  <div className="wish-card-header">
                    <span className={`wish-badge ${pInfo.colorClass}`}>
                      {pInfo.emoji} {pInfo.label}
                    </span>
                    {item.done && <span className="wish-done-badge">Gekregen! 🎁</span>}
                  </div>
                  <h3 className="wish-card-title">{item.title}</h3>
                  {item.note && (
                    <p className="wish-card-note">
                      {item.note.startsWith("http") ? (
                        <a href={item.note} target="_blank" rel="noopener noreferrer" className="wish-link">
                          Bekijk link 🔗
                        </a>
                      ) : (
                        item.note
                      )}
                    </p>
                  )}
                </div>

                <div className="wish-card-actions">
                  <button
                    type="button"
                    className={item.done ? "secondary-action wish-check-btn is-done" : "secondary-action wish-check-btn"}
                    onClick={() => toggleDone(item.id)}
                  >
                    {item.done ? "✓ Gekregen" : "🎁 Markeer gekregen"}
                  </button>
                  <button
                    type="button"
                    className="unpin-btn"
                    title="Verwijder van verlanglijstje"
                    aria-label="Verwijder wens"
                    onClick={() => deleteWish(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="wish-empty">
            <p>Nog geen cadeautjes in deze categorie. Voeg er eentje toe hierboven! ✨</p>
          </div>
        )}
      </div>
    </section>
  );
}
