import { useContext } from 'react';
import { Link } from 'react-router';
import { InputStateContext } from '../App';
import SettingsIcon from '../assets/settings-icon.jpg';
import FavouritesMenu from '../sub-components/Favourites-menu';

function Header() {
    const { token, currentUser } = useContext(InputStateContext);

    return (
        <div className="grid grid-cols-[1fr_2fr_1fr] border border-slate-950 p-1">
            {token && currentUser && currentUser.workouts.length > 0 ? (
                <div className="content-center p-1">
                    <FavouritesMenu />
                </div>
            ) : (
                <div></div>
            )}
            <h1 className="grid content-center justify-center p-1 text-2xl font-extrabold">
                {token && currentUser ? (
                    <Link to={`/${currentUser.username}`}>AUTO-GO</Link>
                ) : (
                    <Link to="/">AUTO-GO</Link>
                )}
            </h1>
            <div className="grid content-center justify-end p-1">
                {!token ? (
                    <div className="grid justify-center gap-1 text-xs md:flex md:text-sm">
                        <Link
                            to="..."
                            className="decoration-green-700 hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                ) : (
                    <Link to={`/settings/${currentUser}`}>
                        <div className="p-1">
                            <img
                                src={SettingsIcon}
                                alt="settings"
                                width="40px"
                                height="40px"
                            />
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
