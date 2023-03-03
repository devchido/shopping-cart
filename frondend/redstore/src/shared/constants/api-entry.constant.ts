const studentApi = {
  create: '/api/sinhvien',
  update: (id: any) => `/api/sinhvien/${id}`,
  filter: '/api/sinhvien/filter',
  getById: (id: any) => `/api/sinhvien/${id}`,
  delete: (id: any) => `/api/sinhvien/${id}`,
};
const khoaApi = {
  create: '/api/khoa/create',
  update: (id: any) => `/api/khoa/${id}`,
  filter: '/api/khoa/filter',
  getById: (id: any) => `/api/khoa/${id}`,
  delete: (id: any) => `/api/khoa/delete/${id}`,
}
const monhocApi = {
  create: '/api/monhoc/create',
  update: (id: any) => `/api/monhoc/update/${id}`,
  filter: '/api/monhoc/filter',
  getById: (id: any) => `/api/monhoc/${id}`,
  delete: (id: any) => `/api/monhoc/delete/${id}`,
}
const ketquaApi = {
  create: '/api/ketqua',
  update: (id: any) => `/api/ketqua/${id}`,
  filter: '/api/ketqua/filter',
  getById: (id: any) => `/api/ketqua/${id}`,
  delete: (id: any) => `/api/ketqua/${id}`,
};

const thongkeApi = {
  filterSvxs: '/api/sinhvien/tongket/sv-vip',
  findSvByMh: '/api/monhoc/sinhvien',
}
const publicApi = {
  showFile: (id: any, file: any, type: any) => `${process.env.REACT_APP_MGMT_URL}/api/public/file?file=${file}&id=${id}&type=${type}`,
};
const API_ENTRY = {
  student: studentApi,
  public: publicApi,
  khoa: khoaApi,
  monhoc: monhocApi,
  ketqua: ketquaApi,
  thongke: thongkeApi
}

export default API_ENTRY;