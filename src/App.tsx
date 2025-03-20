import { Container, Typography, Box, AppBar, Toolbar } from '@mui/material';
import FruitManager from './FruitManager';
import './App.css'
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#121212',
        }
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app-container">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Fruit Management</Typography>
                </Toolbar>
            </AppBar>

            <Box className="main-content">
                <Container maxWidth="md">
                    <Typography variant="h4" gutterBottom>
                        Manage Fruits
                    </Typography>

                    <FruitManager />
                </Container>
            </Box>
        </div>
    </ThemeProvider>
);
}

export default App
