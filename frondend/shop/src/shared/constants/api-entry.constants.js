const userApi = {
    create: "/user/api/sinhvien",
    update: (id) => `/api/sinhvien/${id}`,
    filter: "/api/sinhvien/filter",
    getById: (id) => `/api/sinhvien/${id}`,
    delete: (id) => `/api/sinhvien/${id}`,
};
const categoryApi = {
    create: "/api/category/",
    update: (id) => `/api/sinhvien/${id}`,
    filter: "/api/sinhvien/filter",
    getById: (id) => `/api/sinhvien/${id}`,
    delete: (id) => `/api/sinhvien/${id}`,
};
const productApi = {
    getAllProductByPage: "/product/api",
}
const API_ENTRY = {
    user: userApi,
    category: categoryApi,
    product: productApi,
}

export default API_ENTRY;
