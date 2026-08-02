import { ReactNode } from "react";

interface ButtonProps {

    children: ReactNode;

    onClick?: () => void;

}

export default function Button({

    children,

    onClick,

}: ButtonProps) {

    return (

        <button

            onClick={onClick}

            className="
            rounded-2xl
            bg-gradient-to-r
            from-[#0F4C81]
            to-[#38BDF8]
            px-8
            py-4
            font-semibold
            text-white
            shadow-lg
            transition
            duration-300
            hover:-translate-y-1
            hover:scale-105
            "

        >

            {children}

        </button>

    );

}