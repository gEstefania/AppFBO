import firestore,{ Timestamp} from '@react-native-firebase/firestore';
import {store} from '../redux/store'

export const createUserSocialRegiter = (userData) => {
    return new Promise(async(resolve, reject) => {
        try {
            let existUser = await firestore().collection("Users").where('email','==',userData.email).get()
            let docsQuery = existUser.docs
            let deviceToken = store.getState().config.deviceToken
            if(docsQuery.length === 0) {
                let registerData={
                    enabled: true,
                    group: [],
                    email: userData.email,
                    name: userData.name,
                    picture: userData?.picture || null,
                    role: "user",
                    myTags:[],
                    createdAt: firestore.Timestamp.now(),
                    updatedAt: firestore.Timestamp.now(),
                    tokens:deviceToken?[deviceToken]:[],
                    removed: false,
                }
                firestore()
                .collection('Users')
                .add(registerData)
                .then(async(doc) => {
                    let createdUser = await firestore().doc(doc.path).get()
                    resolve(createdUser);
                })
            }else{
                let oldTokens = docsQuery[0].data().tokens
                console.log(oldTokens)
                if(!oldTokens){
                    oldTokens =[]
                }else{
                    oldTokens = oldTokens.filter(t =>t!==deviceToken)
                }
                console.log("LOG DATA ",deviceToken?[...oldTokens,deviceToken]:[...oldTokens])
                await firestore()
                .collection('Users')
                .doc(docsQuery[0].id)
                .update({
                    tokens:deviceToken?[...oldTokens,deviceToken]:[...oldTokens]
                })
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

export const updateUserName=(userName)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let userId = store.getState().users.id
            await firestore()
                .collection("Users")
                .doc(userId)
                .update({ 
                    name: userName
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
            await firestore()
                .collection("Users")
                .doc(userId)
                .update({ 
                    enabled: false,
                    removed: true,
                    myTags: [],
                    tokens: [],
                }).then(() => {
                    console.log('User deleted!');
                });
            resolve({msg:"User deleted"})
        } catch (e) {
            reject({ error: e });
        }
    })
}

export const getUserData = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let userId = store.getState().users.id
            console.log('userId',userId) // se pierde el id
            let info = await
            firestore()
            .collection('Users')
            .doc(userId)
            .get()
            if(info){
                resolve(info.data())
            }
            
        } catch (e) {
            reject({ error: e });
            console.log('error en user user data', e)
        }
    })
}


export const unregisterDevice=()=>{
    return new Promise(async(resolve, reject) => {
        let user = store.getState().users
        let tokenDevice = store.getState().config.deviceToken
        firestore()
        .collection("Users")
        .doc(user.id)
        .update({
            tokens:user.tokens.filter(t=>t!==tokenDevice)
        })
        .then(()=>{
            resolve("unregister device")
        })
        .catch(e=>{
            reject(e)
        })
    })
}