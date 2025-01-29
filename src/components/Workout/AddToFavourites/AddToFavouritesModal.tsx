import { useState, useContext, FormEvent } from 'react';
import { InputStateContext } from '../../../App';
import AddToFavouritesSuccessModal from './AddToFavouritesSuccessModal';
import WorkoutDetails from '../../../sub-components/WorkoutDetails';
import OverwriteFavouritesModal from './OverwriteFavouritesModal';
import SaveCancelBtn from '../../../sub-components/SaveCancelBtn';
import APIurl from '../../../helpers/APIurl';
import {
    HeadersType,
    AddToFavouritesResponseType,
} from '../../../utils/TypeDeclarations';

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

    async function handleAddToFavourites(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const headers: HeadersType = {
            'Content-Type': 'application/json',
        };

        if (token) headers.Authorization = token;
        const url = APIurl('addToFavourites');
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                workoutName,
                reps,
                repInterval,
                waveInterval,
                waves,
                countdown,
            }),
        });
        const responseData: AddToFavouritesResponseType = await response.json();
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
                            maxLength={25}
                            required
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
