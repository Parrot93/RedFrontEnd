import MySidebar from "../sidebar.jsx";
import { Outlet,NavLink } from "react-router-dom";

export default function Root() {
    return (
          <div className="flex h-screen">
              <MySidebar />
              <main className="flex-grow p-4">
                {/* contenuto */}
                <div id="detail">
                    
                <Outlet />
                </div>
              </main>
              
            </div>
    );



}