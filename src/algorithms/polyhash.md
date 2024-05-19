# PolyHash

```rust
fn powmod(a: u64, mut b: u64, m: u64) -> u64 {
    let mut base = a % m;
    let mut res = 1;
    while b != 0 {
        if b & 1 == 1 {
            res = res * base % m;
        }
        base = base * base % m;
        b >>= 1;
    }
    res
}

struct PolyHasher {
    prime: u64,
    powr: Vec<u64>,
    pinv: Vec<u64>,
}

impl PolyHasher {
    fn new(n: usize, base: u64, prime: u64) -> PolyHasher {
        let mut powr = vec![1; n];
        let mut pinv = vec![1; n];
        for i in 1..n {
            powr[i] = powr[i - 1] * base % prime;
        }
        pinv[n - 1] = powmod(powr[n - 1], prime - 2, prime);
        for i in (0..(n - 1)).rev() {
            pinv[i] = pinv[i + 1] * base % prime;
        }
        PolyHasher { prime, powr, pinv }
    }

    fn hash(&self, arr: &[u64]) -> Vec<u64> {
        assert!(arr.iter().all(|&x| x != 0));
        let mut h = vec![0; arr.len()];
        h[0] = arr[0] % self.prime;
        for i in 1..arr.len() {
            h[i] = (h[i - 1] + arr[i] * self.powr[i] % self.prime) % self.prime;
        }
        h
    }

    // l..r
    // rev(S[l..r]) = revS[(n - r)..(n - l)]
    fn range(&self, h: &[u64], l: usize, r: usize) -> u64 {
        assert!(l < h.len());
        assert!(r <= h.len());
        if l == r {
            0
        } else if l == 0 {
            h[r - 1]
        } else {
            (self.prime + h[r - 1] - h[l - 1]) % self.prime * self.pinv[l] % self.prime
        }
    }
}
```

## Palindrome/Reverse

```rust
rev(S[l..r]) = revS[(n - r)..(n - l)]
```

## Compare Lexicographically

To compare 2 strings lexicographically, one can find their longest common prefix 
using binary search + hashing and compare the next char.

## Concatenation/Repeat

Concat string s and string t can be done in O(1) in PolyHash:

```rust
(hs, ht) = (hasher.hash(s), hasher.hash(t));
hst = (hs * hasher.powr[s.len()] % p + ht) % p;
```

## Reference

Rev: <https://atcoder.jp/contests/abc284/submissions/50879999>
Palindrome: <https://leetcode.com/submissions/detail/850611043/>
Concatenate: <https://atcoder.jp/contests/abc312/submissions/44107852>