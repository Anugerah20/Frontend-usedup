// PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ authenticated, path, element: Element }) => {
    return authenticated ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
