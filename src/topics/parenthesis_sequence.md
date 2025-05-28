# Parenthesis Sequence

Sequences like:
* `()()()`
* `(())((()))()`
* `(()(()))`

A valid parenthesis sequence `S[0..2N]` has following property:

> For every prefix `S[0..=i]`, the number of `(` in it is `floor(i/2) + 1`.

## [Most Valuable Parentheses](https://atcoder.jp/contests/abc407/tasks/abc407_e)

> Given a positive integer sequence A[0..2N], construct a valid parenthesis sequence `S` which maximize the score. The score is defined as `sum(A[i] for i in 0..2N if S[i] == '(')`.

When scanning the `A` from left to right, greedily pick the position that has maximum value as `(`.

```rust
let mut heap = BinaryHeap::new(); // max heap
let mut seq = vec![')'; 2 * n];

seq[0] = '(';
let mut cnt = 1;

for i in 1..(2 * n - 1) {
    heap.push((arr[i], i));
    if cnt < i / 2 + 1 {
        let (_, j) = heap.pop().unwrap();
        seq[j] = '(';
        cnt += 1;
    }
}
```

[ABC407E](https://atcoder.jp/contests/abc407/submissions/66232324)