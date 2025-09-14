// data.js

export const chapters = [
  {
    id: "Chpt1",
    title: "Introduction to ASL",
    modules: [
      {
        id: "1.1",
        title: "Basic Greetings",
        steps: [
          { id: "1.1.1", title: "Hello", videoUrl: "/videos/HELLO.mp4" },
          { id: "1.1.2", title: "Welcome", videoUrl: "/videos/Welcome.mp4" },
          { id: "1.1.3", title: "Hello Welcome , Come On Sign", videoUrl: "/videos/Hello Welcome. Come-On Sign.mp4" }
        ]
      },
      {
        id: "1.2",
        title: "Daily Phrases",
        steps: [
          { id: "1.2.1", title: "How are you?", videoUrl: "https://.../how-are-you.mp4" }
        ]
      }
    ]
  },
  {
    id: "Chpt2",
    title: "Numbers & Counting",
    modules: [
      {
        id: "2.1",
        title: "Numbers 1-10",
        steps: [
          { id: "2.1.1", title: "Numbers 1-5", videoUrl: "https://.../numbers-1-5.mp4" },
          { id: "2.1.2", title: "Numbers 6-10", videoUrl: "https://.../numbers-6-10.mp4" }
        ]
      }
    ]
  }
]
