import { CircularProgress as MUICircularProgress, Container } from "@mui/material";


export const CircularProgress = () => {
    return (
        <Container style={{
            margin: '0 auto',
        }}>
            <MUICircularProgress />
        </Container>
    )
};