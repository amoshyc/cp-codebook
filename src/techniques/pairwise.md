# Pairwise Problem

## 1 Sequence

> 給定長度為 `N` 的序列 `A`，請求出 [{ sum_(i=0)^(N-1) sum_(j = i + 1)^(N-1) f(A_i, A_j) }]。

**Sweep Line**:

[{ sum_(i=0)^(N-1) sum_(j = i + 1)^(N-1) f(A_i, A_j) = sum_(j=0)^(N-1) sum_(i = 0)^(j-1) f(A_i, A_j) }]

我們讓 [{j}] 從左掃到右，在計算 [{A_j}] 的答案時，同時維護 [{A[0..j]}] 的統計值。例如：

[{ f(A_i, A_j) = A_i * 10^("num_digit"(A_j)) }] : 
    <https://atcoder.jp/contests/abc353/submissions/53432676>

[{ f(A_i, A_j) = max(A_j - A_i, 0) }] : 
    <https://atcoder.jp/contests/abc351/submissions/52882061>

---

**Triangular Matrix**:

如果 [{f}] 滿足**交換律**，即 [{f(A_i, A_j) = f(A_j, A_i)}]，則有以下性質。
上三角矩陣（不含對角線）是整個矩陣扣除對角線再除二。

[{ sum_(i=0)^(N-1) sum_(j = i + 1)^(N-1) f(A_i, A_j) = (sum_(i=0)^(N-1) sum_(j = 0)^(N-1) f(A_i, A_j) - (sum_(i=0)^(N-1) f(A_i, A_i))) / 2 }]

注意到等式右側與 [{A}] 的順序無關。這暗示了我們將 [{ A }] 任意進行重排，不會影響答案的計算。
所以許多時候我們可以將 [{A}] 由小排到大來讓 inner summation 比較好計算。例如：

[{ f(A_i, A_j) = (A_i + A_j) % m }] : 
<https://atcoder.jp/contests/abc353/submissions/53405039>

[{ f(A_i, A_j) = |A_j - A_i| }] : 
<https://atcoder.jp/contests/abc351/submissions/52883662>


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