import firestore from '@react-native-firebase/firestore';

export const getAllCategories=()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let categories = await firestore().collection("Categories").get()
            if(categories){
                resolve(categories)
            }
        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })
}