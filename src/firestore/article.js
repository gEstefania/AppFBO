import firestore from '@react-native-firebase/firestore';

export const getArticles=(catId, subCatId, topicId)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let article = await
            firestore()
            .collection("Categories").doc(catId)
            .collection("Subcategories").doc(subCatId)
            .collection("Topics").doc(topicId)
            .collection("Articles")
            .get()
            if(article){
                resolve(article.docs)
            }
        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })
}