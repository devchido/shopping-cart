import { ERROR_MSG } from "../constants/error-msg.constant";

export const getErrorMsgReduxAction = (res: any) => {
  let msg = ERROR_MSG.common.msg
  if (res && res.error && res.error.response && res.error.response.data) {
    msg = res.error.response.data.title || msg
  }
  return msg;
}

export const getErrorMsgAxios = (error: any) => {
  let msg = ERROR_MSG.common.msg
  if (error && error.response && error.response.data) {
    msg = error.response.data.title || msg
  }
  return msg;
}

export const msgErrorRequired = (field: String) => `${field} không được để trống`;