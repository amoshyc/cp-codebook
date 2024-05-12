# Cartesian Product

```rust
// cartesian(0..h, 0..w)
// cartesian(0..=h, 0..w)
// cartesian(0..h, 0..=w)
// cartesian(0..=h, 0..=w).collect()
fn cartesian<T, R1, R2>(r1: R1, r2: R2) -> impl Iterator<Item = (T, T)>
where
    T: Clone,
    R1: std::ops::RangeBounds<T> + Iterator<Item = T> + Clone,
    R2: std::ops::RangeBounds<T> + Iterator<Item = T> + Clone,
{
    r1.flat_map(move |x| r2.clone().map(move |y| (x.clone(), y)))
}
```

`RangeBounds` is a trait that `Range` and `RangeInclusive` both implements.