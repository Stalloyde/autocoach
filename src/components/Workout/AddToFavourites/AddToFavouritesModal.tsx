import { useState, useContext } from 'react';
import { InputStateContext } from '../../../App';
import AddToFavouritesSuccessModal from './AddToFavouritesSuccessModal';
import WorkoutDetails from '../../../sub-components/WorkoutDetails';

function AddToFavouritesModal({ setAddingToFavourites }) {
    const [workoutName, setWorkoutName] = useState('');
    const [error, setError] = useState('');
    const [addToFavouritesSuccess, setAddToFavouritesSuccess] = useState(false);

    const {
        reps,
        repInterval,
        waves,
        waveInterval,
        countdown,
        token,
        setCurrentUser,
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
            setCurrentUser(responseData);
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
            <WorkoutDetails />
        </div>
    );
}

export default AddToFavouritesModal;
