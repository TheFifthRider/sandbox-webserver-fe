import { useState, useEffect } from 'react';
import { Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { fetchFruits, addFruit, updateFruit, deleteFruit } from '../details/fruitService.ts';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface Fruit {
    id: number;
    name: string;
    color: string;
    pricePerKg: number;
}

function FruitManager() {
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);
    const [fruitName, setFruitName] = useState<string>('');
    const [fruitColor, setFruitColor] = useState<string>('');
    const [fruitPricePerKg, setFruitPricePerKg] = useState<number>(0);

    useEffect(() => {
        fetchAllFruits();
    }, []);

    const fetchAllFruits = async () => {
        const fruitList = await fetchFruits();
        setFruits(fruitList);
    };

    const handleAddFruit = async () => {
        const newFruit = { name: fruitName, color: fruitColor, pricePerKg: fruitPricePerKg };
        await addFruit(newFruit);
        fetchAllFruits();
        closeDialog();
    };

    const handleUpdateFruit = async () => {
        if (!selectedFruit) return;
        const updatedFruit = { name: fruitName, color: fruitColor, pricePerKg: fruitPricePerKg };
        await updateFruit(selectedFruit.id, updatedFruit);
        fetchAllFruits();
        closeDialog();
    };

    const handleDeleteFruit = async (id: number) => {
        await deleteFruit(id);
        fetchAllFruits();
    };

    const openDialogForAdd = () => {
        setIsEditing(false);
        setFruitName('');
        setFruitColor('');
        setFruitPricePerKg(0); // Reset the price per kg
        setOpenDialog(true);
    };

    const openDialogForEdit = (fruit: Fruit) => {
        setIsEditing(true);
        setSelectedFruit(fruit);
        setFruitName(fruit.name);
        setFruitColor(fruit.color);
        setFruitPricePerKg(fruit.pricePerKg); // Set the price per kg from the selected fruit
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
        setSelectedFruit(null);
    };

    // Columns for the DataGrid
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'color', headerName: 'Color', width: 200 },
        { field: 'pricePerKg', headerName: 'Price per Kilogram', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button
                        onClick={() => openDialogForEdit(params.row)}
                        startIcon={<Edit />}
                        color="primary"
                        size="small"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDeleteFruit(params.row.id)}
                        startIcon={<Delete />}
                        color="secondary"
                        size="small"
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    // Format rows for the DataGrid
    const rows: GridRowsProp = fruits.map((fruit) => ({
        id: fruit.id,
        name: fruit.name,
        color: fruit.color,
        pricePerKg: fruit.pricePerKg,
    }));

    return (
        <div>
            <Button variant="contained" color="primary" onClick={openDialogForAdd}>
                Add Fruit
            </Button>

            <Box style={{ height: 400, width: '100%', marginTop: 16 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Box>

            <Dialog open={openDialog} onClose={closeDialog}>
                <DialogTitle>{isEditing ? 'Edit Fruit' : 'Add Fruit'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        value={fruitName}
                        onChange={(e) => setFruitName(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Color"
                        fullWidth
                        value={fruitColor}
                        onChange={(e) => setFruitColor(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Price per Kilogram"
                        fullWidth
                        value={fruitPricePerKg}
                        onChange={(e) => setFruitPricePerKg(parseFloat(e.target.value))}
                        margin="normal"
                        type="number"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={isEditing ? handleUpdateFruit : handleAddFruit} color="primary">
                        {isEditing ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FruitManager;