import React, { useCallback, useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------
   Images (hosted on imgur)
------------------------------------------------------------------- */
const IMG = {
  logo: 'https://i.imgur.com/J2ME1ji.png',
  truck: 'https://i.imgur.com/H7F2rk9.png',
  reeferVan: 'https://imgur.com/5MNmizZ.jpg',
  straightTruck: 'https://imgur.com/WyZyHpc.jpg',
  sprinter: 'https://imgur.com/TptDEQk.jpg',
  security: 'https://i.imgur.com/lqpRy0g.jpg',
};

/* ------------------------------------------------------------------
   Icons
------------------------------------------------------------------- */
const ICONS = {
  check: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  truck: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1',
  bolt: 'M13 10V3L4 14h7v7l9-11h-7z',
  snow: 'M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4',
  users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  map: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
  doc: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  scale: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
  phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  left: 'M15 19l-7-7 7-7',
  right: 'M9 5l7 7-7 7',
};

function Icon({ name, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS[name]} />
    </svg>
  );
}

function IconCircle({ name, small }) {
  return (
    <div className={small ? 'icon-circle icon-circle--sm' : 'icon-circle'}>
      <Icon name={name} size={small ? 18 : 24} />
    </div>
  );
}

function Stat({ value, label, dark }) {
  return (
    <div className={dark ? 'stat stat--dark' : 'stat'}>
      <div className="stat__value">{value}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

function CheckList({ items }) {
  return (
    <ul className="checklist">
      {items.map(item => (
        <li key={item}>
          <span className="checklist__icon"><Icon name="check" size={20} /></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SlideHeader({ red, black, sub, solid }) {
  return (
    <div className={solid ? 'slide-header slide-header--solid' : 'slide-header'}>
      <h1>
        <span className="accent">{red}</span> <span className="dark">{black}</span>
      </h1>
      {sub && <h2>{sub}</h2>}
    </div>
  );
}

function CardTitle({ icon, children }) {
  return (
    <div className="card-title">
      <IconCircle name={icon} />
      <h3>{children}</h3>
    </div>
  );
}

function FeatureGrid({ items }) {
  return (
    <div className="grid grid-2">
      {items.map(([icon, title, text]) => (
        <div key={title} className="card feature">
          <IconCircle name={icon} small />
          <div>
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
   Slides
------------------------------------------------------------------- */

function TitleSlide({ goToContact }) {
  return (
    <div className="center-col">
      <img src={IMG.logo} alt="USKO Logistics" className="logo" />
      <div className="pill">
        <Icon name="shield" size={18} />
        <span>Approved Expeditors International Carrier</span>
      </div>
      <h1 className="hero-title">
        <span className="accent">Temperature-Controlled Capacity</span>{' '}
        <span className="dark">for Perishable &amp; Pharmaceutical Freight</span>
      </h1>
      <p className="hero-sub">
        53' reefer vans, reefer straight trucks and reefer cargo sprinter vans, from a carrier
        Expeditors has already approved.
      </p>
      <div className="grid grid-3 stats-row">
        <Stat value="100+" label="Reefer Units" dark />
        <Stat value="3" label="Reefer Equipment Types" />
        <Stat value="20" label="Years in Business" />
      </div>
      <button type="button" className="cta" onClick={goToContact}>
        Let's Move Forward Together
      </button>
      <p className="muted">Prepared for the Expeditors International Perishable &amp; Pharmaceutical Team</p>
    </div>
  );
}

function ApprovedSlide() {
  return (
    <>
      <SlideHeader red="Already Your" black="Approved Carrier" sub="Now ready to carry Expeditors' perishable and pharmaceutical freight" />
      <div className="grid grid-2 align-center">
        <img src={IMG.truck} alt="USKO truck" className="photo photo--feature" />
        <div className="stack">
          <div className="card">
            <h3 className="card-heading">No New Carrier Setup Needed</h3>
            <CheckList
              items={[
                'USKO is already an approved carrier in the Expeditors network',
                'Your team can start tendering refrigerated loads to us right away',
                'One trusted carrier relationship, now extended to temperature-controlled freight',
              ]}
            />
          </div>
          <div className="card">
            <h3 className="card-heading">Company Highlights</h3>
            <div className="grid grid-3">
              {[['20', 'Years Active'], ['65M+', 'Miles'], ['500+', 'Team']].map(([v, l]) => (
                <div key={l} className="badge-stat">
                  <div className="badge-stat__circle">{v}</div>
                  <div className="badge-stat__label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const FLEET = [
  {
    icon: 'snow',
    title: "53' Reefer Vans",
    img: IMG.reeferVan,
    best: 'Full truckload',
    items: [
      'Full truckload perishable and pharmaceutical shipments',
      'Long-haul and regional lanes across the U.S.',
      '24/7 satellite GPS tracking',
    ],
  },
  {
    icon: 'truck',
    title: 'Reefer Straight Trucks',
    img: IMG.straightTruck,
    best: 'Mid-size & multi-stop',
    items: [
      "Mid-size loads that do not need a full 53' trailer",
      'Lift gates for locations without a dock',
      'Operated by our USKO Expedite division',
    ],
  },
  {
    icon: 'bolt',
    title: 'Reefer Cargo Sprinter Vans',
    img: IMG.sprinter,
    best: 'Small & time-critical',
    items: [
      'Small, urgent temperature-sensitive shipments',
      'Direct, dedicated moves with no terminal handling',
      'Operated by our USKO Expedite division',
    ],
  },
];

function FleetSlide() {
  return (
    <>
      <SlideHeader red="Our Refrigerated" black="Fleet" sub="The right-sized reefer for every perishable and pharmaceutical shipment" />
      <div className="narrow">
        <Stat value="100+" label="Reefer Units Across Our Fleet" dark />
      </div>
      <div className="grid grid-3">
        {FLEET.map(f => (
          <div key={f.title} className="card">
            <CardTitle icon={f.icon}>{f.title}</CardTitle>
            <img src={f.img} alt={f.title} className="photo" />
            <span className="tag">Best for: {f.best}</span>
            <CheckList items={f.items} />
          </div>
        ))}
      </div>
    </>
  );
}

function BuiltForSlide() {
  return (
    <>
      <SlideHeader solid red="Built for" black="Perishable & Pharmaceutical Freight" sub="Temperature control, visibility and accountability on every load" />
      <div className="grid grid-1-2">
        <div className="card">
          <h3 className="card-heading dark">Freight We're Ready to Move</h3>
          <div className="stack stack--tight">
            {['Pharmaceuticals', 'Perishable food', 'Fresh produce', 'Frozen goods', 'Other temperature-sensitive freight'].map(item => (
              <div key={item} className="list-chip">
                <span className="dot" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <FeatureGrid
          items={[
            ['snow', 'Temperature-Controlled Equipment', "53' reefer vans, reefer straight trucks and reefer cargo sprinter vans."],
            ['map', '24/7 GPS Tracking', 'Satellite GPS monitoring from pickup to delivery.'],
            ['doc', 'Chain of Custody', 'Chain of custody records and detailed proof of delivery for every shipment.'],
            ['users', 'Professional Drivers', 'Trained drivers who follow strict security protocols.'],
            ['scale', 'TSA Certified Teams', 'Security requirements followed on every load.'],
            ['truck', 'California Local Reefer Delivery', 'Refrigerated local deliveries within a 100+ mile radius across California.'],
          ]}
        />
      </div>
    </>
  );
}

function SecuritySlide() {
  return (
    <>
      <SlideHeader red="High-Value" black="Cargo Security" sub="Protection for high-value pharmaceutical loads" />
      <div className="card">
        <img src={IMG.security} alt="USKO high-value trailer security" className="photo photo--full" />
        <div className="grid grid-2">
          <CheckList items={['Comprehensive security protocols followed by trained, professional drivers', '24/7 satellite GPS monitoring of every trailer']} />
          <CheckList items={['Chain of custody documented from pickup to delivery', 'TSA certified teams']} />
        </div>
      </div>
    </>
  );
}

function CoverageSlide() {
  return (
    <>
      <SlideHeader red="Nationwide" black="Coverage" sub="Service across the United States, strongest in the Western region" />
      <div className="grid grid-2">
        <div className="card card--red">
          <div className="card-title">
            <div className="icon-circle icon-circle--white"><Icon name="map" /></div>
            <h3>Western Region: Our Strongest Coverage</h3>
          </div>
          <ul className="locations">
            {[['Roseville, CA', 'Headquarters'], ['West Sacramento, CA', 'Branch'], ['Sacramento, CA', 'Warehouse']].map(([c, t]) => (
              <li key={c}><span>{c}</span><span>{t}</span></li>
            ))}
          </ul>
          <p>Our deepest pool of drivers and equipment is based here, giving Expeditors the most reefer capacity on West Coast lanes.</p>
        </div>
        <div className="card">
          <CardTitle icon="truck">Across the United States</CardTitle>
          <ul className="locations locations--light">
            {[['Chicago, IL', 'Branch'], ['Houston, TX', 'Branch'], ['St Marys, GA', 'Branch']].map(([c, t]) => (
              <li key={c}><span>{c}</span><span>{t}</span></li>
            ))}
          </ul>
          <p>Refrigerated service between any two points in the U.S.</p>
        </div>
      </div>
    </>
  );
}

function WhySlide() {
  return (
    <>
      <SlideHeader red="Why USKO for" black="Expeditors Perishables" sub="Reefer capacity from a carrier you already trust" />
      <div className="grid grid-4 stats-row">
        <Stat value="100+" label="Reefer Units" dark />
        <Stat value="3" label="Reefer Equipment Types" />
        <Stat value="20" label="Years in Business" />
        <Stat value="65M+" label="Miles Driven" />
      </div>
      <FeatureGrid
        items={[
          ['shield', 'Already Approved', 'USKO is already in the Expeditors carrier network, so there is no onboarding delay.'],
          ['snow', 'Right-Sized Reefer Equipment', "53' reefer vans, reefer straight trucks and reefer sprinters, matched to each shipment."],
          ['map', 'Full Visibility', '24/7 satellite GPS tracking on every load.'],
          ['doc', 'Documented Chain of Custody', 'Chain of custody records and detailed proof of delivery for all shipments.'],
          ['scale', 'Security & Compliance', 'TSA certified teams and strict security protocols for high-value pharmaceutical loads.'],
          ['users', 'Western Strength, National Reach', 'Deepest capacity on West Coast lanes, with service across the entire U.S.'],
        ]}
      />
    </>
  );
}

const COMPANIES = [
  ['USKO EXPEDITE INC', '746242', '307593'],
  ['USKO EXPRESS INC', '563453', '1499885'],
];

function CompanyCard({ name, mc, dot }) {
  return (
    <div className="company">
      <p className="company__name">{name}</p>
      <div className="company__row"><span>MC Number:</span><strong>{mc}</strong></div>
      <div className="company__row"><span>US DOT Number:</span><strong>{dot}</strong></div>
    </div>
  );
}

function ContactSlide() {
  return (
    <>
      <SlideHeader red="Let's Move Your" black="Temperature-Sensitive Freight" sub="Put USKO's reefer vans, reefer straight trucks and reefer sprinters to work for Expeditors' perishable and pharmaceutical shipments." />
      <div className="card card--tint family">
        <CardTitle icon="shield">USKO Family of Companies</CardTitle>
        <div className="family__top">
          <CompanyCard name="USKO LOGISTICS INC" mc="728260" dot="2337754" />
        </div>
        <div className="family__line" />
        <div className="grid grid-2">
          {COMPANIES.map(([n, mc, dot]) => <CompanyCard key={n} name={n} mc={mc} dot={dot} />)}
        </div>
      </div>
      <div className="grid grid-3">
        {[
          ['phone', 'Contact Us', 'Speak with our sales team member', ['+1 (916) 201-6582']],
          ['mail', 'Email', 'For RFQ and RFI opportunities email:', ['ron@uskoinc.com']],
          ['map', 'California Office', 'Our headquarters', ['1101 Creekside Ridge Dr Ste 270', 'Roseville, CA 95678']],
        ].map(([icon, title, text, lines]) => (
          <div key={title} className="card contact">
            <IconCircle name={icon} />
            <h3>{title}</h3>
            <p>{text}</p>
            {lines.map(l => <p key={l} className="contact__value">{l}</p>)}
          </div>
        ))}
      </div>
      <div className="sign-off">
        <img src={IMG.logo} alt="USKO Logistics" className="logo logo--small" />
        <h4><span className="accent">Logistics. Delivered.</span> <span className="dark">Exceptionally.</span></h4>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------
   Deck shell: arrows, dots, keyboard and swipe navigation
------------------------------------------------------------------- */

export default function App() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(null);
  const slideRef = useRef(null);

  const slides = [
    <TitleSlide goToContact={() => setIndex(7)} />,
    <ApprovedSlide />,
    <FleetSlide />,
    <BuiltForSlide />,
    <SecuritySlide />,
    <CoverageSlide />,
    <WhySlide />,
    <ContactSlide />,
  ];
  const total = slides.length;

  const go = useCallback(step => setIndex(i => (i + step + total) % total), [total]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') go(1);
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  useEffect(() => {
    if (slideRef.current) slideRef.current.scrollTop = 0;
  }, [index]);

  const onTouchStart = e => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = e => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <div className="deck" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <main className="slide" ref={slideRef} key={index}>
        <div className="slide__inner">{slides[index]}</div>
      </main>

      <button type="button" className="arrow arrow--prev" aria-label="Previous slide" onClick={() => go(-1)}>
        <Icon name="left" size={32} />
      </button>
      <button type="button" className="arrow arrow--next" aria-label="Next slide" onClick={() => go(1)}>
        <Icon name="right" size={32} />
      </button>

      <nav className="dots" aria-label="Slides">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={i === index ? 'dots__dot is-active' : 'dots__dot'}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </nav>
      <div className="counter">
        <strong>{index + 1}</strong> / {total}
      </div>
    </div>
  );
}
