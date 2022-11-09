import { ROOM_CHANGE, SET_HOME_ID, SET_USER_ID, SET_DATA_HOME } from '../Constants';

//
export const addFriend = id => (
    {
        type: ROOM_CHANGE,
        payload: id,
    }
);

// lưu id người dùng
export const setuser = id => (
    {
        type: SET_USER_ID,
        payload: id,
    }
);

// lưu data người dùng
export const setHomeId = id => (
    {
        type: SET_HOME_ID,
        payload: id,
    }
);

// lưu data smarthome
export const setDataHome = id => (
    {
        type: SET_DATA_HOME,
        payload: id,
    }
);