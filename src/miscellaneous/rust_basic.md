# Rust Basic


```rust
#![allow(unused)]

fn main() {
}

fn read<T: std::str::FromStr>() -> T {
    let mut s = String::new();
    std::io::stdin().read_line(&mut s).ok();
    s.trim().parse().ok().unwrap()
}

fn readv<T: std::str::FromStr>() -> Vec<T> {
    read::<String>()
        .split_ascii_whitespace()
        .map(|t| t.parse().ok().unwrap())
        .collect()
}

fn reads() -> Vec<char> {
    read::<String>().chars().collect()
}

fn mapv<T, S, F: Fn(&T) -> S>(arr: &Vec<T>, f: F) -> Vec<S> {
    arr.iter().map(f).collect()
}

fn join<T: ToString>(arr: &[T], sep: &str) -> String {
    arr.iter()
        .map(|x| x.to_string())
        .collect::<Vec<String>>()
        .join(sep)
}
```

## Inspect 4 Neighbors

```rust
for (dr, dc) in [(1, 0), (!0, 0), (0, 1), (0, !0)] {
    let nr = r.wrapping_add(dr);
    let nc = c.wrapping_add(dc);
    if nr >= n || nc >= m {
        continue;
    }
}
```

or

```rust
for (dr, dc) in [(0, 1), (0, -1), (1, 0), (-1, 0)] {
    let nr = r.checked_add_signed(dr).unwrap_or(n);
    let nc = c.checked_add_signed(dc).unwrap_or(m);
    if nr >= n || nc >= m {
        continue;
    }
}
```

## IO Flush

```rust
use std::io::Write;
std::io::stdout().flush();
```

## String Conversion

```rust
// String to int
"100".parse::<i32>().unwrap();
// char to u32
'c'.to_digit(10); // or 'c' as u32
// u32 to char
char::from_u32(97).unwrap(); // 'A'
char::from_digit(8, 10).unwrap();
```

## Cargo.toml


```
cargo add proconio
```

```toml
[package]
name = "ac"
version = "0.1.0"
edition = "2021"
default-run = "main"

[dependencies]
proconio = { version = "0.4.5", features = ["derive"] }

[[bin]]
name = "main"
path = "src/main.rs"

[[bin]]
name = "ans"
path = "src/ans.rs"
```

## Comparing Outputs

```shell
diff <(cargo run < inp.txt) <(cargo run --bin ans < inp.txt)
```