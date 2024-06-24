# LIS


```rust
fn longest_increasing_subsequence<T>(arr: &Vec<T>, strict: bool, inf: T) -> (Vec<usize>, Vec<T>)
where
    T: PartialOrd + Clone,
{
    // last[i] = the minimum value of the last element of IS of length i
    // dp[i] = maximum length of IS ending at i
    let n = arr.len();
    let mut last = vec![inf; n];
    let mut dp = vec![0; n];
    for i in 0..n {
        let j = last.partition_point(|x| {
            if strict {
                *x < arr[i] // strictly LIS
            } else {
                *x <= arr[i] // monotonically LIS
            }
        });
        last[j] = arr[i].clone();
        dp[i] = j + 1;
    }
    (dp, last)
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
let inv_rev = (0..n).map(|i| -arr[n - 1 - i]).collect();
let (mut dp2, _) = longest_increasing_subsequence(&inv_rev, true, i32::MAX);
dp2.reverse();
```

<https://atcoder.jp/contests/abc354/submissions/53665012>


## Weighted LIS