# Sum to X

> Given N constraints `0 <= x[i] <= C[i]`, find a solution of `x`s that satisfies [{ sum_i x_i = X }].

It can be solved greedily. When inspecting `x[i]` from left to right, set `x[i]` to its maximum if the total is still less that `X`. Otherwise, set it to 0.

> Given N constraints `L[i] <= y[i] <= R[i]`, find a solution of `y`s that satisfies [{ sum_i y_i = Y }]. Output "No" if no solution exists.

The possible lowerbound is sum(L) and upperbound is sum(R). If x is not inside this range, there is no solution. To find `y`, we can transform it into previous problem by setting `x[i] = y[i] - L[i]` and `X = Y - sum(L)`.

```rust
let sum_l = l.iter().sum::<i64>();
let sum_r = r.iter().sum::<i64>();
if target_y < sum_l || target_y > sum_r {
    println!("No");
    return;
}

let mut y = l.clone();
target_y -= sum_l;
for i in 0..n {
    if target_y > 0 {
        let x = target_y.min(r[i] - l[i]);
        y[i] += x;
        target_y -= x;
    }
}
```

[ABC362C](https://atcoder.jp/contests/abc362/submissions/55942834)


