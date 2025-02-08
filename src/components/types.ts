export interface GameProps {
    multiplier: number
    totalQuestions: number
}

export interface SolvedProblem {
    factor: number
    answer: number
    animate: boolean
}

export interface CubeSchemeProps {
    solvedProblems: SolvedProblem[]
    multiplier: number
}