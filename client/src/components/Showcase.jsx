import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import games from '../catalog.json'
import ProductCard from './ProductCard'
import { WishlistFeedback } from './Wishlist'
const spotlights = [
  { id: 'hades', line: 'DEFY. DIE.', accent: 'TRY AGAIN.', label: 'ESCAPE THE UNDERWORLD', color: '#ff794e', art: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145360/library_hero.jpg' },
  { id: 'minecraft', line: 'DREAM IT.', accent: 'BUILD IT.', label: 'A WORLD WITHOUT LIMITS', color: '#bdff63' },
  { id: 'hollow-knight', line: 'GO DEEPER.', accent: 'GET LOST.', label: 'DISCOVER HALLOWNEST', color: '#95cfff', art: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/library_hero.jpg' },
]
export function ExperienceEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const elements = document.querySelectorAll('.product-card, .free-card, .cinema-card, .section-heading, .closing-banner')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target) }
    }), { threshold: 0.08 })
    elements.forEach(el => { el.classList.add('reveal-ready'); observer.observe(el) })
    return () => observer.disconnect()
  }, [pathname])
  return <div className="ambient-world" aria-hidden="true"><span /><span /><span /></div>
}
export function Spotlight({ onAdd, onTrailer }) {
  const [selected, setSelected] = useState(0)
  const slide = spotlights[selected]
  const game = games.find(g => g.id === slide.id)
  return <><div className="discovery-intro"><div><p className="eyebrow">WELCOME TO YOUR NEXT WORLD</p><p className="intro-title">Life is short.<br /><span>Play something epic.</span></p></div><div className="intro-aside"><span className="intro-orbit" aria-hidden="true">✦</span><p>Big adventures. Indie favorites.<br />Find the game that pulls you in.</p><a href="#catalog">Explore the collection <span>↓</span></a></div></div><section className="spotlight" style={{ '--spot-color': slide.color }} aria-label="Featured games">
    <div className="spot-scene" key={slide.id}><img src={slide.art || game.image} alt={game.name + ' official artwork'} /><div className="spot-vignette" /></div>
    <div className="spot-particles" aria-hidden="true">{Array.from({length:8},(_,i)=><i key={i} style={{'--i':i}} />)}</div>
    <div className="spot-copy" key={game.name}>
      <p className="eyebrow"><span className="signal-dot" /> PLAYER ONE / SPOTLIGHT 0{selected + 1}</p>
      <p className="spot-kicker">{slide.label}</p>
      <h1>{slide.line}<br /><em>{slide.accent}</em></h1>
      <p className="spot-description">{game.description}</p>
      <div className="spot-actions"><button className="primary-button" onClick={()=>onAdd(game)} aria-label={'Add ' + game.name + ' to cart'}>Add to cart <span>↗</span></button><button className="spot-trailer" onClick={()=>onTrailer(game)} aria-label={'Watch featured ' + game.name + ' trailer'}><span className="play-ring">▶</span> Watch trailer</button></div>
      <div className="spot-game"><strong>{game.name}</strong><span>{game.genre}</span><span>{'$' + game.price.toFixed(2)} <small>sample price</small></span></div>
    </div>
    <div className="spot-stamp" aria-hidden="true">P1<span>PLAY BEYOND<br />THE ORDINARY</span></div>
    <div className="spot-selectors" aria-label="Choose featured game">{spotlights.map((item,i)=><button key={item.id} onClick={()=>setSelected(i)} aria-pressed={selected===i} aria-label={'Feature ' + games.find(g=>g.id===item.id).name}><img src={games.find(g=>g.id===item.id).image} alt="" /><span><small>0{i+1} / SPOTLIGHT</small>{games.find(g=>g.id===item.id).name}</span><b>↗</b></button>)}</div>
  </section></>
}
export function Collection({ onAdd, onTrailer, wishlist }) {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const filtered = games.filter(g => (genre === 'All' || g.genre === genre) && g.name.toLowerCase().includes(query.toLowerCase()))
  return <section id="catalog" aria-labelledby="catalog-heading"><div className="section-heading"><div><p className="eyebrow">CHOOSE YOUR ADVENTURE</p><h2 id="catalog-heading">Find your next <em>obsession.</em></h2></div><span className="collection-number">01 / THE COLLECTION</span></div><div className="mood-grid" aria-label="Browse by mood">{[
    {id:'minecraft',genre:'Sandbox',tag:'MAKE IT YOURS',title:'Build a new world.',detail:'Creative worlds & endless possibilities',color:'#b8ff6d'},
    {id:'stardew',genre:'Farming',tag:'TAKE A BREATHER',title:'Find your cozy corner.',detail:'A slower pace. A little more magic.',color:'#ffc58a'},
    {id:'hollow-knight',genre:'Action',tag:'CHASE THE CHALLENGE',title:'Go beyond the familiar.',detail:'Mysteries, battles & one more try',color:'#9fceff'},
  ].map(mood=>{const game=games.find(g=>g.id===mood.id);return <button key={mood.id} className="mood-card" style={{'--mood-color':mood.color}} aria-label={'Browse ' + mood.genre + ' games'} onClick={()=>{setGenre(mood.genre);setQuery('');document.getElementById('collection-tools')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.querySelector('.quiet-motion') ? 'instant' : 'smooth',block:'start'})}}><img src={game.image} alt="" loading="lazy"/><span className="mood-shade"/><span className="mood-copy"><small>{mood.tag}</small><strong>{mood.title}</strong><span>{mood.detail}</span></span><b aria-hidden="true">↗</b></button>})}</div><div className="collection-tools" id="collection-tools"><div className="genre-pills" aria-label="Filter games by genre">{['All',...new Set(games.map(g=>g.genre))].map(g=><button key={g} aria-pressed={genre===g} onClick={()=>setGenre(g)}>{g}</button>)}</div><label className="game-search"><span aria-hidden="true">⌕</span><input type="search" placeholder="Find a game…" aria-label="Search games" value={query} onChange={e=>setQuery(e.target.value)} /></label></div><WishlistFeedback wishlist={wishlist} /><div className="game-grid">{filtered.map(game=><ProductCard key={game.id} game={game} onAdd={onAdd} onTrailer={onTrailer} onSave={wishlist.save} saved={wishlist.items.some(item=>item.gameId===game.id)} saving={wishlist.pendingId===game.id} wishlistBusy={wishlist.loading || Boolean(wishlist.pendingId)}/>)}</div>{!filtered.length && <p className="no-games">No games found. Try another name or genre.</p>}</section>
}
export function TrailerStage({ onTrailer }) {
  return <section className="trailer-stage" aria-labelledby="trailer-room-heading"><div className="section-heading"><div><p className="eyebrow">PRESS PLAY. FEEL THE WORLD.</p><h2 id="trailer-room-heading">The <em>trailer room.</em></h2></div><span className="collection-number">02 / GET A FIRST LOOK</span></div><div className="cinema-grid">{['hades','minecraft','hollow-knight'].map((id,i)=>{const g=games.find(item=>item.id===id);return <button className="cinema-card" key={id} onClick={()=>onTrailer(g)} aria-label={'Play ' + g.name + ' trailer'}><img loading="lazy" src={g.image} alt={g.name + ' game artwork'}/><span className="cinema-play">▶</span><span className="cinema-label"><small>OFFICIAL TRAILER / 0{i+1}</small><strong>{g.name}</strong><b>↗</b></span></button>})}</div></section>
}
