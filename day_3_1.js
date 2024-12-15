const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
const lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const sol = (s) => {
        let rrr = 0;
        const add = (i) => {
            if (s.slice(i, (i + 4)) !== 'mul(') {
                return 0;
            }
            let idx = i + 4;
            while (idx < s.length && (s[idx] !== ')')) {
                idx += 1;
            }
            if (idx >= s.length) {
                return 0;
            }
            const arr = s.slice((i + 4), idx).split(',').map(Number);
            if (arr.length !== 2) {
                return 0;
            }
            const val = arr[0] * arr[1];
            if (isNaN(val)) {
                return 0;
            }
            return val;
        }
        for (let i = 0; i < s.length; i += 1) {
            rrr += add(i);
        }
        return rrr;
    };
    const str = lines.join('\n');
    const res = sol(str);
    process.stdout.write(res.toString());
});