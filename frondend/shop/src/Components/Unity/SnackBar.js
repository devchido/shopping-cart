import React from "react";
import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SnackBar() {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("warning");
    const snackbarClose = () => {
    };
    return (
        <Snackbar
            sx={{ marginTop: "50px" }}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={snackbarClose}
        >
            <Alert
                severity={`${snackbarSeverity}`}
                action={[
                    <IconButton key={"close"} aria-label="Close" sx={{ p: 0.5 }} onClick={snackbarClose}>
                        <CloseIcon />
                    </IconButton>,
                ]}
            >
                {snackbarMsg}
            </Alert>
        </Snackbar>
    );
}
