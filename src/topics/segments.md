# Segments

> The overlapping segment of segment `l1..=r1` and segment `l2..=r2` is 

```rust
let l: i64 = l1.max(l2);
let r: i64 = r1.min(r2);
let w = (r1.min(r2) - l1.max(l2)).max(0);
```

When the segments do not overlap, the result segment is **invalid**.
Don't use unsigned types for such operation, use `i64`.

Cube: [ABC361B](https://atcoder.jp/contests/abc361/submissions/55258977)


## Total Length of Union / Union as Minimum Number of Segments

> Given `N` segments (`l[i]..=r[i]`), what is the total length of the union when each segments are given? [ABC435E](https://atcoder.jp/contests/abc435/submissions/72163429)

> Given `N` segments, represent their union as the minimum number of segments. [ABC256D](https://atcoder.jp/contests/abc256/submissions/72163798)

Manage the segments in a set via right endpoints. When there's a new segment `l[i]..=r[i]`, merge it with all the overlapping segments in the set. The overlapping segments can be found by binary searching the `l` and checking the right border.

```rust
let mut segs = BTreeSet::new(); // l..=r
let mut total = 0; // total length of the union

for (l, r) in lr {
    let mut new_l = l;
    let mut new_r = r;
    while let Some(&(b, a)) = segs.range((new_l, 0)..).next() {
        if new_r < a {
            break;
        }
        segs.remove(&(b, a));
        total -= b - a + 1;
        new_l = new_l.min(a);
        new_r = new_r.max(b);
    }

    segs.insert((new_r, new_l));
    total += new_r - new_l + 1;
}
```

## Number of Overlapping Pairs

> Given `N` segments, what the number of pairs that overlaps? [ABC355D](https://atcoder.jp/contests/abc355/submissions/53915036)

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

> Given `N` segments, what are the number of segments `l..=r (0 <= l <= r < M)` that contains the query segment. [ABC377D](https://atcoder.jp/contests/abc377/submissions/59177703)

Inspect the query segments via right endpoints `r` while maintaining "the maximum left border of the segments at the left of `r`". The contribution of this `r` to the answer is the maintained value `+1`.

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


## Number of Non-overlapping Pairs

Inspect intervals from **left to right** via **right endpoints**. For `curr_l..=curr_r`, find how many previous intervals `prev_l..=prev_r` satisfies `prev_r < curr_l`. It can be implemented as binary search, two pointers, or BIT with coordinate compression.

[ABC355D](https://atcoder.jp/contests/abc355/submissions/53915566)


