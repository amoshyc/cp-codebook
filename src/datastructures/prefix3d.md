# Prefix3D

```rust
fn build_3d(arr: &Vec<Vec<Vec<i64>>>) -> Vec<Vec<Vec<i64>>> {
    let (nx, ny, nz) = (arr.len(), arr[0].len(), arr[0][0].len());
    let mut pref = vec![vec![vec![0; nz]; ny]; nx];
    let transition = [
        ((-1, 0, 0), 1),
        ((0, -1, 0), 1),
        ((0, 0, -1), 1),
        ((0, -1, -1), -1),
        ((-1, 0, -1), -1),
        ((-1, -1, 0), -1),
        ((-1, -1, -1), 1),
    ];
    for x in 0..nx {
        for y in 0..ny {
            for z in 0..nz {
                pref[x][y][z] = arr[x][y][z];
                for &((dx, dy, dz), s) in transition.iter() {
                    let px = x.checked_add_signed(dx).unwrap_or(nx);
                    let py = y.checked_add_signed(dy).unwrap_or(ny);
                    let pz = z.checked_add_signed(dz).unwrap_or(nz);
                    if px < nx && py < ny && pz < nz {
                        pref[x][y][z] += s * pref[px][py][pz];
                    }
                }
            }
        }
    }
    pref
}

// arr[x1..=x2, y1..=y2, z1..=z2]
fn query_3d(
    pref: &Vec<Vec<Vec<i64>>>,
    x1: usize,
    x2: usize,
    y1: usize,
    y2: usize,
    z1: usize,
    z2: usize,
) -> i64 {
    let (nx, ny, nz) = (pref.len(), pref[0].len(), pref[0][0].len());
    let x1 = x1.checked_add_signed(-1).unwrap_or(nx);
    let y1 = y1.checked_add_signed(-1).unwrap_or(ny);
    let z1 = z1.checked_add_signed(-1).unwrap_or(nz);
    let transition = [
        ((x2, y2, z2), 1),
        ((x1, y2, z2), -1),
        ((x2, y1, z2), -1),
        ((x2, y2, z1), -1),
        ((x1, y1, z2), 1),
        ((x1, y2, z1), 1),
        ((x2, y1, z1), 1),
        ((x1, y1, z1), -1),
    ];
    let mut res = 0;
    for ((x, y, z), s) in transition {
        if x < nx && y < ny && z < nz {
            res += s * pref[x][y][z];
        }
    }
    res
}
```

<https://atcoder.jp/contests/abc366/submissions/56582097>