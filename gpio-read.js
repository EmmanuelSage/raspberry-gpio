// Import the Gpio class from the onoff library
// you can also use libraries such as rpio or pigpio 
const Gpio = require('onoff').Gpio;

const PIN = 17;

// Create a new Gpio instance for an input pin.
// The third parameter 'both' sets the trigger for both rising and falling edges.
// The third parameter sets the interrupt detection. It accepts 'none', 'rising', 'falling', or 'both'
// debounceTimeout will ignore rapid fluctuations occurring within 10 milliseconds.
const sensor = new Gpio(PIN, 'in', 'both', { debounceTimeout: 10 });

// Watch for changes on the GPIO pin.
sensor.watch((err, value) => {
  if (err) {
    console.error('Error reading GPIO:', err);
    return;
  }
  // Log the current value (0 or 1) whenever the pin changes state.
  console.log(`GPIO pin ${PIN} state is: ${value}`);
});

// Clean up when the process is terminated (using Ctrl+C).
process.on('SIGINT', () => {
  sensor.unexport(); // Release resources
  process.exit();
});
