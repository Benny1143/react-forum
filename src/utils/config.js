import qs from 'qs';

export function mapValueToNameFromConfig(config, key, value) {
  return (
    config &&
    key &&
    value &&
    config[key] &&
    config[key] &&
    config[key][value] &&
    config[key][value].name
  );
}

export function mapValueToName(hash, value) {
  return hash && hash[value] && hash[value].name;
}

export function mapValuesToNames(hash, values) {
  return hash && values.map(value => mapValueToName(hash, value));
}

export function mapEntityToKeyword(entity) {
  switch (entity) {
    case 'resources':
      return 'free-study-materials';
    case 'resource':
      return 'free-notes';
    default:
      return entity;
  }
}

export function searchToQuery(search) {
  if (search && typeof search === 'string' && search.charAt(0) === '?') {
    return qs.parse(search.substring(1));
  }
}
