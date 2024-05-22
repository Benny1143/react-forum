import memoize from 'lru-memoize';
import { createValidator } from 'utils/validation';

const reviewsAddValidation = createValidator({
  // description: [required]
});
export default memoize(10)(reviewsAddValidation);
