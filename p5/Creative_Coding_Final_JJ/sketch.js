//Global variables needed for the song and the FFT analysis
let mySong
let fft
let img

//Preload function to load the sound file
function preload() {
  mySong = loadSound('World.mp3'); //Gets the sound file from the same folder
  img = loadImage('Moon.WEBP'); //Gets the iamge file for the background from the same folder

}


function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES) //Changes the angle mode to degrees
  imageMode(CENTER) //Sets the background image to the center

  fft = new p5.FFT();//FFT is used here to "analysis algorithm that isolates individual audio frequencies within a waveform." (p5.js reference)

  img.filter(BLUR, 1) //This is used the blur out the background iamge

}

function draw() {
  background(0); //Sets the background to black
  stroke(255);
  strokeWeight(2);
  noFill();

  translate(width/2, height/2) //Puts the equaliser in the middle of the canvas

  fft.analyze()
  amp = fft.getEnergy(20,200)

  push() //Push and pop is here to only effect the script between them
    if (amp > 210) {
      rotate(random(-0.5, 0.5)) //This makes the background shake if the amplitude is above 230
    }
    image(img, 0, 0, width, height) //Puts the background in the middle of the canvas
  pop()

  let wave = fft.waveform();

  beginShape() //This is what makes the lines of the equaliser connect to look more natural
  for (let i = 0; i <= 180; i += 0.2) { //Since we want it to be a circle we only go to 180 and then mirror it, and also by changing how much we increase it by changes the intensity of the waves
    let index = floor(map(i, 0, 180, 0, wave.length - 1)); //This is what maps the angle to the index of the wave array, so that we can get the correct
    let r = map(wave[index], -1, 1, 150, 350)
    let x = r * sin(i)
    let y = r * cos(i)
    vertex(x, y); 
    }
  endShape()


    //This is the mirrored version of the one above but with the sin a - to flip it to the other side
  beginShape() 
  for (let i = 0; i <= 180; i += 0.2) { 
    let index = floor(map(i, 0, 180, 0, wave.length - 1));
    let r = map(wave[index], -1, 1, 150, 350)
    let x = r * -sin(i)
    let y = r * cos(i)
    vertex(x, y); 
    }
    endShape()

}

//Pause and play function
function mouseClicked() {
  //This basically just says if sound is playing then pause it, if not then play it and you can click to change thje toggle
  if (mySong.isPlaying()) {
    mySong.pause();
    noLoop(); //This is here to stop the draw function when paused, which will show the waves pause where they are and not just reset to normal
  } else {
    mySong.play();
    loop(); 
  }
}
