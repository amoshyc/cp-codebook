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

fn foldv<T: Clone>(arr: &[T], op: impl Fn(T, T) -> T) -> Vec<T> {
    let mut res = vec![arr[0].clone(); arr.len()];
    for i in 1..arr.len() {
        res[i] = op(res[i - 1].clone(), arr[i].clone());
    }
    res
}

struct PolyHasher {
    p: u64,
    powr: Vec<u64>,
    pinv: Vec<u64>,
}

impl PolyHasher {
    fn new(n: usize, b: u64, p: u64) -> Self {
        let powr = foldv(&vec![1; n], |acc, _| (acc * b) % p);
        let inv = powmod(powr[n - 1], p - 2, p);
        let pinv = foldv(&vec![inv; n], |acc, _| (acc * b) % p);
        let pinv = pinv.into_iter().rev().collect();
        Self { p, powr, pinv }
    }

    fn hash(&self, s: &[char]) -> Vec<u64> {
        let h = (0..s.len())
            .map(|i| (s[i] as u64) % self.p * self.powr[i] % self.p)
            .collect::<Vec<_>>();
        let pref = foldv(&h, |acc, x| (acc + x) % self.p);
        pref
    }

    // l..r
    // rev(S[l..r]) = revS[(n - r)..(n - l)]
    fn range(&self, pref: &[u64], l: usize, r: usize) -> u64 {
        assert!(l < pref.len());
        assert!(r <= pref.len());
        if l == r {
            0
        } else if l == 0 {
            pref[r - 1]
        } else {
            (self.p + pref[r - 1] - pref[l - 1]) % self.p * self.pinv[l] % self.p
        }
    }
}
```

## Palindrome/Reverse

```rust
rev(S[l..r]) = revS[(n - r)..(n - l)]
```

## Compare Lexicographically

To compare 2 (long) strings lexicographically, one can find their longest common prefix 
using binary search + hashing and compare the next char.

## Concatenation/Repeat

Concatenating string s and string t can be done in O(1):

```rust
(hs, ht) = (hasher.hash(s), hasher.hash(t));
let hst = (hs * hasher.powr[s.len()] % p + ht) % p;
```

## Reference

Simple: [ABC353E](https://atcoder.jp/contests/abc353/submissions/68730388)
Rev: [ABC284F](https://atcoder.jp/contests/abc284/submissions/68729879)
Concatenate: [ABC430E](https://atcoder.jp/contests/abc430/submissions/70642126), [ABC312Ex](https://atcoder.jp/contests/abc312/submissions/44107852)