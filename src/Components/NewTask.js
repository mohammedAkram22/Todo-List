import Button from '@mui/material/Button';
import { red, grey } from '@mui/material/colors';
import TextField from '@mui/material/TextField';

export default function NewTask({ onClick }) {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "15px 0" }}>
            <TextField id="filled-basic" label="عنوان المهمة" variant="outlined" style={{ width: "100%", borderRadius: "10px", border: "solid 1px", borderColor: grey[200] }} />
            <Button style={{ backgroundColor: red[900], color: "white", padding: "16px 0" }}>إضافة</Button>
        </div>
    )
}