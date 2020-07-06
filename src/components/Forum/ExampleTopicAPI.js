const posts = [{
    topic: "Secondary School",
    question: {
        id: 1,
        title: "How do you do well for “N” Levels?",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue lacus. Quam nulla porttitor massa id neque aliquam. Ultrices mi tempus imperdiet nulla malesuada. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Egestas sed sed risus pretium. Lorem dolor sed viverra ipsum. 

Gravida rutrum quisque non tellus. Rutrum tellus pellentesque eu tincidunt tortor. Sed blandit libero volutpat sed cras ornare. Et netus et malesuada fames ac. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Lacus sed viverra tellus in. Sollicitudin ac orci phasellus egestas. Purus in mollis nunc sed. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Interdum consectetur libero id faucibus nisl tincidunt eget        
`,
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
        },
        vote: "up"
    },
    answers: [{
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue lacus. Quam nulla porttitor massa id neque aliquam. Ultrices mi tempus imperdiet nulla malesuada. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Egestas sed sed risus pretium. Lorem dolor sed viverra ipsum. 

Gravida rutrum quisque non tellus. Rutrum tellus pellentesque eu tincidunt tortor. Sed blandit libero volutpat sed cras ornare. Et netus et malesuada fames ac. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Lacus sed viverra tellus in. Sollicitudin ac orci phasellus egestas. Purus in mollis nunc sed. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Interdum consectetur libero id faucibus nisl tincidunt eget`,
        time: "10 days",
        name: "Jenny Lin",
        acceptedAnswer: true,
        vote: 'up',
        stats: {
            votes: 10,
            views: 10
        },
        comments: [{
            comment: "but what if xyz happens?",
            votes: 9,
            vote: true,
            name: "Jann Liew"
        }, {
            comment: "then perhaps you can do Y",
            votes: 0,
            vote: false,
            name: "Jenny Lin"
        }]
    }, {
        answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue lacus. Quam nulla porttitor massa id neque aliquam. Ultrices mi tempus imperdiet nulla malesuada. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Egestas sed sed risus pretium. Lorem dolor sed viverra ipsum. 

Gravida rutrum quisque non tellus. Rutrum tellus pellentesque eu tincidunt tortor. Sed blandit libero volutpat sed cras ornare. Et netus et malesuada fames ac. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Lacus sed viverra tellus in. Sollicitudin ac orci phasellus egestas. Purus in mollis nunc sed. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Interdum consectetur libero id faucibus nisl tincidunt eget`,
        time: "9 days",
        name: "Win Leow",
        stats: {
            votes: -1,
            views: 1
        }
    }]
},
{
    topic: "Secondary School",
    question: {
        id: 2,
        title: "What are the study habits a visual learner can pick up to score better and enjoy studying?",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue lacus. Quam nulla porttitor massa id neque aliquam. Ultrices mi tempus imperdiet nulla malesuada. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Egestas sed sed risus pretium. Lorem dolor sed viverra ipsum. 

Gravida rutrum quisque non tellus. Rutrum tellus pellentesque eu tincidunt tortor. Sed blandit libero volutpat sed cras ornare. Et netus et malesuada fames ac. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Lacus sed viverra tellus in. Sollicitudin ac orci phasellus egestas. Purus in mollis nunc sed. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Interdum consectetur libero id faucibus nisl tincidunt eget        
`,
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
},
{
    topic: "Secondary School",
    question: {
        id: 3,
        title: "Confused by Graphing Techniques",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue lacus. Quam nulla porttitor massa id neque aliquam. Ultrices mi tempus imperdiet nulla malesuada. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Egestas sed sed risus pretium. Lorem dolor sed viverra ipsum. 

Gravida rutrum quisque non tellus. Rutrum tellus pellentesque eu tincidunt tortor. Sed blandit libero volutpat sed cras ornare. Et netus et malesuada fames ac. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Lacus sed viverra tellus in. Sollicitudin ac orci phasellus egestas. Purus in mollis nunc sed. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Interdum consectetur libero id faucibus nisl tincidunt eget        
`,
        time: "10 mins",
        name: "Jane Low",
        tags: [
            "sec 4 exp",
            "e.math",
            "graphs"
        ],
        subscribe: false,
        stats: {
            votes: 0,
            answers: 0,
            views: 10
        }
    }
},
{
    topic: "Secondary School",
    question: {
        id: 4,
        title: "What’s the trick to answering “Area Under Graph” questions?",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue lacus. Quam nulla porttitor massa id neque aliquam. Ultrices mi tempus imperdiet nulla malesuada. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Egestas sed sed risus pretium. Lorem dolor sed viverra ipsum. 

Gravida rutrum quisque non tellus. Rutrum tellus pellentesque eu tincidunt tortor. Sed blandit libero volutpat sed cras ornare. Et netus et malesuada fames ac. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Lacus sed viverra tellus in. Sollicitudin ac orci phasellus egestas. Purus in mollis nunc sed. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Interdum consectetur libero id faucibus nisl tincidunt eget        
`,
        time: "15 mins",
        name: "Ken Leow",
        tags: [
            "sec 4 exp",
            "a.math",
            "exams strategies"
        ],
        subscribe: false,
        stats: {
            votes: 3,
            answers: 1,
            views: 10
        }
    }
}]


export const searchPost = (topic, search = null, select = null) => {
    const a = posts.filter(post => post.topic === topic)
    return search ? a.filter(({ question: { title } }) => title.toLowerCase().includes(search)) : a
}

export const homeFeed = _ => posts.filter(({ question: { subscribe } }) => subscribe)
    .map(({ question, answers }) => answers ? { question, answer: answers[0] } : { question })

export const getPost = id => {
    let a = { ...posts.find(a => a.question.id === id) }
    a.question.views = a.question.stats.views
    a.question.votes = a.question.stats.votes
    if (a.answers) {
        a.answers = a.answers.map(answer => ({
            text: answer.answer,
            time: answer.time,
            name: answer.name,
            votes: answer.stats.votes,
            vote: answer.vote,
            acceptedAnswer: answer.acceptedAnswer,
            comments: answer.comments
        }))
        a.hasAcceptedAnswer = !!a.answers.find(({ acceptedAnswer }) => acceptedAnswer)
    }
    return a
}