import { validImageUpload, validUpload } from 'utils/validation';

const resourcesAddAsyncValidation = values =>
  new Promise((resolve, reject) => {
    const errors = {};
    let hasError = false;
    const fileResult = validUpload(values.files && values.files[0]);
    let avatarResult = false;

    if (values.avatars && values.avatars[0]) {
      avatarResult = validImageUpload(values.avatars && values.avatars[0]);
    }
    if (fileResult) {
      errors.files = fileResult;
      hasError = true;
    }
    if (avatarResult) {
      errors.avatars = avatarResult;
      hasError = true;
    }
    if (hasError) return reject(errors);
    return resolve();
  });

export default resourcesAddAsyncValidation;
