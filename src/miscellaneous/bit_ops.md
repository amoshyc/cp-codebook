# Bit Operations

```
fn kth_bit<T>(x: T, k: usize) -> T
where
    T: std::ops::BitAnd<Output=T> + std::ops::Shr<usize, Output=T> + From<u8>,
{
    (x >> k) & T::from(1)
}
```