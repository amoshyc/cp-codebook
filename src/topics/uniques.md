# Unique Elements

## Number of Unique Elements with Small Charset

> Given a string `S[0..N]` consisting of lowercase English letters and `Q` queries, the query may
>    1. change the character at `S[i]` or 
>    2. ask the number of unique elements in `S[l..=r]`.

By storing the inverse positions of each kind of char in BTreeSet, or the one hot encoding of each kind in BIT:

```rust
// query 1
inv[s[i]].remove(&i); // bits[s[i]].add(i, -1);
s[i] = c;
inv[s[i]].insert(i);  // bits[s[i]].add(i, 1);

// query 2
let mut ans = 0;
for c in 0..26 {
    if let Some(p) = inv[c].range(l..).next() { // bits[c].sum(l, r + 1) > 0
        if *p <= r {
            ans += 1;
        }
    }
}
```
[ABC157E](https://atcoder.jp/contests/abc157/submissions/53570845)
[ABC157E](https://atcoder.jp/contests/abc157/submissions/53571346)

## Pairwise Unique Elements

> Given a sequence `A[0..N]`, define [{ f(l, r) }] as the number of unique elements in `A[l..=r]`. What is [{ sum_(i=1)^N sum_(j=i)^N f(i, j) }] ?

For each kind of value, find how many segments will count them:

```
index: 0 1 2 3 4 5 6 7 8 9 
value: o o k o k o o o k o
```

We solve it by the complement, i.e., among the `N * (N + 1)` segments, how many of them do not contain `k`. By finding the positions of `k` in prior, it can be computed efficiently:

```rust
for (k, mut ps) in pos {
    let mut cnt = (n * (n + 1) / 2) as i64;
    ps.insert(0, -1);
    ps.push(n as i64);
    for w in ps.windows(2) {
        let l = w[1] - w[0] - 1;
        cnt -= l * (l + 1) / 2;
    }
    ans += cnt;
}
```
[ABC371E](https://atcoder.jp/contests/abc371/submissions/58617437)


## Number of Unique Elements with No Modificaiton

> Given a sequence `A[0..N] `consisting of `i32` integers and `Q` queries. 
> The query asks the number of unique elements in `A[l..=r]`.

Since there are no modification, we can sort the queries.

```
f[i] = 1 if arr[i] is the rightmost position of arr[i] else 0.
```

Inspect the queries from left to right (via right boundry) and maintain the `f` of previous queries in a BIT. Then for query `(l, r)`, the answer is `sum(f[l..=r]) = BIT.sum(l..=r)`.

[ABC174F](https://atcoder.jp/contests/abc174/submissions/53667278)


## Longest Substring with <= K unique elements

> Give na sequence `A[0..N]` consisting of `i32` integers.
> Find the length of the longest substring with <= `K` unique elements.

Use two pointers and HashMap to find ans[i] = length of the longest substring starting from i with <= K unique elements.

```rust
let mut i = 0;
let mut j = 0;
for i in 0..n {
    while j < n && cnt.len() + if cnt.contains_key(&arr[j]) { 0 } else { 1 } <= k {
        *cnt.entry(arr[j]).or_insert(0) += 1;
        j += 1;
    }
    
    ans = ans.max(j - i);

    *cnt.entry(arr[i]).or_insert(0) -= 1;
    if cnt[&arr[i]] == 0 {
        cnt.remove_entry(&arr[i]);
    }
}
```

[Typical90-034](https://atcoder.jp/contests/typical90/submissions/54315188)