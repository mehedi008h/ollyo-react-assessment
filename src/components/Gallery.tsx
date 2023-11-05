import { useState, useEffect } from "react";
import { Container, FeatureImage, Image } from ".";
import { IImage, images } from "../constants/image";

const Gallery = () => {
    // states
    const [gallery, setGallery] = useState<IImage[]>();
    const [featureImage, setFeatureImage] = useState<IImage>();
    const [selectedImages, setSelectedImages] = useState<number[]>([]);

    // handle selected images
    const handleSelectedImage = (id: number) => {
        // if image already selected then remove it from the list
        if (selectedImages.includes(id)) {
            setSelectedImages([...selectedImages.filter((img) => img !== id)]);
        } // else add it to the list
        else {
            setSelectedImages([...selectedImages, id]);
        }
    };

    // handle delete selected images
    const handleDeleteSelectedImages = () => {
        gallery &&
            setGallery([
                ...gallery.filter((img) => !selectedImages.includes(img.id)),
            ]);

        // after deleting selected images remove all selected images
        setSelectedImages([]);
        // set new features images from gallery very first image
        setFeatureImage(gallery && gallery[0]);
    };

    // set feature image
    useEffect(() => {
        setGallery(images);
    }, []);

    // set feature image
    useEffect(() => {
        setFeatureImage(gallery && gallery[0]);
    }, [gallery]);
    return (
        <Container>
            <div className="bg-white rounded-md">
                {/* gallery header  */}
                <div className="py-4 xl:px-8 lg:px-8 md:px-8 px-4 flex justify-between items-center">
                    {selectedImages.length > 0 ? (
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                className="h-5 w-5"
                                checked={true}
                            />
                            <h3 className="text-black font-semibold text-xl">
                                {selectedImages?.length} File Selected
                            </h3>
                        </div>
                    ) : (
                        <h3 className="text-black font-semibold text-xl">
                            Gallery
                        </h3>
                    )}

                    {selectedImages.length > 0 && (
                        <button
                            onClick={handleDeleteSelectedImages}
                            className="text-red-600 font-medium text-lg"
                        >
                            Delete files
                        </button>
                    )}
                </div>
                <hr />
                {/* gallery images  */}
                <div className="py-4 xl:px-8 lg:px-8 md:px-8 px-4 grid grid-rows-3 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5 grid-cols-2  gap-4">
                    <FeatureImage
                        image={featureImage}
                        handleSelectedImage={handleSelectedImage}
                        selectedImages={selectedImages}
                    />
                    {gallery &&
                        gallery
                            .filter((image) => image.id !== featureImage?.id)
                            .map((image) => (
                                <Image
                                    key={image.id}
                                    image={image}
                                    handleSelectedImage={handleSelectedImage}
                                    selectedImages={selectedImages}
                                />
                            ))}
                </div>
            </div>
        </Container>
    );
};

export default Gallery;
