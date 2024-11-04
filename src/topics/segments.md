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

> The overlapping segment of segment `l1..=r1` and segment `l2..=r2` is 

```rust
let l: i64 = l1.max(l2);
let r: i64 = r1.min(r2);
let w = (r1.min(r2) - l1.max(l2)).max(0);
```

When the segments do not overlap, the result segment is **invalid**.
Don't use unsigned types for such operation, use `i64`.

Cube: [ABC361B](https://atcoder.jp/contests/abc361/submissions/55258977)

## Number of Overlapping Pairs

Inspect intervals from **left to right**, via **right endpoints**. For `curr_l..=curr_r`, find how many previous intervals `prev_l..=prev_r` satisfies `prev_r >= curr_l`. It can be implemented as binary search, two pointers, or BIT with coordinate compression.

```rust
let mut ans = 0;
segs.sort_by_key(|&(l, r)| (r, l));
for i in 0..n {
    let (curr_l, curr_r) = segs[i];
    let p = segs.partition_point(|&(prev_l, prev_r)| prev_r < curr_l);
    if p < i {
        ans += (i - p) as i64;
    }
}
```

[ABC355D](https://atcoder.jp/contests/abc355/submissions/53915036)


## Number of Non-overlapping Pairs

Inspect intervals from **left to right**, via **right endpoints**. For `curr_l..=curr_r`, find how many previous intervals `prev_l..=prev_r` satisfies `prev_r < curr_l`. It can be implemented as binary search, two pointers, or BIT with coordinate compression.

[ABC355D](https://atcoder.jp/contests/abc355/submissions/53915566)