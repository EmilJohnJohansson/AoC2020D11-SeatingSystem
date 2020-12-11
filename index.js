const fs = require('fs');

function parseInput(fileName) {
    const content = fs.readFileSync(fileName, 'utf8');
    return content.split('\n').map(l => l.split('').filter(c => c !== "\r"));
}

function generateNextFrame(frame) {
    var next = JSON.parse(JSON.stringify(frame));

    for (var i = 0; i < frame.length; i++) {
        for (var j = 0; j < frame[i].length; j++) {
            var counter = 0;
            for (var x = -1; x <= 1; x++) {
                for (var y = -1; y <= 1; y++){
                    if (!(x === y && x === 0)) {
                        if (!(i + x > frame.length - 1 || i + x < 0 || j + y > frame[i].length - 1 || j + y < 0)) {
                            counter += frame[i + x][j + y] === "#" ? 1 : 0;
                        }
                    }
                }
            }

            if (frame[i][j] === "L" && counter === 0) {
                next[i][j] = "#"
            } else if (frame[i][j] === "#" && counter > 3) {
                next[i][j] = "L"
            }
        }
    }

    return next;
}

function generateNextFrameVisible(frame) {
    var next = JSON.parse(JSON.stringify(frame));

    for (var i = 0; i < frame.length; i++) {
        for (var j = 0; j < frame[i].length; j++) {
            var counter = 0;

            for (var x = -1; x <= 1; x++) {
                for (var y = -1; y <= 1; y++){
                    if (!(x === y && x === 0)) {
                        seen = false;
                        range = 1;
                        while (!seen) {
                            xR = range * x;
                            yR = range * y;

                            if (!(i + xR > frame.length - 1 || i + xR < 0 || j + yR > frame[i].length - 1 || j + yR < 0)) {
                                pos = frame[i + xR][j + yR];
                                counter += pos === "#" ? 1 : 0;
                                seen = pos !== ".";
                            } else {
                                seen = true;
                            }

                            range++;
                        }
                    }
                }
            }

            if (frame[i][j] === "L" && counter === 0) {
                next[i][j] = "#"
            } else if (frame[i][j] === "#" && counter > 4) {
                next[i][j] = "L"
            }
        }
    }

    return next;
}

function part1(frame) {
    var next = generateNextFrame(frame);
    
    while (JSON.stringify(next) !== JSON.stringify(frame)) {
        // console.log("====================================================");
        // console.log(stringyfy(next));
        frame = JSON.parse(JSON.stringify(next));
        next = generateNextFrame(frame);
        counter++;
    }
    
    var counter = 0;

    next.forEach(row => {
        row.forEach(seat => {
            counter += seat === "#" ? 1 : 0;
        });
    });

    return counter
}

function part2(frame) {
    var next = generateNextFrameVisible(frame);
    
    while (JSON.stringify(next) !== JSON.stringify(frame)) {
        // console.log("====================================================");
        // console.log(stringyfy(next));
        frame = JSON.parse(JSON.stringify(next));
        next = generateNextFrameVisible(frame);
        counter++;
    }
    
    var counter = 0;

    next.forEach(row => {
        row.forEach(seat => {
            counter += seat === "#" ? 1 : 0;
        });
    });

    return counter
}

function stringyfy(mat) {
    var s = "";
    for (var y = 0; y < mat.length; y++) {
        for (var x = 0; x < mat[y].length; x++) {
            s = s + mat[y][x];
            if (x === mat[y].length -1 ) {
                s = s + "\n";
            }
        }
    }
    return s;
}

// console.log("=============================================START=============================================");

const input = parseInput(process.argv[2]);


// const mat = JSON.parse(JSON.stringify(input));

// // console.log(part1(mat));
// console.log(stringyfy(input));
console.log(part1(input));
console.log(part2(input));