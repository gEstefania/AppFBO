import firestore from '@react-native-firebase/firestore';

export const getArticles=(catId, subCatId, topicId)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let querySubCategory = 
            firestore()
            .collection("Categories").doc(catId)
            .collection("Subcategories").doc(subCatId)
            .collection("Topics").doc(topicId);

            let articles = await
            firestore()
            .collection("Articles")
            .where('subcategory','==', querySubCategory)
            .get();

            resolve(articles.docs)

        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })
}

export const getTopArticles = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let articles = await
            firestore()
            .collection("Articles")
            .orderBy('priority', 'asc')
            .limit(5)
            .get();

            resolve(articles.docs)

        } catch (e) {
            reject({ error: "Get data firestore error.", e })
        }
    })
}