const defaultState ={} // por que debe tener este objeto aqui

const reducer =(state=defaultState,{type,payload})=>{
    switch (type) {
        case 'LOG_IN':
            return Object.assign({},state,payload) // como se lee esto
        case 'LOG_OUT':
            return payload
        default:
            return state
    }
}

export default reducer;
