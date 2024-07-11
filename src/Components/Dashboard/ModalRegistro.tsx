import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  import axios, { Axios } from "axios";
  import { useState } from "react";
  
   interface Props {
     openModal: any;
     setOpenModal: any;
   }

   interface hob{
    Hobie: string[],
    edad: false
   }
  
  export default function ModalDatos(props: any) {
    const { openModal, setOpenModal, FetchData } = props;
    const [nombre, setNombre] = useState(" ");
    const [edad,setEdad] = useState(0);
    const [estudiante, setEstudiante] = useState<boolean>(false);
    const [direccion, setDireccion] = useState("");
    const [hobie, setHobie] = useState("");

  
    const closeModal = () => {
      setOpenModal(false);
    };
  
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  
    const saveDatos = async () => {
      let data = {
        Nombre: nombre,
        Edad: edad,
        Direccion: direccion,
        Estudiante:"",
        Hobie: hobie.split(",").map(hobie => hobie.trim())
      };
      console.log(data); 
        closeModal()
        FetchData()
      }
  
    return (
      <>
        <Modal open={openModal} onClose={closeModal}>
          <Box
            sx={{
              ...style,
              width: 400,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={12}>
              <label htmlFor="name">Nombre(s):</label>
                <TextField
                 
                  fullWidth
                  placeholder="Nombre & apellido"
                  multiline
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
                ></TextField>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
              <label htmlFor="number">Edad:</label>
                <TextField
                  placeholder="Pon tu edad"
                  type="number"
                  value={edad}
                  onChange={(event: any) => setEdad(event.target.value)}
                ></TextField>
              </Grid>

              <Grid item xs={12} md={6} lg={12}>
              <label htmlFor="dire">Dirección:</label>
                <TextField
                  fullWidth
                  placeholder="Direccion de tu domicilio"
                  multiline
                  value={direccion}
                  onChange={(event) => setDireccion(event.target.value)}
                ></TextField>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth>
                <FormLabel id="demo-controlled-radio-buttons-group">¿Eres un Estudiante?</FormLabel>
                  <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={estudiante}
                  onChange={(event : any) => setEstudiante(event.target.value)}
                  >
                  <FormControlLabel value="si" control={<Radio />} label="Si" />
                  </RadioGroup>

                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} lg={12}>
              <label htmlFor="name">Hobbies:</label>
                <TextField
                 
                  fullWidth
                  placeholder="Ingresa tus Hobbies"
                  multiline
                  value={hobie}
                  onChange={(event) => setHobie(event.target.value)}
                ></TextField>
              </Grid>


              <Grid item xs={12} md={6} lg={12}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={saveDatos}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </>
    );
  }