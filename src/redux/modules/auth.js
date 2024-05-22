import Cookies from 'universal-cookie';
import { schemas } from 'redux/middleware/clientMiddleware';

const cookies = new Cookies();

const LOAD_REQUEST = 'osedu/auth/LOAD_REQUEST';
const LOAD_SUCCESS = 'osedu/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'osedu/auth/LOAD_FAIL';
const SIGNUP_REQUEST = 'osedu/auth/SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'osedu/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'osedu/auth/SIGNUP_FAIL';
const LOGIN_REQUEST = 'osedu/auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'osedu/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'osedu/auth/LOGIN_FAIL';
const VALIDATE_REQUEST = 'osedu/auth/VALIDATE_REQUEST';
const VALIDATE_SUCCESS = 'osedu/auth/VALIDATE_SUCCESS';
const VALIDATE_FAIL = 'osedu/auth/VALIDATE_FAIL';
const FORGOT_PASSWORD_REQUEST = 'osedu/auth/FORGOT_PASSWORD_REQUEST';
const FORGOT_PASSWORD_SUCCESS = 'osedu/auth/FORGOT_PASSWORD_SUCCESS';
const FORGOT_PASSWORD_FAIL = 'osedu/auth/FORGOT_PASSWORD_FAIL';
const RESET_PASSWORD_REQUEST = 'osedu/auth/RESET_PASSWORD_REQUEST';
const RESET_PASSWORD_SUCCESS = 'osedu/auth/RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAIL = 'osedu/auth/RESET_PASSWORD_FAIL';
const CHANGE_PASSWORD_REQUEST = 'osedu/auth/CHANGE_PASSWORD_REQUEST';
const CHANGE_PASSWORD_SUCCESS = 'osedu/auth/CHANGE_PASSWORD_SUCCESS';
const CHANGE_PASSWORD_FAIL = 'osedu/auth/CHANGE_PASSWORD_FAIL';
export const LOGOUT = 'osedu/auth/LOGOUT';
// const LOGOUT_SUCCESS = 'osedu/auth/LOGOUT_SUCCESS';
// const LOGOUT_FAIL = 'osedu/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result.data && action.result.data._id,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        signingUp: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        user: action.result.data && action.result.data._id,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        signingUp: false,
        user: null,
        signupError: action.error,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result.data && action.result.data._id,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: false,
        user: null,
      };
    // case LOGOUT:
    //   return {
    //     ...state,
    //     loggingOut: true
    //   };
    // case LOGOUT_SUCCESS:
    //   return {
    //     ...state,
    //     loggingOut: false,
    //     user: null
    //   };
    // case LOGOUT_FAIL:
    //   return {
    //     ...state,
    //     loggingOut: false,
    //     logoutError: action.error
    //   };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL],
    promise: client =>
      client.get('/users/me').then(res => {
        // console.log(res);
        return res;
      }),
    schema: schemas.USER,
  };
}

/**
 * Signup as user
 * @param  {object} data data containing fields name, email and password
 * @return {[type]}      [description]
 */
export function signup(data) {
  return {
    types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: client =>
      client
        .post('/users/create', {
          data,
        })
        .then(res => {
          cookies.set('access_token', res.token, { path: '/' });
          cookies.set('user_id', res.data._id, { path: '/' });
          return res;
        }),
    schema: schemas.USER,
  };
}

export function login(email, password) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client =>
      client
        .post('/auth/login', {
          data: {
            email,
            password,
          },
        })
        .then(res => {
          cookies.set('access_token', res.token, { path: '/' });
          cookies.set('user_id', res.data._id, { path: '/' });
          return res;
        }),
    schema: schemas.USER,
  };
}

export function loginFacebook(data) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client =>
      client
        .post('/auth/facebook', {
          data,
        })
        .then(res => {
          cookies.set('access_token', res.token, { path: '/' });
          cookies.set('user_id', res.data._id, { path: '/' });
          return res;
        }),
    schema: schemas.USER,
  };
}

export function loginGoogle(data) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client =>
      client
        .post('/auth/google', {
          data,
        })
        .then(res => {
          cookies.set('access_token', res.token, { path: '/' });
          cookies.set('user_id', res.data._id, { path: '/' });
          return res;
        }),
    schema: schemas.USER,
  };
}

export function validate(email) {
  return {
    types: [VALIDATE_REQUEST, VALIDATE_SUCCESS, VALIDATE_FAIL],
    promise: client =>
      client.post('/auth/validate', {
        data: {
          email,
        },
      }),
  };
}

export function forgotPassword(email) {
  return {
    types: [
      FORGOT_PASSWORD_REQUEST,
      FORGOT_PASSWORD_SUCCESS,
      FORGOT_PASSWORD_FAIL,
    ],
    promise: client =>
      client.post('/auth/forgotPassword', {
        data: {
          email,
        },
      }),
  };
}

export function resetPassword(token, password) {
  return {
    types: [
      RESET_PASSWORD_REQUEST,
      RESET_PASSWORD_SUCCESS,
      RESET_PASSWORD_FAIL,
    ],
    promise: client =>
      client.post('/auth/resetPassword', {
        data: {
          token,
          password,
        },
      }),
  };
}

export function changePassword(password, newPassword) {
  return {
    types: [
      CHANGE_PASSWORD_REQUEST,
      CHANGE_PASSWORD_SUCCESS,
      CHANGE_PASSWORD_FAIL,
    ],
    promise: client =>
      client.post('/auth/changePassword', {
        data: {
          password,
          newPassword,
        },
      }),
  };
}

export function logout() {
  cookies.remove('access_token', { path: '/' });
  cookies.remove('user_id', { path: '/' });
  return {
    type: LOGOUT,
  };
}
