import { TYPE_BLOB } from "../constants/file.constant";

export const blobToFile = (data: any, nameFile: string) => {
  const blob = new Blob([data], { type: TYPE_BLOB });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = nameFile;
  link.click();
}

export const isFileType = (file: File, type: string): boolean => {
  if (file && file.name.endsWith(type)) {
    return true;
  }
  return false
}