const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
const lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const sol = (arr) => {
        const lx = 101;
        const ly = 103;
        let sec = 0;
        const isEasterEgg = (ppp) => {
            const brr = [...ppp].sort((a, b) => a - b);
            let cnt = 0;
            for (let z = 1; z < brr.length; z += 1) {
                if (brr[z] === (brr[z - 1] + 1)) {
                    cnt += 1;
                } else {
                    cnt = 0;
                }
                if (cnt > 25) {
                    return true;
                }
            }
            return false;
        };
        const mat = Array(ly).fill(0).map(() => Array(lx).fill(0));
        for (let i = 0; i < arr.length; i += 1) {
            let [px, py, vx, vy] = arr[i];
            mat[py][px] += 1;
        }
        for (let j = 0; j < 10000; j += 1) {
            sec += 1;
            const ppp = new Set();
            for (let i = 0; i < arr.length; i += 1) {
                let [px, py, vx, vy] = arr[i];
                mat[py][px] -= 1;
                const xx = (px + vx + lx) % lx;
                const yy = (py + vy + ly) % ly;
                mat[yy][xx] += 1;
                arr[i] = [xx, yy, vx, vy];
                ppp.add(lx * yy + xx);
            }
            if (isEasterEgg(ppp)) {
                for (let i = 0; i < ly; i += 1) {
                    console.log(mat[i].map((v) => v ? v : ' ').join(''))
                }
                console.log('sec', sec);
            }
        }
        return '';
    };
    const arr = [];
    for (let i = 0; i < lines.length; i += 1) {
        const [p, v] = lines[i].split(' ');
        const [px, py] = p.slice(2).split(',').map(Number);
        const [vx, vy] = v.slice(2).split(',').map(Number);
        arr.push([px, py, vx, vy]);
    }
    const res = sol(arr);
    process.stdout.write(res.toString());
});