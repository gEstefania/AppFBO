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