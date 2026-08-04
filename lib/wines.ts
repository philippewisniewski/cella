import type {
  SortDir,
  SortKey,
  Wine,
  WineStats,
  WineType,
} from "./types";

// ---------------------------------------------------------------------------
// SEED DATA
// This is the mock cellar. Each object matches the `Wine` type in ./types.
// It is intentionally a plain local array so the app runs with zero backend.
// To move to a real source (e.g. WordPress) later, keep these function
// signatures unchanged and replace their bodies with `fetch()` calls — the
// components that consume them will not need to change.
// ---------------------------------------------------------------------------
const SEED: Wine[] = [
  // ---------- France ----------
  {
    id: "fr-margaux-2015",
    name: "Château Margaux",
    producer: "Château Margaux",
    type: "red",
    grapeVariety: ["Cabernet Sauvignon", "Merlot"],
    year: 2015,
    quantity: 2,
    description:
      "First-growth Bordeaux with extraordinary perfume, depth and ageing potential.",
    score: 98,
    appellation: "Margaux",
    price: 850,
    alcoholicStrength: 13.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "France",
    region: "Bordeaux",
    address: "33460 Margaux, France",
    tastingNotes:
      "Violets, cassis and cedar; silky tannins with a very long finish.",
    readyToDrink: false,
  },
  {
    id: "fr-drc-2018",
    name: "Romanée-Conti",
    producer: "Domaine de la Romanée-Conti",
    type: "red",
    grapeVariety: ["Pinot Noir"],
    year: 2018,
    quantity: 1,
    description:
      "The benchmark Burgundian Pinot Noir — impossibly fine and rare.",
    score: 99,
    appellation: "Romanée-Conti Grand Cru",
    price: 2500,
    alcoholicStrength: 13.8,
    bottleVolume: 750,
    containsSulphites: true,
    country: "France",
    region: "Burgundy",
    address: "21700 Vosne-Romanée, France",
    tastingNotes:
      "Rose petal, red cherry and spice; ethereal, weightless yet profound.",
    readyToDrink: false,
  },
  {
    id: "fr-chablis-2020",
    name: "Chablis Grand Cru Les Clos",
    producer: "William Fèvre",
    type: "white",
    grapeVariety: ["Chardonnay"],
    year: 2020,
    quantity: 4,
    description:
      "Steely, mineral Chardonnay from the top Chablis grand cru site.",
    score: 94,
    appellation: "Chablis Grand Cru",
    price: 62,
    alcoholicStrength: 13.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "France",
    region: "Burgundy",
    address: "89800 Chablis, France",
    tastingNotes: "Oyster shell, lemon zest and flint; taut and saline.",
    readyToDrink: true,
  },
  {
    id: "fr-domperignon-2012",
    name: "Dom Pérignon",
    producer: "Moët & Chandon",
    type: "sparkling",
    grapeVariety: ["Chardonnay", "Pinot Noir"],
    year: 2012,
    quantity: 6,
    description: "Prestige vintage Champagne, only made in exceptional years.",
    score: 96,
    appellation: "Champagne",
    price: 185,
    alcoholicStrength: 12.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "France",
    region: "Champagne",
    address: "51200 Épernay, France",
    tastingNotes: "Brioche, white peach and toasted almond; fine, persistent mousse.",
    readyToDrink: true,
  },
  {
    id: "fr-yquem-2017",
    name: "Château d'Yquem",
    producer: "Château d'Yquem",
    type: "dessert",
    grapeVariety: ["Sémillon", "Sauvignon Blanc"],
    year: 2017,
    quantity: 1,
    description: "The legendary Sauternes — opulent, honeyed and near-immortal.",
    score: 97,
    appellation: "Sauternes",
    price: 320,
    alcoholicStrength: 14.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "France",
    region: "Bordeaux",
    address: "33210 Sauternes, France",
    tastingNotes: "Apricot, saffron and candied citrus; luscious yet precise.",
    readyToDrink: true,
  },
  {
    id: "fr-rivesaltes-cazes",
    name: "Muscat de Rivesaltes",
    producer: "Domaine Cazes",
    type: "fortified",
    grapeVariety: ["Muscat"],
    year: 2019,
    quantity: 3,
    description: "Sweet fortified Muscat from Roussillon, best lightly chilled.",
    score: 90,
    appellation: "Muscat de Rivesaltes",
    price: 24,
    alcoholicStrength: 15.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "France",
    region: "Roussillon",
    address: "66600 Rivesaltes, France",
    tastingNotes: "Grape, orange blossom and raisin; fresh and aromatic.",
    readyToDrink: true,
  },

  // ---------- Italy ----------
  {
    id: "it-barolo-2018",
    name: "Barolo Cannubi",
    producer: "Luciano Sandrone",
    type: "red",
    grapeVariety: ["Nebbiolo"],
    year: 2018,
    quantity: 2,
    description: "Powerful, perfumed Barolo from the fabled Cannubi cru.",
    score: 95,
    appellation: "Barolo",
    price: 95,
    alcoholicStrength: 14.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Italy",
    region: "Piedmont",
    address: "12060 Barolo, Italy",
    tastingNotes: "Tar, rose and red cherry; formidable tannins, long life ahead.",
    readyToDrink: false,
  },
  {
    id: "it-tignanello-2019",
    name: "Tignanello",
    producer: "Marchesi Antinori",
    type: "red",
    grapeVariety: ["Sangiovese", "Cabernet Sauvignon"],
    year: 2019,
    quantity: 3,
    description: "The original Super-Tuscan, Sangiovese with a Bordeaux twist.",
    score: 94,
    appellation: "Toscana IGT",
    price: 120,
    alcoholicStrength: 14.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Italy",
    region: "Tuscany",
    address: "50028 Tavarnelle Val di Pesa, Italy",
    tastingNotes: "Dark plum, sweet spice and vanilla; polished and concentrated.",
    readyToDrink: false,
  },
  {
    id: "it-brunello-2016",
    name: "Brunello di Montalcino",
    producer: "Biondi-Santi",
    type: "red",
    grapeVariety: ["Sangiovese"],
    year: 2016,
    quantity: 2,
    description: "Historic, age-worthy Brunello from the estate that defined it.",
    score: 97,
    appellation: "Brunello di Montalcino",
    price: 210,
    alcoholicStrength: 14.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Italy",
    region: "Tuscany",
    address: "53024 Montalcino, Italy",
    tastingNotes: "Dried cherry, leather and earth; majestic structure.",
    readyToDrink: false,
  },
  {
    id: "it-prosecco-bisol",
    name: "Prosecco Superiore",
    producer: "Bisol",
    type: "sparkling",
    grapeVariety: ["Glera"],
    year: 2022,
    quantity: 8,
    description: "Crisp, fruity DOCG Prosecco from the steep hills of Valdobbiadene.",
    score: 88,
    appellation: "Valdobbiadene Prosecco Superiore DOCG",
    price: 18,
    alcoholicStrength: 11.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Italy",
    region: "Veneto",
    address: "31049 Valdobbiadene, Italy",
    tastingNotes: "Green apple, pear and white flower; light, frothy and easy.",
    readyToDrink: true,
  },
  {
    id: "it-soave-pieropan",
    name: "Soave Classico",
    producer: "Pieropan",
    type: "white",
    grapeVariety: ["Garganega"],
    year: 2021,
    quantity: 5,
    description: "Elegant, volcanic-soil Soave from a benchmark producer.",
    score: 91,
    appellation: "Soave Classico",
    price: 22,
    alcoholicStrength: 12.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Italy",
    region: "Veneto",
    address: "37032 Monteforte d'Alpone, Italy",
    tastingNotes: "Almond, citrus and mountain herbs; savoury and saline.",
    readyToDrink: true,
  },

  // ---------- Spain ----------
  {
    id: "es-vegasicilia-2012",
    name: "Único",
    producer: "Vega Sicilia",
    type: "red",
    grapeVariety: ["Tempranillo", "Cabernet Sauvignon"],
    year: 2012,
    quantity: 1,
    description: "Spain's most revered red — monumental, slow-aged and rare.",
    score: 96,
    appellation: "Ribera del Duero",
    price: 260,
    alcoholicStrength: 14.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Spain",
    region: "Castilla y León",
    address: "47300 Peñafiel, Spain",
    tastingNotes: "Cedar, blackberry and tobacco; impossibly deep and long.",
    readyToDrink: false,
  },
  {
    id: "es-rioja-904-2010",
    name: "Gran Reserva 904",
    producer: "La Rioja Alta",
    type: "red",
    grapeVariety: ["Tempranillo"],
    year: 2010,
    quantity: 4,
    description: "Classic, oak-aged Rioja with real maturity in bottle.",
    score: 95,
    appellation: "Rioja",
    price: 72,
    alcoholicStrength: 13.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Spain",
    region: "La Rioja",
    address: "26200 Haro, Spain",
    tastingNotes: "Dried strawberry, vanilla and leather; silky and resolved.",
    readyToDrink: true,
  },
  {
    id: "es-albarino-2022",
    name: "Albariño",
    producer: "Martín Códax",
    type: "white",
    grapeVariety: ["Albariño"],
    year: 2022,
    quantity: 6,
    description: "Zippy Atlantic white from Galicia's flagship grape.",
    score: 89,
    appellation: "Rías Baixas",
    price: 16,
    alcoholicStrength: 12.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Spain",
    region: "Galicia",
    address: "36600 Cambados, Spain",
    tastingNotes: "Lime, peach and sea salt; bright and refreshing.",
    readyToDrink: true,
  },
  {
    id: "es-cava-raventos",
    name: "Cava de la Finca",
    producer: "Raventós i Blanc",
    type: "sparkling",
    grapeVariety: ["Macabeo", "Xarel·lo", "Parellada"],
    year: 2019,
    quantity: 5,
    description: "Estate Cava from the family that arguably invented it.",
    score: 90,
    appellation: "Cava",
    price: 21,
    alcoholicStrength: 12.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Spain",
    region: "Penedès",
    address: "08770 Sant Sadurní d'Anoia, Spain",
    tastingNotes: "Toasted bread, citrus and almond; fine and dry.",
    readyToDrink: true,
  },
  {
    id: "es-sherry-lustau",
    name: "Amontillado",
    producer: "Emilio Lustau",
    type: "fortified",
    grapeVariety: ["Palomino"],
    year: 2015,
    quantity: 3,
    description: "Dry, nutty Sherry aged under solera in Jerez.",
    score: 92,
    appellation: "Jerez-Xeres",
    price: 19,
    alcoholicStrength: 18.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Spain",
    region: "Andalusia",
    address: "11402 Jerez de la Frontera, Spain",
    tastingNotes: "Walnut, caramel and dried orange; bone dry and complex.",
    readyToDrink: true,
  },

  // ---------- USA ----------
  {
    id: "us-screamingeagle-2018",
    name: "Screaming Eagle",
    producer: "Screaming Eagle",
    type: "red",
    grapeVariety: ["Cabernet Sauvignon"],
    year: 2018,
    quantity: 1,
    description: "Cult Napa Cabernet — tiny production, colossal demand.",
    score: 99,
    appellation: "Napa Valley",
    price: 3200,
    alcoholicStrength: 14.8,
    bottleVolume: 750,
    containsSulphites: true,
    country: "USA",
    region: "California",
    address: "94558 Oakville, California, USA",
    tastingNotes: "Crème de cassis, mocha and violets; impossibly rich yet balanced.",
    readyToDrink: false,
  },
  {
    id: "us-opusone-2018",
    name: "Opus One",
    producer: "Opus One Winery",
    type: "red",
    grapeVariety: ["Cabernet Sauvignon", "Merlot"],
    year: 2018,
    quantity: 2,
    description: "Joint venture of Mondavi and Baron Philippe de Rothschild.",
    score: 96,
    appellation: "Napa Valley",
    price: 390,
    alcoholicStrength: 14.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "USA",
    region: "California",
    address: "94558 Oakville, California, USA",
    tastingNotes: "Blackcurrant, graphite and sweet oak; plush and refined.",
    readyToDrink: false,
  },
  {
    id: "us-caymus-2020",
    name: "Caymus Cabernet Sauvignon",
    producer: "Caymus Vineyards",
    type: "red",
    grapeVariety: ["Cabernet Sauvignon"],
    year: 2020,
    quantity: 4,
    description: "Generous, approachable Napa Cabernet for near-term drinking.",
    score: 92,
    appellation: "Napa Valley",
    price: 85,
    alcoholicStrength: 14.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "USA",
    region: "California",
    address: "94573 Rutherford, California, USA",
    tastingNotes: "Plush blackberry, cocoa and vanilla; round and friendly.",
    readyToDrink: true,
  },
  {
    id: "us-rombauer-2021",
    name: "Chardonnay",
    producer: "Rombauer Vineyards",
    type: "white",
    grapeVariety: ["Chardonnay"],
    year: 2021,
    quantity: 5,
    description: "Oaky, buttery Napa Chardonnay loved worldwide.",
    score: 91,
    appellation: "Napa Valley",
    price: 45,
    alcoholicStrength: 14.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "USA",
    region: "California",
    address: "94574 St. Helena, California, USA",
    tastingNotes: "Peach, butter and toasted oak; full-bodied and creamy.",
    readyToDrink: true,
  },
  {
    id: "us-kistler-2019",
    name: "Sonoma Coast Pinot Noir",
    producer: "Kistler Vineyards",
    type: "red",
    grapeVariety: ["Pinot Noir"],
    year: 2019,
    quantity: 3,
    description: "Silky, site-driven Sonoma Pinot from a cult producer.",
    score: 94,
    appellation: "Sonoma Coast",
    price: 80,
    alcoholicStrength: 14.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "USA",
    region: "California",
    address: "95472 Sonoma, California, USA",
    tastingNotes: "Red cherry, forest floor and spice; silky and long.",
    readyToDrink: true,
  },

  // ---------- Argentina ----------
  {
    id: "ar-nicolas-2018",
    name: "Nicolás Catena Zapata",
    producer: "Catena Zapata",
    type: "red",
    grapeVariety: ["Malbec", "Cabernet Sauvignon"],
    year: 2018,
    quantity: 3,
    description: "Argentina's first world-class Bordeaux-blend Malbec.",
    score: 95,
    appellation: "Mendoza",
    price: 80,
    alcoholicStrength: 14.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Argentina",
    region: "Mendoza",
    address: "5505 Luján de Cuyo, Mendoza, Argentina",
    tastingNotes: "Blackberry, violet and graphite; structured and ageworthy.",
    readyToDrink: true,
  },
  {
    id: "ar-piedrainfinita-2019",
    name: "Finca Piedra Infinita",
    producer: "Zuccardi",
    type: "red",
    grapeVariety: ["Malbec"],
    year: 2019,
    quantity: 2,
    description: "Single-vineyard Malbec from Paraje Altamira, high altitude.",
    score: 96,
    appellation: "Paraje Altamira",
    price: 60,
    alcoholicStrength: 14.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Argentina",
    region: "Mendoza",
    address: "5565 San Carlos, Mendoza, Argentina",
    tastingNotes: "Blue fruit, chalk and herbs; precise and mineral.",
    readyToDrink: true,
  },
  {
    id: "ar-torrontes-2022",
    name: "Torrontés",
    producer: "Susana Balbo",
    type: "white",
    grapeVariety: ["Torrontés"],
    year: 2022,
    quantity: 4,
    description: "Aromatic, floral white native to the high vineyards of Salta.",
    score: 88,
    appellation: "Salta",
    price: 15,
    alcoholicStrength: 13.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Argentina",
    region: "Salta",
    address: "4400 Salta, Argentina",
    tastingNotes: "Rose, lychee and citrus; aromatic and crisp.",
    readyToDrink: true,
  },

  // ---------- Chile ----------
  {
    id: "cl-almaviva-2018",
    name: "Almaviva",
    producer: "Viña Almaviva",
    type: "red",
    grapeVariety: ["Cabernet Sauvignon", "Carmenère"],
    year: 2018,
    quantity: 2,
    description: "Chile's flagship Bordeaux-style blend from the Maipo Andes.",
    score: 94,
    appellation: "Maipo Valley",
    price: 130,
    alcoholicStrength: 14.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Chile",
    region: "Central Valley",
    address: "Santiago, Chile",
    tastingNotes: "Blackcurrant, tobacco and graphite; polished and deep.",
    readyToDrink: true,
  },
  {
    id: "cl-donmelchor-2019",
    name: "Don Melchor",
    producer: "Concha y Toro",
    type: "red",
    grapeVariety: ["Cabernet Sauvignon"],
    year: 2019,
    quantity: 3,
    description: "Iconic single-vineyard Cabernet from the Puente Alto district.",
    score: 93,
    appellation: "Maipo Valley",
    price: 70,
    alcoholicStrength: 14.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Chile",
    region: "Central Valley",
    address: "Santiago, Chile",
    tastingNotes: "Cassis, mint and cedar; elegant and persistent.",
    readyToDrink: true,
  },
  {
    id: "cl-sauvignon-2022",
    name: "Sauvignon Blanc",
    producer: "Viña Errázuriz",
    type: "white",
    grapeVariety: ["Sauvignon Blanc"],
    year: 2022,
    quantity: 5,
    description: "Coastal, zesty Sauvignon from the cool Casablanca Valley.",
    score: 89,
    appellation: "Casablanca Valley",
    price: 14,
    alcoholicStrength: 13.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Chile",
    region: "Aconcagua",
    address: "Casablanca, Chile",
    tastingNotes: "Gooseberry, lime and cut grass; crisp and vibrant.",
    readyToDrink: true,
  },

  // ---------- Germany ----------
  {
    id: "de-riesling-spatlese-2020",
    name: "Ürziger Würzgarten Riesling Spätlese",
    producer: "Dr. Loosen",
    type: "white",
    grapeVariety: ["Riesling"],
    year: 2020,
    quantity: 4,
    description: "Off-dry Mosel Riesling from a spectacular volcanic vineyard.",
    score: 93,
    appellation: "Mosel",
    price: 35,
    alcoholicStrength: 8.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Germany",
    region: "Mosel",
    address: "54539 Bernkastel-Kues, Germany",
    tastingNotes: "Apricot, honeysuckle and slate; sweet-savoury and racy.",
    readyToDrink: true,
  },
  {
    id: "de-riesling-trocken-2019",
    name: "G-Max Riesling Trocken",
    producer: "Weingut Keller",
    type: "white",
    grapeVariety: ["Riesling"],
    year: 2019,
    quantity: 1,
    description: "Cult dry Riesling from the Rheinhessen — tiny and prized.",
    score: 95,
    appellation: "Rheinhessen",
    price: 60,
    alcoholicStrength: 12.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Germany",
    region: "Rheinhessen",
    address: "67593 Westhofen, Germany",
    tastingNotes: "Lime, white peach and crushed stone; laser-precise.",
    readyToDrink: true,
  },

  // ---------- Portugal ----------
  {
    id: "pt-taylor-2017",
    name: "Vintage Port",
    producer: "Taylor Fladgate",
    type: "fortified",
    grapeVariety: ["Touriga Nacional"],
    year: 2017,
    quantity: 2,
    description: "Declared vintage Port built for decades of cellaring.",
    score: 98,
    appellation: "Douro",
    price: 90,
    alcoholicStrength: 20.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Portugal",
    region: "Douro",
    address: "4430-809 Vila Nova de Gaia, Portugal",
    tastingNotes: "Blackberry, liquorice and violet; monumental, tannic, sweet.",
    readyToDrink: false,
  },
  {
    id: "pt-soalheiro-2022",
    name: "Alvarinho",
    producer: "Soalheiro",
    type: "white",
    grapeVariety: ["Alvarinho"],
    year: 2022,
    quantity: 6,
    description: "Crisp, citrus-driven Vinho Verde from the Minho.",
    score: 88,
    appellation: "Vinho Verde",
    price: 13,
    alcoholicStrength: 12.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Portugal",
    region: "Minho",
    address: "4960 Melgaço, Portugal",
    tastingNotes: "Lemon, peach and a spritz; light and zesty.",
    readyToDrink: true,
  },
  {
    id: "pt-crasto-2018",
    name: "Quinta do Crasto Reserva",
    producer: "Quinta do Crasto",
    type: "red",
    grapeVariety: ["Touriga Nacional", "Tinta Roriz"],
    year: 2018,
    quantity: 4,
    description: "Robust, schist-grown Douro red blend.",
    score: 92,
    appellation: "Douro",
    price: 25,
    alcoholicStrength: 14.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Portugal",
    region: "Douro",
    address: "5130-101 Sabrosa, Portugal",
    tastingNotes: "Black fruit, spice and rock; muscular yet fresh.",
    readyToDrink: true,
  },

  // ---------- Romania ----------
  {
    id: "ro-grasa-cotnari",
    name: "Grasă de Cotnari",
    producer: "Cotnari",
    type: "dessert",
    grapeVariety: ["Grasă de Cotnari"],
    year: 2018,
    quantity: 3,
    description: "Historic Romanian sweet white, sometimes called 'the wine of kings'.",
    score: 85,
    appellation: "Cotnari",
    price: 12,
    alcoholicStrength: 12.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Romania",
    region: "Moldova",
    address: "707165 Cotnari, Romania",
    tastingNotes: "Honey, dried apricot and herbs; sweet and gently oxidative.",
    readyToDrink: true,
  },
  {
    id: "ro-feteasca-2018",
    name: "Fetească Neagră",
    producer: "SERVE",
    type: "red",
    grapeVariety: ["Fetească Neagră"],
    year: 2018,
    quantity: 4,
    description: "Native Romanian dark-berry red with a spicy edge.",
    score: 88,
    appellation: "Dealu Mare",
    price: 14,
    alcoholicStrength: 13.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Romania",
    region: "Dealu Mare",
    address: "Prahova, Romania",
    tastingNotes: "Black cherry, plum and pepper; soft and juicy.",
    readyToDrink: true,
  },

  // ---------- Brazil ----------
  {
    id: "br-cavegeisse",
    name: "Cave Geisse Brut",
    producer: "Cave Geisse",
    type: "sparkling",
    grapeVariety: ["Chardonnay", "Pinot Noir"],
    year: 2019,
    quantity: 5,
    description: "Traditional-method sparkling from Brazil's cool South.",
    score: 89,
    appellation: "Pinto Bandeira",
    price: 18,
    alcoholicStrength: 12.0,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Brazil",
    region: "Rio Grande do Sul",
    address: "95250-000 Pinto Bandeira, Brazil",
    tastingNotes: "Green apple, brioche and citrus; fine and dry.",
    readyToDrink: true,
  },
  {
    id: "br-tannat-2017",
    name: "Tannat",
    producer: "Lidio Carraro",
    type: "red",
    grapeVariety: ["Tannat"],
    year: 2017,
    quantity: 3,
    description: "Full-bodied Uruguayan-style Tannat grown in Campanha.",
    score: 87,
    appellation: "Campanha",
    price: 16,
    alcoholicStrength: 13.5,
    bottleVolume: 750,
    containsSulphites: true,
    country: "Brazil",
    region: "Rio Grande do Sul",
    address: "96450-000 Encruzilhada do Sul, Brazil",
    tastingNotes: "Blackberry, cocoa and leather; tannic and savoury.",
    readyToDrink: true,
  },
];

// Returns the full list of wines. Marked async on purpose (see note above)
// so a future network fetch drops in without changing callers.
export async function getWines(): Promise<Wine[]> {
  return SEED;
}

// Looks up a single wine by its `id`, or null if it doesn't exist.
export async function getWineById(id: string): Promise<Wine | null> {
  return SEED.find((w) => w.id === id) ?? null;
}

// ---------------------------------------------------------------------------
// PERSISTENCE (localStorage)
// The SEED above is the fallback shown on first load / on the server. Once the
// app runs in the browser we load/save the user's actual cellar here. Every
// access is guarded by `typeof window` so this module is safe to import on the
// server (SSR), where localStorage does not exist.
// ---------------------------------------------------------------------------
const STORAGE_KEY = "cella.wines.v1";

// Read the saved cellar. Returns null if nothing is stored yet, or if we're on
// the server (no localStorage). The caller decides what to do with null.
export function loadWines(): Wine[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Wine[]) : null;
  } catch {
    // Unreadable/corrupt data — fall back to the seed rather than crashing.
    return null;
  }
}

// Write the whole cellar. A no-op on the server.
export function saveWines(wines: Wine[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wines));
}

// ---------------------------------------------------------------------------
// STATS
// A pure, synchronous calculation shared by the async `getStats` (the server
// seam) and the client dashboard's useMemo, so both always agree.
// cellarValue is the total £ tied up in the cellar (price × quantity).
// ---------------------------------------------------------------------------
export function computeStats(wines: Wine[]): WineStats {
  const totalBottles = wines.reduce((sum, w) => sum + w.quantity, 0);
  // Sets count unique countries/regions (eliminates duplicates).
  const totalCountries = new Set(wines.map((w) => w.country)).size;
  const totalRegions = new Set(wines.map((w) => w.region)).size;
  const cellarValue = wines.reduce((sum, w) => sum + w.price * w.quantity, 0);
  const readyToDrink = wines.filter((w) => w.readyToDrink).length;
  return {
    totalBottles,
    totalCountries,
    totalRegions,
    cellarValue,
    readyToDrink,
  };
}

// Async wrapper kept for the server-side data seam (e.g. a future DB/WordPress
// swap). Defaults to the seed when no list is supplied.
export async function getStats(wines: Wine[] = SEED): Promise<WineStats> {
  return computeStats(wines);
}

// Free-text search across name, producer, region, appellation, country, grape
// variety, type, year and price. Numeric fields are coerced to strings so a
// query like "2015" or "850" matches. Empty query returns the list unchanged.
export function searchWines(wines: Wine[], query: string): Wine[] {
  const q = query.trim().toLowerCase();
  if (!q) return wines;
  return wines.filter((w) =>
    [
      w.name,
      w.producer,
      w.region,
      w.appellation,
      w.country,
      w.type,
      String(w.year),
      String(w.price),
      ...w.grapeVariety,
    ]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

// Returns a new sorted array (does not mutate the input).
// Canonical display order for wine types — not alphabetical, but the order a
// cellar owner expects (still/light → still/rich → rosé → sparkling → sweet → fortified).
const TYPE_ORDER: Record<WineType, number> = {
  white: 0,
  red: 1,
  rosé: 2,
  sparkling: 3,
  dessert: 4,
  fortified: 5,
}

// `key` picks the field; `dir` defaults to "desc" (highest first).
// Strings use localeCompare; numbers compare directly; the boolean
// `readyToDrink` sorts false (0) before true (1); `type` uses TYPE_ORDER so
// the categories sort in a meaningful cellar order rather than alphabetically.
export function sortWines(
  wines: Wine[],
  key: SortKey,
  dir: SortDir = "desc",
): Wine[] {
  // Create a multiplier: 1 for ascending, -1 for descending
  // This allows us to use the same comparison logic for both directions
  const factor = dir === "asc" ? 1 : -1;

  // Create a copy of the array to avoid mutating the original
  // This is a best practice - we don't want to change the input array
  return [...wines].sort((a, b) => {
    // Wine type: sort by its canonical category order, not alphabetically.
    if (key === "type") {
      return factor * (TYPE_ORDER[a.type] - TYPE_ORDER[b.type]);
    }

    // String fields: localeCompare handles locale-aware ordering.
    if (typeof a[key] === "string" && typeof b[key] === "string") {
      return factor * (a[key] as string).localeCompare(b[key] as string);
    }

    // Boolean field (readyToDrink): coerce to 0/1.
    if (typeof a[key] === "boolean" && typeof b[key] === "boolean") {
      return factor * ((a[key] ? 1 : 0) - (b[key] ? 1 : 0));
    }

    // Numeric fields (year, score, price, quantity): simple subtraction.
    return factor * ((a[key] as number) - (b[key] as number));
  });
}