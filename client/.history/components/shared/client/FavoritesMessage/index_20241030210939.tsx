// import CheckboxComponent from "../CheckBox";
// import SearchIconSvg from "../../svg/SearchIconSvg";
import ProfileSvg from "../../../../components/shared/svg/ProfileSvg"
import MessageArrovSvg from "../../../../components/shared/svg/MessageArrovSvg"
import { useState } from "react";
import CheckboxComponent from "../CheckBox";
export default function FavoritesMessage() {
    const [editMode, setEditMode] = useState(false);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };
    return (
        <>
            <div className='w-96 h-screen border-r border-whiteLight3 '>
           

          

                 
       
         
                <div className='flex text-textColGreen font-medium justify-between mt-2'>
                <h1 className="text-black ml-3 text-lg">Favorites Messages</h1>
                <button className={ editMode? 'mr-12 bg-gray-400 rounded-lg w-16 h-8 text-white': 'mr-16' } onClick={handleEditClick}>
                            {editMode ? "Done" : "Edit"}
                        </button>
                </div>
                <div className="border-b border-whiteLight3 mt-4 w-full"></div>
                {[...Array(3)].map((_, index) => (
                        <div key={index}>
                <div className=" mt-10">
             
                    <div className=" flex gap-36 ">

               
                    {editMode && <CheckboxComponent />}
                <div className=" flex gap-5">
                    
                <ProfileSvg/>
                <h1>Lorem </h1>
            
                </div>

                <div>
                <h1 className=" mr-7">10/24/24</h1>
                </div>
             
                </div>


<div className=" mt-7 flex items-center ">
                <div className="  bg-white rounded-md w-80 h-24 p-3">
                    <p>Recently, you verified the security info on the Microsoft account </p>
                </div>

                <div className="ml-5">
                    <MessageArrovSvg/>
                </div>

                </div>
                </div>
</div>
  ))}

                {/* <div className=" border border-whiteLight3 w-full pt-7 mt-5">

<div className=" flex gap-36 ml-3">



<div className=" flex gap-5">
<ProfileSvg/>
<h1>Lorem Ipsum</h1>

</div>

<div>
<h1 className="">10/24/24</h1>
</div>

</div>


<div className=" mt-7 flex items-center ">
<div className="  bg-white rounded-md w-80 h-24 p-3">
<p>Recently, you verified the security info on the Microsoft account </p>
</div>

<div className="ml-5">
<MessageArrovSvg/>
</div>

</div>
</div>


<div className=" border border-whiteLight3 w-full pt-7 mt-5">

<div className=" flex gap-36 ml-3">



<div className=" flex gap-5">
<ProfileSvg/>
<h1>Lorem Ipsum</h1>

</div>

<div>
<h1 className="">10/24/24</h1>
</div>

</div>


<div className=" mt-7 flex items-center ">
<div className="  bg-white rounded-md w-80 h-24 p-3">
<p>Recently, you verified the security info on the Microsoft account </p>
</div>

<div className="ml-5">
<MessageArrovSvg/>
</div>

</div>
</div> */}
           
            </div>
        </>
    );
}
