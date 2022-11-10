//Biblioteca do Arduino
var five = require("johnny-five");
var { Board, Servo, Proximity, Sensor } = require("johnny-five");
// var board = new five.Board();

const board = new Board(
  {
    port: "Com3"
});



//Requisições da API
const { application } = require("express");
const express = require("express");
const router = express.Router();

const app = express();

app.use(express.json());

board.on("ready", () => {

  app.get("/microfone", function (req, res){
  

    var response = {
        device:"microfone",
        data:"MuchNoise"
      }
    
    var mic = new Sensor(2);
    var value = 0;

    // console.log(mic.value);
  
    mic.on("data", ()=>{  
      value = mic.value;
      console.log(mic.value);

      response.device = "microfone";
      response.data = "MuchNoise";

      board.disconnect();
    });


    res.json(response);
    
  
  });
  

  app.get("/sensorMove", function (req, res) {

    const proximity = new Proximity({
      controller: "HCSR04",
      pin: 9
    });

    console.log("não passou no proximity");

    proximity.on("change", () => {

      // console.log("pasosu no proximity");

      const { centimeters } = proximity;
      //Create a new `motion` hardware instance.

      console.log(centimeters);
      // res.json({
      //   device: "sensorMove",
      //   data: centimeters
      // })

    });

  });

  app.post("/servoMotor", (req, res) => {

    //trancar porta
    const servo = new Servo.Continuous({
      pin: 6
    });

    if (req.body.ip === "admin") {
      if (req.body.data === "false") {
        console.log("teste")
        //Destrancar Porta
        servo.cw();
        // servo.stop();

        console.log("Porta Destrancada");
      } else {
        if (req.body.data === "true") {
          //Trancar Porta
          servo.ccw();
          // servo.stop();

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
  console.log("Servidor rodadno na url http://localhost:8081");
});

module.exports = router;
