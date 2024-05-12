# 2-SAT

    (p or q) => add edge (~p => q), (~q => p)

    (p) = (p or p)
    (p xor q) = (~p or ~q) and (p or q)
    At least 1 of (p, q) is true: (p or q)
    At least 2 of (p, q) is true: (p and q)
    At least 1 of (p, q, r) is true: (p or q or r) => Not a CNF.
    At least 2 of (p, q, r) is true: (p or q) and (q or r) and (p or r)
    At least 3 of (p, q, r) is true: (p and q and r)

    After tarjan scc,
        * No solution if any p has belong[p] = belong[~p].
        * p is true if belong[p] < belong[~p], i.e., topo(p) > topo(~p).

    If we get a truth table, we can construct the CNF.
    p q   eval
    - -    F
    - +    T
    + -    F
    + +    T
    We ban all the entries that are F. The DNF of banned entries is
        (~p and ~q) or (p and ~q)
    Negate the DNF and we get CNF of the T entries:
        (p or q) and (~p or q)

```rust
let mut add_clause = |p: usize, q: usize| {
    adj[p ^ 1].push(q);
    adj[q ^ 1].push(p);
};

// Check contraction
let ok = (0..n).all(|i| belong[2 * i] != belong[2 * i ^ 1]);

// Solution
for i in 0..n {
    let pos_i = 2 * i;
    if belong[pos_i] < belong[pos_i ^ 1] {
        // i is positive
    } else {
        // i is negative
    }
}
```

* <https://atcoder.jp/contests/practice2/submissions/53310836>
* <https://codeforces.com/contest/1971/submission/260608172>