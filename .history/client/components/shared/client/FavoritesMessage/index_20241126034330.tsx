// import CheckboxComponent from "../CheckBox";
// import SearchIconSvg from "../../svg/SearchIconSvg";
import ProfileSvg from "../../../../components/shared/svg/ProfileSvg"
import MessageArrovSvg from "../../../../components/shared/svg/MessageArrovSvg"
import { useState } from "react";
import CheckboxComponent from "../CheckBox";
import StarSvg from "../../../../components/shared/svg/starSvg"
import { useDispatch } from "react-redux";
import { setUseButtonTrue } from "@/components/Redux/Features/messageSlice/messageSlice";
import styles from "./favorites.module.css";

export default function FavoritesMessage() {
    const [editMode, setEditMode] = useState(false);
    const [usebutton, setUseButton] = useState(false)
    const dispatch = useDispatch();

    const handleClick = () => {
      dispatch(setUseButtonTrue());
    };


    const handleEditClick = () => {
        setEditMode(!editMode);
    };


    return (
        <>
         <div className={`${styles.scrollContainer}`}>
            <div className='w-96 h-screen border-r border-whiteLight3 '>
           

          

                 
       
         
                <div className='flex text-textColGreen font-medium justify-between mt-2'>
                <h1 className="text-black ml-3 text-lg">Favorites Messages</h1>
                <button className={ editMode? 'mr-12 bg-gray-400 rounded-lg w-16 h-8 text-white': 'mr-16' } onClick={handleEditClick}>
                            {editMode ? "Done" : "Edit"}
                        </button>
                </div>
                <div className="border-b border-whiteLight3 mt-4 w-full"></div>
                {[...Array(6)].map((_, index) => (
                        <div key={index}>
                <div className=" border border-r border-whiteLight3 mt-10">
                {editMode && <CheckboxComponent />}
                    <div className=" flex gap-36 ml-3">

               

                <div className=" flex gap-5">
                <ProfileSvg/>
                <div className=" flex">
                <h1>Lorem</h1>
                <h1>ipsum</h1>
                </div>
                
            
                </div>

                <div>
                <h1 className=" -ml-6">10/24/24</h1>
                </div>
             
                </div>


<div className=" flex items-center ">
                <div className="  bg-white rounded-md w-80 h-24 p-3">
                    <p>Recently, you verified the security info on the Microsoft account </p>
                    <div className=" flex justify-end right-0 ml-7 gap-4">
                    <StarSvg/>
                    <h1>10:28</h1>
                    </div>

                   
                    
                </div>

                <div className="ml-5">
                    <button onClick={handleClick}><MessageArrovSvg/></button>
                    
                </div>

                </div>
                </div>
</div>
  ))}

              
           
            </div>
            </div>
        </>
    );
}
