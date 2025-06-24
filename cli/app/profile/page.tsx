"use client"
import { Avatar } from "../components/Avatar";
import Title from "../components/Title";

function Profile() {

    const firstname = "Julian"
    const lastname = "Amschwand"



    return (
        <>
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"></div>
            <Title title="Profile" back />
            <div>
                <Avatar firstname={firstname} lastname={lastname} />
            </div>
            <div>
                {
                    /* Users first and last Name and under that the @Username */
                }
                <p>{firstname} {lastname}</p>
            </div>

        </>
    );
}

export default Profile;