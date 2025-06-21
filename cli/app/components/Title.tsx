import { ArrowLeft } from "lucide-react";

interface iAppProps {
    title: string;
    back?: boolean;
}

function Title({ title, back }: iAppProps) {
    return (
        <div className="flex items-center justify-center mt-1 relative">
            {back && (
                <ArrowLeft className="w-4 h-4 absolute left-0 ml-4" />
            )}
            <h1 className="text-xl font-bold text-center">{title}</h1>
        </div>
    );
}


export default Title;