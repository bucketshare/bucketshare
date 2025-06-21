function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

const options = {
    topType: ["NoHair", "ShortHairShortFlat", "LongHairStraight", "Hat", "Hijab"],
    accessoriesType: ["Blank", "Prescription01", "Sunglasses", "Kurt"],
    hairColor: ["Black", "Brown", "Blonde", "Red", "Gray"],
    facialHairType: ["Blank", "BeardMedium", "MoustacheFancy"],
    clotheType: ["BlazerShirt", "Hoodie", "ShirtCrewNeck", "GraphicShirt"],
    eyeType: ["Default", "Happy", "Squint", "Surprised"],
    eyebrowType: ["Default", "RaisedExcited", "Angry"],
    mouthType: ["Smile", "Default", "Serious", "Disbelief"],
    skinColor: ["Light", "Brown", "DarkBrown"],
};

export async function NameToPicture(name: string): Promise<HTMLImageElement> {
    const hash = hashString(name);
    const keys = Object.keys(options) as (keyof typeof options)[];

    let index = hash;
    const config: string[] = [];

    for (const key of keys) {
        const values = options[key];
        const value = values[index % values.length];
        config.push(`${key}=${value}`);
        index = Math.floor(index / values.length);
    }

    const url = `https://avataaars.io/?avatarStyle=Circle&${config.join("&")}`;

    const img = new Image();
    img.src = url;

    return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}
