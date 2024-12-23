import CheckboxComponent from "../CheckBox";
import SearchIconSvg from "../../svg/SearchIconSvg";

export default function MainFrameMessage() {

    return (
        <>
            <div className='w-96 border-r border-whiteLight3'>
                {/* Search bar container */}
                <div className="flex items-center border border-black rounded-md w-64 h-9 ml-7 mt-4">

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
