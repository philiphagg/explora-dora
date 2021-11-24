function reducer(state =[], action){
    if(action.type === 'addPost'){
        return [
            ...state,
            {
                id: 21243,
                image: "https://www.visitstockholm.se/media/original_images/f2affbc704fd4836be9b07087a955248.jpg",
                likes: [1293, 1231, 2132, 2133, 12333, 5532, 23423],
                title: "Stockholm Stadshus",
                user: "Thoren Nillesson",
                caption: "Jättefint väder och roligt att de fanns fiskmåsar",
            }
        ];
    }
    else
        return state;
} export default reducer;
