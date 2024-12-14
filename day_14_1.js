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
       const sec = 100;
       const mat = Array(ly).fill(0).map(() => Array(lx).fill(0));
       for (let i = 0; i < arr.length; i += 1) {
            let [px, py, vx, vy] = arr[i];
            const xx = (px + (vx + lx) * sec) % lx;
            const yy = (py + (vy + ly) * sec) % ly;
            mat[yy][xx] += 1;
       }
       let r1 = 0;
       for (let i = 0; i < Math.floor(ly / 2); i += 1) {
        for (let j = 0; j < Math.floor(lx / 2); j += 1) {
            r1 += mat[i][j];
        }
       }
       let r2 = 0;
       for (let i = 0; i < Math.floor(ly / 2); i += 1) {
        for (let j = Math.ceil(lx / 2); j < lx; j += 1) {
            r2 += mat[i][j];
        }
       }
       let r3 = 0;
       for (let i = Math.ceil(ly / 2); i < ly; i += 1) {
        for (let j = 0; j < Math.floor(lx / 2); j += 1) {
            r3 += mat[i][j];
        }
       }
       let r4 = 0;
       for (let i = Math.ceil(ly / 2); i < ly; i += 1) {
        for (let j = Math.ceil(lx / 2); j < lx; j += 1) {
            r4 += mat[i][j];
        }
       }
       return r1 * r2 * r3 * r4;
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