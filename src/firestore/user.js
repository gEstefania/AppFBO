import firestore,{ Timestamp} from '@react-native-firebase/firestore';
import {store} from '../redux/store'

export const createUserSocialRegiter = (userData) => {
    return new Promise(async(resolve, reject) => {
        try {
            let existUser = await firestore().collection("Users").where('email','==',userData.email).get()
            let docsQuery = existUser.docs
            if(docsQuery.length === 0) {
                let registerData={
                    email: userData.email,
                    name: userData.name,
                    picture: userData?.picture || null,
                    role: "user",
                    myTags:[],
                    createdAt: firestore.Timestamp.now(),
                    updatedAt: firestore.Timestamp.now()
                }
                firestore()
                .collection('Users')
                .add(registerData)
                .then(async(doc) => {
                    console.log("CREATED USER")
                    let createdUser = await firestore().doc(doc.path).get()
                    resolve(createdUser);
                })
            }else{
                console.log("ENTRO AQUI", docsQuery[0])
                resolve(docsQuery[0])
            }
            
        } catch (e) {
            reject({ error: e });
            console.log('error en user register')
        }
    })
}

export const editMyTags=(categoriesId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let userId = store.getState().users.id
            await firestore()
                .collection("Users")
                .doc(userId)
                .update({ 
                    myTags:categoriesId.map(cat=>firestore().doc(`Tags/${cat.id}`))
                })
            let userUpdated = await firestore().collection("Users").doc(userId).get()
            if(userUpdated){
                resolve(userUpdated)
            }
            
            
        }catch(e){
            reject({error:e});
        }
    })
}



export const unsubscribeUser = () => {
    return new Promise(async(resolve,reject)=>{
        try {
            let userId = store.getState().users.id
            console.log(userId)
            firestore()
            .collection('Users')
            .doc(userId)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
            resolve({msg:"User deleted"})
        } catch (error) {
            reject({ error: e });
        }
    })
}
