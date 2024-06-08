# Longest Common Prefix

> Given n strings, for each i compute $sum_{j \lt i} LCP(S_i, S_j)$.

Store all the prefixes of previous strings and their occurrence as F in prior. 
For each i, for all the prefixes of S[i], sum their frequency in F.

<https://atcoder.jp/contests/abc353/submissions/53376843>

> Given n strings, for each i compute $max_{j \neq i} LCP(S_i, S_j)$.

Store all the prefixes of all strings and their occurrence as F in prior. 
For each i, inspect all the prefix of S[i] and check in F if the occurrence of the prefix >= 2 (itself and the other). The length of the longest one is the answer.

<https://atcoder.jp/contests/abc287/submissions/38442757>