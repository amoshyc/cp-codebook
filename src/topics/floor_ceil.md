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

if we need to implement euclidean division ourself:

```rust
// euclidean_div is the same as floor_div.
// The remainder is always >= 0.
// a/b (b > 0) rounds toward zero.
// when a < 0, we left shift the value if needed.
// when a >= 0, a/b is what we want.
fn euclidean_div(mut a: i64, mut b: i64) -> (i64, i64) {
    if b < 0 {
        a = -a;
        b = -b;
    }
    let mut q = a / b;
    if q < 0 && a % b != 0 {
        q -= 1;
    }
    (q, a - b * q)
}

fn floor_div(a: i64, b: i64) -> i64 {
    let (q, r) = euclidean_div(a, b);
    q
}

fn ceil_div(a: i64, b: i64) -> i64 {
    let (q, r) = euclidean_div(a, b);
    q + if r != 0 { 1 } else { 0 }
}
```

[ABC334B](https://atcoder.jp/contests/abc334/submissions/48817195)
[ABC334B](https://atcoder.jp/contests/abc334/submissions/53956374)


## Number of digits

Number of digits in base [{b}] of a positive integer [{k}]

[{"number of digits" = floor(log_b k) + 1 = ceil(log_b(k + 1))}]

## Misc.

> What is [{ "max"_x floor((Ax) / B) - A floor(x / B) }] given [{ 0 <= x <= N, x in bbZ,  1 < A, B, N < 10^18 }]. [ABC165D](https://atcoder.jp/contests/abc165/submissions/59297350)

Let [{ x = kB + r " where " k in bbZ, r in bbZ, 0 <= r <= B - 1 }], then:

[{ max floor((Ax) / B) - A floor(x / B) }]
= [{ max floor(AK + (Ar)/B) - A * floor(k + r / B) }]
= [{ max floor((Ar) / B) }]

which is a monotonically increasing. The maximum occurs when r is maximized under constraints [{ x <= N }] and [{ r <= B - 1 }].

## isqrt

```rust
fn isqrt(x: u64) -> u64 {
    // 1 1 1 0 0 0
    let mut lb = 0;
    let mut ub = 1u64 << 32;
    while ub - lb > 1 {
        let m = (lb + ub) / 2;
        if m.saturating_mul(m) <= x {
            lb = m;
        } else {
            ub = m;
        }
    }
    lb
}
```

[ABC400C](https://atcoder.jp/contests/abc400/submissions/64707922)