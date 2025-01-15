import React, { useContext } from 'react';
import { InputStateContext } from '../App';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function FavouritesMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { currentUser } = useContext(InputStateContext);
    const { workouts } = currentUser;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                Quick Start Favourites
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
                    margin: '21px -20px',
                    '.MuiPaper-root': {
                        width: '250px',
                        backgroundColor: '#1E3A8A',
                        color: 'white',
                        borderRadius: '0',
                        display: 'flex',
                        justifyContent: 'center',
                    },
                }}
            >
                {workouts &&
                    workouts.map((workout) => (
                        <MenuItem onClick={handleClose} key={workout.id}>
                            {workout.workoutName}
                        </MenuItem>
                    ))}
            </Menu>
        </div>
    );
}
