import memoize from 'lru-memoize';
import { createValidator, required } from 'utils/validation';

const userContactValidation = createValidator({
  message: required,
});
export default memoize(10)(userContactValidation);
