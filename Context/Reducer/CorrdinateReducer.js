const initialState = {
    source: {
        latitude: 0,
        longitude: 0,
        PlaceName: '',
        state: '',
    },
    destination: {
        latitude: 0,
        longitude: 0,
        PlaceName: '',
        state:''
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "source":
            return {
                ...state,
                source: action.payload
            }
        case "destination":
            return {
                ...state,
                destination: action.payload
            }
        default:
            return state
    }
}