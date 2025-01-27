import { useContext } from 'react';
import { InputStateContext } from '../../../App';
import SaveCancelBtn from '../../../sub-components/SaveCancelBtn';
import APIurl from '../../../helpers/APIurl';
import {
    HeadersType,
    OverwriteFavouritesPropsType,
} from '../../../utils/TypeDeclarations';

function OverwriteFavourites({
    oldWorkoutName,
    setAddToFavouritesSuccess,
    workoutName,
}: OverwriteFavouritesPropsType) {
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

    async function handleOverWriteFavourites(
        e: React.MouseEvent<HTMLButtonElement>
    ) {
        e.preventDefault();
        const headers: HeadersType = {
            'Content-Type': 'application/json',
        };

        if (token) headers.Authorization = token;

        const url = APIurl('overwriteFavourites');
        const response = await fetch(url, {
            method: 'PUT',
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
        const responseData = await response.json();
        setAddToFavouritesSuccess(true);
        setCurrentUser(responseData);
    }

    return (
        <div className="m-1 grid max-w-64 justify-center p-1 align-middle">
            <div>
                <div>
                    <strong>
                        The workout '{oldWorkoutName}' already exists. Are you
                        sure you want overwrite it?
                    </strong>
                    <div>
                        <em>This action will not be reversible</em>
                    </div>

                    <div className="grid">
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
