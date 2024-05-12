# Ordered Float

```rust
use std::cmp::Ordering;

#[derive(PartialEq, PartialOrd, Clone, Copy)]
struct F(f64);

impl Eq for F {}

impl Ord for F {
    fn cmp(&self, other: &F) -> Ordering {
        self.partial_cmp(other).unwrap()
    }
}
```

or

```rust
arr.sort_by_cmp(|a: f64, b: f64| a.partial_cmp(&b));
```