import React, { useState } from 'react'
import Button from './Button'
import CubeScheme from './CubeScheme'
import { GameProps, SolvedProblem } from './types'

const Game: React.FC<GameProps> = ({ multiplier, totalQuestions }) => {
    const [currentFactor, setCurrentFactor] = useState<number>(1)
    const [inputValue, setInputValue] = useState<string>('')
    const [answerStatus, setAnswerStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
    const [solvedProblems, setSolvedProblems] = useState<SolvedProblem[]>([])
    const [showNewExample, setShowNewExample] = useState<boolean>(true)

    const correctAnswer = multiplier * currentFactor

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (inputValue.trim() === '') return

        const userAnswer = parseInt(inputValue, 10)
        if (userAnswer === correctAnswer) {
            setAnswerStatus('correct')
            setInputValue('')

            setSolvedProblems(prev => [
                ...prev,
                { factor: currentFactor, answer: correctAnswer, animate: true }
            ])

            setCurrentFactor(prev => prev + 1)
            setShowNewExample(false)

            setTimeout(() => {
                setSolvedProblems(prev => {
                    const newArr = [...prev]
                    newArr[newArr.length - 1].animate = false
                    return newArr
                })
                setShowNewExample(true)
                setAnswerStatus('idle')
            }, 500)
        } else {
            setAnswerStatus('wrong')
            setTimeout(() => {
                setAnswerStatus('idle')
            }, 1000)
        }
    }

    const isButtonDisabled = inputValue.trim() === '' && answerStatus === 'idle'

    return (
        <div className="game-container">
            <div className="columns">
                <div className="left-column">
                    {solvedProblems.map((problem, index) => (
                        <div key={index} className="problem solved">
                            <span>{multiplier} × {problem.factor} = {problem.answer}</span>
                        </div>
                    ))}
                    {currentFactor <= totalQuestions && showNewExample && (
                        <form onSubmit={handleSubmit}>
                            <div className={`problem current ${showNewExample ? 'fade-in' : ''}`}>
                                <span>{multiplier} × {currentFactor} = </span>
                                <input
                                    type='number'
                                    maxLength={3}
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    className={answerStatus === 'wrong' ? 'input-wrong' : ''}
                                    autoFocus
                                />
                            </div>
                        </form>
                    )}
                </div>
                <div className="right-column">
                    <CubeScheme solvedProblems={solvedProblems} multiplier={multiplier} />
                </div>
            </div>
            <div className="button-container">
                {currentFactor <= totalQuestions ? (
                    <Button onClick={handleSubmit} disabled={isButtonDisabled} status={answerStatus}>
                        Done
                    </Button>
                ) : (
                    <h2>Поздравляем, вы завершили игру!</h2>
                )}
            </div>
        </div>
    )
}

export default Game