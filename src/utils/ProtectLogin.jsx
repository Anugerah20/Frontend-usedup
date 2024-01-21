import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const user = localStorage.getItem('useToken');

export const ProtectRouteLogin = () => {
    if (user) {
        return <Navigate to='/' />
    }
    return <Outlet />;
};