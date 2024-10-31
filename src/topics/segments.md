# Segments

> Given `N` half-open segments, represent their union as the minimum number of segments. [ABC256D](https://atcoder.jp/contests/abc256/submissions/59194213)

```rust
segs.sort();
let mut ans = vec![];
let mut i = 0;
let mut j = 1;
while i < n {
    let mut t = segs[i].1;
    while j < n && segs[j].0 <= t {
        t = t.max(segs[j].1);
        j += 1;
    }
    ans.push(format!("{} {}", segs[i].0, t));
    i = j;
}
```

> Given `N` segments, what are the number of segments `l..=r (0 <= l <= r < M)` that contains **any** of the given segments. [ABC377D](https://atcoder.jp/contests/abc377/submissions/59177703)

Sweep line on the right border as `r` and maintain "the maximum left border of the segments at the left of `r`". The contribution of this `r` to the answer is the maintained value `+1`.

```rust
for _ in 0..n {
    inv[segs[r]].push(segs[l]);
}

let mut max_l = -1;
let mut cnt = 0;
for r in 0..m {
    for l in inv[r].iter() {
        max_l = max_l.max(*l as i64);
    }
    cnt += max_l + 1;
}
```