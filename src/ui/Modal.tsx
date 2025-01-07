import { Box, Modal as MUIModal, Typography } from "@mui/material";
import { ReactNode } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};


type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    label: string;
}

export const Modal = ({ open, onClose, children, label }: ModalProps) => {
    return (

        <MUIModal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5">
                    {label}
                </Typography>
                {children}
            </Box>
        </MUIModal>

    );
};