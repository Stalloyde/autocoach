function Inputs({
    label,
    inputType,
    id,
    minValue,
    maxValue,
    value,
    defaultValue,
    pattern,
    handleDecrementBtn,
    handleIncrementBtn,
    handleInput,
    disableTyping,
    fixed,
}) {
    return (
        <div className="m-3 p-2">
            <label htmlFor={id} className="grid">
                {label}
            </label>
            <div className="relative w-72 outline outline-1">
                {fixed ? (
                    <input
                        className="w-72 p-1 text-center"
                        required
                        onKeyDown={disableTyping}
                        onWheel={(e) => e.target.blur()}
                        type={inputType}
                        id={id}
                        pattern={pattern}
                        min={minValue}
                        max={maxValue}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={handleInput}
                    />
                ) : (
                    <div className="flex items-center">
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
                            max={maxValue}
                            value={value}
                            defaultValue={defaultValue}
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
                )}
            </div>
        </div>
    );
}

export default Inputs;
