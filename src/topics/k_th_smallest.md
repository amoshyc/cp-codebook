# K-th Smallest

> Given A, B, K, find the K-th smallest string consisting of A occurrences of `a` and B occurences of `b`.

Greedily decide the i-th char of answer from left to right. If there are more than or equal to K strings starting with `a`, then it is `a`. Otherwise, it is `b`. The number of string can be found by the precalculated combination (binomial coefficient).

```rust
for i in 0..ans.len() {
    if a > 0 && b > 0 {
        let x = comb[a + b - 1][b];
        if x >= k {
            ans[i] = 'a';
            a -= 1;
        } else {
            k -= x;
            ans[i] = 'b';
            b -= 1;
        }
    } else {
        ans[i] = if a > 0 { 'a' } else { 'b' };
    }
}
```

<https://atcoder.jp/contests/abc202/submissions/56601554>