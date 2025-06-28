"use client"
import { Avatar } from "../components/Avatar";
import Button from "../components/Button";
import ExploreItem from "../components/ExploreItem";
import BottomNav from "../components/Nav";
import Title from "../components/Title";
import { Item } from "../types/item";

function Profile() {

    const firstname = "Julian"
    const lastname = "Amschwand"
    const username = "Chips"
    const completed = 10
    const followers = 20
    const following = 10

    const items: Item[] = [{
        id: "1",
        title: "hello",
        desc: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        url: "https://placehold.co/600x400",
        count: 10
    }]



    return (
        <>
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"></div>
            <Title title="Profile" back />
            <div className="flex justify-center items-center">
                <Avatar firstname={firstname} lastname={lastname} className="w-45 h-45" />
            </div>
            <div className="flex flex-col justify-center items-center mt-3 mx-8 mb-5">
                <p className="font-bold text-2xl">{firstname} {lastname}</p>
                <p className="text-gray-500">@{username.toLocaleLowerCase()}</p>

                <Button variant="extra" label="Edit Profile" rounded="normal" className="mt-3" />
            </div>

            <div className="flex flex-row gap-2 mb-4 mx-8">
                <div className="flex-1 flex flex-col justify-center items-center p-2 border border-gray-300 rounded-lg">
                    <div className="font-semibold">{completed}</div>
                    <p className="text-gray-500">completed</p>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center p-2 border border-gray-300 rounded-lg">
                    <div className="font-semibold">{followers}</div>
                    <p className="text-gray-500">followers</p>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center p-2 border border-gray-300 rounded-lg">
                    <div className="font-semibold">{following}</div>
                    <p className="text-gray-500">following</p>
                </div>
            </div>

            <div className="mx-8 flex flex-col justify-center items-center gap-2 pb-15">
                {items.map((e) => (
                    <ExploreItem
                        key={e.id}
                        title={e.title}
                        description={e.desc}
                        imageUrl={e.url}
                        itemCount={e.count}
                    />
                ))}
            </div>


            <BottomNav />
        </>
    );
}

export default Profile;