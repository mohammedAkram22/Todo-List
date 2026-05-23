import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
// icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import { useContext, useState } from 'react'
import { TodosContext } from '../Context/TodosContext';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Todo({ todo }) {

    const { todos, setTodos } = useContext(TodosContext)

    const theme = createTheme({
        palette: {
            primary: {
                main: blue[800],
            },
            secondary: {
                main: '#f44336',
            },
        },
    });

    function handleCheckClick() {
        const updateTodos = todos.map((t) => {
            if (t.id === todo.id) {
                t.isCompleted = !t.isCompleted;
            }
            return t;
        })
        setTodos(updateTodos)
        localStorage.setItem("todos", JSON.stringify(updateTodos))
    }

    // Delete Modal

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleDeleteOpen = () => {
        setOpenDeleteModal(true);
    };
    const handleDeleteClose = () => {
        setOpenDeleteModal(false);
    };
    const handleDeleteConfirm = () => {
        const updatedTodos = todos.filter((t) => {
            if (t.id === todo.id) {
                return false;
            } else {
                return true;
            }
        });
        setTodos(updatedTodos)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
    }
    const deleteModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    // Edit Modal

    const [openEditModal, setOpenEditModal] = useState(false);
    const [UpdatedTodo, setUpdatedTodo] = useState({ title: todo.title, details: todo.details });

    const handleEditOpen = () => {
        setOpenEditModal(true);
    };

    const handleEditClose = () => {
        setOpenEditModal(false);
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        if (UpdatedTodo.title) {
            const updatedTodos = todos.map((t) => {
                if (t.id === todo.id) {
                    return {
                        ...t,
                        title: UpdatedTodo.title,
                        details: UpdatedTodo.details
                    };
                }
                return t;
            });

            setTodos(updatedTodos);
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            handleEditClose();
        }
    };

    const editModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "white",
    };

    return (
        <div className='todoCard' style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: theme.palette.primary.main, marginTop: "15px", padding: "10px", borderRadius: "10px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <h3 style={{ color: "white", fontSize: "20px", margin: "0", textAlign: "right", textDecoration: todo.isCompleted ? "line-through" : "none" }}>{todo.title}</h3>
                <p style={{ color: "white", fontSize: "14px", margin: "0", textAlign: "right" }}>{todo.details}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                <IconButton onClick={() => { handleCheckClick() }} className='IconButton' style={{ background: todo.isCompleted ? green[500] : "white", color: todo.isCompleted ? "white" : "#8bc34a", border: "solid #8bc34a 3px" }} aria-label="edit">
                    <CheckOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleEditOpen} className='IconButton' style={{ background: "white", color: "#1769aa", border: "solid #1769aa 3px" }} aria-label="edit">
                    <EditOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleDeleteOpen} className='IconButton' style={{ background: "white", color: "#b23c17", border: "solid #b23c17 3px" }} aria-label="edit">
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </div>

            {/*  Delete Modal  */}

            <Modal
                open={openDeleteModal}
                onClose={handleDeleteClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                style={{ direction: "rtl" }}
            >
                <Box sx={{ ...deleteModalStyle, width: 400 }}>
                    <h2 id="child-modal-title">هل تريد حذف المهمة ؟</h2>
                    <p id="child-modal-description" style={{ fontSize: "14px" }}>
                        لا يمكنك استرجاعها بعد الحذف !
                    </p>
                    <div style={{ textAlign: "end" }}>
                        <Button onClick={handleDeleteConfirm}>تأكيد</Button>
                        <Button onClick={handleDeleteClose}>إلغاء</Button>
                    </div>
                </Box>
            </Modal>

            {/*  Edit Modal  */}
            <Dialog open={openEditModal} onClose={handleEditClose} style={{ direction: "rtl" }}>
                <DialogTitle>تعديل المهمة</DialogTitle>
                <DialogContent style={{ width: "400px" }}>
                    <form onSubmit={handleEditSubmit} id="subscription-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="todoName"
                            name="name"
                            label="اسم المهمة"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={UpdatedTodo.title}
                            onChange={(e) => { setUpdatedTodo({ ...UpdatedTodo, title: e.target.value }) }}
                        />
                        <TextField
                            style={{ marginTop: "35px" }}
                            margin="dense"
                            id="todoDescription"
                            name="description"
                            label="التفاصيل"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={UpdatedTodo.details}
                            onChange={(e) => { setUpdatedTodo({ ...UpdatedTodo, details: e.target.value }) }}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>إلغاء</Button>
                    <Button type="submit" form="subscription-form">
                        تأكيد
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
} 