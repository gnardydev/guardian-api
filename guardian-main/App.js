import MainContainer from './navigation/MainContainer';
import Rede from './components/Fetch';

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// require('dotenv/config');
// const cors = require('cors');
// app.use(cors()); //Utilizacao do cors para permitir uma checagem e utilizacao de requisicoes de forma mais facil

// //Routing
// //Using just to set a basic response for home page
// app.get('/', (req,res) => {
//   res.send('Home Page Landing')
// });

// app.listen(3000);

export default function App() 
{
  return (
    <MainContainer>
      <Rede></Rede>
    </MainContainer>
  );
}
