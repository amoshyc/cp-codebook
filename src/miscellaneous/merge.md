# Merge 2 Sorted Array

```rust
fn merge<T: Clone + std::cmp::PartialOrd>(arr1: &Vec<T>, arr2: &Vec<T>) -> Vec<T> {
    let (n, m) = (arr1.len(), arr2.len());
    let mut i = 0;
    let mut j = 0;
    let mut res = vec![];
    while i < n && j < m {
        if arr1[i] < arr2[j] {
            res.push(arr1[i].clone());
            i += 1;
        } else {
            res.push(arr2[j].clone());
            j += 1;
        }
    }
    res.extend(arr1[i..n].to_vec());
    res.extend(arr2[j..m].to_vec());
    res
}
```