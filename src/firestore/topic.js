import firestore from '@react-native-firebase/firestore';

export const getTopics=(catId, subCatId)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let topic = await 
            firestore()
            .collection("Categories").doc(catId)
            .collection("Subcategories").doc(subCatId)
            .collection("Topics")
            .get()
            if(topic){
                resolve(topic.docs)
            }
        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })
}