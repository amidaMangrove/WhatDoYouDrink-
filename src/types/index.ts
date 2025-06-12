export type Action = '飲む' | '休肝日'

export type Drink = 
  | 'ビール'
  | 'ハイボール'
  | 'ワイン（赤）'
  | 'ワイン（白）'
  | '焼酎'
  | '日本酒'
  | 'モヒート'
  | 'ジントニック'
  | 'レモンサワー'
  | 'グレープフルーツサワー'
  | 'ノンアル（炭酸水）'
  | 'ノンアル（ウーロン茶）'

export type Amount = '1杯だけ' | '2杯' | '3杯' | '飲み放題'

export interface SlotResult {
  action: Action
  drink?: Drink
  amount?: Amount
}

export interface SlotReels {
  actions: Action[]
  drinks: Drink[]
  amounts: Amount[]
}

export type ReelState = 'idle' | 'spinning' | 'stopped'