import memoize from 'lru-memoize';
import { createValidator, required, password, match } from 'utils/validation';

const changePasswordValidation = createValidator({
  newPassword: [required, password],
  confirmNewPassword: [match('newPassword')],
});
export default memoize(10)(changePasswordValidation);
