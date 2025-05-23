# Searching

## Permutation

```rust
fn next_perm<T: Ord>(arr: &mut [T]) -> Option<()> {
    let k = arr.windows(2).rposition(|w| w[0] < w[1])?;
    let j = arr.iter().rposition(|a| a > &arr[k]).unwrap();
    arr.swap(k, j);
    arr[(k + 1)..].reverse();
    Some(())
}

fn perm_iter(n: usize) -> impl std::iter::Iterator<Item = Vec<usize>> {
    let mut perm: Vec<usize> = (0..n).collect();
    let iter1 = std::iter::once(perm.clone());
    let iter2 = std::iter::from_fn(move || next_perm(&mut perm).and_then(|_| Some(perm.clone())));
    iter1.chain(iter2)
}
```

Usages:

```rust
// Iterate through all 5! permutations
for perm in perm_iter(5) {
    // perm is the indices of type Vec<usize>
}
```

```rust
arr.sort(); // necessary
loop {
    // ...
    if next_perm(&mut arr).is_none() {
        break;
    }
}
```
Note that `next_perm` does **not** produce all `N!` permutations if there are duplicated items in `arr`. 

* [ABC363C](https://atcoder.jp/contests/abc363/submissions/55819341)
* [ABC369E](https://atcoder.jp/contests/abc369/submissions/58171789)

Ref:
* <https://leetcode.com/problems/next-permutation/solution/>
* <https://atcoder.jp/contests/abc363/editorial/10493>

## Combination


```rust
fn next_comb(comb: &mut Vec<usize>, n: usize, r: usize) -> Option<()> {
    let i = (0..r).rposition(|j| comb[j] != j + n - r)?;
    comb[i] += 1;
    for j in (i + 1)..r {
        comb[j] = comb[j - 1] + 1;
    }
    Some(())
}

fn comb_iter(n: usize, r: usize) -> impl std::iter::Iterator<Item = Vec<usize>> {
    let mut comb: Vec<usize> = (0..r).collect();
    let iter1 = std::iter::once(comb.clone());
    let iter2 = std::iter::from_fn(move || next_comb(&mut comb, n, r).and_then(|_| Some(comb.clone())));
    iter1.chain(iter2)
}
```

* [ABC328E](https://atcoder.jp/contests/abc328/submissions/58171653)

Ref:
* <https://leetcode.cn/problems/iterator-for-combination/solutions/101723/zi-mu-zu-he-die-dai-qi-by-leetcode-solution/>


## Submask/Subset

```rust
fn submask_iter(mask: usize) -> impl std::iter::Iterator<Item = usize> {
    let mut submask = mask;
    let iter1 = std::iter::once(submask);
    let iter2 = std::iter::from_fn(move || {
        if submask == 0 {
            None
        } else {
            submask = (submask - 1) & mask;
            Some(submask)
        }
    });
    iter1.chain(iter2)
}
```

[CP Algorithm Reference](https://cp-algorithms.com/algebra/all-submasks.html#iterating-through-all-masks-with-their-submasks-complexity-o3n)

Given a mask, we want to enumerate all its submask. To do so, we pick only the bit that is `1`. In theory, assume there are `k` of `1`, we  simply iterate all the number `2^k - 1` to `0` and restore the bit to the original position.

```
mask    : 1 1 0 1 0 0
pick    : ^ ^   ^       (k=3)
----------------------
iterate : 1 1   1       (111)  
iterate : 1 1   0       (110)  
iterate : 1 0   1       (101)  
iterate : 1 0   0       (100)  
iterate : 0 1   1       (011)  
iterate : 0 1   0       (010)  
iterate : 0 0   1       (001)  
iterate : 0 0   0       (000)  
----------------------
submask : 1 1 0 1 0 0   (111)  
submask : 1 1 0 0 0 0   (110)  
submask : 1 0 0 1 0 0   (101)  
submask : 1 0 0 0 0 0   (100)  
submask : 0 1 0 1 0 0   (011)  
submask : 0 1 0 0 0 0   (010)  
submask : 0 0 0 1 0 0   (001)  
submask : 0 0 0 0 0 0   (000)  
```

For  implementation, given previous `submask`, the next submask is `(submask - 1) & mask`. `submask - 1` performs iteration and `& mask` makes it valid.

[ABC404D](https://atcoder.jp/contests/abc404/submissions/65479955)

## Cartesian Product

```rust
// cartesian(0..h, 0..w)
// cartesian(0..=h, 0..w)
// cartesian(0..h, 0..=w)
// cartesian(0..=h, 0..=w).collect()
fn cartesian<T, R1, R2>(r1: R1, r2: R2) -> impl Iterator<Item = (T, T)>
where
    T: Clone,
    R1: std::ops::RangeBounds<T> + Iterator<Item = T> + Clone,
    R2: std::ops::RangeBounds<T> + Iterator<Item = T> + Clone,
{
    r1.flat_map(move |x| r2.clone().map(move |y| (x.clone(), y)))
}
```

`RangeBounds` is a trait that `Range` and `RangeInclusive` both implements.


## Set Partitions (Bell Number)

Partition a set into one or more different groups. Like [{ {a, b, c} }] has 5 ways to partition:
1. [{ {{a}, {b}, {c}} }]
2. [{ {{a}, {b, c}} }]
3. [{ {{b}, {a, c}} }]
4. [{ {{c}, {a, b}} }]
5. [{ {{a, b, c}} }]


Given already partitioned groups and an element [{ x }] that is not processed, there are only 2 cases:
1. [{ x }] belongs to one of the previous group.
2. [{ x }] belongs to a new group.


```rust
fn dfs(i: usize, groups: &mut Vec<Vec<i64>>, arr: &Vec<i64>) {
    if i == arr.len() {
        ...
        return;
    }

    // arr[i] belongs to one of the previous groups
    for j in 0..groups.len() {
        groups[j].push(arr[i]);
        dfs(i + 1, groups, arr);
        groups[j].pop();
    }

    // arr[i] belongs to a new group
    groups.push(vec![arr[i]]);
    dfs(i + 1, groups, arr);
    groups.pop();
}
```

[ABC390D](https://atcoder.jp/contests/abc390/submissions/62069324)