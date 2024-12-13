const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
const lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const sol = (mat) => {
        let rrr = 0;
        const dx = [0, 1, 1, 1, 0, -1, -1, -1];
        const dy = [1, 1, 0, -1, -1, -1, 0, 1];
        const vals = ['X', 'M', 'A', 'S'];
        const check = (y, x, k) => {
            for (let z = 1; z <= 3; z += 1) {
                if (mat[y + dy[k] * z]?.[x + dx[k] * z] !== vals[z]) {
                    return false;
                }
            }
            return true;
        };
        const getCnt = (i, j) => {
            if (mat[i][j] !== 'X') {
                return 0;
            }
            let cnt = 0;
            for (let k = 0; k < dx.length; k += 1) {
                if (check(i, j, k)) {
                    cnt += 1;
                }
            }
            return cnt;
        };
        for (let i = 0; i < mat.length; i += 1) {
            for (let j = 0; j < mat[0].length; j += 1) {
                rrr += getCnt(i, j);
            }
        }
        return rrr;
    };
    const mat = [];
    for (let i = 0; i < lines.length; i += 1) {
        const s = lines[i].split('');
        mat.push(s);
    }
    const res = sol(mat);
    process.stdout.write(res.toString());
});