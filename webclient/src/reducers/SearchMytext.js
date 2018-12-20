

export default (state = '', action) => {
    switch (action.type) {
        case 'SEARCH_MYTEXT':
            return state = action.mytext;
        default:
            return state;
    }
}
