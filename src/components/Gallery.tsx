import { useState, useEffect } from "react";
import { Container, FeatureImage, Image } from ".";
import { IImage, images } from "../constants/image";

const Gallery = () => {
    // states
    const [featureImage, setFeatureImage] = useState<IImage>();

    // set feature image
    useEffect(() => {
        setFeatureImage(images[0]);
    }, []);
    return (
        <Container>
            <div className="bg-white rounded-md">
                <div className="py-4 px-8 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <input type="checkbox" className="h-5 w-5" />
                        <h3 className="text-black font-semibold text-xl">
                            3 File Selected
                        </h3>
                    </div>
                    <button className="text-red-600 font-semibold text-lg">
                        Delete files
                    </button>
                </div>
                <hr />
                <div className="py-4 px-8 grid grid-rows-2 grid-cols-5 gap-4">
                    <FeatureImage image={featureImage} />
                    {images
                        .filter((image) => image.id !== featureImage?.id)
                        .map((image) => (
                            <Image key={image.id} image={image} />
                        ))}
                </div>
            </div>
        </Container>
    );
};

export default Gallery;