import firestore,{Timestamp} from '@react-native-firebase/firestore';

export const createUserSocialRegiter = (userData) => {
    return new Promise(async(resolve, reject) => {
        try {
            let existUser = await firestore().collection("Users").where('email','==',userData.email).get()
            let docsQuery = existUser.docs
            if(docsQuery.length === 0) {
                let registerData={
                    email: userData.email,
                    name: userData.name,
                    picture: userData.picture,
                    role: "user",
                    group: [],
                    category: [],
                    createdAt: firestore.Timestamp.now(),
                    updatedAt: firestore.Timestamp.now()
                }
                firestore()
                .collection('Users')
                .add(registerData)
                .then((doc) => {
                    resolve(doc);
                })
            }else{
                resolve(docsQuery[0])
            }
            
        } catch (e) {
            reject({ error: e });
        }
    })
}