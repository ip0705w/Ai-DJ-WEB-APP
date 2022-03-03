leftWristX=0;
leftWristY=0;
rigthWristX=0;
rigthWristY=0;
scoreLeftWrist=0;
scoreRigthWrist=0;

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


function start(){
  sound.play()
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
   
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreLeftwrist= " +scoreLeftWrist);
    
    scoreRigthWrist=results[0].pose.keypoints[10].score;

  }
}

function draw(){
  image(video,0,0,400,400);
  
  fill("#B71C1C");
  stroke("#212121");
  
  if(scoreLeftWrist > 0.2)
    {
      circle(leftWristX,leftWristY,20);
      number1=Number(leftWristY);
      floor1=floor(number1);
      volume=floor1/400;
    sound.setVolume(volume)
      console.log(volume);
      document.getElementById("vol").innerHTML="volume= " +volume;
      
    }
  if(scoreRigthWrist>0.2){
    circle(rigthWristX,rigthWristY,20);
    if(rigthWristY>0 && rigthWristY < 80){
      sound.rate(0.5)
      document.getElementByID("speed").innerHTML="speed=0.5"
    }
    else if(rigthWristY>80 && rigthWristY<160){
      sound.rate(1)
      document.getElementById("speed").innerHTML="speed=1"
    }
    else if(rigthWristY>160 && rigthWristY<240){
      sound.rate(1.5)
      document.getElementById("speed").innerHTML="speed=1.5"
    }
    else if(rigthWristY>240 && rigthWristY<320){
      sound.rate(2)
      document.getElementById("speed").innerHTML="speed=2"
    }
    else if(rigthWristY>320 && rigthWristY<400){
      sound.rate(2.5)
      document.getElementById?("speed").innerHTML="speed=2.5"
    }
  }
}

