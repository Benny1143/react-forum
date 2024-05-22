const SHOW_MODAL_LOGIN = 'osedu/modals/SHOW_MODAL_LOGIN';
const HIDE_MODAL_LOGIN = 'osedu/modals/HIDE_MODAL_LOGIN';

const initialState = {
  visible: false,
  accept: null,
  cancel: null,
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_MODAL_LOGIN:
      return {
        ...state,
        visible: true,
        accept: action.accept,
        cancel: action.cancel,
      };
    case HIDE_MODAL_LOGIN:
      return {
        ...state,
        visible: false,
        accept: null,
        cancel: null,
      };
    default:
      return state;
  }
}

export function show(props) {
  return {
    type: SHOW_MODAL_LOGIN,
    accept: props && props.accept,
    cancel: props && props.cancel,
  };
}

export function hide() {
  return {
    type: HIDE_MODAL_LOGIN,
  };
}
