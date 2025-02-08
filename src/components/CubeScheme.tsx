import React from 'react'
import { CubeSchemeProps } from './types'



const CubeScheme: React.FC<CubeSchemeProps> = ({ solvedProblems, multiplier }) => {
    return (
        <div className="cube-scheme">
            {solvedProblems.map((problem, index) => (
                <div key={index} className={`block-row ${problem.animate ? 'fly-out' : ''}`}>
                    {Array.from({ length: multiplier }, (_, i) => (
                        <div key={i} className="block"></div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default CubeScheme