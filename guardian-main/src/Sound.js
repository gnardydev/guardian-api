var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var mic = new five.Sensor(2);
  var led = new five.Led(3);
  

  mic.on("change", function() {
    console.log(mic.value);
    led.brightness(this.value >> 2);
  });
});
