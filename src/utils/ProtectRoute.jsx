import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const user = localStorage.getItem('useToken');

export const AlreadyLogin = () => {
    if (user) {
        return <Navigate to='/' />
    }
    return <Outlet />;
};

export const ProtectPath = () => {
    const location = useLocation();
    if (!user) {
        localStorage.setItem('redirectAfterLogin', location.pathname);
        return <Navigate to='/login' />;
    }
    return <Outlet />
}