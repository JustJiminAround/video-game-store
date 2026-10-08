import freeGames from '../freeGames.json'
import GameArt from './GameArt'

function FreeGameCard({ game, index }) {
  return (
    <article className={'free-card free-' + game.id} style={{ '--game-glow': game.color }}>
      <div className="free-cover">
        <GameArt game={game} />{game.id === "roblox" && <strong className="official-roblox-label" aria-hidden="true">ROBLOX</strong>}
        <span className="free-badge"><i /> FREE TO PLAY</span><span className="free-index">0{index + 1}</span>
      </div>
      <div className="free-card-content"><p className="free-genre">{game.genre}</p><h3>{game.name}</h3><p className="free-description">{game.description}</p><div className="free-card-bottom"><span className="free-price">FREE<small>Optional in-game purchases</small></span><a className="free-play-link" href={game.url} target="_blank" rel="noreferrer" aria-label={'Visit ' + game.name + ' official site'}>Official site <span aria-hidden="true">↗</span></a></div></div>
    </article>
  )
}

export default function FreeToPlay() {
  return (
    <section className="free-section" id="free-to-play" aria-labelledby="free-heading">
      <div className="free-section-header"><div><p className="eyebrow"><span className="live-dot" /> THE ZERO-PRICE LINEUP</p><h2 id="free-heading">Big worlds.<br /><em>Zero entry fee.</em></h2><p>Jump into your next obsession. The base games are free to play.</p></div><div className="zero-price" aria-hidden="true"><span>YOUR STARTING PRICE</span><strong>$0<span>.00</span></strong><small>ALL PLAY. NO PRICE TAG.</small></div></div>
      <div className="free-grid">{freeGames.map((game, index) => <FreeGameCard key={game.id} game={game} index={index} />)}</div>
      <div className="free-disclaimer"><span aria-hidden="true">✦</span><p>Links open the official game pages in a new tab. Accounts or downloads may be required. Optional purchases and some experiences or modes can cost money.</p></div>
    </section>
  )
}
