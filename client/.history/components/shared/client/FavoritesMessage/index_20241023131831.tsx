import CheckboxComponent from "../CheckBox";
import SearchIconSvg from "../../svg/SearchIconSvg";

export default function FavoritesMessage() {

    return (
        <>
            <div className='w-80 h-screen border-r border-whiteLight3 '>
                {/* Search bar container */}
                <div className="flex items-center border border-bordersColor rounded-md w-72 h-9 ml-1.5 mt-4">

                   <h1>Favorites Message</h1>

                 
                </div>

                <div className='flex text-textColGreen font-medium justify-between mt-2'>
           
                    <button className=" mr-16">Edit</button>
                </div>
                <div className="border-b border-whiteLight3 mt-4 w-full"></div>

            </div>
        </>
    );
}
