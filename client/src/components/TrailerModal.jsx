import { useEffect, useRef } from 'react'

export default function TrailerModal({ game, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = previousOverflow }
  }, [])
  return (
    <dialog ref={dialogRef} className="trailer-dialog" aria-labelledby="trailer-heading" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
      <div className="trailer-panel">
        <header className="trailer-header"><div><p className="eyebrow">NOW SHOWING · OFFICIAL TRAILER</p><h2 id="trailer-heading">{game.name}</h2></div><button className="trailer-close" onClick={onClose} aria-label="Close trailer">×</button></header>
        <div className="trailer-video"><iframe src={'https://www.youtube-nocookie.com/embed/' + game.trailer + '?autoplay=0&rel=0'} title={game.name + ' official trailer'} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div>
        <div className="trailer-footer"><span>Press play to watch. Escape closes the trailer.</span><a href={'https://www.youtube.com/watch?v=' + game.trailer} target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>
      </div>
    </dialog>
  )
}
