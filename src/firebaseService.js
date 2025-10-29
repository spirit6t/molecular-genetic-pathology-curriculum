// Firebase service for board questions operations
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'boardQuestions';

/**
 * Get all board questions from Firebase
 */
export const getAllQuestions = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const questions = [];
        querySnapshot.forEach((doc) => {
            questions.push({
                id: doc.id, // Use Firebase document ID
                ...doc.data()
            });
        });

        return questions;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
};

/**
 * Add a new question to Firebase
 */
export const addQuestion = async (question) => {
    try {
        const questionData = {
            ...question,
            isCustom: true,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), questionData);
        return {
            id: docRef.id,
            ...questionData
        };
    } catch (error) {
        console.error('Error adding question:', error);
        throw error;
    }
};

/**
 * Update an existing question in Firebase
 */
export const updateQuestion = async (questionId, updatedData) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, questionId);
        await updateDoc(docRef, {
            ...updatedData,
            updatedAt: Timestamp.now()
        });

        return {
            id: questionId,
            ...updatedData
        };
    } catch (error) {
        console.error('Error updating question:', error);
        throw error;
    }
};

/**
 * Delete a question from Firebase
 */
export const deleteQuestion = async (questionId) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, questionId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
};

/**
 * Get questions by topic
 */
export const getQuestionsByTopic = async (topicId) => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            orderBy('topic', 'asc'),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);

        const questions = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.topic === topicId) {
                questions.push({
                    id: doc.id,
                    ...data
                });
            }
        });

        return questions;
    } catch (error) {
        console.error('Error fetching questions by topic:', error);
        throw error;
    }
};

/**
 * Search questions by keyword
 */
export const searchQuestions = async (keyword) => {
    try {
        const allQuestions = await getAllQuestions();

        const searchTerm = keyword.toLowerCase();
        return allQuestions.filter(q =>
            q.question.toLowerCase().includes(searchTerm) ||
            q.subtopic?.toLowerCase().includes(searchTerm) ||
            q.explanation?.toLowerCase().includes(searchTerm)
        );
    } catch (error) {
        console.error('Error searching questions:', error);
        throw error;
    }
};

