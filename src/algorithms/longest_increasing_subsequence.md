# LIS


```rust
fn longest_increasing_subsequence<T>(arr: &Vec<T>, strict: bool, inf: T) -> Vec<usize>
where
    T: PartialOrd + Clone,
{
    // dp[i] = the minimum value of the last element of IS of length i
    // lis[i] = maximum length of IS ending at i
    let n = arr.len();
    let mut dp = vec![inf; n];
    let mut lis = vec![0; n];
    for i in 0..n {
        let j = dp.partition_point(|x| {
            if strict {
                *x < arr[i] // strictly LIS
            } else {
                *x <= arr[i] // monotonically LIS
            }
        });
        dp[j] = arr[i].clone();
        lis[i] = j + 1;
    }
    lis
}
```

## Included in LIS

> Given a sequence `A[0..N]`, for each `i`, determine if `A[i]` is included in any of LIS of `A`.

```
Index i is included in LIS if dp1[i] + dp2[i] > len(LIS) where 
dp1[i] = max length of increasing subsequence ending at i.
dp2[i] = max length of increasing subsequence starting from i.
```

`dp2` can be founded by performing LIS on the inversed and reversed `A`.

```rust
let dp1 = longest_increasing_subsequence(&arr, true, i32::MAX);
let inv_rev = (0..n).map(|i| -arr[n - 1 - i]).collect();
let mut dp2 = longest_increasing_subsequence(&inv_rev, true, i32::MAX);
dp2.reverse();
```

[ABC354F](https://atcoder.jp/contests/abc354/submissions/58034179)


## Weighted LIS