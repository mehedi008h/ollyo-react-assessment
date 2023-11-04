import React from "react";

interface Props {
    children: React.ReactNode;
}

const Container = ({ children }: Props) => {
    return (
        <div className="w-full min-h-screen py-4 xl:px-12 lg:px-12 md:px-12 px-4 bg-sky-50">
            {children}
        </div>
    );
};

export default Container;
