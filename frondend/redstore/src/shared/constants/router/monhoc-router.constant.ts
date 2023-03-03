export const MONHOC_ROUTER = {
    path: '/monhoc',
    roles: [],
    childrens: {
      listMonhoc: {
        path: '/monhoc/list',
        roles: [],
      },
      createMonhoc: {
        path: '/monhoc/create',
        roles: [],
      },
      updateMonhoc: {
        path: '/monhoc/:id',
        buildPath: (id: any) => `/monhoc/${id}`,
      }
    }
  };