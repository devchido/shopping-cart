export const formatStringToNum = (text: any) => {
  return text.replace(/[^0-9\.]/g, '').replace(/^0+/, '').replace(/\./, '')
} 

export const numberWithCommas = (num: any) => {
  return num && num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const stringCommasToNumber = (text:any) => {
  return text ? ('' + text).replace(/\,/g, '') : text;
}

export const formatPhone = (text: any) => {
  const data = text.replace(/[^\d\+]/g, '');
  if (data.charAt(0) != 0) {
    return data.substring(1)
  }

  return data;
}

export const formatStringtoNumCutZero = (text: any) => {
  const cvText = text.replace(/[^0-9\.]/g, '').replace(/\./, '')
  const cvString = cvText.toString().slice(0, 2)
  if(cvString === '00') {
    return '0'
  }
  return cvText
} 

export const formatStringToNumNotCommas = (text: any) => {
  return text.replace(/[^0-9\.]/g, '').replace(/\./, '')
}

export const isNum = (txt: any) => /^\d+$/.test(txt);