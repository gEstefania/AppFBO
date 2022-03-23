const defaultState ={}

const UserReducer =(state=defaultState,{type,payload})=>{
    switch (type) {
        case 'LOG_IN':
            return Object.assign({},state,payload)
        case 'LOG_OUT':
            return defaultState
        default:
            return state
    }
}

export default UserReducer;
