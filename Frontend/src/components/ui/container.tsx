import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
}

export default function Container({
    children,
}: ContainerProps) {
    return (
        // Ganti max-w-7xl (1280px) menjadi max-w-[1440px] atau max-w-[1600px]
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
            {children}
        </div>
    );
}