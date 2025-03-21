import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import {Box, Button } from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {useState} from "react";
import {Item} from '../details/cartTypes.ts'
import {addItemToCart, getItemsFromCart, removeItemFromCart} from "../details/cartService.ts";

function Menu() {
    const [items, setItems] = useState<Item[]>([]);

    const fetchAllItems = async (cartId: number) => {
        const itemsInCart = await getItemsFromCart(cartId);
        setItems(itemsInCart);
    };

    const handleAddToCart = async (cartId: number, itemId: number) => {
        await addItemToCart(cartId, itemId);
    };

    const handleRemoveFromCart = async (cartId: number, itemId: number) => {
        await removeItemFromCart(cartId, itemId);
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
                        onClick={() => handleAddToCart(params.row.id)}
                        startIcon={<Edit/>}
                        color="primary"
                        size="small"
                    >
                        Add to Cart
                    </Button>
                    <Button
                        onClick={() => handleRemoveFromCart(params.row.id)}
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

export default Menu;