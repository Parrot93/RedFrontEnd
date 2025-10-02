import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import { PiUserListBold } from "react-icons/pi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { LuHandshake } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export default function MySidebar() {
  return (
    <Sidebar aria-label="Sidebar" className="h-full">
      <SidebarLogo
        href="#"
        img="/trusted.png"
        imgAlt="Trusted logo"
      />
      <SidebarItems>
        <SidebarItemGroup>

          <NavLink to="/provider/1">
            {({ isActive }) => (
              <SidebarItem
                icon={PiUserListBold}
                className={isActive ? "bg-blue-200 text-black" : ""}
              >
                Providers
              </SidebarItem>
            )}
          </NavLink>

          <NavLink to="/policy">
            {({ isActive }) => (
              <SidebarItem
                icon={HiOutlineDocumentText}
                className={isActive ? "bg-blue-200 text-black" : ""}
              >
                Policy
              </SidebarItem>
            )}
          </NavLink>

          <NavLink to="/consents">
            {({ isActive }) => (
              <SidebarItem
                icon={LuHandshake}
                className={isActive ? "bg-blue-200 text-black" : ""}
              >
                Consents
              </SidebarItem>
            )}
          </NavLink>

        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
