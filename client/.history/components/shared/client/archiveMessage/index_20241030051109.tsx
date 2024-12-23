import { useState } from "react";
import ProfileSvg from "../../../../components/shared/svg/ProfileSvg";
import CheckboxComponent from "../CheckBox";

export default function ArchiveMessage() {
    const [editMode, setEditMode] = useState(false);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    return (
        <>
            <div className="flex flex-col gap-9">
                <div className='w-96 border-r border-whiteLight3'>
                    <div className='flex text-textColGreen font-medium justify-between mt-2'>
                        <h1 className="text-black ml-3 text-lg">Favorites Messages</h1>
                        <button className="mr-16" onClick={handleEditClick}>
                            {editMode ? "Done" : "Edit"}
                        </button>
                    </div>
                    <div className="border-b border-whiteLight3 mt-4 w-full"></div>

                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex mt-10">
                            {editMode && <CheckboxComponent />}
                            <div className="flex gap-28 ml-3">
                                <div className="flex gap-5">
                                    <ProfileSvg />
                                    <h1 className=" flex">Lorem Ipsum</h1>
                                </div>
                            
                            </div>
                            <div className="border-b border-whiteLight3 mt-4 w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
