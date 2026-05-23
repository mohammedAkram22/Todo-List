import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import TodoList from './Components/TodoList';
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from 'react'
import { v4 as uuidv4 } from "uuid";

import { TodosContext } from './Context/TodosContext';



// إنشاء كاش RTL
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// إنشاء ثيم صحيح بدون outerTheme
const theme = createTheme({
  typography: {
    fontFamily: "Alexandria",
  },
  direction: 'rtl',
  palette: {
    mode: 'light',
  },
});


function App() {
  const [todos, setTodos] = useState([])



  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div dir="rtl" style={{ backgroundColor: "#191b1f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/*  <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/completedTodos" element={<CompletedTodos />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>*/}
          <TodosContext.Provider value={{ todos, setTodos }} >
            <TodoList />
          </TodosContext.Provider>
        </div>
      </ThemeProvider>
    </CacheProvider >
  )
}

export default App;
