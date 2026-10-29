import { useEffect, useRef, useState } from 'react'

class RequestError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(path, options)
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('Could not reach your wishlist. Check the connection and try again.', { cause: error })
  }
  if (response.status === 204) return null
  let data
  try {
    data = await response.json()
  } catch {
    throw new Error('Could not read the wishlist response. Please try again.')
  }
  if (!response.ok) throw new RequestError((typeof data?.error === 'string' ? data.error : 'The wishlist request failed. Please try again.'), response.status)
  return data
}

async function readWishlist(signal) {
  const [list, summary] = await Promise.all([
    request('/api/wishlist', { signal }),
    request('/api/wishlist/summary', { signal }),
  ])
  if (!Array.isArray(list?.items) || !['count', 'highPriorityCount', 'totalSamplePriceCents'].every(key => Number.isInteger(summary?.[key]))) {
    throw new Error('Could not read the saved games. Please try again.')
  }
  return { items: list.items, summary }
}

export default function useWishlist() {
  const [data, setData] = useState({ items: [], summary: { count: 0, highPriorityCount: 0, totalSamplePriceCents: 0 } })
  const [loading, setLoading] = useState(true)
  const [pendingId, setPendingId] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const busy = useRef(false)

  useEffect(() => {
    const controller = new AbortController()
    readWishlist(controller.signal)
      .then(result => { if (!controller.signal.aborted) setData(result) })
      .catch(problem => { if (!controller.signal.aborted) setError(problem.message) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  async function reload() {
    if (busy.current || loading) return
    busy.current = true
    setLoading(true)
    setError('')
    setMessage('')
    try { setData(await readWishlist()) }
    catch (problem) { setError(problem.message) }
    finally { busy.current = false; setLoading(false) }
  }

  async function change(gameId, method, body, successMessage) {
    if (busy.current || loading) return
    busy.current = true
    setPendingId(gameId)
    setError('')
    setMessage('')
    let written = false
    let alreadySaved = false
    try {
      try {
        await request('/api/wishlist' + (method === 'POST' ? '' : '/' + encodeURIComponent(gameId)), {
          method,
          ...(body ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}),
        })
        written = true
      } catch (problem) {
        if (method === 'POST' && problem.status === 409) alreadySaved = true
        else throw problem
      }
      setData(await readWishlist())
      setMessage(alreadySaved ? 'That game is already in your wishlist.' : successMessage)
    } catch (problem) {
      setError(written ? 'Your change was saved, but the list could not reload. Please refresh the wishlist.' : problem.message)
    } finally {
      busy.current = false
      setPendingId(null)
    }
  }

  return {
    ...data, loading, pendingId, error, message, reload,
    save: game => change(game.id, 'POST', { gameId: game.id }, game.name + ' saved to your wishlist.'),
    setPriority: (item, priority) => change(item.gameId, 'PATCH', { priority }, item.name + ' priority updated.'),
    remove: item => change(item.gameId, 'DELETE', null, item.name + ' removed from your wishlist.'),
  }
}
