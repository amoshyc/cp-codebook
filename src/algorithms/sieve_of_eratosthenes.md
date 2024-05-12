# Sieve of Eratosthenes

```rust
struct SieveOfEratosthenes {
    primes: Vec<u64>,
}

impl SieveOfEratosthenes {
    fn new(max_val: usize) -> Self {
        let mut is_prime = vec![true; max_val + 1];
        let mut primes = vec![];
        for i in 2..=max_val {
            if is_prime[i] {
                primes.push(i as u64);
                let mut j = i * i;
                while j <= max_val {
                    is_prime[j] = false;
                    j += i;
                }
            }
        }
        Self { primes }
    }

    fn factorize(&self, mut x: u64) -> Vec<(u64, u64)> {
        assert!(x > 1);
        let mut res = vec![];
        for &p in self.primes.iter() {
            let mut exp = 0;
            while x % p == 0 {
                exp += 1;
                x = x / p;
            }
            if exp > 0 {
                res.push((p, exp))
            }
            if p * p > x {
                break;
            }
        }
        if x > 1 {
            res.push((x, 1));
        }
        res
    }
}

// x = p^a q^b r^c

// Number of factors of x:
//    d(x) = (a + 1)(b + 1)(c + 1)

// Sum of factors of x = ABC where
//    A = (p^(a + 1) - 1) / (p - 1)
//    B = (q^(b + 1) - 1) / (q - 1)
//    C = (r^(c + 1) - 1) / (r - 1)

// Product of factors of x:
//    x^(d(x) / 2)
// Note that d(x) / 2 may not be integer
// Take the factors of 36 as example:
// 1  2  3  4  6
// 36 18 12 9
// There are d(x) / 2 pairs which have product 36
```

<https://atcoder.jp/contests/arc167/submissions/46642235>