# XorShift

```Rust
struct XorShift64 {
    seed: u64, // should be nonzero
}

impl XorShift64 {
    fn new(&mut self) -> u64 {
        assert!(self.seed != 0);
        let mut x = self.seed;
        x ^= x << 13;
        x ^= x >> 7;
        x ^= x << 17;
        self.seed = x;
        x
    }
}
```

[ABC367F](https://atcoder.jp/contests/abc367/submissions/56836954)