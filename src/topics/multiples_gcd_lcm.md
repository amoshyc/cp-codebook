# Multiples/GCD/LCM


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

**Substring is multiple of k**

```
sum(A[l..r]) % k = 0 
<-> 
sum(A[..r]) = sum(A[..l]) % k or 
sum(A[..r]) = 0 % k
```

[ABC164D](https://atcoder.jp/contests/abc164/submissions/53505764)


**Number of multiples in [A, B]**

```rust
fn num_multiples_in(a: u64, b: u64, m: u64) -> u64 {
    b / m - (a - 1) / m
}
```

[JSC2021](https://atcoder.jp/contests/jsc2021/submissions/59151073)