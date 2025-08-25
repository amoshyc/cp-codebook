# Longest Increasing Subsequence

While inspecting `arr` from left to right, maintain:

```
aux[k] = the smallest last element of any increasing subsequence of length k
dp[i] = the length of LIS ending at arr[i]
      = (the largest j such that aux[j] < arr[i]) + 1 when inspecting from left to right
```

```rust
fn longest_increasing_subsequence<T>(arr: &Vec<T>, inf: T) -> Vec<usize>
where
    T: Clone + PartialOrd,
{
    // The length of the LIS is dp.iter().max().unwrap()
    // aux[0] is meaningless, so we skip it.
    // weakly: <=, strictly: <
    let n = arr.len();
    let mut aux = vec![inf; n + 1]; // Note the n + 1
    let mut dp = vec![0; n];
    for i in 0..n {
        dp[i] = aux[1..].partition_point(|x| *x < arr[i]) + 1;
        aux[dp[i]] = arr[i].clone();
    }
    dp
}
```

```rust
fn construct_lis<T: Clone>(dp: &Vec<usize>, arr: &Vec<T>) -> Vec<T> {
    let mut len = *dp.iter().max().unwrap();
    let mut lis = vec![];
    for i in (0..arr.len()).rev() {
        if dp[i] == len {
            lis.push(arr[i].clone());
            len -= 1;
        }
    }
    lis.reverse();
    lis
}
```

* [LibraryChecker](https://judge.yosupo.jp/submission/238437)
* [ABC369F](https://atcoder.jp/contests/abc369/submissions/58176075)


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

> Given N flowers. Flower i has height h[i] and beauty a[i]. Find a subsequence of the flower such that 
> (1) the height of the flowers are monotonically increasing and 
> (2) maximize the total sum of beauties.
> (N < 2e5, h[i] < N, a[i] < 1e9) [AtCoder DP Q](https://atcoder.jp/contests/dp/submissions/59298341)

The dp is:
```
dp[i] = maximum possible sum of the LIS ending at i
dp[i] = max(dp[j] if h[j] <= h[i] for j in 0..i) + a[i]
```
By storing the `(h[i], dp[i])` data in Segment Tree, we can find the rhs in [{ O(lgN) }].