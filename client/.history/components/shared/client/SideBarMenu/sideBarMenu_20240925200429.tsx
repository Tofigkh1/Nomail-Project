import React, { useState, useContext, ReactNode } from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";

export const SidebarContext = React.createContext<{ expanded: boolean; setExpanded: (expanded: boolean) => void; }>({
    expanded: false,
    setExpanded: () => {},
});

// Sidebar component now depends on context for state
export default function Sidebar({ children }: { children: ReactNode }) {
    const { expanded, setExpanded } = useContext(SidebarContext);

    return (
        <aside className="h-screen bg-headerColor">
            <nav
                className={`h-full flex flex-col bg-headerColor border-r border-whiteLight3 transition-all duration-200 ease-in-out ml-3 ${expanded ? "w-[126%] h-[130%] " : "w-[95px]"}`}>
                <div className="p-4 pb-2 flex justify-between items-center">


                </div>
                <ul className="flex-1 px-">{children}</ul>
            </nav>
        </aside>
    );
}

// SidebarItem component for individual items inside the sidebar
type SidebarItemProps = {
    icon: ReactNode;   // Icon to display in the sidebar item
    text: string;      // Text to display in the sidebar item
    active: boolean;   // Boolean to determine if the item is active (highlighted)
    onClick: () => void; // Add onClick function to handle clicks
};

export function SidebarItem({icon, text, active, onClick}: SidebarItemProps) {
    const context = useContext(SidebarContext); // Sidebar context to manage expanded/collapsed state
    const {expanded} = context!;

    return (
        <li
            onClick={onClick} // Attach the click handler here
            className={`group relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-all duration-300 ease-in-out transition-colors mt-8
          ${
                active
                    ? " text-mainRedLight " // Active item style
                    : " text-gray-600 " // Hover style for non-active items
            }`}
        >

            <span className="text-xl transition-all duration-300 ease-in-out">
        {icon}
      </span>

            {/* Text büyütüldü ve boşluk artırıldı */}
            {expanded && (
                <span className="ml-4 text-xl text-black transition-all duration-300 ease-in-out ">
          {text}
        </span>
            )}

            {/* Navbar kapalıyken hover ile çıkan isimler için arka plan yeşil yapıldı */}
            {!expanded && (
                <span
                    className={` absolute left-full whitespace-nowrap bg-textColorGreen text-white rounded-md py-1 px-2 transition-all duration-300 ease-in-out ml-2 opacity-0 group-hover:opacity-100`}
                >
          {text}
        </span>
            )}
        </li>
    );
}