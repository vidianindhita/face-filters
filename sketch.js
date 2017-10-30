let ctracker; // face tracker
let radio; // radio input
let videoInput; // video input
let xPosRectMask = 10; // rectangle boo x position
let xStepRectMask = 100; // rectangle boo x step

function preload() {

    // uploading images
    imgMask = loadImage("assets/spirited-away.png");
    imgDaftPunk = loadImage("assets/daft.png");
    imgDogNose = loadImage("assets/dog-nose.png");
    imgDogEarRight = loadImage("assets/dog-ear-right.png");
    imgDogEarLeft = loadImage("assets/dog-ear-left.png");
}

function setup() {

    // setup camera capture
    videoInput = createCapture();
    videoInput.size(800, 600);
    videoInput.position(200, 110);
    videoInput.loop();

    // setup canvas
    var cnv = createCanvas(800, 600);
    cnv.position(200, 110);

    // setup tracker
    ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(videoInput.elt);

    // create radio options
    radio = createRadio();
    radio.option("cool", 1);
    radio.option("dog", 2);
    radio.option("boo", 3);
    radio.option("punk", 4);
    radio.option("fog", 5);

    // styling radio
    radio.style('width', '60px');
    radio.style('font-family', '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif');
    radio.style('line-height', '200%');
    radio.position(1020, 120);
}

function draw() {
    clear();
    noStroke();
    var val = radio.value();

    // draw each function based on radio selected
    if (val == 1) {
        drawFilterCool();
    } if (val == 2) {
        drawDogFace();
    } if (val == 3) {
        drawMask();
    } if (val == 4) {
        drawDaftPunk();
    } if (val == 5) {
        drawVidPixel();
    }
}

function drawFilterCool() {
    drawGlasses();
    drawHat();
}

function drawGlasses() {
    // get array of face marker positions [x, y] format
    var positions = ctracker.getCurrentPosition();
    for (var i=0; i<positions.length; i++) {

        // draw shapes based on marker positions
        if (i == 27) {
            fill(0);
            ellipse(positions[i][0], positions[i][1], 80, 80);
            rect(positions[i][0], positions[i][1], 3, 20);
        }
        if (i == 25) {
            fill(0);
            rect(positions[i][0], positions[i][1], 60, 10);
        }
        if (i == 32) {
            fill(0);
            ellipse(positions[i][0], positions[i][1], 80, 80);
        }
    }
}

function drawHat() {
    // get array of face marker positions [x, y] format
    var positions = ctracker.getCurrentPosition();
    for (var i=0; i<positions.length; i++) {

        // draw shapes based on marker positions
        if (i == 20) {
            push();
            translate(-70, -60);
            fill(100, 50, 60);
            rect(positions[i][0], positions[i][1], 280, 25);
            pop();

            push();
            translate(-30, -140);
            fill(100, 50, 60);
            rect(positions[i][0], positions[i][1], 200, 100);
            pop();
        }
    }
}

function drawVidPixel() {
    // draw transparent rectangle
    fill(255, 255, 255, 50);
    rect(0, 0, 800, 600);

    // make video as pixels
    videoInput.loadPixels();

    // draw pixels
    for (var cy = 0; cy < videoInput.height; cy += 1) {
        for (var cx = 0; cx < videoInput.width; cx += 1) {
            var offset = ((cy*videoInput.width)+cx)*4;
            var xpos = (cx / videoInput.width) * width;
            var ypos = (cy / videoInput.height) * height;
            rect(xpos, ypos, 10, 10 * (videoInput.pixels[offset+1]/255));
        }
    }
}

function drawMask() {
    // draw transparent rectable on top
    fill(0, 0, 0, 200);
    rect(0, 0, 800, 600);

    // draw strips
    for (var i = 0; i < 10; i++) {
        fill(0, 0, 0, 200);
        rect(xPosRectMask+(xStepRectMask*i), 0, 40, 600);
    }

    // put image based on face tracker
    var positions = ctracker.getCurrentPosition();
    for (var i=0; i<positions.length; i++) {
        if (i == 62) {
            translate(-94, -160);
            image(imgMask, positions[i][0], positions[i][1]);
        }
    }
}

function drawDaftPunk() {    
    // draw transparent rectangle
    fill(53, 0, 81, 120);
    rect(0, 0, 800, 600);

    // make video as pixels
    videoInput.loadPixels();

    // draw pixels
    var stepSize = round(constrain(20, 6, 32));
        for (var y=0; y<height; y+=stepSize) {
        for (var x=0; x<width; x+=stepSize) {
          var i = y * width + x;
          var darkness = (255 - videoInput.pixels[i*4]) / 255;
          var radius = stepSize * darkness;
          fill(random(255));
          ellipse(x, y, radius, radius);
        }
    }

    // put image based on face tracker
    var positions = ctracker.getCurrentPosition();
    for (var i=0; i<positions.length; i++) {
        if (i == 62) {
            push();
            translate(-150, -240);
            image(imgDaftPunk, positions[i][0], positions[i][1]);
            pop();
        }
    }
}

function drawDogFace() {
    // put image based on face tracker
    var positions = ctracker.getCurrentPosition();
    for (var i=0; i<positions.length; i++) {
        if (i == 62) {
            push();
            translate(-57, -20);
            image(imgDogNose, positions[i][0], positions[i][1]);
            pop();
        }
        if (i == 20) {
            push();
            translate(-100, -150);
            image(imgDogEarRight, positions[i][0], positions[i][1]);
            pop();
        }
        if (i == 16) {
            push();
            translate(-20, -150);
            image(imgDogEarLeft, positions[i][0], positions[i][1]);
            pop();
        }
    }
}