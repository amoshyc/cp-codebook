## CombTool

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
    fn new(n: usize) -> CombTool {
        let mut fact = vec![Mint(1); n + 1];
        let mut finv = vec![Mint(1); n + 1];
        for i in 1..=n {
            fact[i] = fact[i - 1] * Mint(i as u64);
        }
        finv[n] = fact[n].inv();
        for i in (1..n).rev() {
            finv[i] = finv[i + 1] * Mint((i + 1) as u64);
        }
        CombTool { fact, finv }
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

<https://atcoder.jp/contests/abc262/submissions/37074323>