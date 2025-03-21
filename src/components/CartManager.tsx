import { useState, useEffect } from 'react';
import { Button, Box, } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getItemsFromCart, addItemToCart, removeItemFromCart } from '../details/cartService.ts'
import { Item } from '../details/cartTypes.ts'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

function CartManager() {
    const [currentCartId, setCurrentCartId]
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchAllItems(currentCartId);
    }, [currentCartId]);

    const fetchAllItems = async (cartId: number) => {
        const itemsInCart = await getItemsFromCart(cartId);
        setItems(itemsInCart);
    };

    const handleAddToCart = async (cartId: number, itemId: number) => {
        await addItemToCart(cartId, itemId);
        await fetchAllItems(cartId);
    };

    const handleRemoveFromCart = async (cartId: number, itemId: number) => {
        await removeItemFromCart(cartId, itemId);
        await fetchAllItems(cartId);
    };

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Name', width: 200},
        {field: 'description', headerName: 'Description', width: 200},
        {field: 'image', headerName: 'Picture', width: 200},
        {field: 'price', headerName: 'Price', width: 200},
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Button
                        onClick={() => handleAddToCart(currentCartId, params.row.id)}
                        startIcon={<Edit/>}
                        color="primary"
                        size="small"
                    >
                        Add to Cart
                    </Button>
                    <Button
                        onClick={() => handleRemoveFromCart(currentCartId, params.row.id)}
                        startIcon={<Delete/>}
                        color="secondary"
                        size="small"
                    >
                        Remove from Cart
                    </Button>
                </Box>
            ),
        },
    ];

    const rows: GridRowsProp = items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.price,
    }));

    return (
        <div>
            <Box style={{ height: 400, width: '100%', marginTop: 16 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Box>
        </div>
    );
}

export default CartManager;