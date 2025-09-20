export const chapter4 = {
    id: "Chpt4",
    label: "CHAPTER 4",
    title: "Start Conversation",
    description: "Learn to ask questions in ASL",
    modulesCount: 3,
    modules: [
        {
            id: "4.1",
            label: "MODULE 1",
            title: "Practice a Dialogue - 1",
            type: "dialogue",
            steps: [
                {
                    id: "conversation1",
                    videos: [
                        {
                            type: "sender",
                            label: "Hello Welcome",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue1/hello-welcome.mp4"
                        },
                        {
                            type: "receiver",
                            label: "Hello How You ? ",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue1/hello-how-you.mp4"
                        }
                    ],
                    testing: {
                        type: "mcq",
                        title: "Select the correct option",
                        Question: "_____ How You ? ",
                        options: [{ id: "Hello", label: "Hello" }, { id: "Welcome", label: "Welcome" }, { id: "Deaf", label: "Deaf" }],
                        answer: "Hello",
                        explanation: "Correct answer is HELLO HOW YOU ?"
                    }

                },
                {
                    id: "conversation2",
                    videos: [
                        {
                            type: "sender",
                            label: "Fine You ? ",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue1/fine-you.mp4"
                        },
                        {
                            type: "receiver",
                            label: "Fine, You Deaf ? ",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue1/fine-you-deaf.mp4"
                        },
                        {
                            type: "sender",
                            label: "No Me Hearing, You Deaf ? ",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue1/no-me-hearing-you-deaf.mp4"
                        }
                    ],
                    testing: {
                        type: "mcq",
                        title: "Select the correct option and fill the gap",
                        Question: "No Me Hearing, You ____ ? ",
                        options: [{ id: "Deaf", label: "Deaf" }, { id: "Hearing", label: "Hearing" }, { id: "Fine", label: "Fine" }],
                        answer: "Deaf",
                        explanation: "Correct answer is NO ME HEARING, YOU DEAF ?"
                    }
                },
                {
                    id: "conversation3",
                    videos: [
                        {
                            type: "reciever",
                            label: "Yes Me Deaf",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue1/yes-me-deaf.mp4"
                        },
                        {
                            type: "sender",
                            label: "Ok. Bye",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue1/ok-bye.mp4"
                        },
                        {
                            type: "receiver",
                            label: "Bye",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue1/bye.mp4"
                        }
                    ],
                    testing: {
                        type: "mcq",
                        title: "Select the correct option",
                        Question: "What's the last sign ?  ",
                        options: [{ id: "Ok", label: "Ok" }, { id: "Bye", label: "Bye" }, { id: "Fine", label: "Fine" }, { id: "Welcome", label: "Welcome" }],
                        answer: "Bye",
                        explanation: "Correct answer is BYE"
                    }
                }
            ]
        },
        {
            id: "4.2",
            label: "MODULE 2",
            title: "Practice a Dialogue - 2",
            type: "dialogue",
            steps: [
                {
                    id: "conversation1",
                    videos: [
                        {
                            type: "sender",
                            label: "Hello",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue2/hello-hello.mp4"
                        },
                        {
                            type: "receiver",
                            label: "don't UNDERSTAND",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue2/hello-dont-understand.mp4"
                        }
                    ],
                    testing: {
                        type: "mcq",
                        title: "Select correct option",
                        Question: "Did she understood ? ",
                        options: [{ id: "Yes", label: "Yes" }, { id: "No", label: "No" }],
                        answer: "No",
                        explanation: "No , she didn't understand"
                    }
                },
                {
                    id: "conversation2",
                    videos: [
                        {
                            type: "sender",
                            label: "dont- Understand Hello",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue2/dont-understand-hello.mp4"
                        },
                    ],
                    testing: {
                        type: "mcq",
                        title: "Select the correct option",
                        Question: "Don't Understand _____ ?",
                        options: [{ id: "Hello", label: "Hello" }, { id: "Happy", label: "Happy" }, { id: "Please", label: "Please" }],
                        answer: "Hello",
                        explanation: "Correct answer is DON'T UNDERSTAND HELLO ?"
                    }
                },
                {
                    id: "conversation3",
                    videos: [
                        {
                            type: "reciever",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue2/no-understand.mp4"
                        },
                        {
                            type: "sender",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue2/slow-hello.mp4"
                        },
                        {
                            type: "receiver",
                            url: "https://tdelnfxrafeikhjqwnif.supabase.co/storage/v1/object/public/asl_videos/chpt4/dialogue2/yes-understood.mp4"
                        }
                    ],
                    suggestions: {
                        type: "suggestions",
                        messages: [
                            "Change your facial expression to switch from don't-understand to understand.",
                            "Practice the dialogue a few times to get comfortable with the signs and the flow of the conversation."
                        ]
                    }
                }
            ]
        },
        {
            id: "4.3",
            label: "MODULE 3",
            title: "Question Formation",
            type: "learning",
            description: "Learn how to form questions in ASL",
        }
    ]

}