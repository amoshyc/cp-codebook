# Pairwise on Graph/Tree

> 給定大小為 `N` 的帶權 Tree，定義 [{ f(u, v) }] 為 u 到 v 的最短路徑上，經過的邊權中的最大值。求 [{ sum_(u=1)^(N-1) sum_(v=u+1)^N f(u, v) }]。[ABC214D](https://atcoder.jp/contests/abc214/submissions/59233624)

將邊按邊權由小到大加進 DSU，當 `(u, v, w)` 被加進去時，對答案的貢獻是「`u` 所在 connected component 的大小」乘上「`v` 所在 connected component 的大小」乘上 `w`。

```rust
edges.sort_by_key(|&(u, v, w)| w);
let mut dsu = DSU::new(n);
let mut ans = 0 as i64;
for (u, v, w) in edges {
    ans += dsu.size(u) as i64 * dsu.size(v) as i64 * w;
    dsu.unite(u, v);
}
```