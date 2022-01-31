export const login=(payload)=>{ 
    return{
        type:"LOG_IN",
        payload // es lo que va a modificar mi estado, este es un objeto
    }
}
export const logout=()=>{
    return {
        type:"LOG_OUT",
        payload:{}
    }
}

