import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    status: 'idle' | 'correct' | 'wrong'
}

const Button: React.FC<ButtonProps> = ({ status, disabled, children, ...rest }) => {
    let buttonClass = 'custom-button'

    if (disabled) {
        buttonClass += ' disabled'
    } else if (status === 'correct' || status === 'wrong') {
        buttonClass += ` ${status}`
    }

    return (
        <button {...rest} disabled={disabled} className={buttonClass}>
            {children}
        </button>
    )
}

export default Button