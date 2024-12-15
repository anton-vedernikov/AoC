const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
const lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const sol = (mat, s) => {
        let rrr = 0;
        const n = mat.length;
        const m = mat[0].length;
        let curr = 0;
        while (mat[Math.floor(curr / m)][curr % m] !== '@') {
            curr += 1;
        }
        const swap = (i, j) => {
            const y1 = Math.floor(i / m);
            const x1 = i % m;
            const y2 = Math.floor(j / m);
            const x2 = j % m;
            [mat[y1][x1], mat[y2][x2]] = [mat[y2][x2], mat[y1][x1]];
        };
        const getOne = (dir) => {
            if (dir === '^') {
                let next = curr - m;
                while (mat[Math.floor(next / m)]?.[next % m] === 'O') {
                    next -= m;
                }
                if (mat[Math.floor(next / m)]?.[next % m] !== '.') {
                    return;
                }
                swap(curr, next);
                curr -= m;
                swap(curr, next);
                return;
            }
            if (dir === 'v') {
                let next = curr + m;
                while (mat[Math.floor(next / m)]?.[next % m] === 'O') {
                    next += m;
                }
                if (mat[Math.floor(next / m)]?.[next % m] !== '.') {
                    return;
                }
                swap(curr, next);
                curr += m;
                swap(curr, next);
                return;
            }
            if (dir === '<') {
                let next = curr - 1;
                while (((next + 1) % m) && mat[Math.floor(next / m)]?.[next % m] === 'O') {
                    next -= 1;
                }
                if ((next + 1) % m === 0) {
                    return;
                }
                if (mat[Math.floor(next / m)]?.[next % m] !== '.') {
                    return;
                }
                swap(curr, next);
                curr -= 1;
                swap(curr, next);
                return;
            }
            if (dir === '>') {
                let next = curr + 1;
                while ((next % m) && mat[Math.floor(next / m)]?.[next % m] === 'O') {
                    next += 1;
                }
                if (next % m === 0) {
                    return;
                }
                if (mat[Math.floor(next / m)]?.[next % m] !== '.') {
                    return;
                }
                swap(curr, next);
                curr += 1;
                swap(curr, next);
                return;
            }
        }
        for (const c of s) {
            getOne(c);
        }
        for (let i = 0; i < n; i += 1) {
            for (let j = 0; j < m; j += 1) {
                if (mat[i][j] === 'O') {
                    rrr += 100 * i + j;
                }
            }
        }
        return rrr;
    };
    let idx = 0;
    const mat = [];
    while (lines[idx]) {
        const a = lines[idx].split('');
        mat.push(a);
        idx += 1;
    }
    const arr = [];
    for (let i = (idx + 1); i < lines.length; i += 1) {
        arr.push(lines[i]);
    }
    const s = arr.join('');
    const res = sol(mat, s);
    process.stdout.write(res.toString());
});