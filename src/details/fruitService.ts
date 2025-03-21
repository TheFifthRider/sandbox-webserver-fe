import {Fruit} from './fruitTypes.ts'

const API_URL = 'http://localhost:8000/fruits/';

export const fetchFruits = async (): Promise<Fruit[]> => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching fruits:', error);
        return [];
    }
};

export const addFruit = async (newFruit: Omit<Fruit, 'id'>): Promise<void> => {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFruit),
        });
    } catch (error) {
        console.error('Error adding fruit:', error);
    }
};

export const updateFruit = async (id: number, updatedFruit: Omit<Fruit, 'id'>): Promise<void> => {
    try {
        await fetch(`${API_URL}${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFruit),
        });
    } catch (error) {
        console.error('Error updating fruit:', error);
    }
};

export const deleteFruit = async (id: number): Promise<void> => {
    try {
        await fetch(`${API_URL}${id}`, { method: 'DELETE' });
    } catch (error) {
        console.error('Error deleting fruit:', error);
    }
};