# Running Length Encoding

```rust
fn rle<T: Copy + PartialEq>(arr: &Vec<T>) -> Vec<(T, usize, usize)> {
    let n = arr.len();
    let mut res = vec![];
    let mut i = 0;
    while i < n {
        let mut j = i + 1;
        while j < n && arr[j] == arr[i] {
            j += 1;
        }
        res.push((arr[i], j - i, i));
        i = j;
    }
    res
}
```