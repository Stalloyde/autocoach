import React, { useContext, useEffect } from 'react';
import { InputStateContext } from '../App';
import { FormatTime } from '../helpers/FormatTime';

const TimeInput = ({ setRepInterval }) => {
    const { displayInterval, setDisplayInterval, repInterval } =
        useContext(InputStateContext);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, '');
        if (input.length > 4) input = input.slice(-4);
        const minutes = input.slice(0, -2) || '0';
        const seconds = input.slice(-2) || '0';
        const rawTime = Number(minutes) * 60 + Number(seconds);
        const formattedTime = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
        setDisplayInterval(formattedTime);
        setRepInterval(rawTime);
    };

    useEffect(() => {
        const formattedTime = FormatTime(repInterval);
        setDisplayInterval(formattedTime);
    }, []);

    return (
        <div className="m-3 p-2">
            <label htmlFor="timeInput">Interval per Repetition (MM:SS) </label>
            <div className="w-72 outline outline-1">
                <input
                    className="w-72 p-1 text-center"
                    required
                    id="timeInput"
                    type="text"
                    value={displayInterval}
                    onChange={handleInputChange}
                    placeholder="MM:SS"
                />
            </div>
        </div>
    );
};

export default TimeInput;
