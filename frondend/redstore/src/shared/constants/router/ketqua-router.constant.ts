export const KETQUA_ROUTER = {
    path: '/ketqua',
    roles: [],
    childrens: {
      listKetqua: {
        path: '/ketqua/list',
        roles: [],
      },
      createKetqua: {
        path: '/ketqua/create',
        roles: [],
      },
      updateKetqua: {
        path: '/ketqua/:id',
        buildPath: (id: any) => `/ketqua/${id}`,
      }
    }
  };