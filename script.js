const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  //faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  //faceapi.nets.faceRecognitionNet.loadFromUri('models'),
  //faceapi.nets.faceExpressionNet.loadFromUri('models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

var counter = 0;
const arr_ = [8, 19, 24, 30, 31, 50];
var k = 1;

function detectGraph(pt, ctx) {
  if (arr_.includes(counter)) {
    k = k * -1;
    x0 = pt._x;
    y0 = pt._y - 35;

    ctx.beginPath()
    ctx.strokeStyle = "#fff"
    ctx.fillStyle = "#fff";
    ctx.arc(x0, y0, 4, 0, 2 * Math.PI, true)
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(pt._x, pt._y - 35);
    ctx.lineTo(pt._x - k * 2 * face_half, pt._y - 100);
    ctx.stroke()

    for (var i = 0; i < 10; i++) {
        var dx = 1 * i;
        ctx.strokeStyle = "fff";
        ctx.lineWidth = 2;
        ctx.beginPath()
        ctx.moveTo(pt._x - k * 2 * face_half - dx, pt._y - 100);
        ctx.lineTo(pt._x - k * 2 * face_half - dx, pt._y - 100 - 50 * Math.random());
        ctx.stroke()
    }
  }
  counter++
}


const r = 10;
const incr = Math.PI / 50;
var theta = 0;
	
function detectWheel(pt, ctx) {
    
    var xc = pt._x;
    var yc = pt._y - 40;

    if (arr_.includes(counter)) {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.arc(xc, yc, r - 3, 0, 2 * Math.PI);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(xc, yc, 2, 0, 2 * Math.PI);
      ctx.stroke();
      
      ctx.strokeStyle = "fff";
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.moveTo(xc - r * Math.cos(theta), yc - r * Math.sin(theta));
      ctx.lineTo(xc + r * Math.cos(theta), yc + r * Math.sin(theta));
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(xc - r * Math.sin(theta), yc + r * Math.cos(theta));
      ctx.lineTo(xc + r * Math.sin(theta), yc - r * Math.cos(theta));	
      ctx.stroke();
    }
    
    theta += incr;
    counter++
}

// video.addEventListener('play', () => {
//   const canvas = faceapi.createCanvasFromMedia(video)
//   document.body.append(canvas)
  
//   const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize)
  
//   setInterval(async () => {
//     const detections = await faceapi
//                                 .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//                                 .withFaceLandmarks()
//     const resizedDetections = faceapi
//                                 .resizeResults(detections, displaySize)
    
//     var ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     counter = 0;
    
//     face_half = resizedDetections[0].landmarks._positions[15]._x - 
//                 resizedDetections[0].landmarks._positions[29]._x;
    
//     // faceapi.draw.drawDetections(canvas, resizedDetections)
//     // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

//     resizedDetections[0].landmarks._positions.forEach(
//       (pt) => 
//         {
//           detectGraph(pt, ctx);
//           //detectWheel(pt, ctx);
//         }
//     )

//     // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//   }, 100)
// })