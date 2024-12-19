const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
const lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    let max = 0;
    const sol = (arr, trr) => {
        const sss = new Set(arr);
        const getCnt = (t) => {
            const dp = Array(t.length + 1).fill(0);
            dp[0] = 1;
            for (let i = 0; i < t.length; i += 1) {
                for (let j = 1; j <= max; j += 1) {
                    if ((i + 1 - j) >= 0) {
                        const v = t.slice((i + 1 - j), (i + 1));
                        if (sss.has(v)) {
                            dp[i + 1] += dp[i + 1 - j];
                        }
                    }
                }
            }
            return dp.at(-1);
        };
        let rrr1 = 0;
        let rrr2 = 0;
        for (let i = 0; i < trr.length; i += 1) {
            const val = getCnt(trr[i]);
            rrr1 += val ? 1 : 0;
            rrr2 += val;
        }
        return [rrr1, rrr2];
    };
    const arr = lines[0].split(', ');
    const trr = [];
    for (let i = 2; i < lines.length; i += 1) {
        max = Math.max(max, lines[i].length);
        trr.push(lines[i]);
    }
    const res = sol(arr, trr);
    console.log('part1:', res[0]);
    console.log('part2:', res[1]);
    process.stdout.write('EOL');
});