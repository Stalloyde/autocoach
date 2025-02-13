import { useContext, useEffect } from 'react';
import { InputStateContext } from '../../App';
import Inputs from '../../sub-components/Inputs';
import TimeInput from '../../sub-components/TimeInput';
import { useNavigate } from 'react-router';
import AddToFavouritesModal from './AddToFavourites/AddToFavouritesModal';

function WorkoutConfig() {
    const {
        reps,
        setReps,
        repInterval,
        setRepInterval,
        waves,
        setWaves,
        waveInterval,
        countdown,
        setCountdown,
        token,
        currentUser,
        addingToFavourites,
        setAddingToFavourites,
    } = useContext(InputStateContext);

    let navigate = useNavigate();

    function handleAddingToFavourites(e: any) {
        e.preventDefault();
        if (repInterval > 0) setAddingToFavourites(true);
    }

    function handleStartWorkout(e: any) {
        e.preventDefault();
        token && currentUser
            ? navigate(`/countdown/${currentUser.username}`)
            : navigate('/countdown');
    }

    useEffect(() => {
        token && currentUser
            ? navigate(`/${currentUser.username}`)
            : navigate(`/`);
    }, []);

    return (
        <>
            {addingToFavourites && repInterval ? (
                <AddToFavouritesModal />
            ) : (
                <form
                    action="POST"
                    onSubmit={(e) => handleStartWorkout(e)}
                    className="grid grid-rows-5 justify-center p-1"
                >
                    <Inputs
                        label="# of Repetition"
                        inputType="number"
                        id="repetitions"
                        minValue="1"
                        value={reps}
                        handleDecrementBtn={() =>
                            reps > 1 ? setReps(reps - 1) : null
                        }
                        handleIncrementBtn={() => setReps((prev) => prev + 1)}
                        handleInput={(e) =>
                            setReps(Number(e.currentTarget.value))
                        }
                    />
                    <TimeInput setRepInterval={setRepInterval} />
                    <Inputs
                        label="# of Waves"
                        inputType="number"
                        id="waves"
                        value={waves}
                        minValue="2"
                        maxValue={repInterval / waveInterval - 1}
                        handleDecrementBtn={() =>
                            waves > 2 ? setWaves(waves - 1) : null
                        }
                        handleIncrementBtn={() => setWaves((prev) => prev + 1)}
                        handleInput={(e) =>
                            setWaves(Number(e.currentTarget.value))
                        }
                    />
                    <Inputs
                        label="Interval between Waves (seconds)"
                        fixed={true}
                        inputType="tel"
                        id="intervalWave"
                        defaultValue={waveInterval}
                        disableTyping={(e) => {
                            e.preventDefault();
                        }}
                    />
                    <Inputs
                        label="Countdown Timer (seconds)"
                        inputType="number"
                        id="countdown"
                        minValue="5"
                        value={countdown}
                        handleDecrementBtn={() =>
                            countdown === 5
                                ? null
                                : setCountdown((prev) => prev - 1)
                        }
                        handleIncrementBtn={() =>
                            setCountdown((prev) => prev + 1)
                        }
                        handleInput={(e) =>
                            setCountdown(Number(e.currentTarget.value))
                        }
                    />
                    <button className="m-1 border border-slate-950 bg-green-700 p-2 text-white underline">
                        Start Workout{' '}
                    </button>
                    {token && (
                        <button
                            type="button"
                            onClick={handleAddingToFavourites}
                            className="m-1 border border-slate-950 bg-blue-900 p-2 text-white underline"
                        >
                            Add To Favourites{' '}
                        </button>
                    )}
                </form>
            )}
        </>
    );
}

export default WorkoutConfig;
