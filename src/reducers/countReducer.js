import { ROOM_CHANGE, SET_HOME_ID, SET_USER_ID, SET_DATA_HOME } from '../Constants';
const initialState = {
    roomActive: 1,
    userId: '',
    homeId: '',
    dataHome: {}
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ROOM_CHANGE:
            return {
                ...state,
                roomActive: action.payload
            };
        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload
            };
        case SET_HOME_ID:
            return {
                ...state,
                homeId: action.payload
            };
        case SET_DATA_HOME:
            return {
                ...state,
                dataHome: action.payload
            }
        default:
            return state;
    }
}
export default reducer;