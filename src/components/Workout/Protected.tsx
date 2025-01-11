import { Navigate, Outlet } from 'react-router';
import { useContext } from 'react';
import { InputStateContext } from '../../App';

const Protected = () => {
    const { token } = useContext(InputStateContext);

    return token ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
