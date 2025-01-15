import { Box, Modal as MUIModal, Typography } from "@mui/material";
import { ReactNode, useEffect } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};


type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    label: string;
}

export const Modal = ({ open, onClose, children, label }: ModalProps) => {

    useEffect(() => {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            if (open) {
                mainContent.setAttribute('inert', 'true');
            } else {
                mainContent.removeAttribute('inert');
            }
        }

        return () => {
            if (mainContent) {
                mainContent.removeAttribute('inert');
            }
        };
    }, [open]);

    return (

        <MUIModal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" sx={{ textAlign: 'center' }}>
                    {label}
                </Typography>
                {children}
            </Box>
        </MUIModal>

    );
};