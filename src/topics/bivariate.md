# Bivariate

> There are 2 types of machine.
> Machine 1 produces A products and costs P yen per machine. 
> Machine 2 produces B products and costs Q yen per machine.
> To produce M products, what is the minimum costs? 
> `1 < A, B < 100, 1 < P, Q, M < 1e18`

In the OPT, at least one of the following is true:
1. Number of machine 1 <= `B`
2. Number of machine 2 <= `A`

This is because if we want to produce `A * B` products we can 
1. Buy `B` units of machine 1, or
2. Buy `A` units of machine 2.

And there is a cheaper one. Therefore any number that is a multiple of `A * B` has a greedy solution. 
Hence, we can check the number of one of the machine and calculate the number of the other machine by `ceil_div`:

```rust
let mut min = inf;
for cnt_1 in 0..=b {
    let cnt_2 = ceil_div(m - cnt_1 * a, b);
    if cnt_1 * a <= m && cnt_1 * a + cnt_2 * b >= m {
        min = min.min(cnt_1 * p + cnt_2 * q);
    }
}
for cnt_2 in 0..=a {
    let cnt_1 = ceil_div(m - cnt_2 * b, a);
    if cnt_2 * b <= m && cnt_1 * a + cnt_2 * b >= m {
        min = min.min(cnt_1 * p + cnt_2 * q);
    }
}
```

[ABC374E](https://atcoder.jp/contests/abc374/submissions/58470892)