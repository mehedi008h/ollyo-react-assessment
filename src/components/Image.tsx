import { IImage } from "../constants/image";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

// image props
interface Props {
    image: IImage;
    handleSelectedImage: (id: number) => void;
    selectedImages: number[];
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

// drag items
interface DragItem {
    index: number;
    id: number;
    type: string;
}

const Image = ({
    image,
    handleSelectedImage,
    selectedImages,
    index,
    moveCard,
}: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: "card",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "card",
        item: () => {
            return { index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // change image opacity when dragging image
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{ opacity }}
            data-handler-id={handlerId}
            className={`w-full h-full border rounded-lg first:row-span-2 first:col-span-2 row-span-1 col-span-1 relative group transition-all delay-75 hover:bg-black ${
                selectedImages.includes(image.id) && "bg-black"
            }`}
        >
            <input
                className={`h-5 w-5 absolute top-4 left-4 ${
                    selectedImages.includes(image.id) ? "block" : "hidden"
                } group-hover:block z-20 transition-all delay-75`}
                type="checkbox"
                name=""
                id={`${image.id}`}
                onClick={() => handleSelectedImage(image.id)}
            />
            <img
                className={`w-full h-full rounded-lg group-hover:opacity-40 ${
                    selectedImages.includes(image.id) && "opacity-60"
                }`}
                src={image.link}
                alt=""
            />
        </div>
    );
};

export default Image;
