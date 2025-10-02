import SidebarComponent from "../SidebarComponent.jsx";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex h-screen">
      <SidebarComponent />
      <main className="flex-grow p-4">
        <div id="detail">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
