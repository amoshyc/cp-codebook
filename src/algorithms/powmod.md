# Powmod

```rust
fn powmod(a: u64, mut b: u64, m: u64) -> u64 {
    let mut base = a % m;
    let mut res = 1;
    while b != 0 {
        if b & 1 == 1 {
            res = res * base % m;
        }
        base = base * base % m;
        b >>= 1;
    }
    res
}
```


## Matrix

```rust
type Mat = Vec<Vec<u64>>;

fn matmul(a: &Mat, b: &Mat, m: u64) -> Mat {
    let (h, w) = (a.len(), b[0].len());
    let mut res = vec![vec![0; w]; h];
    for r in 0..h {
        for c in 0..w {
            for k in 0..b.len() {
                res[r][c] += (a[r][k] * b[k][c]) % m;
                res[r][c] %= m;
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
        if exp & 1 == 1 {
            ans = matmul(&ans, &base, m);
        }
        base = matmul(&base, &base, m);
        exp >>= 1;
    }
    ans
}
```

<https://atcoder.jp/contests/abc357/submissions/54403266>
<https://atcoder.jp/contests/abc293/submissions/54403547>