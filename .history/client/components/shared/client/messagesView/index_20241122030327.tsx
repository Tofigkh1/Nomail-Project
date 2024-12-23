"use client";

import ProfileSvg from "../../svg/ProfileSvg";


export default function MessagesView() {



    return(
  
        <div>

        <header>
            <div className=" top-0 w-screen h-14 bg-slate-800">

                <div className=" flex gap-2">

               
                <div className=" pt-2.5 ml-4">
                <ProfileSvg/>
                </div>
                <div className=" text-white">
                    <h1>John Doe</h1>
                    <h1>nickwillford@****.com</h1>
                </div>
                </div>


                <div>
                    <button className=" border border-buttonColor text">
                        OffMail
                    </button>
                </div>
                
            </div>
        </header>
       
               
        </div>
      
    )

}