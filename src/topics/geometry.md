# Geometry

## Sort by Angle / Polar Sorting

```rust
// cmp_cw(i, j) = LT <-> i to j is clockwise
// cmp_cw(i, j) = EQ <-> i, j has same angle
// cmp_cw(i, j) = GT <-> i to j is counter-clockwise
let cmp_cw = |i, j| {
    let (x0, y0) = xy[i];
    let (x1, y1) = xy[j];
    ((y0, x0) < (0, 0)) // quadrant of a
        .cmp(&((y1, x1) < (0, 0))) // quadrant of b
        .then_with(|| (x1 * y0).cmp(&(x0 * y1))) // slope(a), slope(b)
        .reverse() // ccw to cw
};

// argsort points by clockwise
let mut indices = (0..n).collect::<Vec<usize>>();
indices.sort_by(|i, j| cmp_cw(*i, *j));
```

[ABC442E](https://atcoder.jp/contests/abc442/submissions/73030724)


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