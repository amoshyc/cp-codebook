# Pairwise/Substring Problem

* Pairwise 問題，不允許對角線上的項，如 [{ sum_(i < j) f(A_i, A_j) }] 是比較好算的。
* Substring 問題，允許對角線，如 [{ sum_(i <= j) f(A[i..=j]) }] 是比較好算的。
* 若不是的話，可以先算完再扣掉或加回去。

## Sweep Line

> 給定長度為 `N` 的序列 `A`，請求出 [{ sum_(i=0)^(N-1) sum_(j = i + 1)^(N-1) f(A_i, A_j) }]。

[{ sum_(i=0)^(N-1) sum_(j = i + 1)^(N-1) f(A_i, A_j) = sum_(j=0)^(N-1) sum_(i = 0)^(j-1) f(A_i, A_j) }]

我們讓 [{j}] 從左掃到右，在計算 [{A_j}] 的答案時，同時維護 [{A[0..j]}] 的統計值。例如：

* [{ f(A_i, A_j) = A_i * 10^("num_digit"(A_j)) + A_j }] : [ABC353D](https://atcoder.jp/contests/abc353/submissions/53432676)

* [{ f(A_i, A_j) = max(A_j - A_i, 0) }] : [ABC351F](https://atcoder.jp/contests/abc351/submissions/52882061)


## Commutative and Triangular Matrix

> 給定長度為 `N` 的序列 `A`，請求出 [{ sum_(i=0)^(N-1) sum_(j = i + 1)^(N-1) f(A_i, A_j) }]。

如果 [{f}] 滿足**交換律**，即 [{f(A_i, A_j) = f(A_j, A_i)}]，則有以下性質。
上三角矩陣（不含對角線）是整個矩陣扣除對角線再除二。

[{ sum_(i=0)^(N-1) sum_(j = i + 1)^(N-1) f(A_i, A_j) = (sum_(i=0)^(N-1) sum_(j = 0)^(N-1) f(A_i, A_j) - (sum_(i=0)^(N-1) f(A_i, A_i))) / 2 }]

注意到等式右側與 `A` 的順序無關。這暗示了我們將 [{ A }] 任意進行重排，不會影響答案的計算。
所以許多時候我們可以將 `A` 由小排到大來讓 inner summation 比較好計算。例如：

* [{ f(A_i, A_j) = (A_i + A_j) % m }] : [ABC353C](https://atcoder.jp/contests/abc353/submissions/53405039)
* [{ f(A_i, A_j) = |A_j - A_i| }] : [ABC351E](https://atcoder.jp/contests/abc351/submissions/52883662)


## Prefix Sum

> 給定長度為 `N` 的序列 `A`，有多少個 pair `(l, r)` 滿足 `l <= r` 且 [{ "sum"(A[l..=r]) = X }]？ [CSES 1661](https://cses.fi/problemset/result/10075967/)

```
sum(arr[l..=j]) = x 
<-> pref[j] - (pref[l - 1] if l >= 1 else 0) = x
<-> pref[j] - x = (pref[l - 1] if l >= 1 else 0)
```

Case1: For each `pref[j]`, find the number of `pref[j] - x`.
Case2: `pref[x]`

> 給定長度為 `N` 的序列 `A`，有多少個 pair `(l, r)` 滿足 `l <= r` 且 [{ "sum"(A[l..=r]) % k = 0 }]？ [ABC164D](https://atcoder.jp/contests/abc164/submissions/53505764), [ABC367D](https://atcoder.jp/contests/abc367/tasks/abc367_d)

```
sum(A[l..r]) % k = 0 <-> Case 1 or Case 2
    Case 1: sum(A[0..l]) = sum(A[0..r]) (mod k)
    Case 2: sum(A[0..r]) = 0 (mod k)
=> Count the number of each remainder r of all prefixes
```

> 給定長度為 `N` 的 binary string [{S}]，考慮所有的 `i <= j`，總共有多少個 pair `(l, r)` 滿足 `(i <= l <= r <= j)` 且 `S[l..=r]` 中 0 的個數 = 1 的個數？ [CF1996E](https://codeforces.com/contest/1996/submission/272930021)

```rust
// s[x..=y] is valid <-> p[y] = p[x - 1] or p[y] = 0
let f = mapv(&s, |&c| if c == '0' { -1 } else { 1 } as i64);
let p = build(&f);

let mut pos = HashMap::new();
pos.entry(&0).or_insert(vec![]).push(-1); // To deal with the case p[y] = 0
for i in 0..n {
    pos.entry(&p[i]).or_insert(vec![]).push(i as i64);
}

for (_, v) in pos.iter() {
    // v = [..., x, ..., y, ...]
    // -> contribute (n - 1 - y + 1) * (x + 2) to answer
}
```

> 給定長度為 `N` 的序列 `A`，求出所有長度在 `a` 與 `b` 之間的 substring，最大的 sum，即 [{ max_(l <= r, a <= r - l + 1 <= b) "sum"(A[l..=r]) }] [CSES1644](https://cses.fi/problemset/result/10075694/)

```rust
max_(a <= r - l + 1 <= b) sum(A[l..=r])
= max_(a <= r - l + 1 <= b) pref[r] - (pref[l - 1] if l >= 1 else 0)
= max_(a + l - 1 <= r <= b + l - 1) pref[r] - (pref[l - 1] if l >= 1 else 0)
l = 0 -> a - 1 <= r <= b - 1
l = 1 -> a + 0 <= r <= b + 0
l = 2 -> a + 1 <= r <= b + 1
=> r forms sliding window of length b - a + 1
=> finding maximum of pref[r] can be done using monotonic deque
```

## DP

> 給定長度為 `N` 的序列 `A`，求出 [{ max_(l <= r) "sum"(A[l..=r]) }]。[CSES1643](https://cses.fi/problemset/result/5770681/)

```
dp[i] = the maximum sum of the substring ending at A[i].
dp[0] = A[0]
dp[i] = max(A[i], dp[i - 1] + A[i])
```

> 給定 0/1 組成的序列 `A`，問有多少個 substring `A[i..=j], (i < j)` 的 XOR 是 1。[ABC365E](https://atcoder.jp/contests/abc365/submissions/56361454)

Substring 問題可以先求 `(i <= j)` 再扣掉。

```rust
dp[i, 0/1] = number of substring ending at i that has overall xor 0/1
answer = sum(dp[i][1] for i in 0..n) - sum(A[i])
dp[0][arr[0]] = 1
dp[i, j] = dp[i - 1][j ^ A[i]] + (1 if A[i] == j else 0)
```

## Two Pointers

> 給定長度為 `N` 的列列 `A`，問有多少個 substring `A[i..=j], (i <= j)` unique elements 的數量 <= `k`。[CSES2428](https://cses.fi/problemset/result/10076634/)

對於每個左端點 `i`，找到最小的右端點 `j` 滿足 `A[i..=j]` 有 `> k` 個 unique elements.

```rust
let mut cnt = HashMap::new();
let mut uni = 0;
let mut ans = 0;
let mut i = 0;
let mut j = 0;
while i < n {
    while j < n && uni + (cnt.get(&arr[j]).unwrap_or(&0) == &0) as usize <= k {
        let c = *cnt.get(&arr[j]).unwrap_or(&0);
        cnt.insert(arr[j], c + 1);
        if c == 0 {
            uni += 1;
        }
        j += 1;
    }

    ans += j - i;

    let c = *cnt.get(&arr[i]).unwrap();
    cnt.insert(arr[i], c - 1);
    if c == 1 {
        uni -= 1;
    }
    i += 1;
}
```


## Exploit the Property

> Given a sequence `A[0..N]`, define [{ f(l, r) }] as the number of unique elements in `A[l..=r]`. What is [{ sum_(i=1)^N sum_(j=i)^N f(i, j) }] ? [ABC371E](https://atcoder.jp/contests/abc371/submissions/58617437)

For each kind of value, find how many segments will count them:

```
index: 0 1 2 3 4 5 6 7 8 9 
value: o o k o k o o o k o
```

We solve it by the complement, i.e., among the `N * (N + 1)` segments, how many of them do not contain `k`. By finding the positions of `k` in prior, it can be computed efficiently:

```rust
for (k, mut ps) in pos {
    let mut cnt = (n * (n + 1) / 2) as i64;
    ps.insert(0, -1);
    ps.push(n as i64);
    for w in ps.windows(2) {
        let l = w[1] - w[0] - 1;
        cnt -= l * (l + 1) / 2;
    }
    ans += cnt;
}
```


## 2 Sequences

> 給定長度為 `N` 的序列 `A` 與 `B`，請在 `O(N)` 的時間求出 $\sum_{0 \le i < j < N} A_i B_j$ 。

$$
\begin{align*}
\sum_{0 \le i \lt N, 0 \le j \lt N} A_i B_j &= \left( \sum_{i=0}^{N-1} A_i \right) \left( \sum_{j=0}^{N-1} B_j \right)
\\\\
\sum_{0 \le i, j \lt N, i \ne j} A_i B_j &= \left( \sum_{i=0}^{N-1} A_i \right) \left( \sum_{j=0}^{N-1} B_j \right) - \left( \sum_{i=0}^{N - 1} A_i B_i \right)
\\\\
\sum_{0 \le i \lt j \lt N} A_i B_j &= \frac{\left( \sum_{i=0}^{N-1} A_i \right) \left( \sum_{j=0}^{N-1} B_j \right) - \left( \sum_{i=0}^{N - 1} A_i B_i \right)}{2}
\end{align*}
$$