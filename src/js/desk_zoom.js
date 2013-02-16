var canvas = null;
var context = null;
var framerate = 1000/30;
frame = 0;
var assets = ['/static/front00.png',
            '/static/front01.png',
            '/static/front02.png',
            '/static/front03.png',
            '/static/front04.png',
            '/static/front05.png',
            '/static/front06.png',
            '/static/front07.png',
            '/static/front08.png',
            '/static/front09.png',
            '/static/front10.png',
            '/static/front11.png',
            '/static/front12.png',
            '/static/front13.png',
            '/static/front14.png',
            '/static/front15.png',
            '/static/front16.png',
            '/static/front17.png',
            '/static/front18.png',
            '/static/front19.png',
            '/static/front20.png',
            '/static/front21.png',
            '/static/front22.png',
            '/static/front23.png',
            '/static/front24.png',
            '/static/front25.png',
            '/static/front26.png',
            '/static/front27.png',
            '/static/front28.png',
            '/static/front29.png',
            '/static/front30.png'
  			 ];

var frames = [];

var onImageLoad = function() {
	console.log("IMAGE!!!");
};

var onImageLoad2 = function(){
	console.log("IMAGE!!!");
    context.drawImage(img,5,8);
};

setup = function() {
	canvas = document.getElementById('screen');
	context = canvas.getContext('2d');
	//canvas.width = window.innerWidth;
	//canvas.height = window.innerHeight;

	for(var i = 0; i < assets.length; i++) {
		frames.push(new Image());
		frames[i].src = assets[i];
		frames[i].onload = onImageLoad;
	}
	setInterval(animate,framerate);
	
	img = new Image();
	img.onload = onImageLoad2;
	img.src = "/static/front30.png";
};

var animate = function(){
	context.clearRect(0,0,canvas.width,canvas.height)
	context.drawImage(frames[frame], 5,8);
	frame = (frame+1) % frames.length;
	if (frame+1 >= frames.length) {
		frame = frames.length-2;
	};
};

setup();