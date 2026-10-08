import { useState } from 'react'

export default function GameArt({ game }) {
  const [failed, setFailed] = useState(false)
  if (game.image && !failed) return (
    <div className={'art-image-wrap ' + (game.id === 'minecraft' ? 'minecraft-art' : '')}>
      <img className="game-image" src={game.image} alt={game.name + ' game artwork'} loading="lazy" onError={() => setFailed(true)} />
      {game.id === 'minecraft' && <div className="minecraft-title" aria-hidden="true"><strong>MINECRAFT</strong><span>BUILD YOUR OWN WORLD</span></div>}
    </div>
  )
  return <div className="art-fallback" style={{ backgroundColor: game.color }}><span aria-hidden="true">{game.symbol}</span><strong>{game.name}</strong></div>
}
