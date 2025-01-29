import React, { useContext } from 'react';
import { InputStateContext } from '../App';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FavouritesIcon from '../assets/favourites-icon.png';
import { formatTime } from '../helpers/formatTime';
import { useNavigate } from 'react-router';
import { workoutType } from '../utils/TypeDeclarations';

export default function FavouritesMenu() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {
        currentUser,
        setReps,
        setRepInterval,
        setWaves,
        setWaveInterval,
        setCountdown,
        setDisplayInterval,
        addingToFavourites,
        setAddingToFavourites,
    } = useContext(InputStateContext);

    const workouts = currentUser?.workouts || [];

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleQuickStart = (workout: workoutType) => {
        setReps(Number(workout.reps));
        setRepInterval(Number(workout.repInterval));
        setDisplayInterval(formatTime(workout.repInterval));
        setWaves(Number(workout.waves));
        setWaveInterval(Number(workout.waveInterval));
        setCountdown(Number(workout.countdown));
        if (addingToFavourites) setAddingToFavourites(false);
        setAnchorEl(null);
        navigate(`/${currentUser?.username}`);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    color: 'black',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    fontFamily: 'inherit',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <img
                    src={FavouritesIcon}
                    alt="favourites"
                    width="30px"
                    height="30px"
                />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    fontFamily: 'inherit',
                    margin: '5px -15px',
                    '.MuiPaper-root': {
                        width: {
                            xs: '200px',
                            sm: '250px',
                        },
                        overflow: 'auto',
                        backgroundColor: '#1E3A8A',
                        color: 'white',
                        borderRadius: '0',
                        display: 'flex',
                        justifyContent: 'center',
                    },
                }}
            >
                {workouts.length > 0 &&
                    workouts.map((workout) => (
                        <MenuItem
                            onClick={() => handleQuickStart(workout)}
                            key={workout.id}
                            sx={{
                                fontSize: {
                                    xs: 15,
                                    sm: 18,
                                },
                            }}
                        >
                            {workout.workoutName}
                        </MenuItem>
                    ))}
            </Menu>
        </div>
    );
}
