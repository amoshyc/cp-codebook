# Prefix 2D

```rust
fn build_2d<T>(arr: &Vec<Vec<T>>) -> Vec<Vec<T>>
where
    T: Default + Copy + std::ops::Add<Output = T> + std::ops::Sub<Output = T>,
{
    assert!(arr.len() >= 1 && arr[0].len() >= 1);
    let (n, m) = (arr.len(), arr[0].len());
    let mut pref = vec![vec![T::default(); m]; n];
    for r in 0..n {
        for c in 0..m {
            pref[r][c] = arr[r][c];
            if r >= 1 {
                pref[r][c] = pref[r][c] + pref[r - 1][c];
            }
            if c >= 1 {
                pref[r][c] = pref[r][c] + pref[r][c - 1];
            }
            if r >= 1 && c >= 1 {
                pref[r][c] = pref[r][c] - pref[r - 1][c - 1];
            }
        }
    }
    pref
}

// arr[r1..=r2, c1..=c2]
fn query_2d<T>(pref: &Vec<Vec<T>>, r1: usize, c1: usize, r2: usize, c2: usize) -> T
where
    T: Default + Copy + std::ops::Add<Output = T> + std::ops::Sub<Output = T>,
{
    let mut res = pref[r2][c2];
    if r1 >= 1 {
        res = res - pref[r1 - 1][c2];
    }
    if c1 >= 1 {
        res = res - pref[r2][c1 - 1];
    }
    if r1 >= 1 && c1 >= 1 {
        res = res + pref[r1 - 1][c1 - 1];
    }
    res
}
```