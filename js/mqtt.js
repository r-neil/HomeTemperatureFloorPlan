
var officeTemp;
var MQTTHost = "10.0.1.14";
var MQTTPort = Number(9001);
var MQTTName = "Wifi Temp Website";


//MQTT Subscribe Topics
var officeSubTopic = "office";
var masterBedSubTopic = "masterbedroom";
var bedroomSubTopic = "bedroom";
var nurserySubTopic = "nursery";
var bathroomSubTopic =  "bathroom";
var masterBathSubTopic = "masterBath";


//Setup MQTT  client
client = new Paho.MQTT.Client(MQTTHost, MQTTPort, MQTTName);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription.
  console.log("onConnect");
  client.subscribe(officeSubTopic);
  client.subscribe(masterBedSubTopic);
  client.subscribe(bedroomSubTopic);
  client.subscribe(nurserySubTopic);
  client.subscribe(bathroomSubTopic);
  client.subscribe(masterBathSubTopic);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives. Updates HTML Div.
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.destinationName);

  //Messages are in Celsius. Converts to Fahrenheit
  tempStr = celsiusToFahrenheit(message.payloadString) + "&deg;";
  console.log("temp is " + tempStr);

  if (message.destinationName == officeSubTopic){
    document.getElementById("officeTemp").innerHTML = tempStr;
  }
  else if (message.destinationName == masterBedSubTopic){
    document.getElementById("masterBedTemp").innerHTML = tempStr;
  }
  else if (message.destinationName == bedroomSubTopic){
    document.getElementById("bedroomTemp").innerHTML = tempStr;
  }
  else if (message.destinationName == nurserySubTopic){
    document.getElementById("nurseryTemp").innerHTML = tempStr;
  }
  else if (message.destinationName == bathroomSubTopic){
    document.getElementById("bathroomTemp").innerHTML = tempStr;
  }
  else if (message.destinationName == masterBathSubTopic){
    document.getElementById("masterbathTemp").innerHTML = tempStr;
  }
  
}

function celsiusToFahrenheit(value){
	return Math.round((Number(value) * (9/5)) + 32);
}