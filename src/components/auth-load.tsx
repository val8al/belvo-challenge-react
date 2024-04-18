import { Container, Grid, Skeleton } from "@mui/material"

export const AuthLoadingView: React.FC = () => {
    return (
        <Container sx={{ p: 4 }}>
        <h1>Autenticando...</h1>
        <Grid container alignContent="center">
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="circular" width={30} height={30} />
        </Grid>
        
        </Container>
    )
}