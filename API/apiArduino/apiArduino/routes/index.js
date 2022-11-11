//Biblioteca do Arduino
var five = require("johnny-five");
var { Board, Servo, Proximity, Sensor } = require("johnny-five");

//Definir Placa do arduino a serem utilizadas
const board = new Board(
  {
    port: "Com3"
  });


//Requisições da API
const { application } = require("express");
const express = require("express");
const { response } = require("../app");
const router = express.Router();

const app = express();

app.use(express.json());

board.on("ready", () => {

  //Definir end point de requisição
  app.get("/microfone", function (req, res) {

    //Definir Porta
    var mic = new Sensor(2);

    //Ativar Microfone
    mic.enable();

    mic.on("data", () => {

      //Verificar valor dos decibeis detectados
      if (mic.value > 40) {

        res.json({
          device: "microfone",
          data: "MuchNoise"
        });
        mic.disable();

      }
      else {

        res.json({
          device: "microfone",
          data: "LowNoise"
        });
        mic.disable();
      }


    });

  });

  //Definir end point de requisição
  app.get("/sensorMove", function (req, res) {
    //Definir Porta e especificar dispositivo
    const proximity = new Proximity({
      controller: "HCSR04",
      pin: 9
    });

    proximity.within([1, 1000], "cm", function () {


      //Salvar centimentros do objeto
      const { centimeters } = proximity;

      res.json({
        device: "sensorMove",
        data: "moveDetected"
      });

    });


    res.json({
      device: "sensorMove",
      data: "moveNotDetected"
    });


  });

  //Definir end point de requisição
  app.post("/servoMotor", (req, res) => {

    //Definir Porta
    const servo = new Servo.Continuous({
      pin: 6
    });

    //Verificar usuar5io da requisição
    if (req.body.ip === "admin") {
      //Indentificar Requisição
      if (req.body.data === "false") {
        //Destrancar Porta
        servo.cw();
        console.log("Porta Destrancada");

      } else {
        if (req.body.data === "true") {
          //Trancar Porta
          servo.ccw();
          console.log("Porta Trancada");
        }
      }
      return res.send("SUCCESS: device modified");
    }

    return res.send("ERROR: User not permission");
  });

});
//

app.listen(8000, () => {
  console.log("Servidor rodadno na url http://localhost:8000");
});

module.exports = router;
