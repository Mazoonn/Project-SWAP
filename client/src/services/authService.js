// import jwt from 'jsonwebtoken';
//import key from '../key/key.json'
import jwtDecode from "jwt-decode"

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

export function isAdmin() 
{
    const user = getCurrentUser();
    if(user)
    {
        return user["role"] === 'admin';
    }
    return null;
}

