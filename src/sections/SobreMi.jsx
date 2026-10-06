import portfolioData from "../data/portfolioData";
import "./SobreMi.css";

export default function SobreMi() {
  const { about } = portfolioData.personal;

  return (
    <section
      id="sobremi"
      className="section section-light about-section"
      aria-labelledby="about-title"
    >
      <header className="section-heading about-heading">
        <h2 id="about-title">Sobre mí</h2>
      </header>
      <div className="about-grid">
        <div className="about-copy">
          <p className="about-copy-label">01 — Perfil</p>
          <p className="about-lead">{about.introduction}</p>
        </div>

        <section className="about-approach" aria-labelledby="about-approach-title">
          <p className="about-copy-label">02 — Enfoque</p>
          <h3 id="about-approach-title">Cómo trabajo</h3>
          <ol className="about-approach-list">
            {about.waysOfWorking.map((item, index) => (
              <li key={item}>
                <span aria-hidden="true">0{index + 1}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <aside className="about-direction" aria-labelledby="about-direction-title">
        <p className="about-copy-label">03 — Dirección</p>
        <div>
          <h3 id="about-direction-title">Desarrollo web en equipo</h3>
          <p>{about.direction}</p>
        </div>
      </aside>
    </section>
  );
}
