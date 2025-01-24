import { useState, useContext } from 'react';
import { InputStateContext } from '../../../App';
import AddToFavouritesSuccessModal from './AddToFavouritesSuccessModal';
import WorkoutDetails from '../../../sub-components/WorkoutDetails';
import OverwriteFavouritesModal from './OverwriteFavouritesModal';
import SaveCancelBtn from '../../../sub-components/SaveCancelBtn';

function AddToFavouritesModal() {
    const [workoutName, setWorkoutName] = useState('');
    const [oldWorkoutName, setOldWorkoutName] = useState('');
    const [addToFavouritesSuccess, setAddToFavouritesSuccess] = useState(false);

    const {
        reps,
        repInterval,
        waves,
        waveInterval,
        countdown,
        token,
        setCurrentUser,
        setAddingToFavourites,
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
            setOldWorkoutName(responseData.workoutNameError);
        } else {
            setAddToFavouritesSuccess(true);
            setCurrentUser(responseData);
        }
    }

    return (
        <div className="grid items-center justify-center">
            {addToFavouritesSuccess ? (
                <AddToFavouritesSuccessModal />
            ) : oldWorkoutName ? (
                <OverwriteFavouritesModal
                    oldWorkoutName={oldWorkoutName}
                    setOldWorkoutName={setOldWorkoutName}
                    setAddToFavouritesSuccess={setAddToFavouritesSuccess}
                    workoutName={workoutName}
                />
            ) : (
                <form
                    method="post"
                    onSubmit={(e) => handleAddToFavourites(e)}
                    className="m-1 grid justify-center p-1 align-middle"
                >
                    <div className="m-1 grid p-1">
                        <label htmlFor="workoutName">Save workout as:</label>
                        <input
                            className="relative w-60 p-1 outline outline-1"
                            type="text"
                            id="workoutName"
                            value={workoutName}
                            placeholder="Workout Name"
                            onChange={(e) => setWorkoutName(e.target.value)}
                        />
                    </div>
                    <SaveCancelBtn
                        type={'save'}
                        setAddingToFavourites={null}
                        handleOverWriteFavourites={null}
                    />
                    <SaveCancelBtn
                        type="button"
                        setAddingToFavourites={setAddingToFavourites}
                        handleOverWriteFavourites={null}
                    />
                </form>
            )}
            <WorkoutDetails />
        </div>
    );
}

export default AddToFavouritesModal;
