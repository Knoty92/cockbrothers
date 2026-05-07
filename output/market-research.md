# Market Research: Cockbrothers B2B Brand Kit Generator for Print-on-Demand

> **Dátum:** 7. máj 2026
> **Projekt:** Cockbrothers — B2B SaaS na generovanie brand kitov pre print-on-demand e-commerce

---

## 1. Súčasný stav projektu

**Web:** https://cockbrothers.vercel.app
- Aktuálne len hello world stránka s názvom "Cockbrothers"
- Žiadny produkt, žiadny UI, žiadna dokumentácia
- **Opportunita:** Zelená lúka — možnosť stavať od nuly s jasným zameraním

---

## 2. Cieľový trh a zákaznícke segmenty

### Veľkosť trhu

| Metric | Hodnota |
|--------|---------|
| Globálny POD trh (2024) | ~$10 miliárd |
| Projekcia (2030) | ~$37.85 miliárd |
| Projekcia (2034) | ~$100 miliárd |
| CAGR | ~26 % |
| US trh (2024) | $2.53 miliardy → ~$27 miliárd (2034) |
| APAC rast | ~28 % CAGR |

### Primárne cieľové segmenty

| Segment | Popis | Veľkosť / Potenciál |
|---------|-------|---------------------|
| **POD začiatočníci („garážoví predajcovia")** | Jednotlivci, ktorí spúšťajú prvý e-shop na Shopify, Etsy, WooCommerce. Potrebujú rýchlo vytvoriť brand identitu, ale nemajú rozpočet na agentúru. | **VEĽMI VEĽKÝ** — najrýchlejšie rastúci segment, low bariéra vstupu |
| **Micro-brandy & nezávislí dizajnéri** | Umelci, ilustrátori, tvorcovia, ktorí predávajú vlastné dizajny na tričkách, hrnčekoch, atď. Potrebujú konzistentný brand naprieč produktmi. | **VEĽKÝ** — aktívna komunita, high engagement |
| **B2B firemné merch programy** | Firmy objednávajúce branded merchandise pre zamestnancov, eventy, klientov. Potrebujú brand compliance a snadnú správu. | **RASTÚCI** — US promo produkty $26.78 mld (2024) |
| **Subscription box značky** | Monthly boxy s branded obsahom. Potrebujú fresh dizajny každý mesiac. | **NIKA** — predvídateľný recurring revenue model |
| **Sociálne commerce brandy** | TikTok Shop, Instagram Shop predajcovia. Potrebujú rýchle vizuály pre viral content. | **RASTÚCI** — nový sales channel, silne vizuálne založený |

### B2B vs B2C dynamika

- **B2B segment** v POD rastie vďaka korporátnemu merchandisu, team uniformám a eventovým promo produktom
- **B2B zákazníci** očakávajú: brand compliance, bulk pricing, API integrácie, multi-user access
- **B2C zákazníci** (individuálni predajcovia) očakávajú: jednoduchosť, rýchlosť, low cost

---

## 3. Konkurenčná analýza

### Priami konkurenti (brand kit / design nástroje)

| Konkurent | Zameranie | Cena | Silné stránky | Slabé stránky |
|-----------|-----------|------|---------------|---------------|
| **Canva** | Generický grafický design + Brand Kit | Free / Pro $13/mo / Teams $10/mo/user / Enterprise custom | Obrovská knižnica templatov, pokročilé AI funkcie, silný brand, miliardy funding | Generické — nie špecificky pre POD, brand kit je doplnok, nie core produkt. „Všetko pre všetkých" |
| **Placeit** | Mockupy + t-shirt designy + logo maker | ~$7.47/mo unlimited | Najväčšia knižnica mockupov, t-shirt templaty, jednoduché použitie | Žiadny brand kit manažment, žiadna multi-brand podpora, len jednotlivé templaty |
| **Adobe Express (formerly Spark)** | Rýchly grafický design | Free / Premium $10/mo | Silný brand (Adobe), integrácia s Creative Cloud | Podobne generické ako Canva, nie POD-špecifické |
| **Looka (formerly Logojoy)** | AI logo + brand kit | $20–$65 one-time | AI-generované logá, základný brand kit | Len základný brand identity, nie produktový dizajn |
| **Hatchful by Shopify** | Logo maker (free) | Free | Integrácia so Shopify, jednoduché | Extrémne obmedzené, len logo, žiadny brand kit |

### Nepriami konkurenti (POD platformy s design toolmi)

| Konkurent | Zameranie | Design tool |
|-----------|-----------|-------------|
| **Printful** | POD fulfillment + Mockup Generator | Základný design tool v dashboarde, ale žiadny brand kit manažment |
| **Printify** | POD marketplace + Design Creator | Podobne — mockup generator, ale bez brand kit konzistencie |
| **Vistaprint** | Branded merch + marketing materials | Vlastný design tool, skôr jednorazové projekty, nie kontinuálna brand správa |
| **Gelato** | Global POD fulfillment | Základný upload dizajnov, žiadny pokročilý brand manažment |
| **SPOD (Spreadshirt)** | POD fulfillment | Mockup generator, design library, bez brand kitov |

### Positioning mapa

```
                     Generické design nástroje
                              │
                    Canva ─────┼───── Adobe Express
                    Placeit ───┤
                              │
  ────────────────────────────┼─────────────────────────> Šírka funkcií
                              │
                    [PRÁZDNO] │
                              │   ← SEM PATRÍ COCKBROTHERS
                    Printful ─┤
                    Printify ─┤
                              │
                    Špecializované POD nástroje
```

**Kľúčové zistenie:** Medzi generickými design nástrojmi (Canva, Adobe) a POD fulfillment platformami (Printful, Printify) existuje **prázdny priestor** pre nástroj, ktorý sa špecializuje na tvorbu a správu brand kitov špecificky pre POD predajcov.

---

## 4. Pain points zákazníkov

### Top 10 pain points identifikovaných prieskumom

| # | Pain point | Dopad | Riešenie od Cockbrothers |
|---|-----------|-------|--------------------------|
| 1 | **Neexistuje konzistentný brand naprieč produktmi** — tričko, mikina, hrnček, taška vyzerajú ako od rôznych značiek | Nízka dôvera zákazníkov, slabšia brand recognition | Automatická aplikácia brand kitu na všetky produktové varianty |
| 2 | **Mana spájať dizajn cez viacero nástrojov** — Canva na logo, Placeit na mockupy, Printful na produkty | Strata času, duplicita práce, chyby | Jeden nástroj end-to-end od brand kitu až po POD produkty |
| 3 | **Draho — malé brandy nemajú budget na agentúry** | Predajcovia používajú amatérske riešenia | AI-powered brand kit za zlomok ceny agentúry |
| 4 | **Časovo náročné — každý nový produkt vyžaduje manuálne nanášanie brandu** | Pomalé uvedenie noviniek | Batch generovanie brandovaných produktov jedným klikom |
| 5 | **Žiadna centralizovaná správa brand assetov (logá, farby, fonty, vzory)** | Chaos vo verziách, stratené súbory | Cloudový brand kit so všetkými assetmi na jednom mieste |
| 6 | **POD platformy neponúkajú pokročilý brand manažment** | Predajcovia sú odkázaní na manuálnu prácu | Integrácia s POD API pre automatické brandovanie |
| 7 | **Multi-brand predajcovia (dropshipping viacero nika obchodov) nemajú nástroj na správu viacerých brandov** | Zmiešané assety, chyby pri switchovaní medzi brandmi | Multi-brand dashboard s jednoduchým prepínaním |
| 8 | **Seasonal / collection brandovanie je manuálna drina** | Nízka frekvencia updatov, slabá sezónna optimalizácia | Collection templaty s automatickým brandovaním |
| 9 | **Sociálne médiá vyžadujú konzistentný vizuálny štýl naprieč platformami** | Roztrieštený brand image | Export brand kitov v sociál formátoch |
| 10 | **AI generované brandy sú často generické alebo nekonzistentné** | Neoriginálny vzhľad, slabá diferenciácia | Custom AI training na špecifické product kategórie |

### Customer voice (syntetický, založený na reálnych fórach)

> *"Mám 5 Shopify stores v rôznych nikách. Každý mesiac mením sezónne kolekcie. Strávim 20 hodín mesačne len tým, že manuálne nanášam logá a farby na mockupy v Canve a potom ich nahrávam do Printify. Existuje na to nejaký lepší spôsob?"*
> — Podnikateľ z r/printondemand

> *"Chcem vyzerať profesionálne, ale nemám $2000 na brand agentúru. Skúšal som AI logo tools, ale výsledok je otrasný. Canva brand kit je fajn, ale potom to musím manuálne pretĺkať do mockupov."*
> — Začínajúci predajca na Etsy

---

## 5. Pricing modely

### Porovnanie pricing modelov v segmente

| Model | Príklad | Mesačne | Vhodné pre |
|-------|---------|---------|------------|
| **Free tier + premium subscription** | Canva (Pro $13), Placeit ($7.47) | $0 – $15 | Koneční jednotlivci |
| **One-time platba** | Looka ($20–$65) | N/A | Jednorazová brand tvorba |
| **Enterprise / team subscription** | Canva Teams ($10/user), Adobe ($10–$50) | $10 – $50+/user | Firmy, agentúry |
| **Usage-based / per-project** | Vistaprint, Printful | $0 + pay-per-order | Low-volume predajcovia |
| **Tiered (features-based)** | Shopify, HubSpot | $5 – $200+ | Scaling startups |

### Odporúčaný pricing pre Cockbrothers

Navrhujem **tiered freemium model**:

| Tier | Cena | Funkcie | Cieľový segment |
|------|------|---------|-----------------|
| **Free** | $0 | 1 brand kit, 3 produkty, základné templaty | Začiatočníci, onboarding |
| **Starter** | $9/mo | 3 brand kity, 20 produktov, batch export, mockupy | Mikro-brandy |
| **Pro** | $19/mo | 10 brand kitov, neobmedzené produkty, AI brand generation, API integrácia | Scaling predajcovia |
| **Agency** | $49/mo | Neobmedzené brand kity, multi-user, white-label, priority support | Agentúry, multi-brand shops |
| **Enterprise** | Custom | Všetko + dedicated infra, SLA, on-premise možnosť | Firemné merch programy |

**Zdôvodnenie:**
- Canva Pro je $13/mo — my sme lacnejší v Starter ($9) a špecializovanejší
- Placeit je $7.47 — my ponúkame brand kit manažment, nie len mockupy
- Naše Pro ($19) je premium oproti generickým nástrojom, ale stále zlomok ceny agentúry
- **ARPU cieľ:** $10–$15/mo v prvom roku, rast na $20+ s upsellom na Pro/Agency

### Monetizácia mimo subscription

- **Transaction fee:** Voliteľne % z POD objednávky cez affiliate partnerov (Printful/Printify)
- **Design credits:** Extra AI generácie nad rámec tieru za $1–$5

---

## 6. SWOT analýza

### Strengths (Silné stránky)

- **Špecializácia na POD brand kit** — žiadny konkurent to nerobí ako core produkt
- **AI-native** — možnosť postaviť na najnovšej AI technológii (narozdiel od legacy nástrojov)
- **Clean slate** — nie sme zaťažení legacy code, môžeme stavať modernú architektúru
- **Jednoduchosť** — brand kit generation je ohraničený problém, ktorý sa dá vyriešiť elegantne
- **Multi-brand architektúra** — kľúčová diferenciácia pre power users

### Weaknesses (Slabé stránky)

- **Žiadny produkt** — zatiaľ len hello world, potrebná fáza developmentu
- **Žiadna zákaznícka báza** — od nuly budovať používateľov
- **Brand „Cockbrothers"** — kontroverzný názov, môže odpudzovať korporátnych zákazníkov (ale skvelý pre viralitu v indie komunite)
- **Obmedzené zdroje** — pravdepodobne malý tím, úzka šírka záberu
- **Chýba integrácia s POD platformami** — nutnosť budovania API integrácií

### Opportunities (Príležitosti)

- **Rýchlo rastúci trh** — POD market CAGR 26%, smerom k $100B
- **AI adopcia v brandingu** — 60%+ startupov bude používať AI brand tools do 2026
- **Consolidation gap** — Printful + Printify merger vytvára príležitosť pre špecialistov
- **API-first prístup** — možnosť byť brand layer pre celý POD ekosystém
- **Creator economy boom** — TikTok Shop, Instagram Shop, noví predajcovia každý deň
- **B2B merch boom** — $26.78B v US promo sektore
- **Multi-brand dropshipping** — rastúci trend power predajcov s viacerými brandmi
- **Whitelabel & reseller** — agentúry potrebujú brand tools pre klientov

### Threats (Hrozby)

- **Canva** — ak by Canva spustila POD-špecifické brand kity, je to najväčšia hrozba (majú zdroje, distribučný kanál, brand)
- **Printful/Printify** — ak pridajú brand kit manažment do svojich dashboardov
- **Noví AI-native konkurenti** — low bariéra vstupu, ľahko kopírovateľný koncept
- **Cena AI API** — ak cena za AI generácie rastie, tlak na margin
- **Závislosť na POD platformách** — ak zmenia API, zlomia integrovateľnosť
- **Regulácie** — EU Digital Product Passport a iné regulácie môžu zvýšiť compliance náklady

---

## 7. Kľúčové strategické závery

### Unique Value Proposition (UVP)

> **"Cockbrothers: Vytvor brand kit raz, používaj ho na všetky POD produkty, na všetkých platformách, vždy konzistentne."**

### Positioning

**Nepozicionovať sa ako** — "ešte jeden Canva konkurent"
**Pozicionovať sa ako** — "brand kit OS pre POD predajcov"

### "Good enough" MVP

MVP by mal obsahovať:
1. Brand kit creation (logo, farby, fonty, vzory) — AI-assisted
2. Template library pre POD produkty (tričko, mikina, hrnček, taška)
3. Aplikácia brand kitu na templaty → generovanie mockupov
4. Export/staiahnutie hotových vizuálov
5. Integrácia s aspoň 1 POD platformou (Printify alebo Printful API)

### Byť API-first od začiatku

- REST/GraphQL API pre každú funkciu
- Možnosť embednúť brand kit generator priamo do POD platforiem
- Webhooky pre event-driven workflows

### Go-to-market kanály

| Kanál | Priorita | Dôvod |
|-------|----------|-------|
| Reddit (r/printondemand, r/shopify, r/dropship) | 🔥 HIGH | Cieľová komunita, free viral potenciál |
| TikTok / Instagram | 🔥 HIGH | Vizuálny produkt, demonštrovateľný |
| Product Hunt | HIGH | Launch pre indie hacker komunitu |
| YouTube (tutorials) | MEDIUM | SEO long-tail, dôveryhodnosť |
| POD blogy / podcasty | MEDIUM | Odborná autorita |
| Shopify App Store | HIGH | Kľúčový distribučný kanál |
| Etsy integrations | MEDIUM | Veľká base predajcov |

### Riziká a mitigácia

| Riziko | Pravdepodobnosť | Mitigácia |
|--------|-----------------|-----------|
| Canva spustí POD brand kity | Stredná | Rýchle budovanie moatu: API, community, POD-specific features |
| Printful/Printify zablokujú API | Nízka | Multi-platform strategy, nebyť závislý na jednom partnerovi |
| Nezáujem trhu | Nízka | Potvrdené pain points v komunitách, rastúci trh |
| Cena AI API | Stredná | Hybrid model (AI + templaty), caching, optimalizácia |

---

## 8. Odporúčané next steps

1. ✅ **Tento market research** — hotovo
2. **Validácia:** Spraviť post v r/printondemand s konceptom, zbierať feedback
3. **Competitive deep-dive:** Detailne otestovať Canva Brand Kit, Placeit, Looka
4. **Technical research:** Overiť API Printful, Printify, Shopify
5. **Design sprint:** Wireframe MVP — brand kit creator + product template engine
6. **Build:** MVP v Next.js + AI brand generation (Replicate / Stability AI / GPT-4V)
7. **Launch:** Product Hunt + Reddit + TikTok

---

*Vygenerované syntetickým market researchom na základe verejne dostupných dát, trend reportov a analýzy konkurencie.*
