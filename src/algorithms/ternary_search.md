# Ternary Search

```rust
fn ternary_search() { // minimize
    let mut lb = 0.0 as f64;
    let mut ub = (10.0 as f64).powf(19.0);
    let f = |n: f64| -> f64 { 2 * n + 10 * ((1.0 + n).powf(-0.5)) };
    for _ in 0..200 {
        let l = (lb + lb + ub) / 3.0;
        let r = (lb + ub + ub) / 3.0;
        if f(l) <= f(r) {
            ub = r;
        } else {
            lb = l;
        }
    }
}
```