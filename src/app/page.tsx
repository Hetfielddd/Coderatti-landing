import PortfolioSection from "@/components/PortfolioSection";
import PriceListSection from "@/components/PriceListSection";

export default function Home() {
  return (
    <>
      <main className="hero">
        <section className="heroContent">
          <div className="language">RO</div>

          <div className="heroInner">
            <p className="badge">Studio web și foto</p>
            <h1>
              Coderatti{" "}
              <span className="typingText" aria-label="Studio">
                <span>S</span>
                <span>t</span>
                <span>u</span>
                <span>d</span>
                <span>i</span>
                <span>o</span>
                <span className="typingCursor">|</span>
              </span>
            </h1>
            <p className="subtitle">Creează-ți propria vitrină online</p>
          </div>

          <section className="photoTemplate" aria-label="Hero photo" />

          <div className="ctaRow">
            <span className="arrow" />
            <a className="cta" href="mailto:hello@coderatti.studio">
              Scrie-ne
            </a>
          </div>

          <nav className="heroNav" aria-label="Hero navigation">
            <a className="active" href="#portfolio">Portofoliu</a>
            <a href="#prices">Servicii</a>
            <a href="#contacts">Contacte</a>
          </nav>
        </section>
      </main>

      <PortfolioSection />
      <PriceListSection />
      <section className="emptyScrollSection" aria-hidden="true" />
    </>
  );
}
