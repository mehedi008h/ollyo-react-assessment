import React from "react";
import { Container } from ".";

const Gallery = () => {
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
                    <div className="w-full h-full border rounded-md row-span-2 col-span-2"></div>
                    <div className="w-full h-32 border rounded-md row-span-1 col-span-1"></div>
                    <div className="w-full h-32 border rounded-md row-span-1 col-span-1"></div>
                    <div className="w-full h-32 border rounded-md row-span-1 col-span-1"></div>
                    <div className="w-full h-32 border rounded-md row-span-1 col-span-1"></div>
                    <div className="w-full h-32 border rounded-md row-span-1 col-span-1"></div>
                    <div className="w-full h-32 border rounded-md row-span-1 col-span-1"></div>
                    <div className="w-full h-32 border rounded-md row-span-1 col-span-1"></div>
                    <div className="w-full h-32 border rounded-md row-span-1 col-span-1"></div>
                    <div className="w-full h-32 border rounded-md row-span-1 col-span-1"></div>
                    <div className="w-full h-32 border rounded-md row-span-1 col-span-1"></div>
                    <div className="w-full h-32 border rounded-md row-span-1 col-span-1"></div>
                </div>
            </div>
        </Container>
    );
};

export default Gallery;
