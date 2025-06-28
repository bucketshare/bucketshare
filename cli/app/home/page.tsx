"use client"
import { Search } from "lucide-react";
import Title from "../components/Title";
import Input from "../components/Input";
import GroupList from "../components/Groups";
import { useState } from "react";
import ExploreItem from "../components/ExploreItem";
import BottomNav from "../components/Nav";
import { Item } from "../types/item";

function Home() {
    const groups = ["all", "travaling", "adventure"];
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const items: Item[] = [
        {
            id: "1",
            title: "hello",
            desc: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
            url: "https://placehold.co/600x400",
            count: 10
        },
        {
            id: "2",
            title: "hello",
            desc: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
            url: "https://placehold.co/600x400",
            count: 10
        },
        {
            id: "3",
            title: "hello",
            desc: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
            url: "https://placehold.co/600x400",
            count: 10
        },
        {
            id: "4",
            title: "hello",
            desc: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
            url: "https://placehold.co/600x400",
            count: 10
        }
    ];

    return (
        <>
            <div className="flex flex-col h-dvh">
                <div className="mt-1 mb-6 mx-7">
                    <Title title="Explore" rightIcon={<Search />} />
                </div>

                <div className="mx-8 mb-4">
                    <Input placeholder="Search Bucketlists" iconBefore={<Search />} />
                </div>

                <div className="mx-8 mb-6">
                    <GroupList groups={groups} onSelect={setSelectedGroup} selected={selectedGroup} />
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
            </div>
        </>
    );
}

export default Home;