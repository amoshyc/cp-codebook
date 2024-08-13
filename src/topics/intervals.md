# Intervals

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