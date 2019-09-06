let canvas = document.getElementById('canvas');

let x = y = 32;

var road_size = 20;

var m = [];

var stack = [];

var s1 = [];

var s2 = [];

var path = [];

var ctx = canvas.getContext('2d');

// ctx.strokeRect(20, 20, 640, 640);
ctx.strokeStyle = 'green';

for (let i = 1; i <= 32; i++) {
    m[i] = [];
    for (let j = 1; j <= 32; j++) {
        m[i][j] = 'unvisited';
        s1.push([i, j]);
        ctx.beginPath();
        ctx.strokeRect(i * 20, j * 20, 20, 20);
    }
}

function hasUnvisitedCell() {
    return s1.length > 0;
}

function markVisit(i, j) {
    if (i <= 0 ||
        j <= 0 ||
        i > x ||
        j > y) {
        console.log('wrong index');
        return;
    }
    stack.push([i, j]);
    path.push([i, j]);
    m[i][j] = 'visited';
    s1.splice(s1.findIndex(e => e[0] === i && e[1] === j), 1);
    return;
}

//TODO mark cell as visited
function mazeGenerator() {
    while (hasUnvisitedCell()) {
        var randomCell = s1[getRandomArbitrary(0, s1.length)];
        var initX = randomCell[0];
        var initY = randomCell[1];
        generateWall(initX, initY);

    }

    function generateWall(i, j) {
        markVisit(i, j);
        var nA = getNeighbor(i, j);
        if (nA === 'out of neighborhood') {
            console.log('out of stack!');
            return;
        } else {
            removeWall(i, j, nA[0], nA[1]);
            generateWall(nA[0], nA[1]);
        }
    }

    function getNeighbor(x, y) {
        if (hasNeighbor(x, y)) {
            return getRandomNeighbor(x, y);
        } else {

            let newCell = stack.pop();
            if (newCell != undefined) {
                return getNeighbor(newCell[0], newCell[1]);
                
            } else {
                s2.push(path.slice());
                path = [];
                return 'out of neighborhood';
            }
        }
    }
}

mazeGenerator();

console.log('maze generate completed');

function hasNeighbor(x, y) {
    if (s1.findIndex(e => e[0] === x + 1 && e[1] === y) != -1 ||
        s1.findIndex(e => e[0] === x && e[1] === y + 1) != -1 ||
        s1.findIndex(e => e[0] === x - 1 && e[1] === y) != -1 ||
        s1.findIndex(e => e[0] === x && e[1] === y - 1) != -1) {
        return true;
    }
    return false;
}

function getRandomNeighbor(i, j) {
    var nX, nY;
    do {
        nX = 0;
        nY = 0;
        let direction = getRandomArbitrary(1, 5);
        switch (direction) {
            case 1:
                nX = i;
                nY = j - 1;
                break;
            case 2:
                nX = i + 1;
                nY = j;
                break;
            case 3:
                nX = i;
                nY = j + 1;
                break;
            case 4:
                nX = i - 1;
                nY = j;
                break;

        }
    } while (!exist(nX, nY)  || nX <= 0 || nY <= 0 || nX > x || nY > y);
    return [nX, nY];
}

function exist(i, j) {
    return s1.findIndex(e => e[0] === i && e[1] === j) !== -1;
}

function removeWall(a, b, c, d) {
    ctx.strokeStyle = 'red';
    if (a > c) {
        ctx.beginPath();
        ctx.clearRect(a * 20 - 5, b * 20 + 1, 10, 18);
        ctx.stroke();
        console.log('remove east');

    } else if (a < c) {
        ctx.beginPath();
        ctx.clearRect(a * 20 + 15, b * 20 + 1, 10, 18);
        ctx.stroke();
        console.log('remove west');
    } else if (b > d) {
        ctx.beginPath();
        ctx.clearRect(a * 20 + 1, b * 20 - 5, 18, 10);
        ctx.stroke();
        console.log('remove north');
    } else {
        ctx.beginPath();
        ctx.clearRect(a * 20 + 1, b * 20 + 15, 18, 10);
        ctx.stroke();
        console.log('remove south');
    }
}

function drawMaze(x, y, w, h) {
    if (w / 2 <= 20 || h / 2 <= 20) {
        return;
    }
    let doorX = getRandomArbitrary(0, w / 10);
    let doorY = getRandomArbitrary(0, h / 10);
    let cX = w / 2;
    let cY = h / 2;
    let iX = x + cX;
    let iY = y + cY;

    ctx.beginPath();
    ctx.moveTo(iX, y);
    ctx.lineTo(iX, y + 10 * (doorY - 1));
    ctx.moveTo(iX, y + 10 * (doorY + 1));
    ctx.lineTo(iX, y + h);
    ctx.moveTo(x, iY);
    ctx.lineTo(x + 10 * (doorX - 1), iY);
    ctx.moveTo(x + 10 * (doorX + 1), iY);
    ctx.lineTo(x + w, iY);
    ctx.stroke();

    drawMaze(x, y, cX, cY);
    drawMaze(iX, y, cX, cY);
    drawMaze(x, iY, cX, cY);
    drawMaze(iX, iY, cX, cY);

}


function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}