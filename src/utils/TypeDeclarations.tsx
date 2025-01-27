import { ChangeEvent } from 'react';

export type HeadersType = {
    'Content-Type': string;
    Authorization?: string;
};

export type workoutType = {
    countdown: number;
    id: number;
    repInterval: number;
    reps: number;
    userId: number;
    waveInterval: number;
    waves: number;
    workoutName: string;
};

export type currentUserType = {
    Bearer?: string;
    username: string;
    workouts: workoutType[];
};

export type ContextType = {
    reps: number;
    setReps: React.Dispatch<React.SetStateAction<number>>;
    repInterval: number;
    setRepInterval: React.Dispatch<React.SetStateAction<number>>;
    waves: number;
    setWaves: React.Dispatch<React.SetStateAction<number>>;
    waveInterval: number;
    setWaveInterval: React.Dispatch<React.SetStateAction<number>>;
    displayInterval: string;
    setDisplayInterval: React.Dispatch<React.SetStateAction<string>>;
    countdown: number;
    setCountdown: React.Dispatch<React.SetStateAction<number>>;
    token?: string;
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
    currentUser?: currentUserType;
    setCurrentUser: React.Dispatch<
        React.SetStateAction<currentUserType | undefined>
    >;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    addingToFavourites: boolean;
    setAddingToFavourites: React.Dispatch<React.SetStateAction<boolean>>;
};

export type LoginResponseType = {
    usernameError?: string;
    passwordError?: string;
    Bearer: string;
    username: string;
    workouts: workoutType[];
};

export type SignupResponseType = {
    usernameError?: string;
    passwordError?: string;
    confirmPasswordError?: string;
};

export type AddToFavouritesResponseType = {
    workoutNameError?: string;
    username: string;
    workouts: workoutType[];
};

export type OverwriteFavouritesPropsType = {
    oldWorkoutName: string;
    setAddToFavouritesSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    workoutName: string;
};

export type SaveCancelBtnPropsType = {
    type: string;
    setAddingToFavourites: null | React.Dispatch<React.SetStateAction<boolean>>;
    handleOverWriteFavourites:
        | null
        | ((e: React.MouseEvent<HTMLButtonElement>) => Promise<void>);
};

export type InputsTypes = {
    label: string;
    inputType: string;
    id: string;
    minValue?: string;
    maxValue?: number;
    value?: number;
    defaultValue?: number;
    handleDecrementBtn?: () => void | null;
    handleIncrementBtn?: () => void;
    handleInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    disableTyping?: (e: React.KeyboardEvent) => void;
    fixed?: boolean;
};

export type TimeInputPropsType = {
    setRepInterval: React.Dispatch<React.SetStateAction<number>>;
};
