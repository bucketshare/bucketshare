"use client";
import React from 'react';

interface GroupListProps {
    groups: string[];
    selected: string | null;
    onSelect: (group: string | null) => void;
}

const GroupList = ({ groups, selected, onSelect }: GroupListProps) => {
    const handleSelect = (group: string) => {
        onSelect(selected === group ? null : group);
    };

    return (
        <div
            className="flex overflow-x-auto gap-2 py-2 px-1 no-scrollbar select-none"
            style={{ WebkitOverflowScrolling: 'touch' }}
        >
            {groups.map((e, i) => (
                <div
                    key={i}
                    onClick={() => handleSelect(e)}
                    className={`
                        flex-shrink-0 px-4 py-2 rounded-3xl cursor-pointer transition-colors
                        ${selected === e
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-300'}
                    `}
                >
                    {e}
                </div>
            ))}
        </div>
    );
};

export default GroupList;
