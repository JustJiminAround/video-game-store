import { addToCart, removeFromCart, cartSummary } from './cartState'
import { useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes, Link } from 'react-router-dom'

import { Spotlight, Collection, TrailerStage, ExperienceEffects } from './components/Showcase'
import Cart from './components/Cart'
import TrailerModal from './components/TrailerModal'
import { playClick } from './clickSounds'
import './App.css'
import './Premium.css'
import FreeToPlay from './components/FreeToPlay'

export default function App() {
  const [motionEnabled, setMotionEnabled] = useState(true)
  const [cart, setCart] = useState([])
  const [notice, setNotice] = useState('')
  const [trailer, setTrailer] = useState(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const { count } = cartSummary(cart)


  function addGame(game) {
    setCart(current => addToCart(current, game))
    setNotice(game.name + ' added to your cart.')
  }
  function removeGame(id) {
    setCart(current => removeFromCart(current, id))
    setNotice('One game removed from your cart.')
  }
  function handleClick(event) {
    const control = event.target.closest('button, a')
    if (!soundEnabled || !control || control.classList.contains('sound-toggle')) return
    const isAdd = control.classList.contains('add-button') || control.classList.contains('primary-button') && control.tagName === 'BUTTON'
    playClick(isAdd ? 'add' : control.classList.contains('remove-button') ? 'remove' : 'click')
  }

  return (
    <BrowserRouter>
      <div className={'app-shell' + (motionEnabled ? '' : ' quiet-motion')} onClickCapture={handleClick}>
      <ExperienceEffects />
<header className="site-header">
        <Link className="brand" to="/"><span className="brand-mark" aria-hidden="true">P<span>1</span></span><span>PLAYER<span className="brand-one">ONE</span><small>FIND YOUR NEXT WORLD</small></span></Link>
        <nav aria-label="Main navigation"><NavLink to="/" end>Discover</NavLink><NavLink to="/free-to-play">Free to play</NavLink><NavLink to="/cart">Cart <span className="cart-count">{count}</span></NavLink></nav>
        <div className="header-controls"><button className="motion-toggle" aria-pressed={motionEnabled} onClick={() => setMotionEnabled(v => !v)}>Motion {motionEnabled ? "on" : "off"}</button><button className="sound-toggle" aria-pressed={soundEnabled} onClick={() => { if (!soundEnabled) playClick(); setSoundEnabled(value => !value) }}><span aria-hidden="true">♪</span> Sound {soundEnabled ? 'on' : 'off'}</button><span className="header-note"><i /> SCHOOL PROJECT</span></div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Spotlight onAdd={addGame} onTrailer={setTrailer} />
              <div className="store-strip"><span><i /> SIX WORLDS. ENDLESS POSSIBILITIES.</span><span>CURATED FOR PLAYER ONE <b>✦</b></span></div>
              <Collection onAdd={addGame} onTrailer={setTrailer} />
<TrailerStage onTrailer={setTrailer} />
              <FreeToPlay />
              <section className="closing-banner"><span className="closing-icon" aria-hidden="true">✦</span><div><p className="eyebrow">SMALL COLLECTION. BIG ADVENTURES.</p><h2>Your next favorite is waiting.</h2></div><Link to="/cart">View your cart <span aria-hidden="true">↗</span></Link></section>
            </>
          } />
          <Route path="/free-to-play" element={<FreeToPlay />} />
          <Route path="/cart" element={<Cart items={cart} onRemove={removeGame} onAdd={addGame} />} />
          <Route path="*" element={<section className="cart-page"><h1>Page not found</h1><Link to="/">Browse games</Link></section>} />
        </Routes>
      </main>
      {notice && <div className="cart-notice" role="status"><span aria-hidden="true">✓</span>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification">×</button></div>}
      <footer><Link className="footer-brand" to="/">PLAYER ONE<span>✦</span></Link><p>A Code2College storefront demo. Sample prices. No real purchases.<br />Game names and artwork belong to their respective owners.</p><span className="footer-end">BUILT TO PLAY. DESIGNED TO LEARN.</span></footer>
      {trailer && <TrailerModal game={trailer} onClose={() => setTrailer(null)} />}
      </div>
    </BrowserRouter>
  )
}
