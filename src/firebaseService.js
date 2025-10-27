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
        console.log('🔄 Fetching all questions from Firestore...');
        console.log('📁 Collection name:', COLLECTION_NAME);

        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        console.log('📊 Total questions found:', querySnapshot.size);

        const questions = [];
        querySnapshot.forEach((doc) => {
            console.log('📄 Question found:', doc.id, doc.data());
            questions.push({
                id: doc.id, // Use Firebase document ID
                ...doc.data()
            });
        });

        console.log('✅ Successfully loaded', questions.length, 'questions');
        return questions;
    } catch (error) {
        console.error('❌ Error fetching questions:');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Full error:', error);
        throw error;
    }
};

/**
 * Add a new question to Firebase
 */
export const addQuestion = async (question) => {
    try {
        console.log('🔄 Attempting to save question to Firestore...');
        console.log('📊 Question data:', question);
        console.log('📁 Collection name:', COLLECTION_NAME);

        const questionData = {
            ...question,
            isCustom: true,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        };

        console.log('💾 Prepared question data:', questionData);
        console.log('🗄️ Database instance:', db);

        const docRef = await addDoc(collection(db, COLLECTION_NAME), questionData);
        console.log('✅ Successfully saved question with ID:', docRef.id);

        return {
            id: docRef.id,
            ...questionData
        };
    } catch (error) {
        console.error('❌ Error adding question to Firestore:');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Full error:', error);
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

