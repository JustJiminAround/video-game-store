// Return new arrays so React can detect cart changes.
export function addToCart(items, game) {
  if (items.some(item => item.id === game.id)) {
    return items.map(item => item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item)
  }
  return [...items, { ...game, quantity: 1 }]
}
export function removeFromCart(items, id) {
  return items.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
    .filter(item => item.quantity > 0)
}
// Calculate with whole cents to avoid decimal rounding errors.
export function cartSummary(items) {
  return items.reduce((summary, item) => ({
    count: summary.count + item.quantity,
    totalCents: summary.totalCents + Math.round(item.price * 100) * item.quantity,
  }), { count: 0, totalCents: 0 })
}
