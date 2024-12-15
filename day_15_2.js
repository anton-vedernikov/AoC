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
                const stack = [new Set([curr])];
                let currSet = new Set([curr]);
                while (currSet.size) {
                    const newSet = new Set();
                    for (const val of currSet) {
                        const newVal = val - m;
                        const char = mat[Math.floor(newVal / m)]?.[newVal % m];
                        if (char === '#' || char === undefined) {
                            return;
                        }
                        if (char === ']') {
                            newSet.add(newVal);
                            newSet.add(newVal - 1);
                        } else if (char === '[') {
                            newSet.add(newVal);
                            newSet.add(newVal + 1);
                        }
                    }
                    stack.push(newSet);
                    currSet = new Set(newSet);
                }
                while (stack.length) {
                    const ccc = stack.pop();
                    for (const val of ccc) {
                        swap(val, (val - m));
                    }
                }
                curr -= m;
                return;
            }
            if (dir === 'v') {
                const stack = [new Set([curr])];
                let currSet = new Set([curr]);
                while (currSet.size) {
                    const newSet = new Set();
                    for (const val of currSet) {
                        const newVal = val + m;
                        const char = mat[Math.floor(newVal / m)]?.[newVal % m];
                        if (char === '#' || char === undefined) {
                            return;
                        }
                        if (char === ']') {
                            newSet.add(newVal);
                            newSet.add(newVal - 1);
                        } else if (char === '[') {
                            newSet.add(newVal);
                            newSet.add(newVal + 1);
                        }
                    }
                    stack.push(newSet);
                    currSet = new Set(newSet);
                }
                while (stack.length) {
                    const ccc = stack.pop();
                    for (const val of ccc) {
                        swap(val, (val + m));
                    }
                }
                curr += m;
                return;
            }
            if (dir === '<') {
                const stack = [new Set([curr])];
                let currSet = new Set([curr]);
                while (currSet.size) {
                    const newSet = new Set();
                    for (const val of currSet) {
                        const newVal = val - 1;
                        const char = mat[Math.floor(newVal / m)]?.[newVal % m];
                        if (char === '#' || char === undefined) {
                            return;
                        }
                        if (char === ']' || char === '[') {
                            newSet.add(newVal);
                        }
                    }
                    stack.push(newSet);
                    currSet = new Set(newSet);
                }
                while (stack.length) {
                    const ccc = stack.pop();
                    for (const val of ccc) {
                        swap(val, (val - 1));
                    }
                }
                curr -= 1;
                return;
            }
            if (dir === '>') {
                const stack = [new Set([curr])];
                let currSet = new Set([curr]);
                while (currSet.size) {
                    const newSet = new Set();
                    for (const val of currSet) {
                        const newVal = val + 1;
                        const char = mat[Math.floor(newVal / m)]?.[newVal % m];
                        if (char === '#' || char === undefined) {
                            return;
                        }
                        if (char === ']' || char === '[') {
                            newSet.add(newVal);
                        }
                    }
                    stack.push(newSet);
                    currSet = new Set(newSet);
                }
                while (stack.length) {
                    const ccc = stack.pop();
                    for (const val of ccc) {
                        swap(val, (val + 1));
                    }
                }
                curr += 1;
                return;
            }
        }
        for (const c of s) {
            getOne(c);

        }
        for (let i = 0; i < mat.length; i += 1) {
            for (let j = 0; j < mat[0].length; j += 1) {
                if (mat[i][j] === '[') {
                    rrr += 100 * i + j;
                }
            }
        }
        return rrr;
    };
    let idx = 0;
    const mat = [];
    while (lines[idx]) {
        const a = [];
        for (let i = 0; i < lines[idx].length; i += 1) {
            if (lines[idx][i] === '#') {
                a.push('#');
                a.push('#');
            } else if (lines[idx][i] === 'O') {
                a.push('[');
                a.push(']');
            } else if (lines[idx][i] === '.') {
                a.push('.');
                a.push('.');
            } else {
                a.push('@');
                a.push('.');
            }
        }
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