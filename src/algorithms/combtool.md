# CombTool

$$
x!^{-1}
\equiv (\frac{(x + 1)!}{x + 1}) ^ {-1}
\equiv (x + 1)!^{-1} (x + 1)
\pmod {p}
$$

```rust
struct CombTool {
    fact: Vec<Mint>,
    finv: Vec<Mint>,
}

impl CombTool {
    fn new(n: usize) -> Self {
        let mut fact = vec![Mint(1); n + 1];
        let mut finv = vec![Mint(1); n + 1];
        for i in 1..=n {
            fact[i] = fact[i - 1] * Mint(i as u64);
        }
        finv[n] = fact[n].inv();
        for i in (1..n).rev() {
            finv[i] = finv[i + 1] * Mint((i + 1) as u64);
        }
        Self { fact, finv }
    }
    fn comb(&self, a: usize, b: usize) -> Mint {
        self.fact[a] * self.finv[b] * self.finv[a - b]
    }
    fn perm(&self, a: usize, b: usize) -> Mint {
        self.fact[a] * self.finv[a - b]
    }
    fn hcomb(self, a: usize, b: usize) -> Mint {
        self.comb(a + b - 1, b)
    }
}
```
[ABC262E](https://atcoder.jp/contests/abc262/submissions/37074323)

## Problems

> Given the upperbounds [{{c_a, c_b, ..., c_z}}] and $K$, how many string of length [{K}] can be formed where the number of character [{x}] satisfies the upperbound, [{ 0 <= n(x) <= c_x }].

Let [{dp[i, j]}] = number of string of length [{j}] that uses first [{i}] characters, i.e., [{{a, b, ..., i}}].
For [{dp[i, j]}], inspect the number of character [{i}]  and their possible locations:

```
source: xxxx
(l = 0) => xxxx
(l = 1) => ixxx, xixx, xxix, xxxi
(l = 2) => iixx, ixix, ixxi, xiix, xixi, xxii 
...
(l = c[i])
```
That is, choosing [{l}] characters from the length [{j}] string to be filled with [{i}]. The remaining positions forms a repeated subproblem, the number of string of length [{j - l}] that uses first [{i - 1}] characters:
[{ dp[i, j] = \sum_(l=0)^(c_i) ((j), (l)) dp[i - 1, j - l]}]

```rust
let mut dp = vec![vec![Mint(0); k + 1]; 26];
for j in 0..=cnt[0].min(k) { // Aware the base case
    dp[0][j] = Mint(1);
}
for i in 1..26 {
    for j in 0..=k {
        for l in 0..=cnt[i].min(j) {
            dp[i][j] = dp[i][j] + tool.comb(j, l) * dp[i - 1][j - l];
        }
    }
}
```
[ABC358E](https://atcoder.jp/contests/abc358/submissions/54619518)

