export function readFileAsDataURLAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onabort = reject;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
