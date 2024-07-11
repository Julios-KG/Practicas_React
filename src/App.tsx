
import "./App.css";
import { Box, Button, Container, Grid } from "@mui/material";
import Header from "./Components/Dashboard/Header";
import SideBar from "./Components/Dashboard/SideBar";
import Informacion from "./Components/Dashboard/Informacion";
import ModalRegistro from "./Components/Dashboard/ModalRegistro";
import { useState, useEffect } from "react";
import axios from "axios";
import Formulario from "./Components/Dashboard/formu";
import Likes from "./Components/Dashboard/like";
import ListaTask from "./Components/Dashboard/listaTask";
import Stopwatch from "./Components/Dashboard/cronometro";
import PrevImagen from "./Components/Dashboard/mage";
import CardLista from "./Components/Dashboard/CardList";
import Chats from "./Components/Dashboard/Chat";
import Exam from "./Components/Dashboard/ExamenGastos";
import Bots from "./Components/Dashboard/ExamenChat";
import Memorama from "./Components/Dashboard/ExamMemorama";
import ContadorEx from "./Components/Dashboard/ExamCont";
import JuegoMemo from "./Components/Dashboard/ExmMemo";
import Acm from "./Components/Dashboard/Exm";
import BlogDetalle from "./Components/Dashboard/AmeExm";
import Comida from "./Components/Dashboard/ExmPro";
import Cuest from "./Components/Dashboard/Cuestionario";
import Bodega from "./Components/Dashboard/Almacen";
import UtShop from "./Components/Dashboard/Tienda";
import Users from "./Components/Dashboard/NewUser";





function App() {
  const [openModal, setOpenModal] = useState(false);
  const [rows2, setRows2] = useState([]);
  
    //Cuando el componente esta siendo montado
  useEffect(() => {
    //Funcion para obtener datos de la API
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7280/Registro"
      );
      //const data = response.data.results;
      //console.log(data);
      //setRows2(data);
      console.log(response.data.result);
      var { data: { result } } = response;
      setRows2(result);
    } catch (error) {
      console.error("Error", error);
    }
  };



  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <SideBar />
        <Box
          component="main"
          sx={{
            width: "calc(100% - 260px)",
            flexGrow: 1,
            p: { xs: 0, sm: 1, lg: 2 },
            marginLeft: "260px",
          }}
        >
          <Grid item xs={12} md={12} lg={12}>
            <Header />
          </Grid>
 
      {/* <ListaTask/> 
          
       <Stopwatch/>

         <PrevImagen/> 

         <CardLista/> 

         <Chats/> */}

        {/*  <Exam/> */}

        {/* <Bots/> */}

        {/* <Memorama/> */}

        {/* <ContadorEx/> */}

       {/*  <JuegoMemo/> */}

       {/* <Acm/> */}

       {/* <BlogDetalle/> */}

       {/* <Comida/> */}

      {/*  <Cuest/>

       <Bodega/>

       <UtShop/>
 */}
      {/*  <Users/> */}

      </Box>
      </Box>
  
    </>
  );
}  

 export default App;

