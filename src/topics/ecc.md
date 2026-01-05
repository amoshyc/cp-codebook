# Eccentricity


[{ "ecc"(u) = max_(v in T) d(u, v) = max(d(u, s), d(u, t)) }]

where [{ d }] is the distance and [{ s -> t }] is the diameter of the tree.

Diameter is the maximum eccentricity, that is, the longest distance in the tree:

[{ "diameter" = max_(u in T) "ecc"(u) = max_(u in T) max_(v in T) d(u, v) }]

Radius is the minimum eccentricity in the tree:

[{ "radius" = min_(u in T) "ecc"(u) = min_(u in T) max_(v in T) d(u, v)}]

The center(s) of the tree are the vertices that has [{ "ecc"(u) = r }].

The [{ s, t }] can be found using 2 BFS. See [here](https://youtu.be/wGrOPSBPpyk?si=jSPZf1JNN5cRBD9l) for reference.


```rust
let dep_from_0 = bfs(&adj, 0);
let s = (0..n).max_by_key(|&u| dep_from_0[u]).unwrap();
let dep_from_s = bfs(&adj, s);
let t = (0..n).max_by_key(|&u| dep_from_s[u]).unwrap();
let dep_from_t = bfs(&adj, t);

let ecc: Vec<usize> = (0..n).map(|&u| dep_from_s[u].max(dep_from_t[u])).collect();
let diameter = ecc.iter().max().unwrap();
let radius = ecc.iter().min().unwrap();
let centers = (0..n).filter(|&u| ecc[u] == radius).collect::<Vec<_>>();
```

[ABC428E](https://atcoder.jp/contests/abc428/submissions/72257600)


These concepts can be extended to **weighted** tree.

[ABC361E](https://atcoder.jp/contests/abc361/submissions/55321370)