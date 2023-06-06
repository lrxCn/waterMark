
export const file2base64 = (file) => {
  var reader = new FileReader();
  return new Promise((resolve) => {
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      resolve(reader.result);
    }
  })
}
