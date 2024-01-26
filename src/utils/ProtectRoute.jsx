import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const user = localStorage.getItem('useToken');

export const AlreadyLogin = () => {
    if (user) {
        return <Navigate to='/' />
    }
    return <Outlet />;
};

export const ProtectPath = () => {
    if (!user) {
        return <Navigate to='/login' />
    }
    return <Outlet />
}