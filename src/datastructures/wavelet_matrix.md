# Wavelet Matrix


```rust
struct WaveletMatrix {
    n: usize,
    lg: usize,
    pref: Vec<Vec<usize>>,
}

impl WaveletMatrix {
    fn from_vec(mut arr: Vec<usize>) -> Self {
        let n = arr.len();
        let mx = *arr.iter().max().unwrap();
        let lg = mx.next_power_of_two().trailing_zeros() as usize + 1;
        let mut bvs = vec![vec![]; lg];
        for i in (0..lg).rev() {
            bvs[i] = arr.iter().map(|x| (x >> i) & 1).collect();
            let mut nxt = vec![];
            nxt.extend((0..n).filter(|&j| bvs[i][j] == 0).map(|i| arr[i]));
            nxt.extend((0..n).filter(|&j| bvs[i][j] == 1).map(|i| arr[i]));
            arr = nxt;
        }
        Self {
            n,
            lg,
            pref: (0..lg).map(|i| build(&bvs[i])).collect(),
        }
    }

    // number of val in A[l..r]
    fn count(&self, mut l: usize, mut r: usize, val: usize) -> usize {
        for i in (0..self.lg).rev() {
            if (val >> i) & 1 == 0 {
                l = l - query(&self.pref[i], 0, l);
                r = r - query(&self.pref[i], 0, r);
            } else {
                let p = self.n - query(&self.pref[i], 0, self.n);
                l = p + query(&self.pref[i], 0, l);
                r = p + query(&self.pref[i], 0, r);
            }
        }
        r - l
    }

    // k-smallest (1-based) value in A[l..r]
    fn k_smallest(&self, mut l: usize, mut r: usize, mut k: usize) -> usize {
        let mut res = 0;
        for i in (0..self.lg).rev() {
            let cnt0 = (r - l) - query(&self.pref[i], l, r);
            if k <= cnt0 {
                l = l - query(&self.pref[i], 0, l);
                r = r - query(&self.pref[i], 0, r);
            } else {
                let p = self.n - query(&self.pref[i], 0, self.n);
                l = p + query(&self.pref[i], 0, l);
                r = p + query(&self.pref[i], 0, r);
                k -= cnt0;
                res |= 1 << i;
            }
        }
        res
    }
}

fn build<T>(arr: &[T]) -> Vec<T>
where
    T: Default + Copy + std::ops::Add<Output = T>,
{
    let mut pref = vec![T::default(); arr.len()];
    pref[0] = arr[0];
    for i in 1..arr.len() {
        pref[i] = pref[i - 1] + arr[i];
    }
    pref
}

// i..j
fn query<T>(pref: &[T], i: usize, j: usize) -> T
where
    T: Default + Copy + std::ops::Sub<Output = T>,
{
    if i == j {
        T::default()
    } else if i == 0 {
        pref[j - 1]
    } else {
        pref[j - 1] - pref[i - 1]
    }
}
```

[Range Kth Smallest](https://judge.yosupo.jp/submission/284720)

Reference:
* <https://judge.yosupo.jp/submission/220429>
* <https://www.acwing.com/solution/content/154344/>