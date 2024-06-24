# Eccentricity


Eccentricity(u)
= the longest distance from u in the tree
= the larger of $d(u, s), d(u, t)$ where $s$ to $t$ is a diameter.

$$
\begin{align}
&ecc(u)
= \max_{v \in V} d(u, v)
= max(d(u, s), d(u, t))
\end{align}
$$

Diameter is the maximum eccentricity, that is, the longest distance in the tree.

$$
d = \max_{u \in V} ecc(u) = \max_{u \in V} \max_{v \in V} d(u, v)
$$

Radius is the minimum eccentricity in the tree.

$$
r = \min_{u \in V} ecc(u) = \min_{u \in V} \max_{v \in V} d(u, v)
$$

The center(s) is the vertices $u$ that has $ecc(u) = r$.

To find $s, t$, we can perform 2 BFS:

```rust
// Find s, t
let dep_from_0 = bfs(&adj, 0);
let s = (0..n).max_by_key(|u| dep_from_0[u]).unwrap();
let dep_from_s = bfs(&adj, s);
let t = (0..n).max_by_key(|u| dep_from_s[u]).unwrap();
let diamter = dep_from_s[t];
// Build ecc
let dep_from_t = bfs(&adj, t);
let ecc: Vec<usize> = (0..n).map(|u| dep_from_s[u].max(dep_from_t[u])).collect();
let diameter = ecc.iter().max().unwrap();
let radius = ecc.iter().min().unwrap();
```