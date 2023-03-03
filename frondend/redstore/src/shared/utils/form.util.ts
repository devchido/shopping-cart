import { MIN_INPUT_SEARCH_ASYNC } from "../constants/form.constant"

export const handleBlurField = (formik: any, field: any) => (e: any) => {
  formik.setFieldTouched(field, true, true)
}

export const enableFilterOption = (inputValue: any) => (!inputValue || (inputValue && inputValue.length < MIN_INPUT_SEARCH_ASYNC))