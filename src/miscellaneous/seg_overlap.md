# Segment/Rect/Cube Overlapping

The overlapping of segment `l1..=r1` and segment `l2..=r2` is 

```rust
let l: i64 = l1.max(l2);
let r: i64 = r1.min(r2);
let w = (r1.min(r2) - l1.max(l2)).max(0);
```

When the segments does not overlap, the result segment is **invalid**.
Don't use unsigned types for such operattion, use `i64`.

Cube: <https://atcoder.jp/contests/abc361/submissions/55258977>