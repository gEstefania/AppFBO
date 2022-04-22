import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/store'

export const getArticles=(catId, subCatId, topicId)=>{
    // Get private articles:
    const privateArticles = new Promise(async(resolve, reject)=>{
        try{
            let user = store.getState().users
            if(user.id){
                // obtener el campo grupo de la coleccion users
                let group = await firestore()
                .collection('Users')
                .doc(user.id)
                .get()
                let groupId = group.data().group
                console.log('GROUP', groupId);

                let querySubCategory = 
                firestore()
                .collection("Categories").doc(catId)
                .collection("Subcategories").doc(subCatId)
                .collection("Topics").doc(topicId);

                let articles = await
                firestore()
                .collection("Articles")
                .where('subcategory','==', querySubCategory)
                .where('group','array-contains-any',groupId)
                .get();
                
                resolve(articles.docs)
            }else{
                resolve([])
            }
            
        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })

    // Get public articles:
    const publicArticles = new Promise(async(resolve, reject)=>{
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
            .where('public', '==', true)
            .get();

            resolve(articles.docs)

        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })

    return Promise.all([publicArticles, privateArticles])
}

export const getArticle = (articleId) => {
    return new Promise(async(resolve, reject)=>{
        try{
            let article = await
            firestore()
            .collection("Articles")
            .doc(articleId)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot) {
                    resolve(documentSnapshot.data())
                }
            });
        }catch(e){
            reject({error:"Get data firestore error."})
        }
    })
}

export const getTopGeneralArticles = () => {
    const allArticles = new Promise (async(resolve, reject)=>{
        try {
            let articles = await
            firestore()
            .collection("FeaturedGeneralArticles")
            .get();

            resolve(articles.docs)

        } catch (e) {
            reject({error:"Get data firestore error.", e})
        }
    })

    let generalArticles = allArticles.then(res=>{
        let articlesSort = res.sort((a,b)=>{ return a.data().priority - b.data().priority})
        let articlesData = articlesSort.map(async(doc)=>{
            let getDataArticle = await getArticle(doc._data.articleId);
            return {...getDataArticle, ...doc};
        })
        return Promise.all(articlesData)
    })

    return generalArticles
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