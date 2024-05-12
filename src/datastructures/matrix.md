# Matrix

```rust
type Mat = Vec<Vec<u64>>;

fn matmul(a: &Mat, b: &Mat, mls: u64) -> Mat {
    let (n, m) = (a.len(), b[0].len());
    let mut res = vec![vec![0; m]; n];
    for r in 0..n {
        for c in 0..m {
            for k in 0..(b.len()) {
                res[r][c] += a[r][k] * b[k][c];
                res[r][c] %= mls;
            }
        }
    }
    res
}

fn matpow(mat: &Mat, mut exp: u64, m: u64) -> Mat {
    let n = mat.len();
    let mut base = mat.clone();
    let mut ans = vec![vec![0; n]; n];
    for i in 0..n {
        ans[i][i] = 1;
    }
    while exp > 0 {
        if (exp & 1) > 0 {
            ans = matmul(&ans, &base, m);
        }
        base = matmul(&base, &base, m);
        exp >>= 1;
    }
    ans
}

// rotate clockwise
fn r90cw<T: Default + Clone>(arr: &Vec<Vec<T>>) -> Vec<Vec<T>> {
    let (n, m) = (arr.len(), arr[0].len());
    let mut res = vec![vec![T::default(); n]; m];
    for r in 0..n {
        for c in 0..m {
            res[r][c] = arr[c][n - 1 - r].clone();
        }
    }
    res
}
```

[https://atcoder.jp/contests/abc293/submissions/39650552](https://atcoder.jp/contests/abc293/submissions/39650552)