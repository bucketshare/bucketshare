import React from "react";

interface BucketlistitemProps {
    title: string;
    by: string;
    onClick?: () => void;
}

export default function Bucketlistitem({ title, by, onClick }: BucketlistitemProps) {
    return (
        <li
            onClick={onClick}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition cursor-pointer"
        >
            <div className="flex flex-col">
                <span className="text-base font-semibold text-gray-800">{title}</span>
                <span className="text-sm text-gray-500">by {by}</span>
            </div>
            <div className="text-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </li>
    );
}
