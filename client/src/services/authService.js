import jwtDecode from "jwt-decode";

//Get user from JWT
export function getCurrentUser() 
{
    const token = localStorage.getItem("token");
    let decoded;

    try 
    {
     decoded = jwtDecode(token);
     return decoded;
    } 
    catch(err) 
    {
    return null;
    }
}

//Check if is admin
export function isAdmin() 
{
    const user = getCurrentUser();
    if(user)
    {
        return user["role"] === 'admin';
    }
    return null;
}

