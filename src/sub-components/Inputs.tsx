import { InputsTypes } from '../utils/TypeDeclarations';

function Inputs({
    label,
    inputType,
    id,
    minValue,
    maxValue,
    value,
    defaultValue,
    handleDecrementBtn,
    handleIncrementBtn,
    handleInput,
    disableTyping,
    fixed,
}: InputsTypes) {
    return (
        <div className="m-1 grid p-1">
            <div className="flex items-center">
                <label htmlFor={id}>{label}</label>
            </div>
            <div className="relative h-8 w-60 outline outline-1">
                {fixed ? (
                    <input
                        className="w-60 p-1 text-center"
                        required
                        onKeyDown={disableTyping}
                        onWheel={(e) => e.currentTarget.blur()}
                        type={inputType}
                        id={id}
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
                            className="w-40 p-1 text-center"
                            required
                            onKeyDown={disableTyping}
                            onWheel={(e) => e.currentTarget.blur()}
                            type={inputType}
                            id={id}
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
