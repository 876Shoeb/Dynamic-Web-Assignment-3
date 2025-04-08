// Get the canvas element and its context
const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas width and height
const centerX = canvas.width / 2;
const centerY = canvas.height / 2 ;
const radius = canvas.width / 2 - 10;

let timeZoneOffset = 0; // Default to UTC

// Dropdown element for time zone selection
const timezoneSelect = document.getElementById('timezoneSelect');
timezoneSelect.addEventListener('change', (event) => {
    timeZoneOffset = parseInt(event.target.value);
    updateClock;
});

// Function to draw the clock face
function drawClockFace() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

    // Draw the clock circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 12 * Math.PI);
    ctx.strokeStyle = "#000";  // Fixed typo here
    ctx.lineWidth = 10;
    ctx.stroke();
    
    // Draw the clock numbers (1 through 12)
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    for (let i = 1; i <= 12; i++) {
        const angle = ((i-3) * Math.PI) / 6;
        const x = centerX + Math.cos(angle) * (radius - 20); // Position along x axis
        const y = centerY + Math.sin(angle) * (radius - 20); // Position along y axis
        ctx.fillText(i, x - 12, y + 12); // Draw the number (adjust position slightly for centering)
    }
}

// Function to draw the hands of the clock
function drawClockHands(offset) {
    const now = new Date();
    const localTime = new Date(now.getTime() + offset * 60 * 60 * 1000); // Adjust the time by the selected time zone offset
    console.log(localTime)

    const hour = localTime.getHours() % 12; // Get hour (0-11)
    const minute = localTime.getMinutes(); // Get minutes (0-59)
    const second = localTime.getSeconds(); // Get seconds (0-59)

    // Draw the second hand
    const secondAngle = (second * 6) * (Math.PI / 180); // 6 degrees per second
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(secondAngle - Math.PI / 2) * (radius - 10), 
               centerY + Math.sin(secondAngle - Math.PI / 2) * (radius - 10));
    ctx.strokeStyle = "#E4D94C"; // Color for the second hand
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the minute hand
    const minuteAngle = (minute * 6 + second * 0.1) * (Math.PI / 180); // 6 degrees per minute + small second adjustment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(minuteAngle - Math.PI / 2) * (radius - 40), 
               centerY + Math.sin(minuteAngle - Math.PI / 2) * (radius - 40));
    ctx.strokeStyle = "#64E033"; // Color for the minute hand
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw the hour hand
    const hourAngle = ((hour % 12) * 30 + minute * 0.5) * (Math.PI / 180); // 30 degrees per hour + small minute adjustment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(hourAngle - Math.PI / 2) * (radius - 60), 
               centerY + Math.sin(hourAngle - Math.PI / 2) * (radius - 60));
    ctx.strokeStyle = "#F83923"; // Color for the hour hand
    ctx.lineWidth = 6;
    ctx.stroke();
}

// Function to update the clock every second
function updateClock() {
    drawClockFace();
    drawClockHands(timeZoneOffset);
}

// Start the clock and update it every second
setInterval(updateClock, 1000); // Update clock every second
