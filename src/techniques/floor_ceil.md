# Floor and Ceiling

## Floor Division and Ceiling Division

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

Another method:

```rust
// a/b (b > 0) rounds toward zero, therefore
// when a >= 0, we right shift a if needed
// when a < 0, a/b is what we want
fn ceil_div(mut a: i64, mut b: i64) -> i64 {
    assert!(b != 0);
    if b < 0 {
        a = -a;
        b = -b;
    }
    if a >= 0 {
        (a + b - 1) / b
    } else {
        a / b
    }
}

fn floor_div(a: i64, b: i64) -> i64 {
    let c = ceil_div(a, b);
    c - if a % b != 0 { 1 } else { 0 }
}
```

<https://atcoder.jp/contests/abc334/submissions/53955716>


## Number of digits

Number of digits in base [{b}] of a positive integer [{k}]

[{"number of digits" = floor(log_b k) + 1 = ceil(log_b(k + 1))}]