import React, { useState } from 'react'
import Game from './components/Game'
import './index.css'

const App: React.FC = () => {
  const [multiplier, setMultiplier] = useState<number | null>(null)
  const [inputValue, setInputValue] = useState<string>('')

  const handleStartGame = () => {
    const parsed = parseInt(inputValue, 10)
    if (!isNaN(parsed) && parsed > 0 && parsed <= 9) {
      setMultiplier(parsed)
    } else {
      alert('Пожалуйста, введите число от 1 до 9.')
    }
  }

  return (
    <div className="app-container">
      {multiplier === null ? (
        <div className="multiplier-setup">
          <h1>Выберите число для умножения (от 1 до 9)</h1>
          <div className="input-container">
            <input
              type="number"
              placeholder="Введите число"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              min="1"
              max="9"
            />
            <button
              onClick={handleStartGame}
              disabled={!inputValue || parseInt(inputValue, 10) <= 0}
              className="custom-button"
            >
              Начать игру
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1>Игра: Умножение на {multiplier}</h1>
          <Game multiplier={multiplier} totalQuestions={10} />
        </>
      )}
    </div>
  )
}

export default App