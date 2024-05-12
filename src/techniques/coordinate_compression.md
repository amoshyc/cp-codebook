# Coordinate Compression

```rust
fn compress<T: Clone + Ord>(arr: &[T]) -> (Vec<usize>, Vec<T>) {
    let mut s = arr.to_vec();
    s.sort();
    s.dedup();
    let res = arr
        .iter()
        .map(|x| s.binary_search(x).unwrap())
        .collect::<Vec<_>>();
    (res, s)
}
```