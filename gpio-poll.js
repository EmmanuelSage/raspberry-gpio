const Gpio = require('onoff').Gpio;
const sensor = new Gpio(17, 'in'); // Create a Gpio instance for input

// Function to periodically poll the GPIO pin.
const pollGPIO = () => {
  // Read the pin state synchronously; returns 0 or 1.
  const value = sensor.readSync();
  console.log(`Polled GPIO pin 17 value: ${value}`);
};

// Set the polling interval (e.g., 500 milliseconds).
const pollInterval = setInterval(pollGPIO, 500);

// Ensure resources are released upon program exit.
process.on('SIGINT', () => {
  clearInterval(pollInterval);
  sensor.unexport();
  process.exit();
});
