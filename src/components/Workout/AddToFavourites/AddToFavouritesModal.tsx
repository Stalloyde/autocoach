import { useState, useContext } from 'react';
import { InputStateContext } from '../../../App';
import AddToFavouritesSuccessModal from './AddToFavouritesSuccessModal';

function AddToFavouritesModal({ setAddingToFavourites }) {
    const [workoutName, setWorkoutName] = useState('');
    const [error, setError] = useState('');
    const [addToFavouritesSuccess, setAddToFavouritesSuccess] = useState(false);

    const {
        reps,
        repInterval,
        displayInterval,
        waves,
        waveInterval,
        countdown,
        token,
    } = useContext(InputStateContext);

    async function handleAddToFavourites(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/addToFavourites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                workoutName,
                reps,
                repInterval,
                waveInterval,
                waves,
                countdown,
            }),
        });
        const responseData = await response.json();
        if (responseData.workoutNameError) {
            setError(responseData.workoutNameError);
        } else {
            setAddToFavouritesSuccess(true);
        }
    }

    return (
        <div className="grid items-center justify-center">
            {addToFavouritesSuccess ? (
                <AddToFavouritesSuccessModal
                    setAddingToFavourites={setAddingToFavourites}
                />
            ) : (
                <form
                    method="post"
                    onSubmit={(e) => handleAddToFavourites(e)}
                    className="m-3 grid justify-center p-2 align-middle"
                >
                    <div className="m-3 grid p-2">
                        <label htmlFor="workoutName">Save workout as:</label>
                        <input
                            className="relative w-72 p-2 outline outline-1"
                            type="text"
                            id="workoutName"
                            value={workoutName}
                            placeholder="Workout Name"
                            onChange={(e) => setWorkoutName(e.target.value)}
                        />
                        <p className="text-xs italic text-red-600">{error}</p>
                    </div>
                    <button className="m-3 border-slate-950 bg-green-700 p-2 text-white">
                        Save
                    </button>
                    <button
                        onClick={() => {
                            setAddingToFavourites(false);
                        }}
                        className="m-3 border-slate-950 bg-red-700 p-2 text-white"
                    >
                        Cancel
                    </button>
                </form>
            )}

            <div className="border border-slate-950 text-center text-[20px]">
                <h2 className="underline">Workout Details</h2>
                <div className="grid grid-cols-[2fr_1fr]">
                    <div className="grid justify-end">
                        Number of Repetitions:
                    </div>
                    <div>{reps}</div>
                </div>
                <div className="grid grid-cols-[2fr_1fr]">
                    <div className="grid justify-end">
                        Interval per Repetition:
                    </div>
                    <div>{displayInterval}</div>
                </div>
                <div className="grid grid-cols-[2fr_1fr]">
                    <div className="grid justify-end">Number of Waves:</div>
                    <div>{waves}</div>
                </div>
                <div className="grid grid-cols-[2fr_1fr]">
                    <div className="grid justify-end">
                        Interval between Waves:
                    </div>
                    <div>{waveInterval}</div>
                </div>
            </div>
        </div>
    );
}

export default AddToFavouritesModal;
