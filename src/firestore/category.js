import firestore from '@react-native-firebase/firestore';
import { getArticle } from './article';

export const getAllCategories=()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            firestore()
            .collection("Categories")
            .where('enabled', '==', true)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot) {
                    resolve(documentSnapshot.docs)
                }
            })
        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })
}

export const getTopCategoryArticles = (catId) => {
    const articles = new Promise(async(resolve, reject)=>{
        try{
            firestore()
            .collection(`FeauturedGeneralArticlesByCategory/${catId}/Articles`)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot) {
                    let articlesList = documentSnapshot.docs.map(async(doc)=>{
                        return {id:doc.id,...doc.data(), type: 'article'}
                    })
                    resolve({type: 'article', data: documentSnapshot.docs})
                }
            })
        }catch(e){
            reject({error:"Get data firestore error.", e})
        }
    })
    let dataArticles = articles.then(res=>{
        let articlesData = res.data.map(async(doc) => {
            // console.log('document', doc)
            let getDataArticle = await getArticle(doc._data.articleId);
            return {...getDataArticle, ...doc};
        })
        return Promise.all(articlesData)
    })

    return dataArticles
}

export const getDataFromCategory=async(catId)=>{
    //Get subcategories:
    const subcategories = new Promise(async(resolve, reject)=>{
        try{
            firestore()
            .collection("Categories").doc(catId)
            .collection("Subcategories")
            .where('enabled', '==', true)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot) {
                    resolve({type: 'subcategory', data: documentSnapshot.docs})
                }
            })
        }catch(e){
            reject({error:"Get data firestore error.", e})
        }
    })
    
    //Get aticles:
    const articles = new Promise(async(resolve, reject)=>{
        try{
            let queryCategory = 
            firestore()
            .collection("Categories").doc(catId);

            firestore()
            .collection("Articles")
            .where('enabled', '==', true)
            .where('subcategory','==', queryCategory)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot) {
                    resolve({type: 'article', data: documentSnapshot.docs})
                }
            })
        }catch(e){
            reject({error:"Get data firestore error.", e})
        }
    })

    return Promise.all([subcategories, articles])
}


export const getDataFromSubCategory=(catId, subCatId)=>{
    //Get articles
    const articles = new Promise(async(resolve, reject)=>{
        try{
            let querySubCategory = 
            firestore()
            .collection("Categories").doc(catId)
            .collection("Subcategories").doc(subCatId);

            firestore()
            .collection("Articles")
            .where('enabled', '==', true)
            .where('subcategory','==', querySubCategory)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot) {
                    resolve({type: 'article', data: documentSnapshot.docs})
                }
            })            
        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })

    //Get topics
    const topics = new Promise(async(resolve, reject)=>{
        try{
            firestore()
            .collection("Categories").doc(catId)
            .collection("Subcategories").doc(subCatId)
            .collection("Topics")
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot) {
                    resolve({type: 'topic', data: documentSnapshot.docs})
                }
            })
        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })

    return Promise.all([topics, articles])
}