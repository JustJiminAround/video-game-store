import { Link } from 'react-router-dom'
import GameArt from './GameArt'
import { cartSummary } from '../cartState'

export default function Cart({ items, onRemove, onAdd }) {
  const { totalCents, count } = cartSummary(items)
  return <section className="cart-page" aria-labelledby="cart-heading">
    <Link className="back-link" to="/">← Back to discovery</Link>
    <p className="eyebrow">YOUR NEXT ADVENTURES</p><h1 id="cart-heading">Your collection<span>.</span></h1>
    <p className="cart-intro">Great games. Ready when you are.</p>
    {items.length === 0 ? <div className="empty-cart"><span aria-hidden="true">✦</span><h2>Your cart is empty</h2><p>Every adventure starts with a first pick.</p><Link className="primary-button" to="/">Discover the games ↗</Link></div> :
    <div className="cart-layout"><ul className="cart-list">{items.map(item => <li className="cart-item" key={item.id}>
      <div className="cart-cover"><GameArt game={item} /></div>
      <div className="cart-details"><p className="eyebrow">{item.genre}</p><h2>{item.name}</h2><p>{'$' + item.price.toFixed(2)} each</p>
        <div className="quantity-controls" role="group" aria-label={item.name + ' quantity'}>
          <button className="remove-button quantity-button" onClick={() => onRemove(item.id)} aria-label={'Remove one ' + item.name}>−</button>
          <span aria-live="polite" aria-label={'Quantity: ' + item.quantity}>{item.quantity}</span>
          <button className="add-button quantity-button" onClick={() => onAdd(item)} aria-label={'Add one ' + item.name}>+</button>
        </div>
      </div><strong>{'$' + (Math.round(item.price * 100) * item.quantity / 100).toFixed(2)}</strong>
    </li>)}</ul><aside className="order-summary"><p className="eyebrow">THE LINEUP</p><h2>Cart summary</h2><div className="summary-row"><span>Games in your cart</span><strong>{count}</strong></div><div className="summary-total" aria-live="polite"><span>Sample total</span><strong>{'$' + (totalCents / 100).toFixed(2)}</strong></div><p>This is a school project. No payment is collected, and refreshing clears your cart.</p><Link className="primary-button" to="/">Keep exploring ↗</Link><span className="demo-note">DEMO STORE · NO REAL PURCHASES</span></aside></div>}
  </section>
}
