# Digit DP

bottom up + 遞推。

## [Valid payments](https://atcoder.jp/contests/abc182/tasks/abc182_f)

題目相當於在問：「所有 $A$ 進制的 $N$ 位數中（允許 leading 0）有幾個數 $r$ 滿足 $r$ 與 $X + r$ 沒有共同不為 $0$ 的 digit」，即 $\forall_{0 \le i \lt N}, r_i = 0 \lor (X + r)_i = 0$。


設 $y = X + r$，$c$ 是 carry，直式加法如下：

$$
\begin{array}{r}
&c_3 &c_2 &c_1 &0 \\\\
&x_3 &x_2 &x_1 &x_0 \\\\
+\quad
&r_3 &r_2 &r_1 &r_0 \\\\
\hline
&y_3 &y_2 &y_1 &y_0
\end{array}
$$

其中每一位 $i$ 都滿足（$m_i$ 是第 $i$ 數字的上限再加一，若是在 $A$ 進制中，常常是 $\frac{A_{i+1}}{A_i}$）：

$$
\begin{align}
y_i &= (c_i + x_i + r_i) \pmod {m_i} \\\\
c_{i + 1} &= \lfloor \frac{c_i + x_i + r_i}{m_i} \rfloor
\end{align}
$$

設 $dp[i, c]$ = number of valid ways to fill $r_{i - 1} \cdots r_1 r_0$ and $c_i = c$。題目所求即為 $dp[N, 0]$。枚舉 $r_i$ 所有可能的值，我們檢查 $r_i$ 與 $y_i$ 是不是滿足題目要求的 $r_i = 0 \lor y_i = 0$，我們得到遞推轉移：

$$
\text{if } r_i = 0 \lor y_i = 0 \text{ then } dp[i, c] \to dp[i + 1, c']
$$

```python
for i in range(N):
    for c in range(2):
        for r in range(m[i]):
            val = c + x[i] + r
            y = val % m[i]
            if r == 0 or y == 0:
                new_c = val // m[i]
                dp[i + 1][new_c] += dp[i][c]
```

概念上就是如此，不過這題只有這樣會 TLE，還需做額外的優化，在此不展開。

## [Minimal payments](https://atcoder.jp/contests/abc231/tasks/abc231_e)

在 $A$ 進制中，給定一個數 $V$，請找出一個數 $r$，最小化「組出 $r$ 與組出 $(V + r)$ 所需要的硬幣總數」。

c is carry, r is change, p is pay, v is price.

```
    c3  c2  c1   0
    v3  v2  v1  v0
+)  r3  r2  r1  r0
------------------
    p3  p2  p1  p0
```

```rust
c[i + 1] = floor_div(c[i] + v[i] + r[i], m[i])
p[i] = (c[i] + v[i] + r[i]) mod m[i]
m[i] = A[i + 1] / A[i]
```

```rust
dp[i, c] = minimum number of coins needed to fill r[0..i] and p[0..i] and c[i] = c
dp[0, 0] = 0
answer = dp[N, 0]
for i in 0..n:
    for c[i] in 0..2:
        for r[i] in 0..m[i]:
            dp[i + 1, c[i + 1]].chmin(dp[i, c] + r[i] + p[i])
```

```
There are limited (c[i], r[i]) pairs.
c[i + 1] = floor_div(c[i] + v[i] + r[i], m[i])
         = 0 if c[i] + v[i] + r[i] < m[i] else 1
         = 0 if r[i] < m[i] - v[i] - c[i] else 1
That is,
for all r[i] < m[i] - v[i] - c[i], they all maps to dp[i + 1, 0]
for all r[i] >= m[i] - v[i] - c[i], they all maps to dp[i + 1, 1]
```

```
For r[i] < m[i] - v[i] - c[i], we have c[i] + v[i] + r[i] < m[i], so
    dp[i + 1, 0].chmin(dp[i, c] + r[i] + p[i])
    dp[i + 1, 0].chmin(dp[i, c] + c[i] + v[i] + 2 * r[i])
Minimum occurs when r[i] = 0 (r[i] >= 0)
For r[i] >= m[i] - v[i] - c[i], we have c[i] + v[i] + r[i] >= m[i], so
    dp[i + 1, 1].chmin(dp[i, c] + r[i] + p[i])
    dp[i + 1, 1].chmin(dp[i, c] + c[i] + v[i] + 2 * r[i] - m[i])
Minimum occurs when r[i] = m[i] - v[i] - c[i] (r[i] >= 0)
```

[ABC231E](https://atcoder.jp/contests/abc231/submissions/53732734)


## [Digit Sum](https://atcoder.jp/contests/dp/tasks/dp_s)


整數 $1$ ~ $K$ 之間，有多少個整數 $X$ 滿足：digit sum 是 $D$ 的倍數。

讓我們將 $K, X$ 表示成陣列，以 $K=2345$ 為例：

$$
\begin{array}{r}
&k_3 &k_2 &k_1 &k_0 \\\\
&2 &3 &4 &5 \\\\
&x_3 &x_2 &x_1 &x_0
\end{array}
$$

設 $dp[i, s, f]$ = number of valid ways to fill $x_{i - 1} \cdots x_1x_0$ and

1. digit sum $(\sum_{j=0}^{i-1} x_j) \bmod D = s$
2. $(f = 0): x_{i-1} \cdots x_1 x_0 \le k_{i-1} \cdots k_1 k_0$
    $(f = 1): x_{i-1} \cdots x_1 x_0 \gt k_{i-1} \cdots k_1 k_0$
    
相較於前一題我們多了一個上界 $K$ 的限制，於是用一個狀態 $f$ 來記錄之。以 $K = 2345$ 為例，$dp[2, 0, 0]$ 代表二位數中有多少數小於或等於 45 且 digit sum $\bmod D = 0$；$dp[2, 0, 1]$ 代表二位數中有多少數大於 $45$ 且 digit sum $\bmod D = 0$；而 $(dp[2, 0, 0] + dp[2, 0, 1])$ 代表所有二位數中有多少個數的 digit sum $\bmod D = 0$。

枚舉 $x_i$ 的所有可能的值 $d (0 \le d \le 9)$，我們有以下遞推：

$$
dp[i, s, f] \to dp[i + 1, (s + d) \bmod D, f']
$$

其中 $f'$ 代表新的數字 $x_i x_{i-1} \cdots x_1 x_0$ 是不是大於 $k_i k_{i-1} \cdots k_1 k_0$。思考一下可以發現，只有當 $(d \gt k_i) \lor (d = k_i \land f = 1)$ 時 $f'$ 會是 1。題目所求為 $dp[N, 0, 0] - 1$。最後的 $-1$ 是因為 dp 會把 $X=0$ 也算是答案，但題目問得是 $1$ ~ $K$。


```python
K = [int(x) for x in reversed(input())]
N = len(K)
D = int(input())

dp = [[[0, 0] for _ in range(D)] for _ in range(N + 1)]
dp[0][0][0] = 1

for i in range(N):
    for s in range(D):
        for f in range(2):
            for d in range(10):
                new_s = (s + d) % D
                new_f = int((d > K[i]) or (d == K[i] and f == 1))
                dp[i + 1][new_s][new_f] += dp[i][s][f]

print(dp[N][0][0] - 1) # subtract the 0
```

有時題目會要求輸出那些數的和，而不是那些數的個數，此時可以維護另一個 dp 記錄和。
在轉移時考慮該 digit 對答案的增加，即「個數」乘上「該 digit 的值」。

```python
dp = [[[0, 0] for _ in range(D)] for _ in range(N + 1)]
ans = [[[0, 0] for _ in range(D)] for _ in range(N + 1)]
dp[0][0][0] = 1
for i in range(N):
    for s in range(D):
        for f in range(2):
            for d in range(10):
                new_s = (s + d) % D
                new_f = int((d > K[i]) or (d == K[i] and f == 1))
                dp[i + 1][new_s][new_f] += dp[i][s][f]

                val = dp[i][s][f] * (10**D)
                ans[i + 1][new_s][new_f] += ans[i][s][f] + val
```
[ABC406E](https://atcoder.jp/contests/abc406/submissions/65917206)


## [Windy 數](https://vjudge.net/problem/LibreOJ-10165)

定義 Windy 數為該數的數字（不含 leading 0）與數字之間差至少 2，問 $[a, b]$ 之間有多少 Windy 數？

如同上一題，我們轉換題目為求 $f(K)$ = $[0, K]$ 之間有多少數是 Windy 數。不同的是我們不只記錄前一位是否是 2，而是記錄前一位的數字是什麼。

設 $dp[i, p, f]$ = number of valid ways to fill $x_{i - 1} \cdots x_1 x_0$ and

1. $x_{i - 1} = p$
2. $(f = 0): x_{i-1} \cdots x_1 x_0 \le k_{i-1} \cdots k_1 k_0$
    $(f = 1): x_{i-1} \cdots x_1 x_0 \gt k_{i-1} \cdots k_1 k_0$
    
如果我們直接使用上一題的邏輯來遞推轉移會發現答案是錯的！這是因為 digit dp 將數字視為有 leading zero 的，例如 $K = 1234$ 時，$36$ 會被視為 $0036$ 在處理。這個特性在上一題並不影響答案，但這題會。$0036$ 是 Windy 數但 digit dp 會將之視為不是，因為他有 $00$ 不滿足數字差至少為 2，因此我們得修改我們的 dp。

關於這種情況有不少種解法，而我的解法是將 leading zero 用另一個字元 $\bullet$ 代替，將之與數字中間的 0 分開。例如 $36$ 會被視為 $\bullet \bullet 36$。而 $103$ 會被視為 $\bullet103$。

當我們枚舉 $x_i$ 時，我們用以下規則來確保製造出合法的 Windy 數：

1. 若 $x_{i - 1}$ 是 $\bullet$，則 $x_i$ 必得填 $\bullet$，因為 leading zero 出現，其左邊都得是 leading zero。
2. 若 $x_{i - 1}$ 是 0，則 $x_i$ 不可填 $\bullet$，因為 0 不可位於數的開頭。
3. 若 $x_{i - 1}$ 是其他數字時，則 $x_i$ 可以填 $\bullet$ 也可以填其他數字，只要滿足題意。

僅當這些規則成立時，這才是一個有效的 $x_i$，此時才遞推轉移：

$$
\text{if } (1) \land (2) \land (3) \text{, then } dp[i, p, f] \to dp[i + 1, x_i, f']
$$

$f'$ 的計算跟之前稍為不同，$f'$ 代表的是 $x_i x_{i-1} \cdots x_1 x_0 \gt k_i k_{i-1} \cdots k_1 k_0$ 成立與否。如果 $x_i$ 填 $\bullet$ 的話，則式子必不成立，即 $f' = 0$。因此 $f' = 1$ 的情況是 $((x_i \gt k_i) \lor (x_i = k_i \land f = 1)) \land (x_i \ne \bullet)$。

而 $f(K)$ 就是 $dp[N, \bullet, 0] + \sum_{p = 1}^9 dp[N, p, 0]$，注意到 $dp[N, 0, 0]$ 並不是答案一部份，因為現在數字不會以 0 開頭。實作上我將 $\bullet$ 用值 10 代替。

```cpp
for (int i = 1; i < N; i++) {
    for (int p = 0; p < 11; p++) { // x[i - 1]
        for (int f = 0; f <= 1; f++) {
            for (int d = 0; d < 11; d++) { // x[i]
                bool valid = false;
                if (p == 0) {
                    valid = (2 <= d && d <= 9);
                } else if (p == 10) {
                    valid = (d == 10);
                } else {
                    valid = (abs(p - d) >= 2 || d == 10);
                }
                if (valid) {
                    int new_f = (d > k[i] || (d == k[i] && f == 1)) && (d != 10);
                    dp[i + 1][d][new_f] += dp[i][p][f];
                }
            }
        }
    }
}

int res = 0;
for (int p = 1; p < 11; p++) {
    res += dp[N][p][0];
}
```