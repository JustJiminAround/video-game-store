import test from 'node:test'
import assert from 'node:assert/strict'
import { addToCart, removeFromCart, cartSummary } from '../src/cartState.js'
const minecraft = { id: 'minecraft', name: 'Minecraft', price: 29.99 }
const hades = { id: 'hades', name: 'Hades', price: 24.99 }
test('repeated additions share one row and preserve earlier state', () => {
  const first = addToCart([], minecraft)
  const next = addToCart(first, minecraft)
  assert.equal(first[0].quantity, 1)
  assert.equal(next.length, 1)
  assert.equal(next[0].quantity, 2)
  assert.equal(minecraft.quantity, undefined)
})
test('mixed quantities produce an exact cent total', () => {
  const items = addToCart(addToCart(addToCart([], minecraft), minecraft), hades)
  assert.deepEqual(cartSummary(items), { count: 3, totalCents: 8497 })
  const reduced = removeFromCart(items, 'minecraft')
  assert.deepEqual(cartSummary(reduced), { count: 2, totalCents: 5498 })
  assert.equal(items[0].quantity, 2)
})
test('last copy is removed, leaving an empty cart with zero total', () => {
  const items = removeFromCart(addToCart([], hades), 'hades')
  assert.deepEqual(items, [])
  assert.deepEqual(cartSummary(items), { count: 0, totalCents: 0 })
})
test('removing an unknown game preserves cart contents', () => {
  const items = addToCart([], minecraft)
  assert.deepEqual(removeFromCart(items, 'missing'), items)
})
