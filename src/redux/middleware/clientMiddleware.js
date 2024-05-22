import { normalize, schema as scm } from 'normalizr';

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, schema, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });

      const actionPromise = promise(client);
      actionPromise
        .then(result =>
          next({
            ...rest,
            result:
              schema && result.data
                ? { ...result, ...normalize(result.data, schema) }
                : result,
            type: SUCCESS,
          })
        )
        .catch(error => {
          console.error('MIDDLEWARE ERROR:', error);
          next({ ...rest, error, type: FAILURE });
        });

      return actionPromise;
    };
  };
}

const userSchema = new scm.Entity(
  'users',
  {},
  {
    idAttribute: user => user._id,
  }
);

const resourceSchema = new scm.Entity(
  'resources',
  {
    author: userSchema,
  },
  {
    idAttribute: resource => resource._id,
  }
);

const reviewSchema = new scm.Entity(
  'reviews',
  {
    resource: resourceSchema,
    author: userSchema,
  },
  {
    idAttribute: review => review._id,
  }
);

// Schemas for API responses.
export const schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  RESOURCE: resourceSchema,
  RESOURCE_ARRAY: [resourceSchema],
  REVIEW: reviewSchema,
  REVIEW_ARRAY: [reviewSchema],
};
