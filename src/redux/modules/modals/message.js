const SHOW_MODAL_MESSAGE = 'osedu/modals/SHOW_MODAL_MESSAGE';
const HIDE_MODAL_MESSAGE = 'osedu/modals/HIDE_MODAL_MESSAGE';

const initialState = {
  visible: false,
  accept: null,
  cancel: null,
};

export default function message(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_MODAL_MESSAGE:
      return {
        ...state,
        visible: true,
        accept: action.accept,
        cancel: action.cancel,
      };
    case HIDE_MODAL_MESSAGE:
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
    type: SHOW_MODAL_MESSAGE,
    accept: props && props.accept,
    cancel: props && props.cancel,
  };
}

export function hide() {
  return {
    type: HIDE_MODAL_MESSAGE,
  };
}
