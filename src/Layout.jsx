import { Outlet } from "react-router-dom";
import Header from './mainPage/header/Header.jsx'

function Layout() {
    return (
        <>
            <Header />
            {/* Outlet: Home, Auth,... */}
            <main style={{marginTop: "7rem"}}>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;