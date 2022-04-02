import firestore from '@react-native-firebase/firestore';
import { setSubcategory } from '../redux/actions/subcategoriesActions';
import { setCategory } from '../redux/actions/categoriesActions'; 
import { setCurrentArticle } from '../redux/actions/selectedArticleActions';
import { store } from '../redux/store';

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

export const getDataFromCategory=async(catId)=>{
    //Get subcategories:
    const subcategories = new Promise(async(resolve, reject)=>{
        try{
            firestore()
            .collection("Categories").doc(catId)
            .collection("Subcategories")
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot) {
                    //dispatch(setSubcategory(documentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}))))
                    //resolve({type: 'subcategory', data: documentSnapshot.docs})
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

export const getCategories = () => {
    return firestore()
        .collection("Categories")
        .where('enabled', '==', true)
        .onSnapshot(documentSnapshot => {
            if (documentSnapshot) {
                store.dispatch(setCategory(documentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}))))
            }
        })
}

export const getArticles = (catId) => {
    console.log('HLAAAA');
    let queryCategory = 
        firestore()
        .collection("Categories").doc(catId);
    return firestore()
        .collection("Articles")
        .where('subcategory','==', queryCategory)
        .onSnapshot(documentSnapshot => {
            if (documentSnapshot) {
                documentSnapshot.forEach(doc => {
                    console.log('DOCUMENT',doc);
                    store.dispatch(setCurrentArticle(
                        {
                            idCategory: catId,
                            type: 'article',
                            //data: doc.data()
                        }
                    ))
                }
            )}
        })
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