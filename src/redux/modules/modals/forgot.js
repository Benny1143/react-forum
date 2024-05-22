const SHOW_MODAL_FORGOT = 'teachme/modals/SHOW_MODAL_FORGOT';
const HIDE_MODAL_FORGOT = 'teachme/modals/HIDE_MODAL_FORGOT';

const initialState = {
  visible: false,
  accept: null,
  cancel: null,
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_MODAL_FORGOT:
      return {
        ...state,
        visible: true,
        accept: action.accept,
        cancel: action.cancel,
      };
    case HIDE_MODAL_FORGOT:
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
    type: SHOW_MODAL_FORGOT,
    accept: props && props.accept,
    cancel: props && props.cancel,
  };
}

export function hide() {
  return {
    type: HIDE_MODAL_FORGOT,
  };
}
