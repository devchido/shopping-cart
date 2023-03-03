import { PageModel } from "../model/page.model";
export const TOTAL_HEADER = 'x-total-count'
export const SIZE_DEFAULT = 10;
export const BIG_SIZE = 1000000;
export const PARAMS_ALL: PageModel = { page: 0, size: BIG_SIZE };
export const PARAMS_DEFAULT: PageModel = { page: 0, size: SIZE_DEFAULT };