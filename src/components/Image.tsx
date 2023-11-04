import { IImage } from "../constants/image";

interface Props {
    image: IImage;
}

const Image = ({ image }: Props) => {
    return (
        <div className="w-full h-full border rounded-lg row-span-1 col-span-1 relative group transition-all delay-75  hover:bg-black">
            <input
                className="h-5 w-5 absolute top-4 left-4 hidden group-hover:block z-20 transition-all delay-75"
                type="checkbox"
                name=""
                id=""
            />
            <img
                className="w-full h-full rounded-lg group-hover:opacity-40"
                src={image.link}
                alt=""
            />
        </div>
    );
};

export default Image;
