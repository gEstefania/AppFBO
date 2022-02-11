import {showMessage} from 'react-native-flash-message';

const ShowAlertMessage=(message,description,type,time=1500)=>{
    showMessage({
        animated:true,
        message,
        description,
        icon:type,
        type:type,
        duration:time
    })
}

export default ShowAlertMessage;