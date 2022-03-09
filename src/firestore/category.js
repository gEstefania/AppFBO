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

export const getDataFromCategory=async(catId)=>{
    //Get subcategories:
    const subcategories = new Promise(async(resolve, reject)=>{
        try{
            let subCategories = await
            firestore()
            .collection("Categories").doc(catId)
            .collection("Subcategories").get()

            resolve({type: 'subcategory', data: subCategories.docs})

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

            let articles = await
            firestore()
            .collection("Articles")
            .where('subcategory','==', queryCategory)
            .get();

            resolve({type: 'article', data: articles.docs})

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

            let articles = await
            firestore()
            .collection("Articles")
            .where('subcategory','==', querySubCategory)
            .get();

            resolve({type: 'article', data: articles.docs})

        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })

    //Get topics
    const topics = new Promise(async(resolve, reject)=>{
        try{
            let topics = await 
            firestore()
            .collection("Categories").doc(catId)
            .collection("Subcategories").doc(subCatId)
            .collection("Topics")
            .get()

            resolve({type: 'topic', data: topics.docs})

        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })

    return Promise.all([topics, articles])
}