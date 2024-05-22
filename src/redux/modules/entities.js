import merge from 'lodash/merge';

const initialState = {
  users: {},
  resources: {},
};

const reducer = (state = initialState, action) => {
  if (action.result && action.result.entities) {
    return merge({}, state, action.result.entities);
  }

  return state;
};

export default reducer;
