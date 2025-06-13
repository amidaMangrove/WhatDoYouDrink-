import { Amount, SlotReels } from '../types'

export const SLOT_DATA: SlotReels = {
  actions: ['飲む', '休肝日'],
  drinks: [
    'ビール',
    'ハイボール',
    'ワイン（赤）',
    'ワイン（白）',
    '焼酎',
    '日本酒',
    'モヒート',
    'ジントニック',
    'レモンサワー',
    'グレープフルーツサワー',
    'ノンアル（炭酸水）',
    'ノンアル（ウーロン茶）'
  ],
  amounts: ['1杯だけ', '2杯', '3杯', '飲み放題']
}

export const getRandomFromArray = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export const getWeightedAction = (): '飲む' | '休肝日' => {
  return Math.random() < 0.8 ? '飲む' : '休肝日'
}

export const shouldShowBonus = (): boolean => {
  const now = new Date()
  const hour = now.getHours()
  const day = now.getDay()
  
  if (day === 5 && hour >= 18) return true
  
  const month = now.getMonth()
  const date = now.getDate()
  if ((month === 11 && date >= 29) || (month === 0 && date <= 3)) return true
  
  return false
}

export const getBonusWeightedAmount = (): Amount => {
  if (shouldShowBonus()) {
    return Math.random() < 0.3 ? '飲み放題' : getRandomFromArray(SLOT_DATA.amounts)
  }
  return getRandomFromArray(SLOT_DATA.amounts)
}