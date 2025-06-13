export const playReelStopSound = () => {
  try {
    const audio = new Audio('/WhatDoYouDrink-/reel-stop.wav')
    audio.volume = 0.3
    audio.play().catch(() => {
      // ユーザーインタラクションなしでの再生失敗は無視
    })
  } catch (error) {
    // オーディオ再生エラーは無視
  }
}

export const createBeepSound = (frequency: number = 800, duration: number = 100) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = frequency
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration / 1000)
  } catch (error) {
    // Web Audio API対応していない場合は無視
  }
}