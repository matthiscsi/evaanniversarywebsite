import { type Page } from "../data";
import { playPop } from "../lib/sound";
import { photos } from "../photos";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const featuredPhotos = photos.slice(0, 4);

  const handleNav = (page: Page) => {
    playPop();
    onNavigate(page);
  };

  return (
    <section className="home-layout page-enter">
      <div className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">ily bb</p>
          <h1>
            Silly aap site<span className="heart">{"\u2665"}</span>
          </h1>
          <p className="lead">
            Voor random Lou fotos, ster stabel peirt namen, het eten rad en de Love hub als je hoofd vol zit.
          </p>

          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={() => handleNav("love")}>
              Naar Love hub ❤️
            </button>
            <button className="secondary-action" type="button" onClick={() => handleNav("food")}>
              wtf gaan wij eten 🍟
            </button>
            <button className="secondary-action" type="button" onClick={() => handleNav("photos")}>
              Lou gen 🐾
            </button>
          </div>
          <div className="hero-badges" aria-label="Sfeertje">
            <span className="hero-badge">100% Eva approved</span>
          </div>
        </div>

        <div className="photo-stack" aria-label="Foto preview" onClick={() => handleNav("photos")} role="button" tabIndex={0} title="Klik voor alle Lou foto's">
          {featuredPhotos.map((photo, index) => (
            <img
              key={photo.id}
              src={photo.src}
              alt=""
              className={`stack-photo stack-photo-${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>
      </div>

      <div className="feature-grid feature-grid-4">
        <FeatureCard
          kicker="random cuteness"
          title="Lou generator"
          text="Een foto surprise knop voor instant serotonine."
          action="Open foto's"
          onClick={() => handleNav("photos")}
        />
        <FeatureCard
          kicker="chaos mode"
          title="Peirt generator"
          text="Genereer een compleet ridiculous ster-stabel paardje."
          action="Genereer peirt"
          onClick={() => handleNav("horse")}
        />
        <FeatureCard
          kicker="keuzestress solver"
          title="wtf gaan wij eten"
          text="Draai da rad en laat het lot kiezen: frietjes, piesta of pokebowl."
          action="Draai da rad"
          onClick={() => handleNav("food")}
        />
        <FeatureCard
          kicker="love & knuffels"
          title="Love hub"
          text="Mood knopjes, reminders, knuffelmodus en een ademronde."
          action="Land hier"
          onClick={() => handleNav("love")}
          highlighted
        />
      </div>

      <div className="stats-panel">
        <div className="stat-item">
          <span className="stat-number">9999+</span>
          <span className="stat-label">virtuele knuffels</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">liefde voor bab</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">0%</span>
          <span className="stat-label">gezeik of stress</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">1</span>
          <span className="stat-label">allerliefste aap</span>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  kicker,
  title,
  text,
  action,
  onClick,
  highlighted = false
}: {
  kicker: string;
  title: string;
  text: string;
  action: string;
  onClick: () => void;
  highlighted?: boolean;
}) {
  return (
    <button
      className={highlighted ? "feature-card is-highlighted" : "feature-card"}
      type="button"
      onClick={onClick}
    >
      <span className="eyebrow">{kicker}</span>
      <span className="feature-title">{title}</span>
      <span className="feature-text">{text}</span>
      <span className="feature-link">
        {action} {"\u2192"}
      </span>
    </button>
  );
}
