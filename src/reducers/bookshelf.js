export const books = (initial = [], action) => {
    switch (action.type) {
        case 'GET_BOOKS':
            return action.payload;
        default:
            return initial;
    }
}

export const comments = (initial = [], action) => {
    switch (action.type) {
        case 'GET_COMMENTS':
            return action.payload;
        default:
            return initial;
    }
}