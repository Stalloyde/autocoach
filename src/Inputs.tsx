import { useState } from 'react';
import Header from './Header';

function Inputs({
    label,
    inputType,
    id,
    minValue,
    value,
    pattern,
    handleDecrementBtn,
    handleIncrementBtn,
    handleInput,
    disableTyping,
}) {
    return (
        <div className="p-2">
            <label htmlFor={id} className="grid">
                {label}
            </label>
            <div className="relative w-72 outline outline-1">
                <button
                    type="button"
                    className="b-1 text w-10 border p-1"
                    onClick={handleDecrementBtn}
                >
                    -
                </button>
                <input
                    className="w-52 p-1 text-center"
                    required
                    onKeyDown={disableTyping}
                    onWheel={(e) => e.target.blur()}
                    type={inputType}
                    id={id}
                    pattern={pattern}
                    min={minValue}
                    value={value}
                    onChange={handleInput}
                />
                <button
                    type="button"
                    className="b-1 w-10 border p-1"
                    onClick={handleIncrementBtn}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default Inputs;
