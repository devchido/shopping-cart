export const KHOA_ROUTER = {
  path: '/khoa',
  roles: [],
  childrens: {
    listKhoa: {
      path: '/khoa/danh-sach',
      roles: [],
    },
    createKhoa: {
      path: '/khoa/create',
      roles: [],
    },
    updateKhoa: {
      path: '/khoa/:id',
      buildPath: (id: any) => `/khoa/${id}`,
    }
  }
};