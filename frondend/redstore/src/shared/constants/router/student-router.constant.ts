export const STUDENT_ROUTER = {
  path: '/students',
  roles: [],
  childrens: {
    listUser: {
      path: '/students/list',
      roles: [],
    },
    createUser: {
      path: '/students/create',
      roles: [],
    },
    updateUser: {
      path: '/students/:id',
      buildPath: (id: any) => `/students/${id}`,
    },
    
  }
};