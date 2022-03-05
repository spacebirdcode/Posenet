let capture;
let posenet;
let singlePose, skeleton, score;
let rangle = 999, langle = 999;
let pi = Math.PI;

function setup() {
    createCanvas(800, 600);
    capture = createCapture(VIDEO)
    capture.hide();
    setInterval(callf, 6000);
}
function callf() {
    posenet = ml5.poseNet(capture);
    posenet.on('pose', receivedPoses);
}

function receivedPoses(poses) {
    console.log(poses);

    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
        score = poses[0].score
    }
}
//angle between  AB and BC 
function angle(Cx, Cy, Ax, Ay, Bx, By) {
    var AB = Math.sqrt(Math.pow(Bx - Ax, 2) + Math.pow(By - Ay, 2));
    var BC = Math.sqrt(Math.pow(Bx - Cx, 2) + Math.pow(By - Cy, 2));
    var AC = Math.sqrt(Math.pow(Cx - Ax, 2) + Math.pow(Cy - Ay, 2));
    let rad_angle = Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
    rangle = rad_angle * (180 / pi);


}

function draw() {

    // images and videos(webcam)
    image(capture, 0, 0);
    if (singlePose) {
        ellipse(singlePose.leftWrist.x, singlePose.leftWrist.y, 20);
        ellipse(singlePose.rightWrist.x, singlePose.rightWrist.y, 20);
        ellipse(singlePose.leftShoulder.x, singlePose.leftShoulder.y, 20);
        ellipse(singlePose.rightShoulder.x, singlePose.rightShoulder.y, 20);
        ellipse(singlePose.leftElbow.x, singlePose.leftElbow.y, 20);
        ellipse(singlePose.rightElbow.x, singlePose.rightElbow.y, 20);

        stroke(255, 255, 255);
        strokeWeight(2);

        if (skeleton.length > 1) {
            angle(singlePose.rightShoulder.x, singlePose.rightShoulder.y, singlePose.rightWrist.x, singlePose.rightWrist.y, singlePose.rightElbow.x, singlePose.rightElbow.y);
            textSize(12);
            text("Angle-Right Side:   " + rangle, 650, 30);
            /*
            for (let j = 1; j < skeleton.length; j++) {
                line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
            }
            */

        }

    }

}