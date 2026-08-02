import { ReactNode } from "react";

interface CardProps {

    children: ReactNode;

}

export default function Card({

    children,

}: CardProps) {

    return (

        <div

            className="
            rounded-3xl
            bg-white
            p-6
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-2xl
            "

        >

            {children}

        </div>

    );

}