# K(-th) Smallest


## The K-th Smallest Elements with only Add

Use a priority queue (max heap).

```rust
que.push(arr[i]);
sum += arr[i];
if que.len() > k {
    sum -= que.pop().unwrap();
}
```

[ABC376E](https://atcoder.jp/contests/abc376/submissions/58989144)


## The K-th Smallest Elements with Add and Remove

Use two priority queues.

[ABC312F](https://atcoder.jp/contests/abc312/submissions/44105261)
[ABC314G](https://atcoder.jp/contests/abc314/submissions/44556667)


## Random Accessing K-th Smallest in a Container with Add and Remove with Limited Value

Store the frequency of each value in a SegTree/BIT. 
When querying k-th smallest (1-based) element, we find the first value that has prefix sum = k:

```rust
let j = seg
    .first_of(&|data, pref, suff| pref >= k, 0, 0, 0, 0, seg.nn)
    .unwrap();
```

[ABC392F](https://atcoder.jp/contests/abc392/submissions/62925585)



## The K-th Smallest Binary String

> Given A, B, K, find the K-th smallest string consisting of A occurrences of `a` and B occurences of `b`.

Greedily decide the i-th char of answer from left to right. If there are more than or equal to K strings starting with `a`, then it is `a`. Otherwise, it is `b`. The number of string can be found by the precalculated combination (binomial coefficient).

```rust
for i in 0..ans.len() {
    if a > 0 && b > 0 {
        let x = comb[a + b - 1][b];
        if x >= k {
            ans[i] = 'a';
            a -= 1;
        } else {
            k -= x;
            ans[i] = 'b';
            b -= 1;
        }
    } else {
        ans[i] = if a > 0 { 'a' } else { 'b' };
    }
}
```

[ABC202D](https://atcoder.jp/contests/abc202/submissions/56601554)
