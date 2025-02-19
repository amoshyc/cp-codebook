# Monotonic Stack/Deque


```rust
fn sliding_argmax<T>(arr: &[T], k: usize) -> Vec<usize>
where
    T: std::cmp::PartialOrd,
{
    let mut deq = VecDeque::new();
    let mut res = vec![usize::MAX; arr.len()];
    for i in 0..arr.len() {
        while let Some(x) = deq.back() {
            if arr[i] >= arr[*x] {
                deq.pop_back();
            } else {
                break;
            }
        }
        deq.push_back(i);
        res[i] = *deq.front().unwrap();
        if *deq.front().unwrap() + k - 1 == i {
            deq.pop_front();
        }
    }
    res
}
```

[CSES1644](https://cses.fi/paste/da6df54e45964ee799be2e/)
