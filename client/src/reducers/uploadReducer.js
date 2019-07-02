import {
    UPLOAD_IMAGE,
    CLEAR_UPLOAD,
} from '../actions/types';

const initialState = {
    upload: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPLOAD_IMAGE:
            return {
                ...state,
                upload: action.payload
            };
        case CLEAR_UPLOAD:
            return {
                upload: null
            }
        default:
            return state;
    }
}