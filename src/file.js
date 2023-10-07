import { saveAs } from 'file-saver';
import { blobToBase64String, base64StringToBlob } from 'blob-util';

// 1. Encoding a file
export const encodeFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const encodedData = blobToBase64String(event.target.result);
      resolve(encodedData);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
};

// 2. Saving the encoded file in Redux
const saveEncodedFileInRedux = (encodedData) => {
  return {
    type: 'SAVE_ENCODED_FILE',
    payload: encodedData,
  };
};

// 3. Decoding a file
const decodeFile = (encodedData) => {
  return base64StringToBlob(encodedData);
};

// 4. Downloading a file
const downloadFile = (blob, fileName) => {
  saveAs(blob, fileName);
};

// // Example usage
// const file = /* your file */;
// encodeFile(file)
//   .then((encodedData) => {
//     // Save the encoded file in Redux
//     store.dispatch(saveEncodedFileInRedux(encodedData));
//
//     // When you need to download the file
//     const decodedBlob = decodeFile(encodedData);
//     downloadFile(decodedBlob, 'downloaded-file.txt');
//   })
//   .catch((error) => {
//     console.error('Error encoding the file:', error);
//   });