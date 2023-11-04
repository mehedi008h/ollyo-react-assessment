import React from "react";

interface Props {
    children: React.ReactNode;
}

const Container = ({ children }: Props) => {
    return (
        <div className="w-full min-h-screen py-4 px-12 bg-sky-50">
            {children}
        </div>
    );
};

export default Container;
