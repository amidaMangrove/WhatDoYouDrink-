import SlotMachine from './components/SlotMachine'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎰 今日は何飲む？スロット 🍻</h1>
        <p>スロットを回して今日の飲み物を決めよう！</p>
      </header>
      <main>
        <SlotMachine />
      </main>
    </div>
  )
}

export default App