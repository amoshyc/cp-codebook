# Permutation

```rust
loop {
    println!("{:?}", p);
    if next_permutation(&mut p).is_none() {
        break;
    }
}

fn next_permutation<T: Ord>(arr: &mut [T]) -> Option<()> {
    let k = arr.windows(2).rposition(|w| w[0] < w[1])?;
    let j = arr.iter().rposition(|a| a > &arr[k]).unwrap();
    arr.swap(k, j);
    arr[(k + 1)..].reverse();
    Some(())
}

fn prev_permutation<T: Ord>(arr: &mut [T]) -> Option<()> {
    let k = arr.windows(2).rposition(|w| w[0] > w[1])?;
    let j = arr.iter().rposition(|a| a < &arr[k]).unwrap();
    arr.swap(k, j);
    arr[(k + 1)..].reverse();
    Some(())
}

// Modified from https://docs.python.org/3/library/itertools.html#itertools.combinations
fn combinations<T: Copy>(arr: &[T], r: usize) -> impl std::iter::Iterator<Item = Vec<T>> + '_ {
    assert!(r <= arr.len());
    let n = arr.len();
    let mut indices = (0..r).collect::<Vec<usize>>();
    let iter1 = std::iter::once(indices.iter().map(|&i| arr[i]).collect::<Vec<T>>());
    let iter2 = std::iter::from_fn(move || {
        while let Some(i) = (0..r).rposition(|j| indices[j] != j + n - r) {
            indices[i] += 1;
            for j in (i + 1)..r {
                indices[j] = indices[j - 1] + 1
            }
            return Some(indices.iter().map(|&i| arr[i]).collect::<Vec<T>>());
        }
        None
    });
    iter1.chain(iter2)
}
```

Ref:
* [next_permutation](https://leetcode.com/problems/next-permutation/solution/)
* [next_combination](https://leetcode.cn/problems/iterator-for-combination/solutions/101723/zi-mu-zu-he-die-dai-qi-by-leetcode-solution/)

<https://atcoder.jp/contests/abc328/submissions/47509695>