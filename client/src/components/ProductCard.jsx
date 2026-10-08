import GameArt from './GameArt'

export default function ProductCard({ game, onAdd, onTrailer }) {
  return (
    <article className="product-card">
      <div className="cover-wrap"><GameArt game={game} /><span className="cover-label">{game.genre}</span><button className="trailer-button" onClick={() => onTrailer(game)} aria-label={'Watch ' + game.name + ' trailer'}><span className="play-icon" aria-hidden="true">▶</span><span>Watch trailer</span></button></div>
      <div className="card-content">
        <h3>{game.name}</h3><p className="description">{game.description}</p>
        <div className="card-bottom"><div className="price">{'$' + game.price.toFixed(2)}<span>Sample price</span></div><button className="add-button" onClick={() => onAdd(game)} aria-label={'Add ' + game.name + ' to cart'}><span aria-hidden="true">＋</span> Add to cart</button></div>
      </div>
    </article>
  )
}
