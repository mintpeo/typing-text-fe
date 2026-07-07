import { Outlet } from "react-router-dom";
import Header from './mainPage/header/Header.jsx'

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Layout;