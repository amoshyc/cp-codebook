# Ceil/Floor Division

利用 `a.div_euclid(b)`：

```rust
// a.div_euclid(b) is the same as floor(a/b)
fn floor_div(a: i64, b: i64) -> i64 {
    a.div_euclid(b)
}

// Add 1 to floor(a/b) if needed
fn ceil_div(a: i64, b: i64) -> i64 {
    a.div_euclid(b) + if a.rem_euclid(b) != 0 { 1 } else { 0 }
}
```

<https://atcoder.jp/contests/abc334/submissions/48817195>

---


```rust
// a/b rounds toward zero, therefore
// when a > 0, we right shift a,
// when a < 0, a/b is what we want
fn ceil_div(mut a: i64, mut b: i64) -> i64 {
    assert!(b != 0);
    a *= b.signum();
    b = b.abs();
    if a >= 0 {
        (a + b - 1) / b
    } else {
        a / b
    }
}

// a/b rounds toward zero, therefore
// when a > 0, a/b is what we want
// when a < 0, we left shift a.
fn floor_div(mut a: i64, mut b: i64) -> i64 {
    assert!(b != 0);
    a *= b.signum();
    b = b.abs();
    if a >= 0 {
        a / b
    } else {
        (a - (b - 1)) / b
    }
}
```

<https://atcoder.jp/contests/abc334/submissions/48817234>
