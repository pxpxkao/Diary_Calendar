import {
    GET_DIARYS,
    ADD_DIARY,
    UPDATE_DIARY,
    DELETE_DIARY,
    DIARYS_LOADING,
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    ADD_IMAGE,
    UPDATE_IMAGE,
    DELETE_IMAGE
} from '../actions/types';

const initialState = {
    diarys: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DIARYS:
            return {
                ...state,
                diarys: action.payload,
                loading: false
            };
        case ADD_DIARY:
            return {
                ...state,
                diarys: [action.payload, ...state.diarys]
            };
        case UPDATE_DIARY:
                return {
                    ...state,
                    diarys: state.diarys.map(diary => {
                        if (diary._id === action.payload._id) {
                            return { ...diary, ...action.payload };
                        }
                        return diary;
                    })
                };
        case DELETE_DIARY:
            return {
                ...state,
                diarys: state.diarys.filter(diary => diary._id !== action.payload)
            };
        case DIARYS_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADD_COMMENT:
            return {
                ...state,
                diarys: state.diarys.map(diary => {
                    if (diary._id === action.payload.id) {
                        return { ...diary, comments: [...diary.comments, action.payload.comment] };
                    }
                    return diary;
                })
            };
        case UPDATE_COMMENT:
            return {
                ...state,
                diarys: state.diarys.map(diary => {
                    if (diary._id === action.payload._id) {
                        return { ...diary, ...action.payload }
                    }
                    return diary;
                })
            };
        case DELETE_COMMENT:
            return {
                ...state,
                diarys: state.diarys.map(diary => {
                    if (diary._id === action.payload.id) {
                        return { ...diary, comments: diary.comments.filter(comment => comment._id !== action.payload.com_id) };
                    }
                    return diary;
                })
            };
        case ADD_IMAGE:
            return {
                ...state,
                diarys: state.diarys.map(diary => {
                    if (diary._id === action.payload.id) {
                        return { ...diary, images: [...diary.images, action.payload.image] };
                    }
                    return diary;
                })
            };
        case UPDATE_IMAGE:
            return {
                ...state,
                diarys: state.diarys.map(diary => {
                    if (diary._id === action.payload._id) {
                        return { ...diary, ...action.payload }
                    }
                    return diary;
                })
            };
        case DELETE_IMAGE:
            return {
                ...state,
                diarys: state.diarys.map(diary => {
                    if (diary._id === action.payload.id) {
                        return { ...diary, images: diary.images.filter(image => image._id !== action.payload.img_id) };
                    }
                    return diary;
                })
            };
        default:
            return state;
    }
};