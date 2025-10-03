
const url = {
    login: "auth/login-admin",
    rolesInputData: "internal/roles/available",
    getAllRoles : "internal/roles",
    roleCreate:"internal/roles",
    roleUpdate:(id)=>`internal/roles/${id}`
    
}

export default url