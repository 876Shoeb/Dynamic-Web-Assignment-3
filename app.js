// Get the canvas element and its context
const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas width and height
const centerX = canvas.width / 2;
const centerY = canvas.height / 2 ;
const radius = canvas.width / 2 - 10;

// Function to draw the clock face
function drawClockFace() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

    // Draw the clock circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroukeStyle = "#000";
    ctx.lineWidth = 10;
    ctx.stroke();
    
    // Draw the clock ticks for hours
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30) * (Math.PI / 180); // Angle in radians (30 degrees per hour)
        const startX = centerX + Math.cos(angle) * (radius - 20);
        const startY = centerY + Math.sin(angle) * (radius - 20);
        const endX = centerX + Math.cos(angle) * (radius - 40);
        const endY = centerY + Math.sin(angle) * (radius - 40);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
}

// Function to draw the hands of the clock
function drawClockHands() {
    const now = new Date();
    const hour = now.getHours() % 12; // Get hour (0-11)
    const minute = now.getMinutes(); // Get minutes (0-59)
    const second = now.getSeconds(); // Get seconds (0-59)

    // Draw the second hand
    const secondAngle = (second * 6) * (Math.PI / 180); // 6 degrees per second
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(secondAngle - Math.PI / 2) * (radius - 10), 
               centerY + Math.sin(secondAngle - Math.PI / 2) * (radius - 10));
    ctx.strokeStyle = "#FF0000"; // Red for the second hand
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the minute hand
    const minuteAngle = (minute * 6 + second * 0.1) * (Math.PI / 180); // 6 degrees per minute + small second adjustment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(minuteAngle - Math.PI / 2) * (radius - 40), 
               centerY + Math.sin(minuteAngle - Math.PI / 2) * (radius - 40));
    ctx.strokeStyle = "#0000FF"; // Blue for the minute hand
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw the hour hand
    const hourAngle = ((hour % 12) * 30 + minute * 0.5) * (Math.PI / 180); // 30 degrees per hour + small minute adjustment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(hourAngle - Math.PI / 2) * (radius - 60), 
               centerY + Math.sin(hourAngle - Math.PI / 2) * (radius - 60));
    ctx.strokeStyle = "#000"; // Black for the hour hand
    ctx.lineWidth = 6;
    ctx.stroke();
}

// Function to update the clock every second
function updateClock() {
    drawClockFace();
    drawClockHands();
    setTimeout(updateClock, 1000); // Call the function every second
}

// Start the clock
updateClock();