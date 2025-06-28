import React, { useEffect, useState } from "react";
import { NameToPicture } from "../helpers/NameToPicture";

type Props = {
    firstname: string;
    lastname: string;
    className?: string;
};

export function Avatar({ firstname, lastname, className }: Props) {
    const [img, setImg] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        const loadImage = async () => {
            const image = await NameToPicture(firstname + lastname);
            setImg(image);
        };
        loadImage();
    }, [firstname, lastname]);

    return (
        <div>
            {img ? <img src={img.src} alt="User Avatar" className={className} /> : <p>Loading avatar...</p>}
        </div>
    );
}
