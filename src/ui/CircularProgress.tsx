import { CircularProgress as MUICircularProgress, Container } from "@mui/material";


export const CircularProgress = () => {
    return (
        <Container style={{
            position: "absolute",
            top: "50%",
            left: "50%",
        }}>
            <MUICircularProgress />
        </Container>
    )
};