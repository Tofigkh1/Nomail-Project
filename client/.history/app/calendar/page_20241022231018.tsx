import Header from "@/components/shared/client/Header/header";
import Sidebar, { SidebarItem } from "@/components/shared/client/SideBarMenu/sideBarMenu";



export default function CalendarPage() {

    return(
        <div>
                  <div>
                <Header />

                <div className="flex">
                    {/* Sidebar Section */}
                    <div style={{ width: sidebarWidth }}>
                        <Sidebar>
                            <SidebarItem
                                icon={<NewMail />}
                                text="New Mail"
                                active={false}
                                onClick={() => {}} // Handle clicks if needed
                            />
                            <SidebarItem
                                icon={<InboxSvg />}
                                text="Inbox"
                                active={false}
                                onClick={() => {}}
                            />
                            <SidebarItem
                                icon={<CalendarSvg />}
                                text="Calendar"
                                active={false}
                                onClick={() => push('/calendar')}
                            />
                            <SidebarItem
                                icon={<FavoritesSvg />}
                                text="Favorites"
                                active={false}
                                onClick={() => {}}
                            />
                            <SidebarItem
                                icon={<ArchiveSvg />}
                                text="Archive"
                                active={false}
                                onClick={() => {}}
                            />
                            <SidebarItem
                                icon={<GroupSvg />}
                                text="Groups"
                                active={false}
                                onClick={() => {}}
                            />
                            <SidebarItem
                                icon={<TodoSvg />}
                                text="To do"
                                active={false}
                                onClick={() => {}}
                            />
                        </Sidebar>
                    </div>

                    {/* MainFrameMessage Section */}
                    <div style={{ marginLeft: "73px" }} className="">
                        <MainFrameMessage />
                    </div>

                    {/* No message section */}
                    <div className="flex flex-grow justify-center items-center h-screen flex-col font-semibold text-textGray gap-7 text-2xl">
                        {/* <Calendar/> */}
                        <NomailPaleSvg />
                        <h1>No message selected</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}