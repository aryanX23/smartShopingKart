import { Outlet, Navigate } from 'react-router-dom';
export default function PrivateRoutes(){
    let auth=JSON.parse(localStorage.getItem("userDetails")).isLoggedIn;
    return(
        auth ? <Outlet/> : <Navigate to="/smartShopingKart/" replace />
    );
}
