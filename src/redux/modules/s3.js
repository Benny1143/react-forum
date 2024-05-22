const PUT_OBJECT_URL_LOAD_REQUEST = 'osedu/s3/PUT_OBJECT_URL_LOAD_REQUEST';
const PUT_OBJECT_URL_LOAD_SUCCESS = 'osedu/s3/PUT_OBJECT_URL_LOAD_SUCCESS';
const PUT_OBJECT_URL_LOAD_FAIL = 'osedu/s3/PUT_OBJECT_URL_LOAD_FAIL';

const initialState = {
  // loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // case CONFIG_LOAD:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case CONFIG_LOAD_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     data: action.result && action.result.data
    //   };
    // case CONFIG_LOAD_FAIL:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: false,
    //     error: action.error
    //   };
    default:
      return state;
  }
}

// export function isLoaded(globalState) {
//   return globalState.s3 && globalState.s3.loaded;
// }

export function loadPutObjectUrl(data) {
  return {
    types: [
      PUT_OBJECT_URL_LOAD_REQUEST,
      PUT_OBJECT_URL_LOAD_SUCCESS,
      PUT_OBJECT_URL_LOAD_FAIL,
    ],
    promise: client =>
      client.post('/s3/putObjectUrl', {
        data,
      }),
  };
}

export function putObject(signedUrl, fileType, data) {
  return {
    types: [
      PUT_OBJECT_URL_LOAD_REQUEST,
      PUT_OBJECT_URL_LOAD_SUCCESS,
      PUT_OBJECT_URL_LOAD_FAIL,
    ],
    promise: client =>
      client.put(signedUrl, {
        headers: {
          'Content-Type': fileType,
        },
        data,
      }),
  };
}

/**
 * Upload to S3 using signed request URL
 * @param  {String} signedUrl AWS S3 signed request URL
 * @param  {Mixed}  data      Data to be uploaded (file/blob)
 * @return {Promise}          [description]
 */
export function uploadFile(file) {
  let url;
  return dispatch => {
    return dispatch(loadPutObjectUrl({ fileType: file.type }))
      .then(result => {
        url = result.url;
        return dispatch(putObject(result.signedUrl, file.type, file));
      })
      .then(() => url)
      .catch(() => {
        const error = { message: 'Failed to upload file' };
        throw error;
      });
  };
}
