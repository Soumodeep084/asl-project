const Features = () => {
    return (
        <section id="features" className="flex flex-col w-full bg-background py-16">
            {/* Section Title */}
            <div className="container mx-auto text-center mb-12">
                <h2 className="text-4xl xl:text-5xl font-bold text-accent1">Our Features</h2>
            </div>

            {/* First Feature Row */}
            <div className="container mx-auto flex flex-col-reverse xl:flex-row items-center justify-between gap-10 mb-16">
                {/* Text Overlay on Book Image */}
                <div className="xl:w-[750px] w-full relative h-[500px] xl:h-[700px] flex flex-col justify-center bg-no-repeat bg-contain bg-center"
                    style={{ backgroundImage: "url('/asset/book1a.png')" }}>
                    <div className="pl-8 xl:pl-16">
                        <h3 className="text-3xl xl:text-4xl font-bold text-primary mb-4">Interactive Lessons</h3>
                        <p className="text-lg xl:text-xl text-gray-800 leading-relaxed">
                            Learn ASL step by step with fun exercises that feel like a game.
                        </p>
                        <h3 className="text-3xl xl:text-4xl font-bold text-primary mt-8">Progress Tracking</h3>
                        <p className="text-lg xl:text-xl text-gray-800 leading-relaxed">
                            Watch your growth like turning pages in a diary — every day adds a new achievement.
                        </p>
                    </div>
                </div>

                {/* Feature Image */}
                <div className="w-full xl:w-[600px] h-[500px] xl:h-[600px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/asset/featurephoto1.png')" }} />
            </div>

            {/* Second Feature Row */}
            <div className="container mx-auto flex flex-col xl:flex-row items-center justify-between gap-10">
                {/* Feature Image */}
                <div className="w-full xl:w-[600px] h-[500px] xl:h-[600px] bg-cover bg-center"
                    style={{ backgroundImage: "url('/asset/feature-photo2.png')" }} />

                {/* Text Overlay on Book Image */}
                <div className="xl:w-[750px] w-full relative h-[500px] xl:h-[700px] flex flex-col justify-center bg-no-repeat bg-contain bg-center"
                    style={{ backgroundImage: "url('/asset/book1b.png')" }}>
                    <div className="pl-8 xl:pl-16">
                        <h3 className="text-3xl xl:text-4xl font-bold text-primary mb-4">Rewards & Motivation</h3>
                        <p className="text-lg xl:text-xl text-gray-800 leading-relaxed">
                            Practice signs you can actually use in daily conversations.
                        </p>
                        <h3 className="text-3xl xl:text-4xl font-bold text-primary mt-8">Real-Life Practice</h3>
                        <p className="text-lg xl:text-xl text-gray-800 leading-relaxed">
                            Stay excited with points, streaks, and badges as you learn more.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
