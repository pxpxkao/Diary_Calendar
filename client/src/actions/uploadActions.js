import axios from 'axios';
import { UPLOAD_IMAGE, CLEAR_UPLOAD } from './types';
import { returnErrors } from './errorActions';

// UPLOAD IMAGE
export const uploadImage = file => dispatch => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios
        .post('/api/upload', file, config)
        .then(res => 
            dispatch({
                type: UPLOAD_IMAGE,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// CLEAR UPLOAD
export const clearUpload = () => {
    return {
        type: CLEAR_UPLOAD
    };
};