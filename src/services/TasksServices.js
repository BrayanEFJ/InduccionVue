import { db } from '../main'


export const getTasks = async () => {
    const collection = db.collection('tareas')
    const snapshot = await collection.get()
    const tasks = []

    snapshot.forEach(doc => {
        const data = doc.data()
        data.id = doc.id
        tasks.push(data)
    })
    return tasks
}

export const addTask = async (taskData) => {
    const collection = db.collection('tareas')
    return await collection.add(taskData)
}

export const updateTask = async (id, updatedTaskData) => {
    const collection = db.collection('tareas')
    return await collection.doc(id).update(updatedTaskData)
}

export const deleteTask = async (id) => {
    const collection = db.collection('tareas')
    return await collection.doc(id).delete()
}
