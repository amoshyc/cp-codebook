# Number of Unique Elements


## Count in Substring

> Given a string S[0..N] consisting of lowercase English letters and Q queries, the query may
>    (1) change the character at S[i] or 
>    (2) ask the number of unique elements in S[l..=r].

**Exploit the Small Charset**

By storing the inverse positions of each kind of char in BTreeSet:

```rust
// query 1
inv[s[i]].remove(&i);
s[i] = c;
inv[s[i]].insert(i);

// query 2
for c in 0..26 {
    if let Some(p) = inv[c].range(l..).next() {
        if *p <= r {
            ans += 1;
        }
    }
}
```

By storing the one hot encoding of each kind of char in BIT:

```rust
// query 1
bits[s[i]].add(i, -1);
s[i] = c;
bits[s[i]].add(i, 1);

// query 2
for c in 0..26 {
    if bits[c].sum(l, r + 1) > 0 {
        ans += 1;
    }
}
```

<https://atcoder.jp/contests/abc157/submissions/53570845>
<https://atcoder.jp/contests/abc157/submissions/53571346>