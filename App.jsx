import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Search, SlidersHorizontal, Heart,
  Moon, Sun, Menu, X, Gauge, Zap, Fuel, Users, ChevronDown, Check, CalendarDays,
  MapPin, Phone, Mail, Instagram, Facebook, Twitter, Plus, Minus, Sparkles,
  CarFront, CircleHelp, Send, ShieldCheck, Clock3
} from 'lucide-react'

const cars = [
  { id: 1, name: 'Porsche 911 GT3 RS', brand: 'Porsche', category: 'Sports', year: 2024, price: 241000, power: '518 hp', speed: '184 mph', zero: '3.0 sec', fuel: 'Petrol', seats: 2, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85', tag: 'Track icon', color: 'Chalk White' },
  { id: 2, name: 'Lamborghini Revuelto', brand: 'Lamborghini', category: 'Supercars', year: 2025, price: 608000, power: '1001 hp', speed: '217 mph', zero: '2.5 sec', fuel: 'Hybrid', seats: 2, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=85', tag: 'New arrival', color: 'Verde Mantis' },
  { id: 3, name: 'Mercedes-AMG G 63', brand: 'Mercedes-Benz', category: 'SUVs', year: 2024, price: 186000, power: '577 hp', speed: '149 mph', zero: '4.5 sec', fuel: 'Petrol', seats: 5, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=85', tag: 'All-terrain luxury', color: 'Obsidian Black' },
  { id: 4, name: 'Ferrari 296 GTB', brand: 'Ferrari', category: 'Supercars', year: 2024, price: 342000, power: '819 hp', speed: '205 mph', zero: '2.9 sec', fuel: 'Hybrid', seats: 2, image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1400&q=85', tag: 'Italian masterpiece', color: 'Rosso Corsa' },
  { id: 5, name: 'Range Rover Sport', brand: 'Land Rover', category: 'SUVs', year: 2025, price: 108000, power: '523 hp', speed: '155 mph', zero: '4.3 sec', fuel: 'Petrol', seats: 5, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=85', tag: 'Refined utility', color: 'Santorini Black' },
  { id: 6, name: 'BMW M4 Competition', brand: 'BMW', category: 'Sports', year: 2024, price: 82900, power: '503 hp', speed: '180 mph', zero: '3.4 sec', fuel: 'Petrol', seats: 4, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=85', tag: 'Driver focused', color: 'Isle of Man Green' },
  { id: 7, name: 'Aston Martin DB12', brand: 'Aston Martin', category: 'Grand Tourers', year: 2025, price: 248000, power: '671 hp', speed: '202 mph', zero: '3.5 sec', fuel: 'Petrol', seats: 2, image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=85', tag: 'Grand touring', color: 'Satin Titanium' },
  { id: 8, name: 'Audi RS e-tron GT', brand: 'Audi', category: 'Electric', year: 2025, price: 148000, power: '637 hp', speed: '155 mph', zero: '3.1 sec', fuel: 'Electric', seats: 4, image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=1400&q=85', tag: 'Electric performance', color: 'Daytona Grey' }
]
const categories = ['All cars', 'Supercars', 'Sports', 'SUVs', 'Grand Tourers', 'Electric']
const brands = ['All brands', ...new Set(cars.map(c => c.brand))]
const money = n => '$' + n.toLocaleString('en-US')

function App() {
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All cars')
  const [brand, setBrand] = useState('All brands')
  const [sort, setSort] = useState('featured')
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [selected, setSelected] = useState(null)
  const [compare, setCompare] = useState([])
  const [compareOpen, setCompareOpen] = useState(false)
  const [bookingCar, setBookingCar] = useState(null)
  const [bookingSent, setBookingSent] = useState(false)
  const [faqOpen, setFaqOpen] = useState(0)
  const [toast, setToast] = useState('')

  const filtered = useMemo(() => {
    let list = cars.filter(c => (category === 'All cars' || c.category === category) &&
      (brand === 'All brands' || c.brand === brand) &&
      (c.name + c.brand + c.category).toLowerCase().includes(search.toLowerCase()) &&
      (!showFavorites || favorites.includes(c.id)))
    if (sort === 'price-low') list.sort((a,b) => a.price-b.price)
    if (sort === 'price-high') list.sort((a,b) => b.price-a.price)
    if (sort === 'year') list.sort((a,b) => b.year-a.year)
    return list
  }, [category, brand, search, sort, showFavorites, favorites])

  const notify = msg => { setToast(msg); window.setTimeout(() => setToast(''), 2600) }
  const toggleFavorite = id => setFavorites(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id])
  const toggleCompare = id => setCompare(old => {
    if (old.includes(id)) return old.filter(x => x !== id)
    if (old.length >= 3) { notify('Compare up to 3 cars at a time'); return old }
    return [...old, id]
  })
  const goTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  return <div className={dark ? 'app dark' : 'app light'}>
    <div className="announcement"><Sparkles size={13} /> THE ART OF THE DRIVE <span>—</span> A CURATED COLLECTION OF EXCEPTIONAL MACHINES <ArrowUpRight size={13}/></div>
    <header className="navbar">
      <a className="logo" href="#home" onClick={e => {e.preventDefault();goTo('home')}}><span className="logo-mark"><CarFront size={22}/></span><span>VELOCITY<small> MOTOR COLLECTIVE</small></span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <a href="#collection" onClick={e=>{e.preventDefault();goTo('collection')}}>Collection</a>
        <a href="#experience" onClick={e=>{e.preventDefault();goTo('experience')}}>Our philosophy</a>
        <a href="#services" onClick={e=>{e.preventDefault();goTo('services')}}>Concierge</a>
        <a href="#contact" onClick={e=>{e.preventDefault();goTo('contact')}}>Contact</a>
      </nav>
      <div className="nav-actions">
        <button className="icon-btn theme-btn" aria-label="Toggle theme" onClick={()=>setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
        <button className="favorite-nav" onClick={()=>{setShowFavorites(!showFavorites);goTo('collection')}}><Heart size={16} fill={showFavorites ? 'currentColor' : 'none'}/><span>{favorites.length}</span></button>
        <button className="nav-cta" onClick={()=>setBookingCar(cars[0])}>Book a drive <ArrowUpRight size={15}/></button>
        <button className="icon-btn mobile-menu" aria-label="Toggle menu" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="hero-image"></div><div className="hero-grain"></div>
        <div className="hero-content">
          <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="eyebrow"><span className="eyebrow-line"></span> BEYOND THE ORDINARY <span className="eyebrow-dot"></span> EST. 2014</motion.div>
          <motion.h1 initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.1}}>DRIVEN BY<br/><em>exception.</em></motion.h1>
          <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.2}}>A considered collection of the world's most compelling automobiles. Curated for those who feel the difference.</motion.p>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.4}} className="hero-actions"><button className="button button-primary" onClick={()=>goTo('collection')}>Explore collection <ArrowDownRight size={17}/></button><button className="text-button" onClick={()=>goTo('experience')}>Discover our story <ArrowRight size={16}/></button></motion.div>
          <div className="hero-stats"><div><strong>120<span>+</span></strong><small>Exceptional vehicles</small></div><div><strong>18</strong><small>Prestige marques</small></div><div><strong>10<span>Y</span></strong><small>Of driving passion</small></div></div>
        </div>
        <div className="hero-caption"><span>01 / 04</span><span>THE ROAD IS YOURS</span><span className="caption-line"></span></div>
        <div className="hero-scroll" onClick={()=>goTo('collection')}><span>SCROLL TO EXPLORE</span><ArrowDownRight size={16}/></div>
      </section>

      <section className="ticker" aria-label="Our values"><div className="ticker-track">{Array.from({length:2}).map((_,i)=><React.Fragment key={i}><span>DESIGNED TO MOVE</span><i>✳</i><span>ENGINEERED TO FEEL</span><i>✳</i><span>BUILT TO BE REMEMBERED</span><i>✳</i><span>DRIVEN BY PASSION</span><i>✳</i></React.Fragment>)}</div></section>

      <section id="collection" className="collection section-wrap">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"></span> THE COLLECTION / 2025–26</div><h2>Find your <em>frequency.</em></h2></div><p>Every vehicle tells a story. Find the one that feels like yours.</p></div>
        <div className="collection-toolbar">
          <div className="category-tabs">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
          <div className="toolbar-right"><label className="search-box"><Search size={16}/><input placeholder="Search the collection" value={search} onChange={e=>setSearch(e.target.value)}/>{search && <button onClick={()=>setSearch('')} aria-label="Clear search"><X size={13}/></button>}</label><select aria-label="Filter by brand" value={brand} onChange={e=>setBrand(e.target.value)}>{brands.map(b=><option key={b}>{b}</option>)}</select><select aria-label="Sort cars" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="year">Newest year</option></select></div>
        </div>
        {showFavorites && <div className="filter-notice"><Heart size={15} fill="currentColor"/> Showing your saved cars <button onClick={()=>setShowFavorites(false)}>View all cars <X size={13}/></button></div>}
        <div className="results-line"><span>{filtered.length.toString().padStart(2,'0')} VEHICLES FOUND</span><span><SlidersHorizontal size={13}/> CURATED, NEVER CROWDED</span></div>
        <div className="car-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((car,i)=><motion.article layout initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.96}} transition={{duration:.3,delay:i*.035}} className="car-card" key={car.id}>
              <div className="car-image-wrap" onClick={()=>setSelected(car)}><img src={car.image} alt={car.name} loading="lazy"/><span className="car-tag">{car.tag}</span><button className={'heart-button '+(favorites.includes(car.id)?'saved':'')} aria-label="Save car" onClick={e=>{e.stopPropagation();toggleFavorite(car.id)}}><Heart size={17} fill={favorites.includes(car.id)?'currentColor':'none'}/></button><span className="image-arrow"><ArrowUpRight size={18}/></span></div>
              <div className="car-info"><div className="car-brandline"><span>{car.brand}</span><span>{car.year}</span></div><h3>{car.name}</h3><div className="car-specs"><span><Zap size={14}/>{car.power}</span><span><Gauge size={14}/>{car.zero}</span><span><Users size={14}/>{car.seats} seats</span></div><div className="car-card-bottom"><div><small>STARTING FROM</small><strong>{money(car.price)}</strong></div><button className={'compare-mini '+(compare.includes(car.id)?'selected':'')} onClick={()=>toggleCompare(car.id)}>{compare.includes(car.id)?<Check size={14}/>:<Plus size={14}/>} Compare</button></div><div className="card-buttons"><button onClick={()=>setSelected(car)}>View details <ArrowUpRight size={14}/></button><button onClick={()=>{setBookingCar(car);setBookingSent(false)}}>Enquire <ArrowRight size={14}/></button></div></div>
            </motion.article>)}
          </AnimatePresence>
        </div>
        {filtered.length===0 && <div className="empty-state"><CarFront size={35}/><h3>No cars found</h3><p>Try another search or clear your filters.</p><button className="button button-primary" onClick={()=>{setSearch('');setCategory('All cars');setBrand('All brands');setShowFavorites(false)}}>Reset filters</button></div>}
        <div className="collection-foot"><span>SHOWING {filtered.length} OF {cars.length} VEHICLES</span><span>YOUR NEXT CHAPTER STARTS HERE <ArrowUpRight size={14}/></span></div>
      </section>

      <section className="manifesto" id="experience"><div className="manifesto-image"></div><div className="manifesto-copy"><div className="eyebrow"><span className="eyebrow-line"></span> NOT JUST A CAR. A FEELING.</div><h2>Some things<br/>are better <em>felt.</em></h2><p>We believe the right car is more than engineering, design, or a badge. It's the moment the engine comes alive. The quiet confidence of a perfect line. The road opening up in front of you.</p><p>Our collection is built around that feeling — each vehicle selected for its character, its craft, and the story it lets you write.</p><button className="text-button" onClick={()=>goTo('services')}>The Velocity experience <ArrowRight size={16}/></button><div className="manifesto-signature">THE ART OF MOVEMENT <span>— VELOCITY</span></div></div></section>

      <section className="brands section-wrap"><div className="section-heading compact"><div><div className="eyebrow"><span className="eyebrow-line"></span> ICONS OF INGENUITY</div><h2>Legendary by <em>nature.</em></h2></div><p>A world of marques. One standard of excellence.</p></div><div className="brand-grid">{[['PORSCHE','Precision in motion'],['FERRARI','A racing heart'],['LAMBORGHINI','Unmistakable presence'],['MERCEDES-BENZ','The best or nothing'],['ASTON MARTIN','Power, beauty, soul'],['BMW M','Born to perform']].map(([b,sub],i)=><button key={b} className="brand-tile" onClick={()=>{setBrand(b==='BMW M'?'BMW':b==='MERCEDES-BENZ'?'Mercedes-Benz':b);setCategory('All cars');goTo('collection')}}><span className="brand-index">0{i+1}</span><strong>{b}</strong><small>{sub}</small><ArrowUpRight size={16}/></button>)}</div></section>

      <section className="services" id="services"><div className="services-top"><div className="eyebrow"><span className="eyebrow-line"></span> YOUR JOURNEY, REFINED</div><h2>Consider it <em>handled.</em></h2><p>From the first conversation to the first mile, our team makes extraordinary feel effortless.</p></div><div className="service-grid"><div className="service-item"><span className="service-icon"><CalendarDays/></span><span className="service-number">01 / DISCOVER</span><h3>Private viewings</h3><p>See the details up close, at your pace. Private appointments, tailored to you.</p><button onClick={()=>setBookingCar(null)}>Arrange a viewing <ArrowUpRight size={14}/></button></div><div className="service-item"><span className="service-icon"><Gauge/></span><span className="service-number">02 / EXPERIENCE</span><h3>Test drive, your way</h3><p>Find your connection behind the wheel with a drive designed around you.</p><button onClick={()=>{setBookingCar(cars[0]);setBookingSent(false)}}>Book a test drive <ArrowUpRight size={14}/></button></div><div className="service-item"><span className="service-icon"><ShieldCheck/></span><span className="service-number">03 / OWN</span><h3>Ownership concierge</h3><p>Thoughtful guidance, transparent details, and support long after the keys.</p><button onClick={()=>goTo('contact')}>Talk to our team <ArrowUpRight size={14}/></button></div></div></section>

      <section className="quote-band"><div className="quote-mark">“</div><blockquote>The best journeys aren't measured in miles.<br/><em>They're measured in moments.</em></blockquote><span>THE VELOCITY POINT OF VIEW</span></section>

      <section className="faq section-wrap"><div className="faq-intro"><div className="eyebrow"><span className="eyebrow-line"></span> GOOD TO KNOW</div><h2>A few things<br/>you might <em>wonder.</em></h2><p>Can't find your answer? Our concierge team is always happy to help.</p><button className="text-button" onClick={()=>goTo('contact')}>Ask us anything <ArrowRight size={16}/></button></div><div className="faq-list">{[{q:'Can I arrange a test drive before deciding?',a:'Absolutely. We arrange private test drives by appointment so you can experience the car in a relaxed setting. Submit an enquiry on any vehicle and our concierge team will coordinate the details.'},{q:'Are the listed prices final?',a:'Prices shown are indicative starting prices and may vary by specification, mileage, availability, and market. Our team will provide a clear, tailored quote before you make any commitment.'},{q:'Can you help me source a specific model?',a:'Yes. Tell us what you are looking for and we will use our network to help source the right specification, even if it is not currently listed in our collection.'},{q:'Do you accept trade-ins?',a:'We can discuss trade-in options as part of your enquiry. Share a few details about your current vehicle and our team will follow up with next steps.'}].map((f,i)=><div className={'faq-item '+(faqOpen===i?'expanded':'')} key={f.q}><button onClick={()=>setFaqOpen(faqOpen===i?-1:i)}><span className="faq-n">0{i+1}</span><strong>{f.q}</strong>{faqOpen===i?<Minus size={17}/>:<Plus size={17}/>}</button><AnimatePresence>{faqOpen===i&&<motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>{f.a}</motion.p>}</AnimatePresence></div>)}</div></section>

      <section id="contact" className="contact-section"><div className="contact-inner"><div className="eyebrow"><span className="eyebrow-line"></span> YOUR NEXT CHAPTER</div><h2>Let's talk <em>cars.</em></h2><p>Tell us what moves you. We'll take it from there.</p><div className="contact-actions"><button className="button button-primary" onClick={()=>{setBookingCar(null);setBookingSent(false);document.getElementById('contact-form')?.scrollIntoView({behavior:'smooth',block:'center'})}}>Start a conversation <ArrowUpRight size={16}/></button><a href="tel:+18005550140" className="contact-phone"><Phone size={15}/> +1 (800) 555-0140</a></div></div><form id="contact-form" className="contact-form" onSubmit={e=>{e.preventDefault();notify('Thanks — your message is ready for our concierge team.');e.target.reset()}}><div className="form-title">SEND AN ENQUIRY <span>WE'LL BE IN TOUCH</span></div><label>Your name<input required placeholder="Alex Morgan"/></label><label>Email address<input type="email" required placeholder="alex@example.com"/></label><label>I'm interested in<select defaultValue=""><option value="" disabled>Select a topic</option><option>Buying a vehicle</option><option>Booking a test drive</option><option>Sourcing a specific model</option><option>General enquiry</option></select></label><label>Tell us a little more<textarea rows="3" placeholder="What are you looking for?"></textarea></label><button className="button button-primary submit-button" type="submit">Send enquiry <Send size={15}/></button><small>By submitting, you agree to be contacted about your enquiry.</small></form></section>
    </main>

    <footer className="footer"><div className="footer-main"><div className="footer-brand"><a className="logo" href="#home"><span className="logo-mark"><CarFront size={22}/></span><span>VELOCITY<small> MOTOR COLLECTIVE</small></span></a><p>For the love of the drive.<br/>For the feeling that stays.</p><div className="socials"><a href="#contact" aria-label="Instagram"><Instagram size={16}/></a><a href="#contact" aria-label="Facebook"><Facebook size={16}/></a><a href="#contact" aria-label="Twitter"><Twitter size={16}/></a></div></div><div className="footer-column"><strong>EXPLORE</strong><a href="#collection">The collection</a><a href="#experience">Our philosophy</a><a href="#services">Concierge</a><a href="#contact">Get in touch</a></div><div className="footer-column"><strong>THE DETAILS</strong><a href="#faq" onClick={e=>{e.preventDefault();goTo('contact')}}>Frequently asked</a><a href="#contact">Privacy policy</a><a href="#contact">Terms of use</a><a href="#contact">Accessibility</a></div><div className="footer-column footer-contact"><strong>FIND YOUR WAY</strong><span><MapPin size={15}/> 1280 Motor Row, Los Angeles, CA</span><span><Clock3 size={15}/> Mon–Sat, 9am–6pm</span><span><Mail size={15}/> hello@velocity.example</span></div></div><div className="footer-bottom"><span>© 2025 VELOCITY MOTOR COLLECTIVE. ALL RIGHTS RESERVED.</span><span>MADE FOR THE LOVE OF THE DRIVE <ArrowUpRight size={13}/></span></div></footer>

    <AnimatePresence>{selected&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><motion.div className="car-modal" initial={{y:28,opacity:0,scale:.98}} animate={{y:0,opacity:1,scale:1}} exit={{y:20,opacity:0}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close"><X/></button><div className="modal-image"><img src={selected.image} alt={selected.name}/><span>{selected.tag}</span></div><div className="modal-content"><div className="eyebrow"><span className="eyebrow-line"></span>{selected.brand} / {selected.year}</div><h2>{selected.name}</h2><p className="modal-price">{money(selected.price)} <small>STARTING PRICE</small></p><p className="modal-description">A distinctive expression of performance and design. Explore the details, discover the character, and experience what makes this vehicle exceptional.</p><div className="detail-spec-grid"><div><Zap/><small>POWER</small><strong>{selected.power}</strong></div><div><Gauge/><small>0–60 MPH</small><strong>{selected.zero}</strong></div><div><Fuel/><small>POWERTRAIN</small><strong>{selected.fuel}</strong></div><div><Users/><small>SEATING</small><strong>{selected.seats} seats</strong></div></div><div className="modal-actions"><button className="button button-primary" onClick={()=>{setBookingCar(selected);setSelected(null);setBookingSent(false)}}>Enquire about this car <ArrowUpRight size={15}/></button><button className="button button-outline" onClick={()=>toggleFavorite(selected.id)}><Heart size={15} fill={favorites.includes(selected.id)?'currentColor':'none'}/>{favorites.includes(selected.id)?'Saved':'Save vehicle'}</button></div></div></motion.div></motion.div>}</AnimatePresence>

    <AnimatePresence>{bookingCar!==null&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setBookingCar(null)}><motion.div className="booking-modal" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:20,opacity:0}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setBookingCar(null)} aria-label="Close"><X/></button>{bookingSent?<div className="success-state"><span><Check size={28}/></span><h2>Consider it <em>in motion.</em></h2><p>Your request has been captured in this demo. Our concierge team would be in touch to confirm the details.</p><button className="button button-primary" onClick={()=>setBookingCar(null)}>Back to collection <ArrowRight size={15}/></button></div>:<><div className="eyebrow"><span className="eyebrow-line"></span> PRIVATE APPOINTMENT</div><h2>Make it <em>personal.</em></h2><p className="booking-sub">Tell us a little about yourself and we'll take care of the rest.</p><form onSubmit={e=>{e.preventDefault();setBookingSent(true)}} className="booking-form"><label>Vehicle of interest<select value={bookingCar?.id||''} onChange={e=>setBookingCar(cars.find(c=>c.id===Number(e.target.value))||null)} required><option value="" disabled>Select a vehicle</option>{cars.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><div className="form-row"><label>Your name<input required placeholder="Full name"/></label><label>Email address<input type="email" required placeholder="you@example.com"/></label></div><div className="form-row"><label>Preferred date<input type="date" required min={new Date().toISOString().split('T')[0]}/></label><label>Appointment type<select defaultValue="Test drive"><option>Test drive</option><option>Private viewing</option><option>Purchase enquiry</option></select></label></div><label>Anything else? <textarea rows="2" placeholder="Preferred time, questions, etc."/></label><button className="button button-primary submit-button" type="submit">Request appointment <ArrowUpRight size={15}/></button><small className="form-disclaimer"><ShieldCheck size={13}/> Your details are kept private and used only for this enquiry.</small></form></>}</motion.div></motion.div>}</AnimatePresence>

    {compare.length>0&&<div className="compare-dock"><div><span className="compare-count">{compare.length}</span><strong>Compare vehicles</strong><small>{compare.map(id=>cars.find(c=>c.id===id)?.name).join(' · ')}</small></div><button className="button button-primary" onClick={()=>setCompareOpen(true)}>Compare now <ArrowRight size={15}/></button><button className="icon-btn" onClick={()=>setCompare([])} aria-label="Clear comparison"><X size={17}/></button></div>}
    <AnimatePresence>{compareOpen&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setCompareOpen(false)}><motion.div className="compare-modal" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:20,opacity:0}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setCompareOpen(false)}><X/></button><div className="eyebrow"><span className="eyebrow-line"></span> SIDE BY SIDE</div><h2>Find your <em>fit.</em></h2><div className="compare-table"><div className="compare-labels"><span>VEHICLE</span><span>PRICE</span><span>POWER</span><span>0–60 MPH</span><span>TOP SPEED</span><span>POWERTRAIN</span></div>{compare.map(id=>{const c=cars.find(x=>x.id===id);return <div className="compare-col" key={id}><img src={c.image} alt={c.name}/><strong>{c.name}</strong><span>{money(c.price)}</span><span>{c.power}</span><span>{c.zero}</span><span>{c.speed}</span><span>{c.fuel}</span><button onClick={()=>toggleCompare(id)}><X size={13}/> Remove</button></div>})}</div></motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{toast&&<motion.div className="toast" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:10,opacity:0}}><Check size={16}/>{toast}</motion.div>}</AnimatePresence>
    <button className="back-top" aria-label="Back to top" onClick={()=>goTo('home')}><ArrowUpRight size={18}/></button>
  </div>
}
export default App
