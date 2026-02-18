import { useEffect, useState } from "react"
import { database } from "../firebase/config"
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database"

export const useRealtimeCollection = (collectionPath, _query) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // _query is an array: [field, operator, value] e.g. ['uid', '==', '123']
    // Realtime Database querying is more limited. 
    // We typically filter by ONE child key.

    useEffect(() => {
        let dbRef = ref(database, collectionPath)
        let q = dbRef

        // Simple query support for standard "uid == something" pattern
        // Note: Realtime DB requires an index for this to be efficient in production,
        // but works for small datasets without it.
        if (_query && _query.length === 3) {
            const [field, operator, value] = _query
            if (operator === '==') {
                q = query(dbRef, orderByChild(field), equalTo(value))
            }
        }

        const unsubscribe = onValue(q, (snapshot) => {
            const data = snapshot.val()
            console.log("Realtime Data:", data) // Debug log
            let results = []

            if (data) {
                // Convert object of objects to array of objects with id
                results = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key
                }))

                // Client-side sorting by creation time (descending) since 
                // Realtime DB sorting is limited combined with filtering
                results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            }

            setDocuments(results)
            setError(null)
        }, (err) => {
            console.error("Realtime Error:", err) // Debug log
            setError('could not fetch the data')
        })

        return () => unsubscribe()

    }, [collectionPath, _query?.[2]]) // depend on the value we are querying for

    return { documents, error }
}
