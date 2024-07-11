import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { useState } from "react";


function Formulario() {

    const [entrada, setEntrada] = useState('');
    const [evnio, setEnvio] = useState('');
    const [tec, setTec] = useState('');

    const dato = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEntrada(event.target.value);
    }
  
    const env = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        alert(`Tu input dice: ${evnio}`)
    }

    const teclado = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log('Key pressed', event.key);
    }


    return ( 
        <>
        <form onSubmit={env} >
            <FormLabel>Datos del usuario: </FormLabel>
            <input type="text" value={entrada} onChange={dato} />
            <h1>{entrada}</h1>
            <FormLabel>Escribe algo: </FormLabel>
            <input type="text" value={evnio} onChange={(e) => setEnvio(e.target.value)} />
            <button type="submit"> Enviar </button>
            <FormLabel>Los datos aparecen en consola: </FormLabel>
            <input type="text" onKeyPress={teclado}/>
        </form>
        </>
     );
}

export default Formulario;