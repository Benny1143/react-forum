import memoize from 'lru-memoize';
import {
  createValidator,
  required,
  minLength,
  maxLength,
} from 'utils/validation';

const resourcesAddEditValidation = createValidator({
  name: [required, maxLength(50)],
  description: [required],
  mainLevel: [required],
  subject: [required],
  levels: [required, minLength(1)],
  types: [required, minLength(1)],
  difficulty: [required],
  language: [required],
});
export default memoize(10)(resourcesAddEditValidation);
