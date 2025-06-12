import React from 'react'
import { ReelState } from '../types'
import './SlotReel.css'

interface SlotReelProps {
  items: string[]
  state: ReelState
  title: string
  result?: string
}

const SlotReel: React.FC<SlotReelProps> = ({ items, state, title, result }) => {
  const getDisplayItems = () => {
    if (state === 'stopped' && result) {
      return [result]
    }
    if (state === 'spinning') {
      return items.slice(0, 3)
    }
    return ['?']
  }

  return (
    <div className="slot-reel">
      <h3 className="reel-title">{title}</h3>
      <div className={`reel-container ${state}`}>
        <div className="reel-window">
          {getDisplayItems().map((item, index) => (
            <div 
              key={`${item}-${index}`} 
              className={`reel-item ${state === 'stopped' ? 'result' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SlotReel