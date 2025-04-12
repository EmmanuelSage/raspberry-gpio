const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');

// Function to toggle the LED state asynchronously
function toggleLed() {
  // Read the current pin state first
  const currentState = led.readSync();
  // Toggle the state: if it's 1, switch to 0, and vice versa
  const newState = currentState ^ 1;

  // Write the new state asynchronously
  led.write(newState, (err) => {
    if (err) {
      console.error('Error writing to GPIO:', err);
      return;
    }
    console.log(`Pin toggled to ${newState}`);
  });
}

// Toggle the LED every 500 milliseconds
const interval = setInterval(toggleLed, 500);

// Graceful cleanup on termination
process.on('SIGINT', () => {
  clearInterval(interval);
  led.writeSync(0);  // Ensure the LED is turned off
  led.unexport();    // Free the GPIO resource
  process.exit();
});
