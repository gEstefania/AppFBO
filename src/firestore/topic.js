import firestore from '@react-native-firebase/firestore';

export const getTopics=(catId, subCatId)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            firestore()
            .collection("Categories").doc(catId)
            .collection("Subcategories").doc(subCatId)
            .collection("Topics")
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot) {
                    console.log('documentSnapShot', documentSnapshot);
                    resolve(documentSnapshot.docs)
                }
            })
        }catch(e){
            reject({error:"Get topics firestore error."})
        }
    })
}