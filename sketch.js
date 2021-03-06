cc = 1;
ch = 1;
co = 1;
g = 1;
d = 1;
input = 1;
output = 3;
r = 1;
circles = cc + ch + co + g + d;
tVal = document.getElementById("totalVal");
sCC = document.getElementById("ccRange");
oCC = document.getElementById("ccVal");
sCC.oninput = function () {
  oCC.innerText = this.value;
  cc = Number(this.value);
  tVal.innerText = Number(cc + ch + co + g + d);
};
sCH = document.getElementById("chRange");
oCH = document.getElementById("chVal");
sCH.oninput = function () {
  oCH.innerText = this.value;
  ch = Number(this.value);
  tVal.innerText = Number(cc + ch + co + g + d);
};
sCO = document.getElementById("coRange");
oCO = document.getElementById("coVal");
sCO.oninput = function () {
  oCO.innerText = this.value;
  co = Number(this.value);
  tVal.innerText = Number(cc + ch + co + g + d);
};
sG = document.getElementById("gRange");
oG = document.getElementById("gVal");
sG.oninput = function () {
  oG.innerText = this.value;
  g = Number(this.value);
  console.log(g);
  tVal.innerText = Number(cc + ch + co + g + d);
};
sD = document.getElementById("dRange");
oD = document.getElementById("dVal");
sD.oninput = function () {
  oD.innerText = this.value;
  d = Number(this.value);
  tVal.innerText = Number(cc + ch + co + g + d);
};
sR = document.getElementById("rRange");
sR.oninput = function () {
  r = Number(this.value);
  console.log(r);
};

function getCenter(middle, i, displace = 0) {
  xCircle = middle + cos(angle * i + Math.PI / 2) * (radius + displace);
  yCircle = middle - sin(angle * i + Math.PI / 2) * (radius + displace);
  return [xCircle, yCircle];
}

let allPlayers = new Array();
let scoreTable = {
  co: {
    co: (output - input) * r,
    ch: -input * r,
    cc: (output - input) * r,
    g: (output - input) * r,
    d: -input + (output - input) * (r - 1),
  },
  ch: {
    co: output * r,
    ch: 0,
    cc: output,
    g: output,
    d: 0,
  },
  cc: {
    co: (output - input) * r,
    ch: -input,
    cc: (output - input) * r,
    g: (output - input) * r,
    d: Math.floor(r / 2) * output - Math.ceil(r / 2) * input,
  },
  g: {
    co: (output - input) * r,
    ch: -input,
    cc: (output - input) * r,
    g: (output - input) * r,
    d: -input + (r > 1) ? output : 0,
  },
  d: {
    co: output + (output - input) * (r - 1),
    ch: 0,
    cc: Math.ceil(r / 2) * output - Math.floor(r / 2) * input,
    g: output + (r > 1) ? -input : 0,
    d: 0,
  },
};

const cDiv = document.getElementById("canvas");
function setup() {
  // console.log(cDiv.offsetWidth,cDiv.offsetHeight);
  cnv = createCanvas(700, 700);
  cnv.parent("canvas");
  circles = cc + ch + co + g + d;
  for (i = 0; i < co; i++) {
    allPlayers.push(["co", 0]);
  }
  for (i = 0; i < ch; i++) {
    allPlayers.push(["ch", 0]);
  }
  for (i = 0; i < cc; i++) {
    allPlayers.push(["cc", 0]);
  }
  for (i = 0; i < g; i++) {
    allPlayers.push(["g", 0]);
  }
  for (i = 0; i < d; i++) {
    allPlayers.push(["d", 0]);
  }
  img = {
    cc: loadImage("assets/img/cc.png"),
    ch: loadImage("assets/img/ch.png"),
    co: loadImage("assets/img/co.png"),
    g: loadImage("assets/img/g.png"),
    d: loadImage("assets/img/d.png"),
  };
  started = 0;
  end = 1;
  flag = 1;
  frameRate(circles ** 3);
}
paused = false;
function draw() {
  //("h");
  if (paused || circles < 2 || r < 1) return;
  background("#d1d7dd");
  fill(255);
  stroke(0);
  strokeWeight(0.5);
  // console.log(width);
  middle = width / 2;

  angle = (Math.PI * 2) / circles;

  radius = width / 3;
  fill("#d1d7dd");
  ellipse(width / 2, height / 2, 2 * radius, 2 * radius);
  circleRadius = (sin(angle / 2) * radius) / 2;
  //("he");
  // draw all the lines
  for (i = 0; i < circles - 1; i++) {
    for (j = i + 1; j < circles; j++) {
      if (started == i && end == j && flag) continue;
      [xCirclei, yCirclei] = getCenter(width / 2, i);
      [xCirclej, yCirclej] = getCenter(width / 2, j);
      //("hi");
      strokeWeight(0.2);

      line(xCirclei, yCirclei, xCirclej, yCirclej);
    }
  }
  //("heo");
  size = 69;
  [xCirclei, yCirclei] = getCenter(width / 2, started);
  [xCirclej, yCirclej] = getCenter(width / 2, end);

  if (flag) {
    strokeWeight(4);
    stroke("#37434d");
    line(xCirclei, yCirclei, xCirclej, yCirclej);
    // let bullet = 100;
    // for (let i = 0; i <= bullet; i++) {
    //   x = xCirclei + (i * (xCirclej - xCirclei)) / bullet;
    //   y = yCirclei + (i * (yCirclej - yCirclei)) / bullet;
    //   ellipse(x, y, 1, 1);
    //   console.log(x, y);
    // }
    allPlayers[started][1] +=
      scoreTable[allPlayers[started][0]][allPlayers[end][0]];
    allPlayers[end][1] +=
      scoreTable[allPlayers[end][0]][allPlayers[started][0]];
  }

  for (i = 0; i < circles; i++) {
    [xCircle, yCircle] = getCenter(height / 2, i);
    image(
      img[allPlayers[i][0]],
      xCircle - size / 2,
      yCircle - size / 2,
      size,
      size
    );
    stroke(0);
    strokeWeight(1);
    fill(0, 102, 153, 51);
    [xText, yText] = getCenter(height / 2, i, 50);
    text(allPlayers[i][1], xText, yText);
    textAlign("center");
  }

  end++;
  if (end == circles) {
    started++;
    end = started + 1;
  }
  if (started == circles - 1) {
    started = 0;
    end = 1;
    flag = 0;
  }
}
function rs() {
  paused = true;

  background("#d1d7dd");
  started = 0;
  end = 1;
  flag = 1;
  allPlayers = [];
  console.log(cc);
  circles = cc + ch + co + g + d;
  for (i = 0; i < co; i++) {
    allPlayers.push(["co", 0]);
  }
  for (i = 0; i < ch; i++) {
    allPlayers.push(["ch", 0]);
  }
  for (i = 0; i < cc; i++) {
    allPlayers.push(["cc", 0]);
  }
  for (i = 0; i < g; i++) {
    allPlayers.push(["g", 0]);
  }
  for (i = 0; i < d; i++) {
    allPlayers.push(["d", 0]);
  }
  scoreTable = {
    co: {
      co: (output - input) * r,
      ch: -input * r,
      cc: (output - input) * r,
      g: (output - input) * r,
      d: -input + (output - input) * (r - 1),
    },
    ch: {
      co: output * r,
      ch: 0,
      cc: output,
      g: output,
      d: 0,
    },
    cc: {
      co: (output - input) * r,
      ch: -input,
      cc: (output - input) * r,
      g: (output - input) * r,
      d: Math.floor(r / 2) * output - Math.ceil(r / 2) * input,
    },
    g: {
      co: (output - input) * r,
      ch: -input,
      cc: (output - input) * r,
      g: (output - input) * r,
      d: -input + (r > 1 ? output : 0),
    },
    d: {
      co: output + (output - input) * (r - 1),
      ch: 0,
      cc: Math.ceil(r / 2) * output - Math.floor(r / 2) * input,
      g: output + (r > 1 ? -input : 0),
      d: 0,
    },
  };
  paused = false;
}
