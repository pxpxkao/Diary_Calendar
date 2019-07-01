import axios from 'axios';
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
    DELETE_IMAGE } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getDiarys = userID => (dispatch, getState) => {
    dispatch(setDiarysLoading());
    axios
        .get(`/api/diarys/${userID}`, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: GET_DIARYS,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addDiary = diary => dispatch => {
    axios
        .post('/api/diarys', diary)
        .then(res => 
            dispatch({
                type: ADD_DIARY,
                payload: res.data
            })
        );
};

export const updateDiary = diary => dispatch => {
    axios
        .post(`/api/diarys/${diary._id}`, diary)
        .then(res => 
            dispatch({
                type: UPDATE_DIARY,
                payload: res.data
            }));
}

export const deleteDiary = id => dispatch => {
    axios.delete(`/api/diarys/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_DIARY,
                payload: id
            })
        );
};

export const setDiarysLoading = () => {
    return {
        type: DIARYS_LOADING
    };
};

export const addComment = (id, comment) => dispatch => {
    axios.post(`/api/diarys/${id}/comments`, comment)
        .then(res => {
            dispatch({
                type: ADD_COMMENT,
                payload: {id, comment: res.data}
            })
        });
}

export const updateComment = (id, comment) => dispatch =>  {
    axios
        .post(`/api/diarys/${id}/comments/${comment._id}`, comment)
        .then(res => {
            dispatch({
                type: UPDATE_COMMENT,
                payload: res.data
            })
        });
}

export const deleteComment = (id, com_id) => dispatch => {
    axios.delete(`/api/diarys/${id}/comments/${com_id}`)
        .then(res => 
            dispatch({
                type: DELETE_COMMENT,
                payload: {id, com_id}
            })
        );
};

export const addImage = (id, image) => dispatch => {
    axios.post(`/api/diarys/${id}/images`, image)
        .then(res => {
            dispatch({
                type: ADD_IMAGE,
                payload: {id, image: res.data}
            })
        });
}

export const updateImage = (id, image) => dispatch =>  {
    axios
        .post(`/api/diarys/${id}/images/${image._id}`, image)
        .then(res => {
            dispatch({
                type: UPDATE_IMAGE,
                payload: res.data
            })
        });
}

export const deleteImage = (id, img_id) => dispatch => {
    axios.delete(`/api/diarys/${id}/images/${img_id}`)
        .then(res => 
            dispatch({
                type: DELETE_IMAGE,
                payload: {id, img_id}
            })
        );
};