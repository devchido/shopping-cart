export const isEmptyArr = (arr: any): boolean => {
  if (!arr) {
    return true;
  }
  if (Array.isArray(arr) && arr.length === 0) {
    return true
  }  
  return false;
}