const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
const lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const sol = (mat) => {
        const n = mat.length;
        const m = mat[0].length;
        const getS = (char) => {
            for (let i = 0; i < n; i += 1) {
                for (let j = 0; j < m; j += 1) {
                    if (mat[i][j] === char) {
                        return [i, j];
                    }
                }
            }
        };
        const [y, x] = getS('S');
        const [fy, fx] = getS('E');
        mat[fy][fx] = '.';
        mat[y][x] = '.';
        let vis = Array(4).fill(0).map(() => Array(n).fill(0).map(() => Array(m).fill(-1)));
        let heap = [[y, x, 0, 0]];
        const swap = (i, j) => {
            [heap[i], heap[j]] = [heap[j], heap[i]];
        };
        const siftUp = (i) => {
            if (i === 0) {
                return;
            }
            const p = Math.floor((i - 1) / 2);
            if (heap[p][3] > heap[i][3]) {
                swap(i, p);
                siftUp(p);
            }
        };
        const siftDown = (i) => {
            const l = 2 * i + 1;
            const r = l + 1;
            if (l >= heap.length) {
                return;
            }
            if (r === heap.length) {
                if (heap[i][3] > heap[l][3]) {
                    swap(i, l);
                }
                return;
            }
            if (heap[l][3] > heap[r][3]) {
                if (heap[i][3] > heap[r][3]) {
                    swap(i, r);
                    siftDown(r);
                }
            } else {
                if (heap[i][3] > heap[l][3]) {
                    swap(i, l);
                    siftDown(l);
                }
            }
        };
        while (heap.length) {
            while (heap.length && vis[heap[0][2]]?.[heap[0][0]]?.[heap[0][1]] !== -1) {
                swap(0, (heap.length - 1));
                heap.length -= 1;
                siftDown(0);
            }
            if (heap.length !== 0) {
                const [yy, xx, dir, val] = heap[0];
                vis[dir][yy][xx] = val;
                swap(0, (heap.length - 1));
                heap.length -= 1;
                siftDown(0);
                if (dir === 0) {
                    if ((mat[yy]?.[xx + 1] === '.') && (vis[0][yy]?.[xx + 1] === -1)) {
                        heap.push([yy, (xx + 1), 0, (val + 1)]);
                        siftUp(heap.length - 1);
                    }
                } else if (dir === 1) {
                    if ((mat[yy + 1]?.[xx] === '.') && (vis[1][yy + 1]?.[xx] === -1)) {
                        heap.push([(yy + 1), xx, 1, (val + 1)]);
                        siftUp(heap.length - 1);
                    }
                } else if (dir === 2) {
                    if ((mat[yy]?.[xx - 1] === '.') && (vis[2][yy]?.[xx - 1] === -1)) {
                        heap.push([yy, (xx - 1), 2, (val + 1)]);
                        siftUp(heap.length - 1);
                    }
                } else if (dir === 3) {
                    if ((mat[yy - 1]?.[xx] === '.') && (vis[3][yy - 1]?.[xx] === -1)) {
                        heap.push([(yy - 1), xx, 3, (val + 1)]);
                        siftUp(heap.length - 1);
                    }
                }
                for (let z = 0; z < 4; z += 1) {
                    if (vis[z][yy]?.[xx] === -1) {
                        heap.push([yy, xx, z, (val + 1000)]);
                        siftUp(heap.length - 1);
                    }
                }
            }
        }

        const vis1 = Array(4).fill(0).map(() => Array(n).fill(0).map(() => Array(m).fill(-1)));
        heap = [[fy, fx, 0, 0], [fy, fx, 1, 0], [fy, fx, 2, 0], [fy, fx, 3, 0]];
        while (heap.length) {
            while (heap.length && vis1[heap[0][2]]?.[heap[0][0]]?.[heap[0][1]] !== -1) {
                swap(0, (heap.length - 1));
                heap.length -= 1;
                siftDown(0);
            }
            if (heap.length !== 0) {
                const [yy, xx, dir, val] = heap[0];
                vis1[dir][yy][xx] = val;
                swap(0, (heap.length - 1));
                heap.length -= 1;
                siftDown(0);
                if (dir === 0) {
                    if ((mat[yy]?.[xx + 1] === '.') && (vis1[0][yy]?.[xx + 1] === -1)) {
                        heap.push([yy, (xx + 1), 0, (val + 1)]);
                        siftUp(heap.length - 1);
                    }

                } else if (dir === 1) {
                    if ((mat[yy + 1]?.[xx] === '.') && (vis1[1][yy + 1]?.[xx] === -1)) {
                        heap.push([(yy + 1), xx, 1, (val + 1)]);
                        siftUp(heap.length - 1);
                    }
                } else if (dir === 2) {
                    if ((mat[yy]?.[xx - 1] === '.') && (vis1[2][yy]?.[xx - 1] === -1)) {
                        heap.push([yy, (xx - 1), 2, (val + 1)]);
                        siftUp(heap.length - 1);
                    }
                } else if (dir === 3) {
                    if ((mat[yy - 1]?.[xx] === '.') && (vis1[3][yy - 1]?.[xx] === -1)) {
                        heap.push([(yy - 1), xx, 3, (val + 1)]);
                        siftUp(heap.length - 1);
                    }
                }
                for (let z = 0; z < 4; z += 1) {
                    if (vis1[z][yy]?.[xx] === -1) {
                        heap.push([yy, xx, z, (val + 1000)]);
                        siftUp(heap.length - 1);
                    }
                }
            }
        }

        let len = Infinity;
        for (let z = 0; z < 4; z += 1) {
            len = Math.min(len, vis[z][fy][fx]);
        }
        console.log('result first task:', len);
        let rrr = 0;

        for (let i = 0; i < n; i += 1) {
            for (let j = 0; j < m; j += 1) {
                let w = false;
                if ((vis[0][i][j] + vis1[2][i][j]) === len) {
                    w = true;
                }
                if ((vis[1][i][j] + vis1[3][i][j]) === len) {
                    w = true;
                }
                if ((vis[2][i][j] + vis1[0][i][j]) === len) {
                    w = true;
                }
                if ((vis[3][i][j] + vis1[1][i][j]) === len) {
                    w = true;
                }
                if (w) {
                    rrr += 1;
                }
            }
        }
        console.log('result second task:', rrr);
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