"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";

type PortfolioCase = {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  url?: string;
  image: string;
  tags: string[];
  scope: string[];
};

const portfolioCases: PortfolioCase[] = [
  {
    id: "amore-sushi",
    number: "01",
    category: "online store",
    title: "Amore Sushi",
    subtitle: "Сайт доставки еды / amoresushi.com",
    description: "Онлайн-витрина для доставки суши: каталог, акцент на продукт, мобильная структура и быстрый переход к заказу.",
    url: "https://amoresushi.com",
    image: "/portfolio/amore-sushi-cover.jpg",
    tags: ["web design", "catalog", "delivery"],
    scope: ["структура каталога", "адаптивный интерфейс", "карточки товаров", "путь к заказу"],
  },
  {
    id: "kasha-brow",
    number: "02",
    category: "landing page",
    title: "Kasha Brow Studio",
    subtitle: "Лендинг beauty-студии / kashabrowstudio.ru",
    description: "Лаконичная страница для студии: первый экран, услуги, портфолио, доверие и простая запись через контактные кнопки.",
    url: "https://kashabrowstudio.ru",
    image: "/portfolio/kasha-brow-studio.jpg",
    tags: ["landing", "beauty", "booking"],
    scope: ["hero section", "блок услуг", "портфолио работ", "контактный блок"],
  },
  {
    id: "food-photo",
    number: "03",
    category: "food photo",
    title: "Amore Sushi Photo",
    subtitle: "Фуд-съёмка для меню и рекламы",
    description: "Съёмка блюд для сайта, социальных сетей и рекламных постов: чистый свет, крупные планы и кадры под продажи.",
    image: "/portfolio/amore-food.jpg",
    tags: ["photo", "content", "ads"],
    scope: ["фото блюд", "контент для меню", "кадры для постов", "визуалы для рекламы"],
  },
  {
    id: "digital-design",
    number: "04",
    category: "digital design",
    title: "Design digital",
    subtitle: "Web, app, meniuri și cataloage",
    description: "Разработка визуальных материалов для digital-среды: дизайн сайтов и приложений, меню для ресторанов, каталоги, презентации и рекламные макеты.",
    image: "/portfolio/amore-food.jpg",
    tags: ["web design", "app design", "menus", "catalogs"],
    scope: ["дизайн сайтов", "дизайн приложений", "меню для ресторанов", "каталоги и презентации"],
  },
];

export default function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const activeCase = portfolioCases[activeIndex] ?? portfolioCases[0];

  const prev = () => setActiveIndex((current) => (current === 0 ? portfolioCases.length - 1 : current - 1));
  const next = () => setActiveIndex((current) => (current === portfolioCases.length - 1 ? 0 : current + 1));

  useEffect(() => {
    const interval = window.setInterval(next, 15000);
    return () => window.clearInterval(interval);
  }, []);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - event.changedTouches[0].clientX;
    if (Math.abs(diff) > 42) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="portfolioSection" id="portfolio">
      <div className="portfolioContainer">
        <div className="portfolioHeader">
          <div>
            <h2>Portfolio</h2>
          </div>
          <p className="portfolioIntro">
            Кейсы Coderatti Studio: сайты, лендинги и визуальный контент для локального бизнеса. Без лишнего шума — только задача, решение и результат.
          </p>
        </div>

        <div className="portfolioTabs">
          {portfolioCases.map((item, index) => (
            <button key={item.id} type="button" onClick={() => setActiveIndex(index)} className={activeIndex === index ? "active" : ""}>
              <span>{item.number}</span>
              <span>{item.category}</span>
            </button>
          ))}
        </div>

        <div className="portfolioBody">
          <div className="portfolioSlider" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="portfolioTrack" style={{ transform: `translateX(calc(-${activeIndex * 100}% - ${activeIndex * 20}px))` }}>
              {portfolioCases.map((item, index) => (
                <article key={item.id} className={activeIndex === index ? "portfolioSlide active" : "portfolioSlide"}>
                  <button type="button" onClick={() => setActiveIndex(index)} className="portfolioCard">
                    <div className="portfolioCardInfo">
                      <div>
                        <p className="portfolioNumber">{item.number}</p>
                        <p className="portfolioCategory">{item.category}</p>
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                      </div>
                      <div className="portfolioMobileControls">
                        <span>{activeCase.number} / {portfolioCases.length.toString().padStart(2, "0")}</span>
                        <div>
                          <button type="button" onClick={(event) => { event.stopPropagation(); prev(); }} aria-label="Previous case">←</button>
                          <button type="button" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next case">→</button>
                        </div>
                      </div>
                    </div>
                    <ProjectVisual item={item} active={activeIndex === index} />
                  </button>
                </article>
              ))}
            </div>
          </div>

          <aside className="portfolioAside">
            <div>
              <div className="portfolioAsideTop">
                <span>{activeCase.number} / {portfolioCases.length.toString().padStart(2, "0")}</span>
                <div>
                  <button type="button" onClick={prev} aria-label="Previous case">←</button>
                  <button type="button" onClick={next} aria-label="Next case">→</button>
                </div>
              </div>
              <p className="portfolioAsideLabel">case description</p>
              <p className="portfolioDescription">{activeCase.description}</p>
              <div className="portfolioTags">
                {activeCase.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="portfolioScope">
                <p>scope</p>
                {activeCase.scope.map((item) => (
                  <div key={item}>
                    <span />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            {activeCase.url ? (
              <a className="portfolioProjectLink" href={activeCase.url} target="_blank" rel="noopener noreferrer">view project</a>
            ) : (
              <a className="portfolioProjectLink" href="mailto:hello@coderatti.studio">request similar shoot</a>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ item, active }: { item: PortfolioCase; active: boolean }) {
  return (
    <div className="portfolioVisual">
      <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 58vw, 94vw" className={active ? "active" : ""} />
      <div className="portfolioVisualOverlay" />
      <div className="portfolioVisualCaption">
        <div>
          <p>preview</p>
          <p>{item.category}</p>
        </div>
        {item.url ? (
          <a href={item.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>open</a>
        ) : (
          <span>view</span>
        )}
      </div>
    </div>
  );
}
