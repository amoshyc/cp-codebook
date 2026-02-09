# Sliding Window


Common pattern for sliding window of length `k`:

```rust
for i in 0..n {
    // insert arr[i]
    // ...

    // remove arr[i - k]
    if i >= k {
        // ...
    }

    // check, window = arr[i-k+1..=i]
    if i >= k - 1 {
        // ...
    }
}
```


## Count the Number of Segments in Sliding Window

Similar to [Finding Unique Segments](../topics/uniques.md#number-of-unique-elements-with-no-modificaiton), we mark the rightmost position of each segments found so far.

```
abccdde
-----
^^ ^^
 -----
^^ ^ ^
  -----
^^ ^ ^^
```

```rust
let mut mark = vec![false; n];
let mut cnt = 0;
for i in 0..n {
    // insert arr[i]
    if i >= 1 && s[i - 1] == s[i] {
        // segment continues
        mark[i - 1] = false;
        mark[i] = true;
    } else {
        // new segment
        cnt += 1;
        mark[i] = true;
    }
    // remove arr[i - k]
    if i >= k {
        if mark[i - k] {
            cnt -= 1;
        }
    }
    // check
    if i >= k - 1 {
        println!("{}", cnt);
    }
}

```
[ABC124D](https://atcoder.jp/contests/abc124/submissions/71992144)


## Argmax/Argmin in Sliding Window

```rust
// pop_cond(i, p): do we pop p when inserting i?
// sliding_argmax: |i, p| h[i] >= h[p]
// sliding_argmin: |i, p| h[i] <= h[p]
// res[i] = p <-> arr[p] is the minimum/maximum of res[i - k + 1..=i]
fn sliding_arg<F>(n: usize, k: usize, pop_cond: F) -> Vec<usize>
where
    F: Fn(usize, usize) -> bool,
{
    let mut deq = VecDeque::<usize>::new();
    let mut res = vec![usize::MAX; n];
    for i in 0..n {
        // insert arr[i]
        while let Some(&p) = deq.back() {
            if pop_cond(i, p) {
                deq.pop_back();
            } else {
                break;
            }
        }
        deq.push_back(i);
        // remove arr[i - k]
        if *deq.front().unwrap() + k == i {
            deq.pop_front();
        }
        // check
        res[i] = *deq.front().unwrap();
    }
    res
}
```

[AWC0001E](https://atcoder.jp/contests/awc0001/submissions/73168666)
[CSES1644](https://cses.fi/paste/059ba456b69c8897f03854/)