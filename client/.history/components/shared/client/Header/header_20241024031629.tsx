'use client'; // Eğer Header bir istemci bileşeni ise

import { useContext } from 'react';
import { SidebarContext } from '../SideBarMenu/sideBarMenu'; // Doğru yolda olduğundan emin olun

export default function Header() {
    const { expanded, setExpanded } = useContext(SidebarContext); // Context'e erişim

    return (
        <div className="flex items-center justify-between p-4 bg-headerColor text-white">
            <h1>Your Header</h1>
            <button onClick={() => setExpanded(!expanded)}>Toggle Sidebar</button>
        </div>
    );
}