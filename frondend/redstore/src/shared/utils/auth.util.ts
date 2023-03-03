export const compareRole = (roles: any[], roleCompares: any[]) => {
    if (roleCompares) {
        if (roleCompares.length > 0) {
            for (let i = 0; i < roles.length; i++) {
                if (roleCompares.includes(roles[i])) {
                    return true
                }
            }
            return false
        }
        return true
    }

    return true
}

export const filterRolesSideBar = (sideBarConst: any[], roles: any[]): any[] => {
    if (sideBarConst) {
        return sideBarConst
            .filter((item2: any) => compareRole(roles, item2.roles))
            .map((item: any) => ({ ...item, childrens: filterRolesSideBar(item.childrens, roles) }))
            .filter((item: any) => {
                if (item.childrens) {
                    if (item.childrens.length === 0) {
                        return false
                    }
                }
                return true;
              })
            
    }
    return sideBarConst;
};


export const accessRightCurrentUser = (currentUser: any) => {
    return currentUser.group.accessRights.map((item: any) => item.code);
}

export const hasAccessRightCurrentUser =  (currentUser: any, accessRight: any) => {
    const accessRights: any[] = accessRightCurrentUser(currentUser);
    return accessRights.includes(accessRight)
}

export const hasAnyAccessRightCurrentUser =  (currentUser: any, accessRights: any[]) => {
    for (let accessRight of accessRights)  {
        if(hasAccessRightCurrentUser(currentUser, accessRight)) {
            return true;
        }
    }
    return false;
}