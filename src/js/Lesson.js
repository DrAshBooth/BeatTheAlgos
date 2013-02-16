// ----------------------------------------
// Actual game code goes here.

// Global vars
fps = null; 
canvas = null;
ctx = null;

// ----------------------------------------

// Our 'game' variables
var posX = 0;
var posY = 0;
var velX = 100;
var velY = 100;
var sizeX = 80;
var sizeY = 40;
var gravityY = 900;
var paused = true;

function GameTick(elapsed)
{
	fps.update(elapsed);

	// --- Input

	InputManager.padUpdate();
	
	// --- Logic
	
	if (InputManager.padPressed & InputManager.PAD.CANCEL)
		paused = !paused;

	if (!paused)
	{
		if ((InputManager.padPressed & InputManager.PAD.OK) && velY >= -10)
		{
			AudioManager.play("jump");
			velY = -1000;
		}

		// Movement physics
		posX += velX*elapsed;
		posY += (velY + 0.5*gravityY*elapsed)*elapsed;
		velY += gravityY*elapsed;
		// Collision detection and response
		var bouncedX = false, bouncedY = false;
		if ( (posX <= 0 && velX < 0) || (posX >= canvas.width-sizeX && velX > 0) )
		{
			velX = -velX;
			bouncedX = true;
		}
		if ( (posY <= 0 && velY < 0) || (posY >= canvas.height-sizeY && velY > 0) )
		{
			velY = -velY*0.7;
			bouncedY = true;
		}
		if (bouncedX)
			AudioManager.play("ping");
		if (bouncedY)
			AudioManager.play("bounce");
	}

	// --- Rendering

	// Clear the screen
	var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
	grad.addColorStop(0, '#06B');
	grad.addColorStop(0.9, '#fff');
	grad.addColorStop(0.9, '#3C0');
	grad.addColorStop(1, '#fff');
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// Render objects
	ctx.strokeRect(posX, posY, sizeX, sizeY);
	ctx.fillStyle = "red";
	ctx.font = "10px sans-serif";
	ctx.fillText("Hello World!", posX+10, posY+25);
	// Paused / Unpaused text
	ctx.fillStyle = "white";
	ctx.font = "22px sans-serif";
	ctx.fillText(paused? "Paused" : "Running", 380, 25);
}

$(document).ready(function () {
	canvas = document.getElementById("screen");
	ctx = canvas.getContext("2d");
	fps = new FPSMeter("fpsmeter", document.getElementById("fpscontainer"));
	InputManager.connect(document, canvas);

	// Async load audio and start gameplay when loaded
	AudioManager.load({
		'ping'   : 'sound/guitar',
		'jump'   : 'sound/jump',
		'bounce' : 'sound/bounce1'
	}, function() {
		// All done, go!
		InputManager.reset();
		GameLoopManager.run(GameTick);
	} );
});