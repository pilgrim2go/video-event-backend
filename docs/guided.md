mutation {
    createEvent(input:{name:"Interview Event"}) {
        id
        name
    }
}

mutation {
    createEvent(input:{name:"Meeting Event"}) {
        id
        name
    }
}



query {
    listEvents {
        items {
            id
            name
        }
    }
}
