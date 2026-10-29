import { Link } from 'react-router-dom'
import GameArt from './GameArt'

export function WishlistFeedback({ wishlist }) {
  return <>
    {wishlist.loading && <p className="wishlist-feedback" role="status">Loading saved games…</p>}
    {wishlist.error && <div className="wishlist-feedback wishlist-error" role="alert"><span>{wishlist.error}</span><button onClick={wishlist.reload} disabled={wishlist.loading || Boolean(wishlist.pendingId)}>Try wishlist again</button></div>}
    {wishlist.message && <p className="wishlist-feedback wishlist-success" role="status">{wishlist.message}</p>}
  </>
}

export default function Wishlist({ wishlist }) {
  const { items, summary, loading, pendingId, error, reload } = wishlist
  const disabled = loading || Boolean(pendingId)
  return <section className="wishlist-page" aria-labelledby="wishlist-heading">
    <Link className="back-link" to="/">← Back to discovery</Link>
    <div className="wishlist-heading"><div><p className="eyebrow">KEEP YOUR NEXT ADVENTURE</p><h1 id="wishlist-heading">Your wishlist<span>.</span></h1></div><button className="wishlist-refresh" onClick={reload} disabled={disabled}>Refresh wishlist</button></div>
    <p className="wishlist-intro">Save the games you want to play next. Your choices stay here when you refresh.</p>
    <WishlistFeedback wishlist={wishlist} />
    {!loading && !error && items.length === 0 && <div className="empty-cart"><span aria-hidden="true">♡</span><h2>Your wishlist is empty</h2><p>Find a game you love, then choose Save game.</p><Link className="primary-button" to="/">Discover the games ↗</Link></div>}
    {items.length > 0 && <div className="wishlist-layout">
      <ul className="wishlist-list" aria-label="Saved games">{items.map(item => <li className={'wishlist-item priority-' + item.priority} key={item.gameId}>
        <div className="wishlist-cover"><GameArt game={{ ...item, id: item.gameId }} /></div>
        <div className="wishlist-details"><p className="eyebrow">{item.priority === 'high' ? '★ HIGH PRIORITY' : 'SAVED FOR LATER'}</p><h2>{item.name}</h2><p>${(item.priceCents / 100).toFixed(2)} <small>sample price</small></p>
          <div className="wishlist-controls"><label htmlFor={'priority-' + item.gameId}>Priority<select id={'priority-' + item.gameId} aria-label={'Priority for ' + item.name} value={item.priority} disabled={disabled} onChange={event => wishlist.setPriority(item, event.target.value)}><option value="normal">Normal</option><option value="high">High</option></select></label><button className="wishlist-remove" disabled={disabled} onClick={() => wishlist.remove(item)} aria-label={'Remove ' + item.name + ' from wishlist'}>{pendingId === item.gameId ? 'Saving…' : 'Remove'}</button></div>
        </div>
      </li>)}</ul>
      <aside className="wishlist-summary" aria-label="Wishlist summary"><p className="eyebrow">YOUR LINEUP</p><h2>Wishlist summary</h2><dl><div><dt>Saved games</dt><dd>{summary.count}</dd></div><div><dt>High priority</dt><dd>{summary.highPriorityCount}</dd></div><div className="wishlist-total"><dt>Sample total</dt><dd>${(summary.totalSamplePriceCents / 100).toFixed(2)}</dd></div></dl><p>Calculated from your saved games. Sample prices only; no purchases.</p><Link className="primary-button" to="/">Find another favorite ↗</Link></aside>
    </div>}
    <p className="wishlist-note">A shared classroom demo wishlist. No accounts or personal information.</p>
  </section>
}
