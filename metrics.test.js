const assert = require('assert');
const { calculateChainMetrics } = require('./metrics.js');

function test() {
    console.log('Running tests for calculateChainMetrics...');

    // 1. Normal case
    console.log('Test 1: Normal case (noise = 0.25)');
    const res1 = calculateChainMetrics(0.25);
    assert.strictEqual(res1.overlap, 0.9999 - (0.25 * 0.0002));
    assert(res1.matter > 0);
    assert(res1.alpha >= 0 && res1.alpha <= 0.8);

    // 2. Boundary case: noise = 0
    console.log('Test 2: Boundary case (noise = 0)');
    const res2 = calculateChainMetrics(0);
    assert.strictEqual(res2.overlap, 0.9999);
    assert.strictEqual(res2.matter, Math.sqrt(1 - 0.9999 * 0.9999));

    // 3. Boundary case: noise = 0.5
    console.log('Test 3: Boundary case (noise = 0.5)');
    const res3 = calculateChainMetrics(0.5);
    assert.strictEqual(res3.overlap, 0.9999 - (0.5 * 0.0002));

    // 4. Extreme case: noise = 1.0
    console.log('Test 4: Extreme case (noise = 1.0)');
    const res4 = calculateChainMetrics(1.0);
    assert.strictEqual(res4.overlap, 0.9999 - 0.0002);

    // 5. Extreme case: noise = 10000 (should still not result in NaN)
    console.log('Test 5: Extreme case (noise = 10000)');
    const res5 = calculateChainMetrics(10000);
    assert.strictEqual(res5.overlap, -1); // Clamped
    assert.strictEqual(res5.matter, 0);
    assert.strictEqual(res5.alpha, 0);

    // 6. Extreme case: noise = -10000
    console.log('Test 6: Extreme case (noise = -10000)');
    const res6 = calculateChainMetrics(-10000);
    assert.strictEqual(res6.overlap, 1); // Clamped
    assert.strictEqual(res6.matter, 0);
    assert.strictEqual(res6.alpha, 0);

    // 7. Invalid input: NaN
    console.log('Test 7: Invalid input (NaN)');
    const res7 = calculateChainMetrics(NaN);
    assert.strictEqual(res7.overlap, 0.9999); // Defaults to 0

    // 8. Invalid input: string
    console.log('Test 8: Invalid input (string)');
    const res8 = calculateChainMetrics('0.25');
    assert.strictEqual(res8.overlap, 0.9999 - (0.25 * 0.0002));

    // 9. Invalid input: non-numeric string
    console.log('Test 9: Invalid input (non-numeric string)');
    const res9 = calculateChainMetrics('hello');
    assert.strictEqual(res9.overlap, 0.9999); // Defaults to 0

    console.log('All tests passed!');
}

try {
    test();
} catch (err) {
    console.error('Test failed!');
    console.error(err);
    process.exit(1);
}
