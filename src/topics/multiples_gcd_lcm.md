# Multiples/GCD/LCM


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