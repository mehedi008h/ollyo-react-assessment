import { ChangeEventHandler } from "react";
import { BiImage } from "react-icons/bi";

interface Props {
    handleUploadImage: ChangeEventHandler<HTMLInputElement>;
}

const UploadImage = ({ handleUploadImage }: Props) => {
    return (
        <div className="w-full h-full rounded-lg row-span-1 col-span-1">
            <label htmlFor="avatar">
                <div className="h-full rounded-lg relative cursor-pointer border-dashed border-2 p-5 flex flex-col justify-center items-center gap-5">
                    <input
                        type="file"
                        id="avatar"
                        accept="iamges/*"
                        className="hidden"
                        onChange={handleUploadImage}
                    />
                    <BiImage size={25} />
                    <p className="font-medium">Add Images</p>
                </div>
            </label>
        </div>
    );
};

export default UploadImage;
