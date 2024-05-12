# Functional Graph

## Finding Cycle in Functional Graph

```rust
let mut vis = vec![false; n];
vis[0] = true;
let mut u = nxt[0];
while !vis[u] {
    vis[u] = true;
    u = nxt[u];
}

// u is the start of cycle
let mut cycle = vec![u];
let mut v = nxt[u];
while v != u {
    cycle.push(v);
    v = nxt[v];
}
cycle.push(u);
```