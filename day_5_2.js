const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
const lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    let res = 0;
    const edges = {};
    let idx = 0;
    while (lines[idx]) {
        const [u, v] = lines[idx].split('|').map(Number);
        if (edges[u]) {
            edges[u].add(v);
        } else {
            edges[u] = new Set([v]);
        }
        idx += 1;
    }
    const swap = (arr) => {
        for (let j = 1; j < arr.length; j += 1) {
            const curr = edges[arr[j]] ?? new Set();
            for (let z = 0; z < j; z += 1) {
                if (curr.has(arr[z])) {
                    [arr[j], arr[z]] = [arr[z], arr[j]];
                    return true;
                }
            }
        }
        return false;
    }
    const topSort = (arr) => {
        let f = true;
        while (f) {
            f = swap(arr);
        }
        return arr[Math.floor(arr.length / 2)];
    };
    const sol = (arr) => {
        for (let j = 1; j < arr.length; j += 1) {
            const curr = edges[arr[j]] ?? new Set();
            for (let z = 0; z < j; z += 1) {
                if (curr.has(arr[z])) {
                    return topSort(arr);;
                }
            }
        }
        return 0;
    };
    for (let i = (idx + 1); i < lines.length; i += 1) {
        const arr = lines[i].split(',').map(Number);
        res += sol(arr);
    }
    process.stdout.write(res.toString());
});