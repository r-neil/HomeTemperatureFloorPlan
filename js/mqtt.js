
var officeTemp;
var MQTT
client = new Paho.MQTT.Client("10.0.1.14", Number(9001), "Wifi Temp Website");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription.
  console.log("onConnect");
  client.subscribe("openhab/office/temperature");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives. Updates HTML Div.
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  //Messages are in Celsius. Converts to Fahrenheit
  officeTemp = celsiusToFahrenheit(message.payloadString);
  console.log("office temp " + officeTemp);
  document.getElementById("officeTemp").innerHTML = officeTemp + "&deg;";
}

function celsiusToFahrenheit(value){
	return Math.round((Number(value) * (9/5)) + 32);
}