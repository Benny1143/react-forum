const topicList = [{
    name: 'Physics',
    icon: 'apple-alt'
}, {
    name: 'Chemistry',
    icon: 'flask'
}, {
    name: 'Biology',
    icon: 'biohazard'
}, {
    name: 'Learning Styles',
    icon: 'graduation-cap'
}, {
    name: 'Writing Tips',
    icon: 'pencil-alt'
}, {
    name: 'CCA',
    icon: 'swimmer'
}, {
    name: 'History',
    icon: 'history'
}, {
    name: 'Englist Literature',
    icon: 'book'
}, {
    name: 'Secondary School',
    icon: 'graduation-cap'
}]

export const icon = name => topicList.find(e => e.name === name).icon;
export const path = name => `/forum/${name.toLowerCase().replace(" ", "-")}`
export const topicToObject = arr => arr.map(name => ({ name, path: `/forum/${name.toLowerCase().replace(" ", "-")}`, icon: icon(name) }))
export const topics = topicList.map(e => ({ ...e, path: path(e.name) }))