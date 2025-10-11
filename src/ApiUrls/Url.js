
const url = {
    login: "auth/login-admin",
    rolesInputData: "internal/roles/available",
    rolesGetAll : "internal/roles",
    roleCreate:"internal/roles",
    roleUpdate:(roleId)=>`internal/roles/${roleId}`,
    usersGetAll: "internal/users",
    userCreate: "internal/users/",
    userUpdate: (userRoleId) => `internal/users/${userRoleId}`,
    userChangePassword:(id)=>`internal/users/${id}/change-password`,
    customersAllData: (s, d) => `internal/customers?sortBy=${s}&direction=${d}`,
    CustomersUpdate: (id) => `internal/customers/${id}`,
   customerChangePassword:(id)=>`internal/customers/${id}/change-password`
}

export default url