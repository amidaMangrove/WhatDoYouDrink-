import React from 'react'
import { SlotResult as SlotResultType } from '../types'
import './SlotResult.css'

interface SlotResultProps {
  result: SlotResultType
}

const SlotResult: React.FC<SlotResultProps> = ({ result }) => {
  const getResultMessage = () => {
    if (result.action === '休肝日') {
      return {
        title: '🌟 今日は休肝日！',
        subtitle: '体を大切に、水分補給を忘れずに！',
        emoji: '💧'
      }
    }

    const isBonus = result.amount === '飲み放題'
    
    return {
      title: isBonus ? '🎉 ボーナス当選！' : '🍻 今日の飲み物決定！',
      subtitle: `${result.drink}を${result.amount}${isBonus ? '！' : 'どうぞ！'}`,
      emoji: getdrinkEmoji(result.drink!)
    }
  }

  const getdrinkEmoji = (drink: string) => {
    const emojiMap: Record<string, string> = {
      'ビール': '🍺',
      'ハイボール': '🥃',
      'ワイン（赤）': '🍷',
      'ワイン（白）': '🥂',
      '焼酎': '🍶',
      '日本酒': '🍶',
      'モヒート': '🍹',
      'ジントニック': '🍸',
      'レモンサワー': '🍋',
      'グレープフルーツサワー': '🍊',
      'ノンアル（炭酸水）': '🥤',
      'ノンアル（ウーロン茶）': '🍵'
    }
    return emojiMap[drink] || '🥤'
  }

  const { title, subtitle, emoji } = getResultMessage()
  const isBonus = result.amount === '飲み放題'

  return (
    <div className={`slot-result ${isBonus ? 'bonus' : ''} ${result.action === '休肝日' ? 'rest-day' : ''}`}>
      <div className="result-emoji">{emoji}</div>
      <h2 className="result-title">{title}</h2>
      <p className="result-subtitle">{subtitle}</p>
      {isBonus && (
        <div className="bonus-effect">
          <span>✨</span><span>🎊</span><span>✨</span>
        </div>
      )}
    </div>
  )
}

export default SlotResult