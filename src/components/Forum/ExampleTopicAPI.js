const posts = [{
    topic: "Secondary School",
    question: {
        title: "How do you do well for “N” Levels?",
        time: "10 days",
        name: "Shen Loke",
        tags: [
            "sec 4 na",
            "exam strategies",
            "sec 4 na"
        ],
        subscribe: true,
        stats: {
            votes: 30,
            answers: 20,
            views: 400
        }
    }
},
{
    topic: "Secondary School",
    question: {
        title: "What are the study habits a visual learner can pick up to score better and enjoy studying?",
        time: "10 days",
        name: "Shen Loke",
        tags: [
            "sec 4 na",
            "exam strategies",
            "sec 4 na"
        ],
        subscribe: true,
        stats: {
            votes: 30,
            answers: 20,
            views: 400
        }
    },
    answers: [{
        answer: "For an all-rounded strategy I'll be discussing: \n  1. How to make the most out of class \n  2. How to take notes effectively (visually!) \n  3. Something \n  4. Something More",
        time: "10 mins",
        name: "Benny Goh",
        tags: ["learning styles"],
        stats: {
            votes: 1,
            views: 10
        }
    }]
}]


export const searchPost = (topic, search = null, select = null) => {
    return []
}

export const homeFeed = _ => posts.filter(({ question: { subscribe } }) => subscribe)
    .map(({ question, answers }) => answers ? { question, answer: answers[0] } : { question })
