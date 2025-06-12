import React, { useState } from 'react'
import { SlotResult, ReelState } from '../types'
import { SLOT_DATA, getRandomFromArray, getBonusWeightedAmount } from '../utils/slotData'
import SlotReel from './SlotReel'
import { default as SlotResultComponent } from './SlotResult'
import './SlotMachine.css'

const SlotMachine: React.FC = () => {
  const [result, setResult] = useState<SlotResult | null>(null)
  const [reelStates, setReelStates] = useState<Record<string, ReelState>>({
    action: 'idle',
    drink: 'idle',
    amount: 'idle'
  })
  const [isSpinning, setIsSpinning] = useState(false)

  const spin = async () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)
    
    setReelStates({
      action: 'spinning',
      drink: 'spinning',
      amount: 'spinning'
    })

    const action = getRandomFromArray(SLOT_DATA.actions)
    
    setTimeout(() => {
      setReelStates(prev => ({ ...prev, action: 'stopped' }))
    }, 1000)

    if (action === '休肝日') {
      setTimeout(() => {
        setReelStates({
          action: 'stopped',
          drink: 'idle',
          amount: 'idle'
        })
        setResult({ action })
        setIsSpinning(false)
      }, 1500)
      return
    }

    const drink = getRandomFromArray(SLOT_DATA.drinks)
    const amount = getBonusWeightedAmount()

    setTimeout(() => {
      setReelStates(prev => ({ ...prev, drink: 'stopped' }))
    }, 2000)

    setTimeout(() => {
      setReelStates(prev => ({ ...prev, amount: 'stopped' }))
      setResult({ action, drink, amount })
      setIsSpinning(false)
    }, 3000)
  }

  return (
    <div className="slot-machine">
      <div className="slot-reels">
        <SlotReel 
          items={SLOT_DATA.actions}
          state={reelStates.action}
          title="行動"
          result={result?.action}
        />
        {reelStates.action !== 'idle' && (
          <SlotReel 
            items={SLOT_DATA.drinks}
            state={reelStates.drink}
            title="飲み物"
            result={result?.drink}
          />
        )}
        {reelStates.drink !== 'idle' && (
          <SlotReel 
            items={SLOT_DATA.amounts}
            state={reelStates.amount}
            title="杯数"
            result={result?.amount}
          />
        )}
      </div>
      
      <button 
        className={`spin-button ${isSpinning ? 'spinning' : ''}`}
        onClick={spin}
        disabled={isSpinning}
      >
        {isSpinning ? 'スロット回転中...' : 'スロットを回す！'}
      </button>

      {result && <SlotResultComponent result={result} />}
    </div>
  )
}

export default SlotMachine