# Prefix 2D

```rust
fn build_2d(arr: &Vec<Vec<i64>>) -> Vec<Vec<i64>> {
    let (nr, nc) = (arr.len(), arr[0].len());
    let mut pref = vec![vec![0; nc]; nr];
    let transition = [((-1, 0), 1), ((0, -1), 1), ((-1, -1), -1)];
    for r in 0..nr {
        for c in 0..nc {
            pref[r][c] = arr[r][c];
            for &((dr, dc), s) in transition.iter() {
                let pr = r.checked_add_signed(dr).unwrap_or(nr);
                let py = c.checked_add_signed(dc).unwrap_or(nc);
                if pr < nr && py < nc {
                    pref[r][c] += s * pref[pr][py];
                }
            }
        }
    }
    pref
}

// arr[r1..=r2, c1..=c2]
fn query_2d(pref: &Vec<Vec<i64>>, r1: usize, r2: usize, c1: usize, c2: usize) -> i64 {
    let (nr, nc) = (pref.len(), pref[0].len());
    let r1 = r1.checked_add_signed(-1).unwrap_or(nr);
    let c1 = c1.checked_add_signed(-1).unwrap_or(nc);
    let transition = [((r2, c2), 1), ((r1, c2), -1), ((r2, c1), -1), ((r1, c1), 1)];
    let mut res = 0;
    for ((r, c), s) in transition {
        if r < nr && c < nc {
            res += s * pref[r][c];
        }
    }
    res
}
```

[ABC366D](https://atcoder.jp/contests/abc366/submissions/56582177)


## Diff2D

To add a rectange `r1..=r2, c1..=c2` in difference array:

```rust
diff[r1][c1] += 1;
diff[r1][c2 + 1] -= 1;
diff[r2 + 1][c1] -= 1;
diff[r2 + 1][c2 + 1] += 1;
```

The original array can be recovered using `build_2d(&diff)`.

[Typical90-028](https://atcoder.jp/contests/typical90/submissions/54070660)