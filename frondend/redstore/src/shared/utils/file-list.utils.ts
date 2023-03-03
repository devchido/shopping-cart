import { toast } from "react-toastify";

export const convertFilesToArr = (files: FileList) => {
  let arrFiles: any[] = [];

  if (files === null || files.length === 0) {
    return arrFiles;
  }

  for (let i = 0; i < files.length; i++) {
    arrFiles.push(files[i])
  }

  return arrFiles;
}

export const isDuplicateFile = (files: any, fileCheck: File) => {
  if (files.length === 0) {
    return false;
  }

  for (let i = 0; i < files.length; i++) {
    if ((fileCheck.name === files[i].name) && (fileCheck.size === files[i].size)) {
      return true;
    }
  }
  return false;
}

export const isDuplicateFileImage = (filesImage: any, fileCheck: File) => {
  if (filesImage.length === 0) {
    return false;
  }

  for (let i = 0; i < filesImage.length; i++) {
    if ((fileCheck.name === filesImage[i].name)) {
      return true;
    }
  }
  return false
}

export const isTypeImage = (file: File) => {
  if (!file) {
    return false
  }
  return file.type.startsWith('image/');
}


export const minSizeFile = (file: File, minSize: number) => {
  debugger
  if (file.size <= minSize) toast.warning("File tải lên kích thước lơn hơn " + minSize + "kb");
  return file.size > minSize;
}


export const fileToUrl = (file: File) => {
  return URL.createObjectURL(file);
}