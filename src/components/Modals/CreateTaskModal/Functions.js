import {CountSliceFilesTask} from "./Variables";

export function convertTypeFileToObject(arrayFiles) {
  return arrayFiles.map(file => ({
    name: file.name,
    lastModified: file.lastModified,
    lastModifiedDate: new Date(file.lastModifiedDate),
    webkitRelativePath: file.webkitRelativePath,
    size: file.size,
    type: file.type
  }));
}
export const iconWithStatus = (status) => {
  if (status.toLowerCase() === "queue") {
    return "⭕️";
  } else if (status.toLowerCase() === "development") {
    return "🔆️";
  } else if (status.toLowerCase() === "done") {
    return "✅";
  }
}

export const SliceSelectedFiles = (files, setFieldValue, clear, setErrorFile) => {
  if (files.length <= CountSliceFilesTask) {
    setFieldValue("file", convertTypeFileToObject(files));
  } else {
    setErrorFile(`Вы можете выбрать не более ${CountSliceFilesTask} файлов.`);
    setTimeout(() => setErrorFile(""), 1500);
    clear = null;
  }
}

export const onDropHandler = (e, setFieldValue, setErrorFile, setSelectedFiles) => {
  e.preventDefault();
  let files = [...e.dataTransfer.files]
  setSelectedFiles(files);
};

export const uploadedFilesShow = (files, uploadedFiles) => {
  if (uploadedFiles.length === 1) {
    return `${files.name}`
  }
  return `${files.name} / `
}

