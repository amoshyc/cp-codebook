# PolyHash2

Double PolyHash.

```rust
struct PolyHasher2 {
    hasher0: PolyHasher,
    hasher1: PolyHasher,
}

impl PolyHasher2 {
    fn new(n: usize) -> Self {
        Self {
            hasher0: PolyHasher::new(n, 31, 1_000_000_007),
            hasher1: PolyHasher::new(n, 37, 1_000_000_009),
        }
    }

    fn hash(&self, arr: &[char]) -> (Vec<u64>, Vec<u64>) {
        let pref0 = self.hasher0.hash(arr);
        let pref1 = self.hasher1.hash(arr);
        (pref0, pref1)
    }

    // l..r
    // rev(S[l..r]) = revS[(n - r)..(n - l)]
    fn range(&self, pref: &(Vec<u64>, Vec<u64>), l: usize, r: usize) -> (u64, u64) {
        (
            self.hasher0.range(&pref.0, l, r),
            self.hasher1.range(&pref.1, l, r),
        )
    }
}
```

[ABC284F](https://atcoder.jp/contests/abc284/submissions/68729999)
