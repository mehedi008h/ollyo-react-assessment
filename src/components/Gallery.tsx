import { useState, useEffect, useCallback } from "react";
import { Container, Image, UploadImage } from ".";
import { IImage, images } from "../constants/image";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Gallery = () => {
    // states
    const [gallery, setGallery] = useState<IImage[]>([]);
    const [selectedImages, setSelectedImages] = useState<number[]>([]);

    // handle move images
    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setGallery((prevCards: IImage[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as IImage],
                ],
            })
        );
    }, []);

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
    };

    // handle upload photo
    const handleUploadImage = (e: any) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                gallery &&
                    setGallery([
                        ...gallery,
                        {
                            id: gallery.length + 1,
                            link: reader.result as string,
                        },
                    ]);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    // render images
    const renderCard = useCallback(
        (image: { id: number; link: string }, index: number) => {
            return (
                <Image
                    key={image.id}
                    image={image}
                    handleSelectedImage={handleSelectedImage}
                    selectedImages={selectedImages}
                    moveCard={moveCard}
                    index={index}
                />
            );
        },
        [handleSelectedImage, selectedImages, moveCard]
    );

    // set gallery images
    useEffect(() => {
        setGallery(images);
    }, []);
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
                                defaultChecked={true}
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
                {/* dragable area  */}
                <DndProvider backend={HTML5Backend}>
                    {/* gallery images  */}
                    <div className="py-4 xl:px-8 lg:px-8 md:px-8 px-4 grid grid-rows-3 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5 grid-cols-2  gap-4">
                        {gallery &&
                            gallery.map((image, index) =>
                                renderCard(image, index)
                            )}
                        {/* upload image */}
                        <UploadImage handleUploadImage={handleUploadImage} />
                    </div>
                </DndProvider>
            </div>
        </Container>
    );
};

export default Gallery;
