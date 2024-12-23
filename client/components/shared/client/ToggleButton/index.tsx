// SidebarToggleButton.tsx
import React from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";

// Define prop types
type SidebarToggleButtonProps = {
    expanded: boolean;
    onToggle: () => void;
};

export function SidebarToggleButton({ expanded, onToggle }: SidebarToggleButtonProps) {
    return (
        <button
            onClick={onToggle}
            className="pl-3.5 rounded-lg bg-textColorGreen hover:bg-clientButtonGreen mr-2 w-14 h-11 mt-14"
        >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
    );
}
