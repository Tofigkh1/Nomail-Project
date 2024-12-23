import CheckboxComponent from "../CheckBox";
import SearchIconSvg from "../../svg/SearchIconSvg";
import ProfileSvg from "../../../../components/shared/svg/ProfileSvg"
export default function FavoritesMessage() {

    return (
        <>
            <div className='w-80 h-screen border-r border-whiteLight3 '>
           

          

                 
       

                <div className='flex text-textColGreen font-medium justify-between mt-2'>
                <h1 className="text-black ml-3 text-lg">Favorites Messages</h1>
                    <button className=" mr-16">Edit</button>
                </div>
                <div className="border-b border-whiteLight3 mt-4 w-full"></div>

                <div className=" mt-10">

                    <div className=" flex gap-12">

               

                <div className=" flex gap-">
                <ProfileSvg/>
                <h1>Lorem Ipsum</h1>
            
                </div>

                <div>
                <h1 className="">10/24/24</h1>
                </div>
             
                </div>
                </div>
           
            </div>
        </>
    );
}
