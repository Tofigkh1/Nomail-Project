import { useContext } from "react";
import { SidebarContext } from '../SideBarMenu/sideBarMenu'; // Import context
import NomailLogo from "@/components/shared/svg/headerlLogoSvg";
import HamburgerBtnSvg from "../../svg/hamburgerBtnSvg"



export default function Header() {

    const { expanded, setExpanded } = useContext(SidebarContext); // Access context

    return (
        <div className="flex items-center justify-between p-4 bg-headerColor text-white">
            <div className='w-auto h-20 flex gap-14'>

                <div>
                    <button onClick={() => setExpanded(!expanded)}
                            className="pl-3.5  hover:bg-clientButtonGreen w-14 h-11">
                        <HamburgerBtnSvg/>
                    </button>
                </div>

                <div>
                    <NomailLogo/>
                </div>


            </div>
        </div>
    );
}
