import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {routes} from "./routes";
import {createTheme, ThemeProvider} from "@mui/material";
import {CtxProvider} from "./components/base/";
import './index.css'

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: "#000",
        },
        secondary: {
            main: "#333",
        },
    },
});


function App() {
    return (
        <CtxProvider>
            <Router>
                <ThemeProvider theme={defaultTheme}>
                    <Routes>
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.component}/>
                        ))}
                    </Routes>
                </ThemeProvider>
            </Router>
        </CtxProvider>
    );
}

export default App;
