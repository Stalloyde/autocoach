import { useState, useContext } from 'react';
import { InputStateContext } from '../../../App';
import { Dialog } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SaveCancelBtn from '../../../sub-components/SaveCancelBtn';

function OverwriteFavourites({
    oldWorkoutName,
    setOldWorkoutName,
    setAddToFavouritesSuccess,
    workoutName,
}) {
    const [open, setOpen] = useState(true);

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

    const handleClose = () => {
        setOpen(false);
        setOldWorkoutName('');
    };

    async function handleOverWriteFavourites(e) {
        e.preventDefault();
        const response = await fetch(
            'http://localhost:3000/overwriteFavourites',
            {
                method: 'PUT',
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
            }
        );
        const responseData = await response.json();
        setOpen(false);
        setAddToFavouritesSuccess(true);
        setCurrentUser(responseData);
    }

    return (
        <div className="m-3 grid justify-center p-2 align-middle">
            <div open={open} onClose={handleClose}>
                <div>
                    <strong>
                        The workout '{oldWorkoutName}' already exists. Are you
                        sure you want overwrite it?
                    </strong>
                    <div>
                        <em>This action will not be reversible</em>
                    </div>

                    <div className="flex justify-end">
                        <SaveCancelBtn
                            type={'save'}
                            setAddingToFavourites={null}
                            handleOverWriteFavourites={
                                handleOverWriteFavourites
                            }
                        />
                        <SaveCancelBtn
                            type="button"
                            setAddingToFavourites={setAddingToFavourites}
                            handleOverWriteFavourites={null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverwriteFavourites;
