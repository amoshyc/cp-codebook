# Rotate


```rust
// clockwise
//  123        41
//  456   ->   52
//             63
// (2x3)      (3x2)
fn rotate_cw<T: Clone>(arr: &Vec<Vec<T>>) -> Vec<Vec<T>> {
    let (n, m) = (arr.len(), arr[0].len());
    let mut res = vec![vec![arr[0][0].clone(); n]; m];
    for r in 0..n {
        for c in 0..m {
            res[c][n - 1 - r] = arr[r][c].clone();
        }
    }
    res
}
```

```rust
// counterclockwise
//  123        36
//  456   ->   25
//             14
// (2x3)      (3x2)
fn rotate_ccw<T: Clone>(arr: &Vec<Vec<T>>) -> Vec<Vec<T>> {
    let (n, m) = (arr.len(), arr[0].len());
    let mut res = vec![vec![arr[0][0].clone(); n]; m];
    for r in 0..n {
        for c in 0..m {
            res[m - 1 - c][r] = arr[r][c].clone();
        }
    }
    res
}
```

[ABC404B](https://atcoder.jp/contests/abc404/submissions/65493111)