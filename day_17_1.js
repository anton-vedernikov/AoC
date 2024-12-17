const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
const lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const vrr = lines[0].split(' ');
    const a = { val: BigInt(vrr.at(-1)) };
    const brr = lines[1].split(' ');
    const b = { val: BigInt(brr.at(-1)) };
    const crr = lines[2].split(' ');
    const c = { val: BigInt(crr.at(-1)) };
    const drr = lines[4].split(' ');
    const arr = drr.at(-1).split(',').map((v) => BigInt(v));
    const combo = {
        '0': () => BigInt(0),
        '1': () => BigInt(1),
        '2': () => BigInt(2),
        '3': () => BigInt(3),
        '4': () => a.val,
        '5': () => b.val,
        '6': () => c.val
    };
    const sol = (a, b, c, arr) => {
        const rrr = [];
        let idx = 0;
        while (idx < arr.length) {
            const opcode = arr[idx];
            const operand = arr[idx + 1];
            if (opcode === BigInt(0)) {
                a.val = a.val / (BigInt(2) ** (combo[operand]()));
                idx += 2;
            } else if (opcode === BigInt(1)) {
                b.val = b.val ^ operand;
                idx += 2;
            } else if (opcode === BigInt(2)) {
                b.val = (combo[operand]()) % BigInt(8);
                idx += 2;
            } else if (opcode === BigInt(3)) {
                if (a.val) {
                    idx = Number(operand);
                } else {
                    idx += 2;
                }
            } else if (opcode === BigInt(4)) {
                b.val = b.val ^ c.val;
                idx += 2;
            } else if (opcode === BigInt(5)) {
                rrr.push((combo[operand]()) % BigInt(8));
                idx += 2;
            } else if (opcode === BigInt(6)) {
                b.val = a.val / (BigInt(2) ** (combo[operand]()));
                idx += 2;
            } else if (opcode === BigInt(7)) {
                c.val = a.val / (BigInt(2) ** (combo[operand]()));
                idx += 2;
            }
        }
        return rrr.join(',');
    };
    const rrr = [];
    const sol2 = (i, num) => {
        if (i === -1) {
            rrr.push(Number(num))
            return 42;
        }
        for (let j = 0; j < 8; j += 1) {
            const vvv = BigInt(j * (2 ** (3 * i))) + num;
            a.val = vvv;
            b.val = BigInt(0);
            c.val = BigInt(0);
            const sss = sol(a, b, c, arr).split(',').map((v) => BigInt(v));
            if (sss[i] === arr[i]) {
                sol2((i - 1), vvv);
            }
        }
        return 42;
    };
    console.log('part1:', sol(a, b, c, arr));
    sol2((arr.length - 1), BigInt(0));
    console.log('part2:', Math.min(...rrr));
    process.stdout.write('42');
});