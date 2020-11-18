import jwt from 'jsonwebtoken';
import key from '../key/key.json'

export function getCurrentUser() 
{
    const token = localStorage.getItem("token");
    let decoded;

    try 
    {
     decoded = jwt.verify(token, key["public-key"]);
    } 
    catch(err) 
    {
    return null;
    }
    return decoded;
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

