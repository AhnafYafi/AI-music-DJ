song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        console.log(results);
        leftWrist = results[0].pose.leftWrist.x;
        leftWrist = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWrist = " + leftWristY);

        rightWrist = results[0].pose.rightWrist.x;
        rightWrist = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWrist = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPLaying();
    song2_status = song2.isPLaying();


    fill("#ff0303");
    stroke("#ff0303")

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song1_status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
        }
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if (song2_status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
        }
    }
}



function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}