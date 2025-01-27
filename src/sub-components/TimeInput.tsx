import React, { useContext, useEffect } from 'react';
import { InputStateContext } from '../App';
import { formatTime } from '../helpers/formatTime';
import { TimeInputPropsType } from '../utils/TypeDeclarations';

const TimeInput = ({ setRepInterval }: TimeInputPropsType) => {
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
        const formattedTime = formatTime(repInterval);
        setDisplayInterval(formattedTime);
    }, []);

    return (
        <div className="m-1 grid p-1">
            <div className="flex items-center">
                <label htmlFor="timeInput">
                    Interval per Repetition (MM:SS){' '}
                </label>
            </div>
            <div className="h-8 w-60 outline outline-1">
                <input
                    className="w-60 p-1 text-center"
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
