// Import the Gpio class from the onoff library
const Gpio = require('onoff').Gpio;

// Configure GPIO pin 17 as an output (using the BCM numbering scheme)
const led = new Gpio(17, 'out');

// Function to send a signal to the pin
function sendSignal(value) {
  // Write a digital value to the pin: 1 for HIGH, 0 for LOW
  led.writeSync(value);
  console.log(`Pin set to ${value}`);
}

// Example usage: Turn on the pin, wait 1 second, then turn it off
sendSignal(1);  // Sends HIGH signal (e.g., lights an LED)

// Use setTimeout to change the state after 1000 milliseconds
setTimeout(() => {
  sendSignal(0);  // Sends LOW signal (turns the LED off)
  
  // Clean up and free resources once done
  led.unexport();
}, 1000);
