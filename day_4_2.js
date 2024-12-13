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
        const check = (i, j) => {
            if (mat[i - 1]?.[j - 1] === 'M') {
                if (mat[i + 1]?.[j + 1] === 'S') {
                    if (mat[i + 1]?.[j - 1] === 'M') {
                        if (mat[i - 1]?.[j + 1] === 'S') {
                            return true;
                        }
                        return false;
                    } else if (mat[i + 1]?.[j - 1] === 'S') {
                        if (mat[i - 1]?.[j + 1] === 'M') {
                            return true;
                        }
                        return false;
                    }
                    return false;
                }
                return false;
            } else if (mat[i - 1]?.[j - 1] === 'S') {
                if (mat[i + 1]?.[j + 1] === 'M') {
                    if (mat[i + 1]?.[j - 1] === 'M') {
                        if (mat[i - 1]?.[j + 1] === 'S') {
                            return true;
                        }
                        return false;
                    } else if (mat[i + 1]?.[j - 1] === 'S') {
                        if (mat[i - 1]?.[j + 1] === 'M') {
                            return true;
                        }
                        return false;
                    }
                    return false;
                }
                return false;
            }
            return false;
        };
        const getCnt = (i, j) => {
            if (mat[i][j] !== 'A') {
                return 0;
            }
            if (check(i, j)) {
                return 1;
            }
            return 0;
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