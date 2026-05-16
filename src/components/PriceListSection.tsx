const priceItems = [
  {
    title: "Landing",
    description:
      "Landing-ul este un mini-site de o singură pagină care conține toate informațiile importante despre dumneavoastră sau despre afacerea dumneavoastră: linkuri, rețele sociale, portofoliu, servicii, meniu, date de contact, recenzii, formular de înregistrare și multe altele.",
    audience: ["Specialiștilor în frumusețe", "Fotografilor", "Bloggerilor", "Oricăror specialiști și companii pentru care este important să se prezinte într-un mod atractiv pe internet"],
    price: "150€",
  },
  {
    title: "Magazin online",
    description:
      "Magazin online este un site web unde oamenii pot vizualiza produsele, afla prețurile și plasa o comandă prin internet.",
    audience: ["Restaurante și cafenele", "Magazine de îmbrăcăminte / electronice", "Produse artizanale", "Livrare de mâncare", "Orice afacere care se ocupă cu vânzarea online de produse"],
    price: "De la 300€",
  },
  {
    title: "Design digital",
    description:
      "Designul digital înseamnă crearea de elemente vizuale pentru internet și rețele sociale.",
    audience: ["Meniuri pentru restaurante și cafenele", "Proiectare de site-uri web", "Catalog de produse/servicii", "Proiectare de postări publicitare"],
    price: "De la 100€",
  },
  {
    title: "Fotografierea obiectelor",
    description:
      "Fotografia de produs este o sesiune foto profesională a produselor destinată publicității, meniurilor, site-urilor web, rețelelor sociale și platformelor de vânzare online. Aceasta ajută la prezentarea produsului într-un mod atractiv și la atragerea atenției clienților.",
    audience: ["Restaurante și cafenele", "Magazine de îmbrăcăminte / electrocasnice", "Produse artizanale"],
    price: "15€ / ora",
  },
];

export default function PriceListSection() {
  return (
    <section className="priceSection" id="prices">
      <div className="priceGlow priceGlowGreen" />
      <div className="priceGlow priceGlowWhite" />
      <div className="priceDecor priceDecorLeft" />
      <div className="priceDecor priceDecorRight" />

      <div className="priceContainer">
        <h2>Lista de prețuri</h2>

        <div className="priceGrid">
          {priceItems.map((item) => (
            <article className="priceCard" key={item.title}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="priceAudience">
                  <p>Cui se adresează:</p>
                  <ul>
                    {item.audience.map((audienceItem) => (
                      <li key={audienceItem}>{audienceItem}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="priceCardBottom">
                <a href="mailto:hello@coderatti.studio">Contact</a>
                <span>{item.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
