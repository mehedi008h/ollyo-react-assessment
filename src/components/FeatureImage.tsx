import { IImage } from "../constants/image";

interface Props {
    image?: IImage;
    handleSelectedImage: (id: number) => void;
    selectedImages: number[];
}
const FeatureImage = ({
    image,
    handleSelectedImage,
    selectedImages,
}: Props) => {
    return (
        <div
            className={`w-full h-full border rounded-lg row-span-2 col-span-2 relative group transition-all delay-75 hover:bg-black ${
                image && selectedImages.includes(image.id) && "bg-black"
            }`}
        >
            {image && (
                <>
                    <input
                        className={`h-5 w-5 absolute top-4 left-4 ${
                            selectedImages.includes(image?.id)
                                ? "block"
                                : "hidden"
                        } group-hover:block z-20 transition-all delay-75`}
                        type="checkbox"
                        name=""
                        id={`${image?.id}`}
                        onClick={() => handleSelectedImage(image.id)}
                    />
                    <img
                        className={`w-full h-full rounded-lg group-hover:opacity-40 ${
                            selectedImages.includes(image.id) && "opacity-60"
                        }`}
                        src={image.link}
                        alt=""
                    />
                </>
            )}
        </div>
    );
};

export default FeatureImage;
