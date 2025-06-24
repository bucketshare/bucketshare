import { ArrowLeft } from "lucide-react";

interface iAppProps {
    title: string;
    back?: boolean;
    rightIcon?: React.ReactNode;
}

function Title({ title, back, rightIcon }: iAppProps) {
    return (
        <div className="flex items-center justify-center mt-1 relative select-none">
            {back && (
                <ArrowLeft className="w-4 h-4 absolute left-0 ml-4 cursor-pointer" />
            )}
            <h1 className="text-xl font-bold text-center">{title}</h1>
            {rightIcon && (
                <div className="absolute right-0 mr-4 cursor-pointer">
                    {rightIcon}
                </div>
            )}
        </div>
    );
}

export default Title;
