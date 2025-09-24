import React from "react";
import Image from "next/image";

const Photo = () => {
    return (
        <div className="relative w-full flex justify-center items-center">
            <div className="xl:w-[598px] xl:h-[598px] w-[398px] h-[298px] relative">
                <Image
                    src="/asset/HeroPage.png"
                    alt="ASL Learning Illustration"
                    fill
                    priority
                    quality={100}
                    className="object-contain"
                />
            </div>
        </div>
    );
};

export default Photo;
