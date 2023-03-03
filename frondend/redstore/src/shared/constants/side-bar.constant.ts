import { STUDENT_ROUTER } from "./router/student-router.constant";
import { APP_ROUTER_CONST } from "./router/app-router.constant";
import { getSSBuildingIcon } from "../../components/common/icons/SSBuildingIcon";
import { getSSHomeIcon } from "../../components/common/icons/SSHomeIcon";
import { KHOA_ROUTER } from "./router/khoa-router.constant";
import { MONHOC_ROUTER } from "./router/monhoc-router.constant";
import { KETQUA_ROUTER } from "./router/ketqua-router.constant";
import { THONGKE_ROUTER } from "./router/thongke-router.constant";

const SideBarConst = [
    {
        name: "Trang chủ",
        link: APP_ROUTER_CONST.layout.childrens.overview.path,
        roles: APP_ROUTER_CONST.layout.childrens.overview.roles,
        linkParentActive: [],
        icon: getSSBuildingIcon,
        id: "DASHBOARD",
    },
    {
        name: "Quản lý sinh viên",
        icon: getSSHomeIcon,
        link: "",
        linkParentActive: [],
        childrens: [
            {
                name: "Danh sách sinh viên",
                icon: "icon1",
                linkParentActive: [],
                link: STUDENT_ROUTER.childrens.listUser.path,
                roles: STUDENT_ROUTER.childrens.listUser.roles,
                id: "STUDENT_ADD",
            },
            {
                name: "Thêm mới sinh viên",
                icon: "icon1",
                linkParentActive: [],
                link: STUDENT_ROUTER.childrens.createUser.path,
                roles: STUDENT_ROUTER.childrens.createUser.roles,
            },
            
        ],
    },
    {
        name: "Quản lý Khoa",
        icon: getSSHomeIcon,
        link: "",
        linkParentActive: [],
        childrens: [
            {
                name: "Danh sách khoa",
                icon: "icon1",
                linkParentActive: [],
                link: KHOA_ROUTER.childrens.listKhoa.path,
                roles: KHOA_ROUTER.childrens.listKhoa.roles,
                id: "KHOA_ID",
            },
            {
                name: "Thêm mới khoa",
                icon: "icon1",
                linkParentActive: [],
                link: KHOA_ROUTER.childrens.createKhoa.path,
                roles: KHOA_ROUTER.childrens.createKhoa.roles,
            },
        ],
    },
    {
        name: "Quản lý Môn học",
        icon: getSSHomeIcon,
        link: "",
        linkParentActive: [],
        childrens: [
            {
                name: "Danh sách môn học",
                icon: "icon1",
                linkParentActive: [],
                link: MONHOC_ROUTER.childrens.listMonhoc.path,
                roles: MONHOC_ROUTER.childrens.listMonhoc.roles,
                id: "MONHOC_ID",
            },
            {
                name: "Thêm mới môn học",
                icon: "icon1",
                linkParentActive: [],
                link: MONHOC_ROUTER.childrens.createMonhoc.path,
                roles: MONHOC_ROUTER.childrens.createMonhoc.roles,
            },
        ],
    },
    {
        name: "Quản lý Điểm",
        icon: getSSHomeIcon,
        link: "",
        linkParentActive: [],
        childrens: [
            {
                name: "Danh sách kết quả",
                icon: "icon1",
                linkParentActive: [],
                link: KETQUA_ROUTER.childrens.listKetqua.path,
                roles: KETQUA_ROUTER.childrens.listKetqua.roles,
                id: "KETQUA_ID",
            },
            {
                name: "Kết quả mới",
                icon: "icon1",
                linkParentActive: [],
                link: KETQUA_ROUTER.childrens.createKetqua.path,
                roles: KETQUA_ROUTER.childrens.createKetqua.roles,
            },
        ],
    },
    {
        name: "Thống kê",
        icon: getSSHomeIcon,
        link: "",
        linkParentActive: [],
        childrens: [
            {
                name: "Danh sách sinh viên xuất sắc",
                icon: "icon2",
                linkParentActive: [],
                link: THONGKE_ROUTER.childrens.listSvXuatSac.path,
                roles: THONGKE_ROUTER.childrens.listSvXuatSac.roles,
            },
            {
                name: "Get Sv By Monhoc",
                icon: "icon2",
                linkParentActive: [],
                link: THONGKE_ROUTER.childrens.listSvByMh.path,
                roles: THONGKE_ROUTER.childrens.listSvByMh.roles,
            },
        ],
    },
];

export default SideBarConst;
