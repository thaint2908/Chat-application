export const checkEmpty = (data) =>{
    if(data){
        return "";
    }
    return "Required";
}
export const checkEmail = (email) =>{
    let error;
    error  = checkEmpty(email);
    if(error==="Required") return error;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const check =  re.test(String(email).toLowerCase());
    if(check){
        return error;
    }
    error = "Invalid Email";
    return error;
}

export const checkPassword = (password) =>{
    let error;
    error  = checkEmpty(password);
    if(error==="Required") return error;
    const check =  password.length >=8;
    if(check){
        return error;
    }
    error = "Password should be of minimum 8 characters length";
    return error;
}