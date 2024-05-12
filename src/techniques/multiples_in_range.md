# Multiples in Range

```rust
// f(x, l, r)
//  = number of multiple of x in range [l, r]
//  = max(0, floor(r / x) - ceil(l / x) + 1)
let f = |x: i64, l: i64, r: i64| -> i64 { 
    (r / x - (l + x - 1) / x + 1).max(0) 
};
```