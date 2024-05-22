import { validImageUpload, validUpload } from 'utils/validation';

const resourcesEditAsyncValidation = values =>
  new Promise((resolve, reject) => {
    const errors = {};
    let hasError = false;
    let fileResult = false;
    let avatarResult = false;

    if (values.files && values.files[0]) {
      fileResult = validUpload(values.files && values.files[0]);
    }
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

export default resourcesEditAsyncValidation;
