import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Skeleton, TextField } from "@mui/material"
import React, { ChangeEvent, FormEvent } from "react";
import { mockAuthWithTimeout } from "../util/helper";
import { LoginComponentProps } from "../util/interfaces";


export const LoginView: React.FC<LoginComponentProps> = ({setLink}) => {
    const [user, setUser] = React.useState("");
    const [pwd, setPwd] = React.useState("")
    const [loading,setLoading] = React.useState<boolean>(false)

    const handleUserChange = (event: SelectChangeEvent) => {
        setUser(event.target.value as string);
    };

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            setLoading(true)
            const response = await mockAuthWithTimeout({  //Given time constrains, mocking auth for now
                link: '3bcd9822-8dd5-4710-a422-d3ac730df48e',ok: true },1000)

            if (response.ok) {
                const data = await response.json();
                setLoading(false)
                setLink(data.link)
            } else {
                setLoading(false)
                console.error('Login failed:', response.status);
            }
        } catch (error) {
            setLoading(false)
            console.error('Error during login:', error);
        }

    }
    return (
        <>
        {!loading ? ( <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2} p={2} alignContent="center" direction="column">
                <form onSubmit={handleSubmit}>
            <FormControl >
                <Grid item>
                        <InputLabel id="select-label">Selecciona un usuario</InputLabel>
                        <Select
                            value={user}
                            label="Selecciona un usuario"
                            labelId="select-label"
                            onChange={handleUserChange}
                            fullWidth
                        >
                            <MenuItem value={"bnk100"}>Bank 100</MenuItem>
                            <MenuItem value={"bnk103"}>Bank 103</MenuItem>
                        </Select>
                </Grid>
                <Grid item xs={8}>
                    <TextField label="Contraseña" variant="outlined" type="password" 
                    onChange={(e) => setPwd(e.target.value)} />
                </Grid>
                <Grid item xs={8}>
                    <Button fullWidth type="submit" variant="outlined">Ingresar</Button>
                </Grid>
            </FormControl>
            </form>
            </Grid>
        </Box>)
        : <><h1>Authenticating...</h1> 
        <Skeleton variant="circular" width={100} height={100} /></>
        }</>
    )
}