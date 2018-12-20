const initState = {total: 0 ,pageNumber: 1};

export default (state = initState, action) => {
    switch (action.type) {
        case 'GET_TOTAL':
             state.total = action.total;
             console.log("gettotal"+ action.total);
             return state;
        default:
            return state;
    }
}
