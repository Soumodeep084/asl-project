import React from "react";
import Image from "next/image";

const Photo = () => {
    return (
        <div className="relative w-full flex justify-center items-center px-4 sm:px-0">
            {/* Use aspect ratio to avoid layout shift and keep image responsive */}
            <div className="relative w-full max-w-[560px] md:max-w-[640px] xl:max-w-[720px] aspect-square">
                <Image
                    src="/asset/HeroPage.png"
                    alt="ASL Learning Illustration"
                    fill
                    priority
                    quality={100}
                    className="object-contain"
                    sizes="(max-width: 640px) 90vw, (max-width: 1280px) 40vw, 560px"
                />
            </div>
        </div>
    );
};

export default Photo;
