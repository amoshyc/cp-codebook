# Sparse Table


```rust
struct SparseTable<T> {
    dp: Vec<Vec<T>>,
    op: fn(T, T) -> T,
}

impl<T: Copy> SparseTable<T> {
    fn new(arr: &Vec<T>, op: fn(T, T) -> T) -> Self {
        let nn = (arr.len() as f64).log2() as usize + 1;
        let mut dp = vec![arr.clone(); nn];
        for i in 1..nn {
            for u in 0..=(arr.len() - (1 << i)) {
                dp[i][u] = (op)(dp[i - 1][u], dp[i - 1][u + (1 << (i - 1))]);
            }
        }
        Self { dp, op }
    }

    // a..b
    fn query(&self, a: usize, b: usize) -> T {
        assert!(a != b);
        let k = ((b - a) as f64).log2() as usize;
        (self.op)(self.dp[k][a], self.dp[k][b - (1 << k)])
    }
}
```

https://atcoder.jp/contests/abc254/submissions/41799326