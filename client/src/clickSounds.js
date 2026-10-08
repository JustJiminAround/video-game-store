// Tiny original sound effects synthesized in the browser; no audio downloads.
let audioContext
export async function playClick(kind = 'click') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    audioContext ||= new AudioContext()
    if (audioContext.state === 'suspended') await audioContext.resume()
    const notes = kind === 'add' ? [523.25, 783.99] : kind === 'remove' ? [392, 261.63] : [660]
    notes.forEach((frequency, index) => {
      const start = audioContext.currentTime + index * 0.065
      const oscillator = audioContext.createOscillator()
      const gain = audioContext.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(frequency, start)
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.065, start + 0.008)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.11)
      oscillator.connect(gain)
      gain.connect(audioContext.destination)
      oscillator.start(start)
      oscillator.stop(start + 0.12)
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
    })
  } catch (error) {
    console.debug('Click sounds unavailable:', error.message)
  }
}
