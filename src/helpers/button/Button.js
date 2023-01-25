import React from 'react';
import "./Button.css"

function Button({styling, toBeDisabled, functionCall, buttonText}) {

    return (
        <button
            className={styling}
            disabled={toBeDisabled}
            type="button"
            onClick={functionCall}
        >
            {buttonText}
        </button>

    )
}
export default Button