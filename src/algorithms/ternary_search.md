# Ternary Search

```rust
// minimize, on float
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
```
[ABC279D](https://atcoder.jp/contests/abc279/tasks/abc279_d)


```rust
// maximize, on int
let mut lb = 0;
let mut ub = n - 1;
while ub - lb > 8 {
    let l = (lb + lb + ub) / 3;
    let r = (lb + ub + ub) / 3;
    if f(l) >= f(r) {
        ub = r;
    } else {
        lb = l;
    }
}

let mut ans = 0;
for i in lb..=ub {
    ans = ans.max(f(i));
}
```

[ABC388E](https://atcoder.jp/contests/abc388/submissions/61596561)