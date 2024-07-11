import { Box, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Tabla(props:any) {
  //const [row2, setRows2] = useState([]);
  const [Show, setShow] = useState(false)
  const {rows2} = props;


  useEffect(() => {
    if(Show === true)
      alert("Update del Componente");
  }, [Show])

  const columns: GridColDef[] = [
    //Field sirve para el nombre de la propiedad del dato a obtener
    {
      field: "nombre",
      headerName: "Nombre",
      width: 100,
    },
    {
      field: "edad",
      headerName: "Edad",
      width: 100,
    },
    {
      field: "direccion",
      headerName: "Direccion",
      width: 100,
    },
    {
      field: "estudiante",
      headerName: "Estudiante",
      width: 100,
    },
    {
      field: "hobbies",
      headerName: "Hobbies",
      width: 100,
    },
  ];

  return (
    <Box>
      <Paper>
        <Grid item xs={12} md={12} lg={12}>
          <Typography>
            <strong>Formulario</strong>
          </Typography>
          
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <DataGrid
            rows={rows2}
            columns={columns}
            getRowId={(row) => row.pkRegistro}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </Grid>
      </Paper>
    </Box>
  );
}