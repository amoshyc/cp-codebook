# Geometry

## Group by slope


```rust
let dx = (xy[j].0 - xy[i].0);
let dy = (xy[j].1 - xy[i].1);

let g = gcd(dx.abs(), dy.abs());
let (dx, dy) = (dx / g, dy / g);

// normalize (dx, dy) in regard to (-dx, -dy)
let pos = (dx, dy);
let neg = (-dx, -dy);
let (dx, dy) = if pos < neg { pos } else { neg };

groups.entry((dx, dy)).or_insert(vec![]).push(...);
```

[ABC418E](https://atcoder.jp/contests/abc418/submissions/68381296)


## Count of Trapezoid/Parallelogram

[ABC418E](https://atcoder.jp/contests/abc418/submissions/68381296)