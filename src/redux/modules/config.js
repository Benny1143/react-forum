const CONFIG_LOAD = 'osedu/config/CONFIG_LOAD';
const CONFIG_LOAD_SUCCESS = 'osedu/config/CONFIG_LOAD_SUCCESS';
const CONFIG_LOAD_FAIL = 'osedu/config/CONFIG_LOAD_FAIL';

const initialState = {
  loaded: false,
};

const keys = [
  'roles',
  'mainLevels',
  'levels',
  'subjects',
  'types',
  'difficulties',
  'languages',
  'genders',
  'qualifications',
  'basis',
  'tutorStatuses',
  'schools',
];

function data(obj) {
  if (typeof obj !== 'object') return {};
  const { levels, subjects } = obj;
  return {
    ...obj,
    tags:
      levels &&
      subjects &&
      levels
        .concat(subjects)
        .sort((prev, next) => prev.name.localeCompare(next.name)),
  };
}

function dataByValue(dat) {
  if (typeof dat !== 'object') return {};
  return (
    dat &&
    keys.reduce((dataByKey, key) => {
      dataByKey[key] = dat[key].reduce((result, obj) => {
        result[obj.value] = obj;
        return result;
      }, {});
      return dataByKey;
    }, {})
  );
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CONFIG_LOAD:
      return {
        ...state,
        loading: true,
      };
    case CONFIG_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result && action.result.data && data(action.result.data),
        dataByValue:
          action.result &&
          action.result.data &&
          dataByValue(data(action.result.data)),
      };
    case CONFIG_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.config && globalState.config.loaded;
}

export function load() {
  return {
    types: [CONFIG_LOAD, CONFIG_LOAD_SUCCESS, CONFIG_LOAD_FAIL],
    promise: client => client.get('/config'),
  };
}
