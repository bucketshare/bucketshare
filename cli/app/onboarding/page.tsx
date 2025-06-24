"use client"
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Title from "../components/Title";
import { redirect } from "next/navigation";

export default function Onboarding() {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [isloading, setIsloading] = useState(false);

    const formatDate = (val: string) => {
        let digits = val.replace(/\D/g, "");

        digits = digits.slice(0, 8);

        if (digits.length >= 5) {
            return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
        } else if (digits.length >= 3) {
            return `${digits.slice(0, 2)}.${digits.slice(2)}`;
        } else {
            return digits;
        }
    };

    const isValidDate = (dateStr: string) => {
        const [dd, mm, yyyy] = dateStr.split(".");
        const day = parseInt(dd, 10);
        const month = parseInt(mm, 10) - 1;
        const year = parseInt(yyyy, 10);

        if (
            isNaN(day) || isNaN(month) || isNaN(year) ||
            dd.length !== 2 || mm.length !== 2 || yyyy.length !== 4
        ) {
            return false;
        }

        if (year < 1900 || year > new Date().getFullYear()) {
            return false;
        }


        const date = new Date(year, month, day);
        return (
            date.getFullYear() === year &&
            date.getMonth() === month &&
            date.getDate() === day
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatDate(e.target.value);
        setValue(formatted);

        // Validate only if full length is reached
        if (formatted.length === 10) {
            if (!isValidDate(formatted)) {
                setError("Please enter a valid date");
            } else {
                setError(""); // valid date
            }
        } else {
            setError(""); // Don't show error for partial input
        }
    };

    const handleContinue = () => {
        if (value.length < 10 || !isValidDate(value)) {
            setError("Please enter a valid date");
            return;
        }

        setIsloading(true);
        redirect("/home");
    };


    return (
        <div className="flex items-center justify-center flex-col h-dvh px-4 md:px-0">
            <div className="flex flex-col h-full justify-between max-w-xl w-full">
                <div className="flex flex-col justify-center">
                    <Title title="About you" />
                    <p className="text-gray-600 text-center text-sm mb-3 mt-5 px-2 md:px-0">
                        This information will help us personalize your experience.
                    </p>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="name"
                            className="mb-1 text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <div className="flex flex-row gap-2 flex-wrap" id="name">
                            <Input
                                placeholder="Firstname"
                                autoComplete="given-name"
                                className="flex-grow min-w-[120px]"
                            />
                            <Input
                                placeholder="Lastname"
                                autoComplete="family-name"
                                className="flex-grow min-w-[120px]"
                            />
                        </div>
                        <div className="space-y-4 mt-4">
                            <Input
                                placeholder="24.12.2000"
                                value={value}
                                onChange={handleChange}
                                maxLength={10}
                                label="Birthday"
                                autoComplete="bday"
                                inputMode="numeric"
                                error={error}
                            />
                        </div>
                    </div>
                </div>
                <Button label="continue" className="mb-4 mx" loading={isloading} onClick={handleContinue} />
            </div>
        </div>
    );
}
