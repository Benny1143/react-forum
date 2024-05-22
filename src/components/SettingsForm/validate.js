import memoize from 'lru-memoize';
import { createValidator, required } from 'utils/validation';

const settingsValidation = createValidator({
  role: required,
  name: required,
  gender: required,
  dob: required,
  address: required,
});
export default memoize(10)(settingsValidation);
