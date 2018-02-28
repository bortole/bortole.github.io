// inner variables
//var SunCalc = require('/home/ol_u/Загрузки/clock/js/suncalc.js');
var canvas, ctx;
var clockRadius = 250;
var clockImage;
//var zods = [0x2650,0x264f,0x264e,0x264d,0x264c,0x264b,0x264a,0x2649,0x2648,0x2653,0x2652,0x2651]


var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};

function coord() {
    getJSON('https://dweet.io/get/latest/dweet/for/olbo_astro_coord').then(function(data) {

    var text = JSON.stringify(data.with);

                var dweet = `${JSON.stringify(data.with)}`
                var s1 = dweet.indexOf('sun');
                var text = dweet.substring(s1+3);
                s1 = text.indexOf(';');
                text = text.substring(0,s1);
        sun_coord = parseFloat(text);
        //sun.innerText = sun_coord; //display the result in an HTML element

                s1 = dweet.indexOf('mon');
                var text = dweet.substring(s1+3);
                s1 = text.indexOf(';');
                text = text.substring(0,s1);
        mon_coord = parseFloat(text);
        //mon.innerText = mon_coord; //display the result in an HTML element

                s1 = dweet.indexOf('asc');
                text = dweet.substring(s1+3);
                s1 = text.indexOf(';');
                text = text.substring(0,s1);
        as_coord = parseFloat(text);
        //as.innerText = as_coord; //display the result in an HTML element

                s1 = dweet.indexOf('mc');
                var text = dweet.substring(s1+2);
                s1 = text.indexOf('}');
                text = text.substring(0,s1);
        mc_coord = parseFloat(text);
        //mc.innerText = mc_coord; //display the result in an HTML element

}, function(status) { //error detection....
  alert('Something went wrong.');
});
}

function coord_str() {
        getJSON('https://dweet.io/get/latest/dweet/for/olbo_astro').then(function(data) {

        var text = JSON.stringify(data.with);

                var dweet = `${JSON.stringify(data.with)}`
                var s1 = dweet.indexOf('"payload":"');
                var text = dweet.substring(s1+11);
                s1 = text.indexOf('}');
                text = text.substring(0,s1);
                //text = dweet;
        coord_string.innerText = text; //display the result in an HTML element

}, function(status) { //error detection....
  alert('Something went wrong.');
});
}


// draw functions :
function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawScene() { // main drawScene function
    clear(); // clear canvas

    // get current time
    //var date = new Date();
    //var hours = date.getHours();
    //var minutes = date.getMinutes();
    //var seconds = date.getSeconds();
    //hours = hours > 12 ? hours - 12 : hours;
    //var hour = hours + minutes / 60;
    //var minute = minutes + seconds / 60;

    var hour = (12/(360/sun_coord))+6;
    var minute = (12/(360/mon_coord))+6;
    var seconds = (12/(360/as_coord))+6;
    var seconds2 = (12/(360/mc_coord))+6;
    hour = hour > 12 ? hour - 12 : hour;
    minute = minute > 12 ? minute - 12 : minute;
    seconds = seconds > 12 ? seconds - 12 : seconds;
    seconds2 = seconds2 > 12 ? seconds2 - 12 : seconds2;

    // save current context
    ctx.save();

    // draw clock image (as background)
    ctx.drawImage(clockImage, 0, 0, 500, 500);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();

    //// draw numbers
    //ctx.font = '36px Arial';
    //ctx.fillStyle = '#000';
    //ctx.textAlign = 'center';
    //ctx.textBaseline = 'middle';
    //for (var n = 1; n <= 12; n++) {
        //var theta = (n - 3) * (Math.PI * 2) / 12;
        //var x = clockRadius * 0.7 * Math.cos(theta);
        //var y = clockRadius * 0.7 * Math.sin(theta);
        //ctx.fillText(String.fromCharCode(zods [n-1]), x, y);
    //}

    // draw second
    ctx.save();
    var theta = (seconds) * -2 * Math.PI / 12;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-250, -5);
    ctx.lineTo(-250, 3);
    ctx.lineTo(clockRadius * 1, 1);
    ctx.lineTo(clockRadius * 1, -1);
    ctx.fillStyle = '#0f0';
    ctx.fill();
    ctx.restore();

    // draw second2
    ctx.save();
    var theta = (seconds2) * -2 * Math.PI / 12;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-250, -3);
    ctx.lineTo(-250, 3);
    ctx.lineTo(clockRadius * 1, 1);
    ctx.lineTo(clockRadius * 1, -1);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.restore();

    // draw hour
    ctx.save();
    //var theta = (hour - 3) * 2 * Math.PI / 12;
    var theta = (hour) * -2 * Math.PI / 12;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-15, -5);
    ctx.lineTo(-15, 5);
    ctx.lineTo(clockRadius * 0.8, 1);
    ctx.lineTo(clockRadius * 0.8, -1);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.restore();

    // draw minute
    ctx.save();
    //var theta = (minute - 15) * 2 * Math.PI / 60;
    var theta = (minute) * -2 * Math.PI / 12;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-15, -4);
    ctx.lineTo(-15, 4);
    ctx.lineTo(clockRadius * 0.8, 1);
    ctx.lineTo(clockRadius * 0.8, -1);
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.restore();

    ctx.restore();

    //var img = document.getElementById("circle");
    //ctx.drawImage(img, 10, 10);
}

// initialization
coord();
coord_str();
setInterval(coord, 240000);
setInterval(coord_str, 240000);

$(function(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

     var width = canvas.width;
     var height = canvas.height;

	clockImage = new Image();
	clockImage.src = 'img/aclock.png';

	setInterval(drawScene, 1000); // loop drawScene
});
