import { KETQUA_ROUTER } from "./ketqua-router.constant";
import { KHOA_ROUTER } from "./khoa-router.constant";
import { MONHOC_ROUTER } from "./monhoc-router.constant";
import { STUDENT_ROUTER } from "./student-router.constant";
import { THONGKE_ROUTER } from "./thongke-router.constant";

export const APP_ROUTER_CONST = {
    layout: {
        path: "/",
        roles: [],
        childrens: {
            overview: {
                path: "/",
                roles: [],
            },
            student: STUDENT_ROUTER,
            khoa: KHOA_ROUTER,
            monhoc: MONHOC_ROUTER,
            ketqua: KETQUA_ROUTER,
            thongke:THONGKE_ROUTER,
        },
    },
    nonfound: {
        path: "/404",
    },
    login: {
        path: "/login",
    },
    authCallback: {
        path: "/auth/callback",
    },
    all: {
        path: "*",
    },
};
