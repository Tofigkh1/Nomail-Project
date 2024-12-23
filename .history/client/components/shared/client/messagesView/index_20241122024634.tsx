"use client";
import Sidebar, { SidebarItem, SidebarContext } from '../../components/shared/client/SideBarMenu/sideBarMenu';
import NomailPaleSvg from '../../components/shared/svg/nomailPaleSvg';
import NewMail from '../../components/shared/svg/newMail';
import InboxSvg from '../../components/shared/svg/InboxSvg';
import CalendarSvg from '../../components/shared/svg/calendarSvg';
import FavoritesSvg from '../../components/shared/svg/FavoritesSvg';
import ArchiveSvg from '../../components/shared/svg/ArchiveSvg';
import GroupSvg from '../../components/shared/svg/groupSvg';
import TodoSvg from '../../components/shared/svg/TodoSvg';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CalendarActiveSvg from "../../components/shared/svg/calendarActiveSvg";
import SettingSvg from "../../components/shared/svg/settingSvg";
import FavoritesActiveSvg from "../../components/shared/svg/FavoritesActiveSvg";
import FavoritesMessage from '@/components/shared/client/FavoritesMessage';
import Header from '@/components/shared/client/Header/header';
import ArchiveMessage from '@/components/shared/client/archiveMessage';
import ArchiveActive from '../../components/shared/svg/archiveActive';

export default function ArchivePage() {
    const pathname = usePathname(); // Pathname'i almak için usePathname kullanıldı

    const [expanded, setExpanded] = useState(false)
    const sidebarWidth = expanded ? '200px' : '45px';


    return(
  
        <div>
 
        <div className="flex">



      {/* No message section */}
      <div className="flex flex-grow justify-center items-center h-screen flex-col font-semibold text-textGray gap-7 text-2xl">
                        <NomailPaleSvg />
                        <h1>No message selected</h1>
                    </div>
                    </div>
        </div>
        </SidebarContext.Provider>
    )

}