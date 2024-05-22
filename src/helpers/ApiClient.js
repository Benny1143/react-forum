import superagent from 'superagent';
import Cookies from 'universal-cookie';

const methods = ['get', 'post', 'put', 'patch', 'del'];
const cookies = new Cookies();

function isInternalApiPath(path) {
  return path.indexOf('http') !== 0;
}

function formatUrl(path) {
  if (!isInternalApiPath(path)) return path;
  // Prepend `/api` to relative URL, to proxy to API server.
  return `${process.env.REACT_APP_API_HOST || ''}/api${path}`;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach(
      method =>
        (this[method] = (path, { headers, params, data } = {}) =>
          new Promise((resolve, reject) => {
            const request = superagent[method](formatUrl(path));

            if (headers) {
              request.set(headers);
            }

            if (params) {
              request.query(params);
            }

            // For internal API calls
            if (cookies.get('access_token') && isInternalApiPath(path)) {
              request.set(
                'Authorization',
                `Bearer ${cookies.get('access_token')}`
              );
            }

            if (data) {
              request.send(data);
            }

            request.end((err, { body } = {}) =>
              err
                ? reject({ ...body, status: err.status } || err)
                : resolve(body)
            );
          }))
    );
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}

// import fetch from 'isomorphic-fetch';
// import config from '../config';

// function formatUrl(path) {
//   const adjustedPath = path[0] !== '/' ? '/' + path : path;
//   if (__SERVER__) {
//     // Prepend host and port of the API server to the path.
//     return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
//   }
//   // Prepend `/api` to relative URL, to proxy to API server.
//   return '/api' + adjustedPath;
// }

// export default class ApiClient {
//   constructor(req) {
//     this.req = req;
//   }

//   const serialize = (obj, prefix) => {
//     var str = [];
//     for (var p in obj) {
//       if (obj.hasOwnProperty(p)) {
//         var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
//         str.push(typeof v == "object" ?
//           serialize(v, k) :
//           encodeURIComponent(k) + "=" + encodeURIComponent(v));
//       }
//     }
//     return str.join("&");
//   };

//   const queryURL = (resource, qs) => (qs.length ? [resource, qs].join('?') : resource);

//   const request = (resource, methodStr, body = {}, headers = {}) => {
//     const method = methodStr.toUpperCase();

//     const args = {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         ...headers.headers
//       },
//     };

//     if (method !== 'GET') args.body = typeof(body) === 'object' ? JSON.stringify(body) : body;

//     return fetch(formatUrl(resource), args);
//   };

//   const get = (resource, params = {}, headers = {}) =>
//     request(queryURL(resource, serialize(params)), 'GET', {}, headers)
//       .then(response =>
//         response.json().then(json => ({ json, response }))
//       )
//       .then(({ json, response }) => {
//         if (!response.ok) {
//           return Promise.reject(json)
//         }
//         return json;
//       });

//   const put = (resource, body = {}, headers = {}) =>
//     request(resource, 'PUT', body, headers);

//   const post = (resource, body = {}, headers = {}) =>
//     request(resource, 'POST', body, headers);

//   const del = (resource, params = {}, headers = {}) =>
//     request(queryURL(resource, serialize(params)), 'DELETE', {}, headers);

//   return { request, get, put, post, del };
// }
