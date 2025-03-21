import {Item} from './cartTypes.ts'

const API_URL = 'http://localhost:8000/cart/';

export const getItemsFromCart = async (cartId: number): Promise<Item[]> => {
    try {
        const response = await fetch(`${API_URL}${cartId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
};

export const addItemToCart = async (cartId: number, itemId: number): Promise<void> => {
    try {
        await fetch(`${API_URL}${cartId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId }),
        });
    } catch (error) {
        console.error('Error adding item:', error);
    }
};

export const removeItemFromCart = async (cartId: number, itemId: number): Promise<void> => {
    try {
        await fetch(`${API_URL}${cartId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId }),
        });
    } catch (error) {
        console.error('Error deleting item:', error);
    }
};
