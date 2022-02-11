leftWristX=0
leftWristY=0
rigthWristX=0
rigthWristY=0

function preload(){
  sound=loadSound("music.mp3");
}

function setup(){
  canvas=createCanvas(400,400);
  canvas.center();
  
  
  video=createCapture(VIDEO);
  video.hide();
  
  poseNet= ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses)
}

function modelLoaded(){
  console.log('PoseNet is Loaded');
}

function draw(){
  image(video,0,0,400,400);
  
}
function start(){
  sound.play();
  sound.setVolume(1);
  sound.rate(1);
}

function gotPoses(results){
  if(results.length > 0){
    console.log(results);
    leftWristX= results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftwristX= " +leftWristX +"leftwristY= " +leftWristY);
    
    rightWristX= results[0].pose.rightWrist.x;
    rightWristY= results[0].pose.rightWrist.y;
    console.log("rightwristX= " +rightWristX + "rightWristY= " + rightWristY);
  }
}
