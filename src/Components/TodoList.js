import Todo from "./Todo";
import Container from '@mui/material/Container';
import Divider from "@mui/material/Divider"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { red, grey } from '@mui/material/colors';
import { useContext, useState, useEffect } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from '../Context/TodosContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';




export default function TodoList() {

    const [titleInput, setTitleInput] = useState("")
    const [displayedTodoType, setDisplayedTodoType] = useState("all")

    const { todos, setTodos } = useContext(TodosContext)

    function handleAddClick() {
        if (titleInput) {
            const newTodo = {
                id: uuidv4(),
                title: titleInput,
                details: "",
                isCompleted: false
            };
            const updatedTodos = [...todos, newTodo]
            setTodos(updatedTodos)
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            setTitleInput("")
        }
    }
    const changeDisplayType = (e) => {
        setDisplayedTodoType(e.target.value)
    }


    const compltedTodos = todos.filter((t) => {
        return (t.isCompleted)
    })
    const nonCompltedTodos = todos.filter((t) => {
        return (!t.isCompleted)
    })

    let todosToBeRender = todos;

    if (displayedTodoType === "completed") {
        todosToBeRender = compltedTodos;
    } else if (displayedTodoType === "non-completed") {
        todosToBeRender = nonCompltedTodos;
    } else {
        todosToBeRender = todos;
    }

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? []
        if (storageTodos) {
            setTodos(storageTodos)
        }
    }, [])


    return (
        <Container maxWidth="xs" style={{ backgroundColor: "white", borderRadius: "10px", textAlign: "center", padding: "5px" }}>
            <Card sx={{ boxShadow: "0", maxHeight: "90vh", overflowY: "scroll", padding: "0" }} >
                <h1 style={{ margin: "0 0 20px" }}>مهامي</h1>
                <Divider />
                <CardContent sx={{ padding: 0 }}>
                    <div style={{ display: "flex", alignContent: "center", justifyContent: "center", gap: "10px", paddingTop: "20px" }}>
                        <ToggleButtonGroup
                            color="primary"
                            value={displayedTodoType}
                            exclusive
                            onChange={changeDisplayType}
                            aria-label="Platform"
                        >
                            <ToggleButton value="all">الكل</ToggleButton>
                            <ToggleButton value="completed">المنجز</ToggleButton>
                            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    {todosToBeRender &&
                        todosToBeRender.map((todo) => <Todo key={todo.id} todo={todo} />)}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "15px 0" }}>
                        <TextField id="filled-basic" label="عنوان المهمة" variant="outlined" style={{ width: "100%", borderRadius: "10px", border: "solid 1px", borderColor: grey[200] }} value={titleInput} onChange={(e) => { setTitleInput(e.target.value) }} />
                        <Button onClick={handleAddClick} style={{ backgroundColor: red[900], color: "white", padding: "16px 0" }} disabled={!titleInput.trim()}>إضافة</Button>
                    </div>
                </CardContent>
            </Card>
        </Container >
    )
}