# Substring

> 給定長度為 [{N}] 的序列 [{A}]，對於 [{A}] 的所有 substring [{(l, r)(0 <= l < r < N)}]，


**Maximum Substring Sum** 

[{ max_(l < r) "sum"(A[l..r]) }]

```
dp[i] = maximum substring ending at A[i].
dp[0] = A[0]
dp[i] = max(A[i], dp[i - 1] + A[i])
```

**Number of substring that has a sum that is multiple of k** 

[{ sum_(l < r) 1["sum"(A[l..r]) % k = 0] }]

```
sum(A[l..r]) % k = 0 <-> Case 1 or Case 2
    Case 1: sum(A[0..l]) = sum(A[0..r]) (mod k)
    Case 2: sum(A[0..r]) = 0 (mod k)
=> Count the number of each remainder r of all prefixes
```

<https://atcoder.jp/contests/abc164/submissions/53505764>