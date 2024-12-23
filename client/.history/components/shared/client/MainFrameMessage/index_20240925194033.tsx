import CheckboxComponent from "../CheckBox";
import SearchIconSvg from "../../svg/SearchIconSvg";

export default function MainFrameMessage() {

    return (
        <>
            <div className='w-60'>
                {/* Search bar container */}
                <div className="flex items-center border border-black rounded-md w- h-8 ml-7">

                    <SearchIconSvg className="ml-8" />

                    <input
                        style={{ textIndent: '10px' }}
                        placeholder='Search'
                        className="w-full h-full rounded-md outline-none border-none"
                        type="Search"
                    />
                </div>

                <div>
                    <CheckboxComponent />
                </div>


            </div>
        </>
    );
}
