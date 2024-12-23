import { useRouter } from "next/navigation"; // useRouter'u import et

export default function CalendarPage() {
    const [expanded, setExpanded] = useState(false);
    const pathname = usePathname();
    const { push } = useRouter(); // useRouter'dan push fonksiyonunu al

    const sidebarWidth = expanded ? '200px' : '45px';

    return (
        <div>
            <SidebarContext.Provider value={{ expanded, setExpanded }}>
                <div>
                    <Header />
                    <div className="flex">
                        <div style={{ width: sidebarWidth }}>
                            <Sidebar>
                                <SidebarItem
                                    icon={<NewMail />}
                                    text="New Mail"
                                    active={false}
                                    onClick={() => {}}
                                />
                                <SidebarItem
                                    icon={<InboxSvg />}
                                    text="Inbox"
                                    active={false}
                                    onClick={() => {}}
                                />
                                <SidebarItem
                                    icon={pathname === '/calendar' ? <CalendarActiveSvg /> : <CalendarSvg />}
                                    active={pathname === '/calendar'}
                                    text="Calendar"
                                    onClick={() => push('/calendar')} // push'u burada kullan
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
                                <div className=" mt-60">
                                    <SidebarItem
                                        icon={<SettingSvg />}
                                        text="Settings"
                                        active={false}
                                        onClick={() => {}}
                                    />
                                </div>
                            </Sidebar>
                        </div>
                        <div className="flex flex-grow justify-center items-center w-screen flex-col font-semibold text-textGray gap-7 text-xl">
                            <Calendar />
                        </div>
                    </div>
                </div>
            </SidebarContext.Provider>
        </div>
    );
}
