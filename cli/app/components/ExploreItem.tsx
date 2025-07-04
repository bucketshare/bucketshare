interface iAppProps {
    title: string;
    description: string;
    imageUrl: string;
    itemCount: number;
}

function ExploreItem({ title, description, imageUrl, itemCount }: iAppProps) {
    return (
        <div className="rounded-2xl overflow-hidden shadow bg-white w-full max-w-xl mb-6">
            <div className="h-40 w-full relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover rounded-t-2xl"
                />
            </div>
            <div className="p-4">
                <h2 className="text-md font-bold text-gray-900 mb-1">{title}</h2>
                <p className="text-sm text-gray-600 mb-2">{description}</p>
                <p className="text-sm text-gray-500">{itemCount} items</p>
            </div>
        </div>
    );
}

export default ExploreItem;
