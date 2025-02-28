# Multiples/GCD/LCM

```rust
fn gcd(a: u64, b: u64) -> u64 {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}
```

Note that `lcm` may overflow.
```rust
fn lcm(a: u64, b: u64) -> u64 {
    (a / gcd(a, b)).saturating_mul(b)
}
```

[ABC150D](https://atcoder.jp/contests/abc150/submissions/63213542)


**Choosing Common Divisisors that is Coprime**

> Given 0 < a, b < 1e12, choose some of the common divisiors of a and b that are coprime to each other. At most how many common divisors can we choose?

Say that the common divisors of a and b (i.e., the divisors of gcd(a, b)) is

1, 2, 3, 6, 7, 14, 21, 42

We can only choose 1 item among the mulitples of a prime factor. Therefore, the best way to maximize the chosen items is to choose the primes and 1.

[ABC142D](https://atcoder.jp/contests/abc142/submissions/62985015)


**Enumerate the Answer**

> Choosing `K` items from `A[0..N]` at will, what is the maximum gcd of them?

Enumerate all possible gcd, check if there are `K` items that is a multiple of it.
[{ O(nlgn) }] complexity due to finite harmonic series.

```rust
let freq = Counter(arr);
let max = arr.iter().max().unwrap();
for gcd in (1..=max).rev() {
    let cnt = (gcd..=max).step_by(gcd).map(|x| freq[x]).sum::<usize>();
    if cnt >= k {
        println!("{}", gcd);
        break;
    }
}
```

[ABC393E](https://atcoder.jp/contests/abc393/submissions/62819583)


**Number of multiples in [A, B]**

```rust
fn num_multiples_in(a: u64, b: u64, m: u64) -> u64 {
    b / m - (a - 1) / m
}
```

[JSC2021](https://atcoder.jp/contests/jsc2021/submissions/59151073)


**Substring is multiple of k**

```
sum(A[l..r]) % k = 0 
<-> 
sum(A[..r]) = sum(A[..l]) % k or 
sum(A[..r]) = 0 % k
```

[ABC164D](https://atcoder.jp/contests/abc164/submissions/53505764)