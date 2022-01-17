cc = 1;
ch = 1;
co = 1;
g = 1;
r=1;
circles = cc + ch + co + g;
tVal = document.getElementById("totalVal");
sCC = document.getElementById("ccRange");
oCC = document.getElementById("ccVal");
sCC.oninput = function () {
  oCC.innerText = this.value;
  cc = Number(this.value);
  tVal.innerText = Number(cc + ch + co + g);
}
sCH = document.getElementById("chRange");
oCH = document.getElementById("chVal");
sCH.oninput = function () {
  oCH.innerText = this.value;
  ch = Number(this.value);
  tVal.innerText = Number(cc + ch + co + g);

}
sCO = document.getElementById("coRange");
oCO = document.getElementById("coVal");
sCO.oninput = function () {
  oCO.innerText = this.value;
  co = Number(this.value);
  tVal.innerText = Number(cc + ch + co + g);

}
sG = document.getElementById("gRange");
oG = document.getElementById("gVal");
sG.oninput = function () {
  oG.innerText = this.value;
  g = Number(this.value);
  console.log(g);
  tVal.innerText = Number(cc + ch + co + g);
}
sR = document.getElementById("rRange");
sR.oninput = function () {
  r = Number(this.value);
  console.log(r);
}

function getCenter(middle, i, displace = 0) {
  xCircle = middle + cos(angle * i + Math.PI / 2) * (radius + displace);
  yCircle = middle - sin(angle * i + Math.PI / 2) * (radius + displace);
  return [xCircle, yCircle];
}

let allPlayers = new Array();
let scoreTable = {
  co: {
    co: 2 * r,
    ch: -1 * r,
    cc: 2 * r,
    g: 2 * r
  },
  ch: {
    co: 3 * r,
    ch: 0,
    cc: 3,
    g: 3
  },
  cc: {
    co: 2 * r,
    ch: -1,
    cc: 2 * r,
    g: 2 * r
  },
  g: {
    co: 2 * r,
    ch: -1,
    cc: 2 * r,
    g: 2 * r
  },
};

const cDiv = document.getElementById('canvas');
function setup() {
  // console.log(cDiv.offsetWidth,cDiv.offsetHeight);
  cnv = createCanvas(700,700);
  cnv.parent("canvas");
  circles = cc + ch + co + g;
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
  img = {
    cc: loadImage("assets/cc.png"),
    ch: loadImage("assets/ch.png"),
    co: loadImage("assets/co.png"),
    g: loadImage("assets/g.png"),
  };
  started = 0;
  end = 1;
  flag = 1;
  frameRate(circles**2);
  
}
paused = false;
function draw() {
  //("h");
  if (paused) return;
  background(255);
  fill(255);
  stroke(0);
  strokeWeight(0.5);
  // console.log(width);
  middle = width / 2;

  angle = ((Math.PI * 2) / circles);

  radius = width/3;
  ellipse(width/2, height/2, 2 * radius, 2 * radius);
  circleRadius = (sin(angle / 2) * radius) / 2;
  //("he");
  // draw all the lines
  for (i = 0; i < circles - 1; i++) {
    for (j = i + 1; j < circles; j++) {
      if (started == i && end == j && flag) continue;
      [xCirclei, yCirclei] = getCenter(width/2, i);
      [xCirclej, yCirclej] = getCenter(width/2, j);
      //("hi");
      line(xCirclei, yCirclei, xCirclej, yCirclej);
    }
  }
  //("heo");
  size = 69;
  [xCirclei, yCirclei] = getCenter(width/2, started);
  [xCirclej, yCirclej] = getCenter(width/2, end);



  if (flag) {
    strokeWeight(4);
    stroke("#ffd600");
    line(xCirclei, yCirclei, xCirclej, yCirclej);
    allPlayers[started][1] += scoreTable[allPlayers[started][0]][allPlayers[end][0]];
    allPlayers[end][1] += scoreTable[allPlayers[end][0]][allPlayers[started][0]];
  }

  for (i = 0; i < circles; i++) {
    [xCircle, yCircle] = getCenter(height/2, i);
    image(img[allPlayers[i][0]], xCircle - size / 2, yCircle - size / 2, size, size);
    stroke(0);
    strokeWeight(1);
    fill(0, 102, 153, 51);
    [xText, yText] = getCenter(height/2, i, 50);
    text(allPlayers[i][1], xText, yText);
    textAlign("center")
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
function rs()
{
  paused=true;
  background(255)
  started=0;
  end=1;
  flag=1;
  allPlayers = [];
  console.log(cc);
  circles = cc + ch + co + g;
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
  scoreTable = {
    co: {
      co: 2 * r,
      ch: -1 * r,
      cc: 2 * r,
      g: 2 * r
    },
    ch: {
      co: 3 * r,
      ch: 0,
      cc: 3,
      g: 3
    },
    cc: {
      co: 2 * r,
      ch: -1,
      cc: 2 * r,
      g: 2 * r
    },
    g: {
      co: 2 * r,
      ch: -1,
      cc: 2 * r,
      g: 2 * r
    },
  };
  paused=false;
}