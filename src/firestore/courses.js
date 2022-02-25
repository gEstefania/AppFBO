import firestore from '@react-native-firebase/firestore';
import { setLeassons } from '../redux/actions/lessonsActions';
import { setCourses } from '../redux/actions/coursesActions';

import {store} from '../redux/store';
export const getActiveCourses = () => {
    return firestore()
        .collection("Courses")
        .orderBy('createdAt', 'asc')
        .onSnapshot(documentSnapshot => {
            if(documentSnapshot){
                store.dispatch(setCourses(documentSnapshot.docs.map(doc=>({id:doc.id,...doc.data(),users:doc.data().users.length}))) )
            }  
        })


}

export const getCoursesLessons=(id)=>{
    return firestore()
        .collection("Courses")
        .doc(id)
        .collection("Lessons")
        .onSnapshot(documentSnapshot => {
            if(documentSnapshot){

                store.dispatch(setLeassons(documentSnapshot.docs.map(doc=>({id:doc.id,...doc.data()}))) )
            }  
        })
}