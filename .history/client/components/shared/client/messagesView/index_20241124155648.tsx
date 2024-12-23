"use client";

import ProfileSvg from "../../svg/ProfileSvg";


export default function MessagesView() {



    return(
  
        <div>

        <header>
            <div className=" top-0 w-full h-14 bg-headerBgColor">

                <div className=" flex justify-between">

               


                <div className=" flex gap-2">

               
                <div className=" pt-2.5 ml-4">
                <ProfileSvg/>
                </div>
                <div className=" text-black">
                    <h1 className=" font-semibold">John Doe</h1>
                    <h1>nickwillford@****.com</h1>
                </div>
                </div>


                <div>
                    <button className=" border border-buttonColor text-buttonColor w-16 h-9 mr-6 mt-2.5 rounded-md">
                        OffMail
                    </button>
                </div>

                </div>
            </div>
        </header>


        <div>
            <h1 className=" w-24 bg-green-300 ">Today</h1>
        </div>
       

       <div className=" mt-8 ml-5">
       <div className="  bg-white rounded-md w-80 h-24 p-3">
                    <p>Recently, you verified the security info on the Microsoft account </p>
                    <div className=" flex justify-end right-0 ml-7 gap-4">
                 
                    <h1>10:28</h1>
                    </div>

                   
                    
                </div>
       </div>
               
        </div>
      
    )

}