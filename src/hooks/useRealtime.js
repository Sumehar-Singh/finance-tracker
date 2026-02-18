import { useState, useEffect, useReducer } from "react"
import { database } from "../firebase/config"
import { ref, push, remove, set } from "firebase/database"

let initialState = {
    isPending: false,
    error: null,
    success: null
}

const realtimeReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { isPending: false, success: true, error: null }
        case 'ERROR':
            return { isPending: false, success: false, error: action.payload }
        default:
            return state
    }
}

export const useRealtime = () => {
    const [response, dispatch] = useReducer(realtimeReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // add a document (push to list)
    const addDocument = async (collectionPath, doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const dbRef = ref(database, collectionPath)
            const createdAt = new Date().toISOString()
            await push(dbRef, { ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT' })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    // delete a document
    const deleteDocument = async (collectionPath, id) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const docRef = ref(database, `${collectionPath}/${id}`)
            await remove(docRef)
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }
}
