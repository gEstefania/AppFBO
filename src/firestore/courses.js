import firestore from '@react-native-firebase/firestore';
import { setLeassons } from '../redux/actions/lessonsActions';
import { setCourses } from '../redux/actions/coursesActions';
import { store } from '../redux/store';
import { setTasks } from '../redux/actions/tasksActions';

export const getActiveCourses = () => {
    return firestore()
        .collection("Courses")
        .where('enabled', '==', true)
        //.orderBy('createdAt', 'asc')
        .onSnapshot(documentSnapshot => {
            if (documentSnapshot) {
                store.dispatch(setCourses(documentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), users: doc.data()?.users?.length?doc.data().users.length:0 }))))
            }
        })
}

export const getCoursesLessons = (id) => {
    return firestore()
        .collection("Courses")
        .doc(id)
        .collection("Lessons")
        .where('enabled', '==', true)
        .onSnapshot(documentSnapshot => {
            if (documentSnapshot) {
                const lessons = documentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                store.dispatch(setLeassons(lessons))
                const lessons_filtered = lessons.sort((a,b)=> a.priority - b.priority)
            }
        })
}

export const setTaskLesson = (idCourse, idLesson) => {
    return firestore()
        .collection("Courses")
        .doc(idCourse)
        .collection("Lessons")
        .doc(idLesson)
        .collection("Tasks")
        .onSnapshot(documentSnapshot => {
            if (documentSnapshot) {
                documentSnapshot.forEach(doc => {
                    store.dispatch(setTasks(
                        {
                            lessonId: idLesson,
                            taskId: doc.id,
                            complete: false,
                            task: doc.data().task
                        }
                    ))
                })
            }
        })
}