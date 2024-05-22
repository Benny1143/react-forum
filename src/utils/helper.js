import path from 'path';
import imageExtensions from './image-extensions';

const extensions = new Set(imageExtensions);

export function isImageUri(uri) {
  return extensions.has(path.extname(uri).slice(1).toLowerCase());
}
