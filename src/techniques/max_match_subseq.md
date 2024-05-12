# Maximum Match for Subsequence

```rust
// Find the maximum length of prefix of t contained as a subsequence of s
fn max_match(s: &Vec<char>, t: &Vec<char>) -> usize {
    let mut t_idx = 0;
    for i in 0..s.len() {
        if t_idx < t.len() && s[i] == t[t_idx] {
            t_idx += 1;
        }
    }
    t_idx
}
```

Sequence `[*a, *b]` contains `t` as subsequence if and only if `max_match(a, t) + max_match(rev(b), rev(t)) >= t.len()`

<https://atcoder.jp/contests/abc324/submissions/46616960>