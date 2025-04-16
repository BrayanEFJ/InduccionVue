import { db } from '../main'


export const getEvents = async () => {
    const collection = db.collection('eventos')
    const snapshot = await collection.get()
    const events = []

    snapshot.forEach(doc => {
        const data = doc.data()
        data.id = doc.id
        events.push(data)
    })
    return events
}

export const addEvent = async (eventData) => {
    const collection = db.collection('eventos')
    return await collection.add(eventData)
}

export const updateEvent = async (id, updatedData) => {
    const collection = db.collection('eventos')
    return await collection.doc(id).update(updatedData)
}

export const deleteEvent = async (id) => {
    const collection = db.collection('eventos')
    return await collection.doc(id).delete()
}
