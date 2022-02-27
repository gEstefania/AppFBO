import firestore from '@react-native-firebase/firestore';

export const getSubCategory=(catId)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let subCategories = await firestore().collection("Categories").doc(catId).collection("Subcategories").get()
            if(subCategories){
                resolve(subCategories.docs)
            }
        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })
}