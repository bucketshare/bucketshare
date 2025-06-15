"use client"
import { Search, Settings2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Popover from "../components/popover";
import Bucketlistitem from "../components/bucketlistitem";
import { Item } from "../types/item";

const allCategories = [
    "Travel",
    "Adventure",
    "Skills",
    "Health",
    "Personal Growth",
];

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [distance, setDistance] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const handleLastViewedClicked = (item: Item) => {
        setQuery(item.title)
    }


    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category) // abwählen
                : [...prev, category]               // auswählen
        );
    };
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (query.trim()) {
                setResults([
                    `Result for "${query}" 1`,
                    `Result for "${query}" 2`,
                    `Result for "${query}" 3`,
                ]);
            } else {
                setResults([]);
            }
        }, 300); // ⏱️ Wartezeit in Millisekunden

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query]);

    return (
        <div style={{ maxWidth: 400, margin: "2rem auto", padding: 16 }}>
            <h1 className="text-3xl font-bold">Search</h1>
            <h2 className="text-2xl text-gray-600 font-medium mb-10">for Bucketlists</h2>
            <form onSubmit={(e) => e.preventDefault()} className="mb-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white shadow-sm border border-gray-200 rounded-md px-3 py-2 w-full max-w-xs">
                        <Search className="text-gray-400 w-5 h-5 mr-2" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Find a Bucketlist"
                            className="bg-transparent outline-none flex-1 text-gray-800"
                            aria-label="Search bucketlists"
                        />
                    </div>
                    <Popover>
                        <button
                            type="button"
                            style={{ width: 40, height: 40, minWidth: 40, minHeight: 40 }}
                            className="bg-indigo-500 hover:bg-indigo-600 transition-colors p-0 rounded-md flex items-center justify-center active:scale-95"
                            aria-label="Search settings"
                            tabIndex={0}
                        >
                            <Settings2 className="text-white w-5 h-5 -rotate-90" />
                        </button>
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Bucket List Search Settings</h2>
                            <div className="space-y-4">
                                {/* No search input here */}
                                <section>
                                    <h2 className="block text-sm font-medium text-gray-700 mb-2">Category</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {allCategories.map((category) => {
                                            const isSelected = selectedCategories.includes(category);
                                            return (
                                                <button
                                                    key={category}
                                                    type="button"
                                                    onClick={() => toggleCategory(category)}
                                                    className={`px-3 py-1 rounded-full border text-sm transition ${isSelected
                                                        ? "bg-indigo-600 text-white border-indigo-600"
                                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {category}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </section>

                                <div>
                                    <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
                                        Distance from Start Point (km): <span className="font-semibold">{distance} km</span>
                                    </label>
                                    <input
                                        type="range"
                                        id="distance"
                                        name="distance"
                                        min="0"
                                        max="24000"
                                        step="1"
                                        value={distance}
                                        onChange={(e) => setDistance(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </Popover>
                </div>
            </form>
            {
                results.length === 0 ? (

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Last Viewed</h3>
                        <ul className="flex flex-col gap-2">
                            {[{ title: "Japan 2024", id: "1", by: "jamie" }, { title: "Learn Guitar", id: "2", by: "anonymos" }].map((item) => (
                                <Bucketlistitem key={item.id} title={item.title} by={item.by} onClick={() => handleLastViewedClicked(item)} />
                            ))}
                        </ul>
                    </div>

                ) :
                    (<>
                    </>)
            }
            {
                results.length !== 0 ? (
                    <h3 className="text-lg font-semibold mb-2">Results</h3>
                ) : (<></>)
            }
            <ul className="flex flex-col gap-2">
                {results.map((r, i) => (
                    <Bucketlistitem key={i} title={r} by={r} />
                ))}
            </ul>
        </div>
    );
}