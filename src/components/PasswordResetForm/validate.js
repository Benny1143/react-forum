import memoize from 'lru-memoize';
import { createValidator, required, password, match } from 'utils/validation';

const resetPasswordValidation = createValidator({
  password: [required, password],
  confirmPassword: [match('password')],
});
export default memoize(10)(resetPasswordValidation);
