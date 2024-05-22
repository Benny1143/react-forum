import mimeMatch from 'mime-match';

const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data) =>
  rules
    .map(rule => rule(value, data))
    .filter(error => !!error)[0 /* first error */];
const acceptedFileTypes = [
  'image/*',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/pdf',
  'application/zip',
  'application/x-compressed-zip',
];
const acceptedImageFileTypes = ['image/*'];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (
    !isEmpty(value) &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return 'Invalid email address';
  }
}

export function password(value) {
  if (
    !isEmpty(value) &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
  ) {
    return 'Password needs to contain 8 or more characters and at least 1 lowercase/uppercase/numeric character';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} character${min > 1 ? 's' : ''}/item${
        min > 1 ? 's' : ''
      }`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} character${max > 1 ? 's' : ''}/item${
        max > 1 ? 's' : ''
      }`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be a whole number';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function validImageUpload(file) {
  if (
    isEmpty(file) ||
    !file.type ||
    acceptedImageFileTypes.filter(mimeMatch(file.type)).length === 0
  ) {
    return 'Please upload a file of the following types (.png, .jpg, .gif)';
  }
}

export function validUpload(file) {
  if (
    isEmpty(file) ||
    !file.type ||
    acceptedFileTypes.filter(mimeMatch(file.type)).length === 0
  ) {
    return 'Please upload a file of the following types (.doc, .docx, .pdf, .png, .jpg, .gif, .zip)';
  }
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach(key => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export function isImageFile(file) {
  return (
    !isEmpty(file) &&
    file.type &&
    acceptedImageFileTypes.filter(mimeMatch(file.type)).length > 0
  );
}
