# Sieve of Eratosthenes

```rust
struct SieveOfEratosthenes {
    primes: Vec<u64>,
}

impl SieveOfEratosthenes {
    fn new(max_val: usize) -> SieveOfEratosthenes {
        let mut is_prime = vec![true; max_val + 1];
        let mut primes = vec![];
        for i in 2..=max_val {
            if is_prime[i] {
                primes.push(i as u64);
                for j in ((i * i)..=max_val).step_by(i) {
                    is_prime[j] = false;
                }
            }
        }
        SieveOfEratosthenes { primes }
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

<https://atcoder.jp/contests/abc280/submissions/54072054>
<https://atcoder.jp/contests/arc167/submissions/46642235>

power of 10:

| x | Number of primes < x |
|---------|---------|
| 10^3 | 168 |
| 10^4 | 1,229 |
| 10^5 | 9,592 |
| 10^6 | 78,498 |
| 10^7 | 664,579 |
| 10^8 | 5,7614,55 |
| 10^9 | 508,475,34 |
| 10^10 | 455,052,511 |
| 10^11 | 4,118,054,813 |
| 10^12 | 37,607,912,018 |

power of 2:

| x | Number of primes < x |
|---------|---------|
| 2^10 | 172 |
| 2^16 | 6,542 |
| 2^20 | 82,025 |
| 2^32 | 41,203,088,796 |


## Number of Prime Factors

```rust
// cnt[i] = number of prime factors of i
let mut cnt = vec![0; n + 1];
for i in 2..=n {
    if cnt[i] == 0 {
        for j in (i..=n).step_by(i) {
            cnt[j] += 1;
        }
    }
}
```