"use client";
import Header from "@/components/shared/client/Header/header";
import Sidebar, { SidebarItem, SidebarContext } from '../../components/shared/client/SideBarMenu/sideBarMenu';
import { useState } from "react";
import NomailPaleSvg from '../../components/shared/svg/nomailPaleSvg';
import NewMail from '../../components/shared/svg/newMail';
import InboxSvg from '../../components/shared/svg/InboxSvg';
import CalendarSvg from '../../components/shared/svg/calendarSvg';
import FavoritesSvg from '../../components/shared/svg/FavoritesSvg';
import ArchiveSvg from '../../components/shared/svg/ArchiveSvg';
import GroupSvg from '../../components/shared/svg/groupSvg';
import TodoSvg from '../../components/shared/svg/TodoSvg';
// import MainFrameMessage from "@/components/shared/client/MainFrameMessage";
import { usePathname, useRouter } from "next/navigation"; // Düzeltme yapıldı
import CalendarActiveSvg from "../../components/shared/svg/calendarActiveSvg";
import SettingSvg from "../../components/shared/svg/settingSvg";
import FavoritesActiveSvg from "../../components/shared/svg/FavoritesActiveSvg"
import FavoritesMessage from "@/components/shared/client/FavoritesMessage";
import MessagesView from "@/components/shared/client/messagesView";
import { useSelector } from "react-redux";


// Home component managing the sidebar state
export default function Home() {
    const pathname = usePathname(); // Pathname'i almak için usePathname kullanıldı
    const { push } = useRouter();
    const [expanded, setExpanded] = useState(false); // Sidebar state
    const usebutton = useSelector((state) => state.message.usebutton);

    // Sidebar genişliği: genişletildiğinde 250px, daraltıldığında 95px olacak
    const sidebarWidth = expanded ? '200px' : '45px';

    return (
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
            <div>
                <Header />

                <div className="flex">
                    {/* Sidebar Section */}
                  



      {/* MainFrameMessage Section */}
      <div style={{ marginLeft: "73px" }} className="">
                        <FavoritesMessage />
                     
                    </div>



                    {usebutton ? (
        <div className="w-full">
          <MessagesView />
        </div>
      ) : (
        <div className="flex flex-grow justify-center items-center h-screen flex-col font-semibold text-textGray gap-7 text-2xl">
          <NomailPaleSvg />
          <h1>No message selected</h1>
        </div>
      )}

              
                    {/* <div className=" w-full">
                  
                        <MessagesView/>
                    </div> */}

{/* 
                    <div className="flex flex-grow justify-center items-center h-screen flex-col font-semibold text-textGray gap-7 text-2xl">
                        <NomailPaleSvg />
                        <h1>No message selected</h1>
                    </div> */}

                    
                </div>
            </div>
        </SidebarContext.Provider>
    );
}