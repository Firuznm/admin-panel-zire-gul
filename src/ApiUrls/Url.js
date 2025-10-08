
const url = {
    login: "auth/login-admin",
    rolesInputData: "internal/roles/available",
    getAllRoles : "internal/roles",
    roleCreate:"internal/roles",
    roleUpdate:(roleId)=>`internal/roles/${roleId}`,
    getAllUsers: "internal/users",
    createUser: "internal/users/",
    updateUser: (userRoleId) => `internal/users/${userRoleId}`,
    allCustomers: "internal/customers",
    updateCustomers:(id)=>`internal/customers/${id}`
}

export default url