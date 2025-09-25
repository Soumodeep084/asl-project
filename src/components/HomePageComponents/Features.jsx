const Features = () => {
    return (
        <section id="features" className="flex flex-col w-full bg-background py-12 sm:py-16">
            {/* Section Title */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-accent1">Our Features</h2>
            </div>

            {/* First Feature Row */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse xl:flex-row items-center justify-between gap-6 sm:gap-10 mb-12 sm:mb-16">
                {/* Text Overlay on Book Image */}
                <div className="w-full xl:max-w-[750px] relative min-h-[360px] sm:min-h-[420px] md:min-h-[500px] xl:min-h-[620px] flex flex-col justify-center bg-no-repeat bg-contain bg-center"
                    style={{ backgroundImage: "url('/asset/book1a.png')" }}>
                    <div className="px-6 sm:px-8 xl:pl-16">
                        <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-primary mb-3 sm:mb-4">Interactive Lessons</h3>
                        <p className="text-base sm:text-lg xl:text-xl text-gray-800 leading-relaxed max-w-prose">
                            Learn ASL step by step with fun exercises that feel like a game.
                        </p>
                        <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-primary mt-6 sm:mt-8">Progress Tracking</h3>
                        <p className="text-base sm:text-lg xl:text-xl text-gray-800 leading-relaxed max-w-prose">
                            Watch your growth like turning pages in a diary — every day adds a new achievement.
                        </p>
                    </div>
                </div>

                {/* Feature Image */}
                <div className="w-full xl:w-[600px] min-h-[300px] sm:min-h-[420px] md:min-h-[500px] xl:h-[600px] bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: "url('/asset/featurephoto1.png')" }} />
            </div>

            {/* Second Feature Row */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row items-center justify-between gap-6 sm:gap-10">
                {/* Feature Image */}
                <div className="w-full xl:w-[600px] min-h-[300px] sm:min-h-[420px] md:min-h-[500px] xl:h-[600px] bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: "url('/asset/feature-photo2.png')" }} />

                {/* Text Overlay on Book Image */}
                <div className="w-full xl:max-w-[750px] relative min-h-[360px] sm:min-h-[420px] md:min-h-[500px] xl:min-h-[620px] flex flex-col justify-center bg-no-repeat bg-contain bg-center"
                    style={{ backgroundImage: "url('/asset/book1b.png')" }}>
                    <div className="px-6 sm:px-8 xl:pl-16">
                        <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-primary mb-3 sm:mb-4">Rewards & Motivation</h3>
                        <p className="text-base sm:text-lg xl:text-xl text-gray-800 leading-relaxed max-w-prose">
                            Practice signs you can actually use in daily conversations.
                        </p>
                        <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-primary mt-6 sm:mt-8">Real-Life Practice</h3>
                        <p className="text-base sm:text-lg xl:text-xl text-gray-800 leading-relaxed max-w-prose">
                            Stay excited with points, streaks, and badges as you learn more.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
