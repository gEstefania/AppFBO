import firestore from '@react-native-firebase/firestore';

export const getAllTags=()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let categories = await 
            firestore()
            .collection("Tags")
            .where('enabled', '==', true)
            .get()
            if(categories){
                resolve(categories)
            }
        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })
}