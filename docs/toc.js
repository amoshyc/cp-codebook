// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="amoshuangyc.html"><strong aria-hidden="true">1.</strong> amoshuangyc</a></li><li class="chapter-item expanded "><a href="datastructures/index.html"><strong aria-hidden="true">2.</strong> Data Structures</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="datastructures/bit.html"><strong aria-hidden="true">2.1.</strong> BIT</a></li><li class="chapter-item "><a href="datastructures/dsu.html"><strong aria-hidden="true">2.2.</strong> DSU</a></li><li class="chapter-item "><a href="datastructures/lazysegtree.html"><strong aria-hidden="true">2.3.</strong> LazySegTree</a></li><li class="chapter-item "><a href="datastructures/mint.html"><strong aria-hidden="true">2.4.</strong> Mint</a></li><li class="chapter-item "><a href="datastructures/prefix_sum.html"><strong aria-hidden="true">2.5.</strong> Prefix Sum</a></li><li class="chapter-item "><a href="datastructures/segtree.html"><strong aria-hidden="true">2.6.</strong> SegTree</a></li><li class="chapter-item "><a href="datastructures/sparse_table.html"><strong aria-hidden="true">2.7.</strong> Sparse Table</a></li><li class="chapter-item "><a href="datastructures/treap.html"><strong aria-hidden="true">2.8.</strong> Treap</a></li><li class="chapter-item "><a href="datastructures/wavelet_matrix.html"><strong aria-hidden="true">2.9.</strong> Wavelet Matrix</a></li></ol></li><li class="chapter-item expanded "><a href="algorithms/index.html"><strong aria-hidden="true">3.</strong> Algorithms</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="algorithms/2-sat.html"><strong aria-hidden="true">3.1.</strong> 2-SAT</a></li><li class="chapter-item "><a href="algorithms/bfs.html"><strong aria-hidden="true">3.2.</strong> BFS</a></li><li class="chapter-item "><a href="algorithms/combtool.html"><strong aria-hidden="true">3.3.</strong> CombTool</a></li><li class="chapter-item "><a href="algorithms/dijkstra.html"><strong aria-hidden="true">3.4.</strong> Dijkstra</a></li><li class="chapter-item "><a href="algorithms/ecc.html"><strong aria-hidden="true">3.5.</strong> Eccentricity</a></li><li class="chapter-item "><a href="algorithms/euler_tour.html"><strong aria-hidden="true">3.6.</strong> Euler Tour</a></li><li class="chapter-item "><a href="algorithms/floyd_warshall.html"><strong aria-hidden="true">3.7.</strong> Floyd Warshall</a></li><li class="chapter-item "><a href="algorithms/greedy.html"><strong aria-hidden="true">3.8.</strong> Greedy</a></li><li class="chapter-item "><a href="algorithms/lca.html"><strong aria-hidden="true">3.9.</strong> LCA</a></li><li class="chapter-item "><a href="algorithms/linear_congruence_crt.html"><strong aria-hidden="true">3.10.</strong> Linear Congruence</a></li><li class="chapter-item "><a href="algorithms/longest_increasing_subsequence.html"><strong aria-hidden="true">3.11.</strong> Longest Increasing Subsequence</a></li><li class="chapter-item "><a href="algorithms/monotonic_stack_deque.html"><strong aria-hidden="true">3.12.</strong> Monotonic Stack/Deque</a></li><li class="chapter-item "><a href="algorithms/polyhash.html"><strong aria-hidden="true">3.13.</strong> PolyHash</a></li><li class="chapter-item "><a href="algorithms/polyhash2.html"><strong aria-hidden="true">3.14.</strong> PolyHash2</a></li><li class="chapter-item "><a href="algorithms/powmod.html"><strong aria-hidden="true">3.15.</strong> Powmod</a></li><li class="chapter-item "><a href="algorithms/prefix2d.html"><strong aria-hidden="true">3.16.</strong> Prefix2D</a></li><li class="chapter-item "><a href="algorithms/prefix3d.html"><strong aria-hidden="true">3.17.</strong> Prefix3D</a></li><li class="chapter-item "><a href="algorithms/rerooting.html"><strong aria-hidden="true">3.18.</strong> Rerooting</a></li><li class="chapter-item "><a href="algorithms/searching.html"><strong aria-hidden="true">3.19.</strong> Searching</a></li><li class="chapter-item "><a href="algorithms/sieve_of_eratosthenes.html"><strong aria-hidden="true">3.20.</strong> Sieve of Eratosthenes</a></li><li class="chapter-item "><a href="algorithms/spfa.html"><strong aria-hidden="true">3.21.</strong> SPFA</a></li><li class="chapter-item "><a href="algorithms/tarjan_scc.html"><strong aria-hidden="true">3.22.</strong> Tarjan SCC</a></li><li class="chapter-item "><a href="algorithms/ternary_search.html"><strong aria-hidden="true">3.23.</strong> Ternary Search</a></li><li class="chapter-item "><a href="algorithms/topological_sort.html"><strong aria-hidden="true">3.24.</strong> Topological Sort</a></li><li class="chapter-item "><a href="algorithms/xorshift.html"><strong aria-hidden="true">3.25.</strong> XorShift</a></li></ol></li><li class="chapter-item expanded "><a href="topics/index.html"><strong aria-hidden="true">4.</strong> Topics</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="topics/2d_poset.html"><strong aria-hidden="true">4.1.</strong> 2D Poset</a></li><li class="chapter-item "><a href="topics/binary_ops.html"><strong aria-hidden="true">4.2.</strong> Binary Operations</a></li><li class="chapter-item "><a href="topics/bivariate.html"><strong aria-hidden="true">4.3.</strong> Bivariate</a></li><li class="chapter-item "><a href="topics/digit_dp.html"><strong aria-hidden="true">4.4.</strong> Digit DP</a></li><li class="chapter-item "><a href="topics/dp.html"><strong aria-hidden="true">4.5.</strong> DP</a></li><li class="chapter-item "><a href="topics/floor_ceil.html"><strong aria-hidden="true">4.6.</strong> Floor and Ceiling</a></li><li class="chapter-item "><a href="topics/functional_graph.html"><strong aria-hidden="true">4.7.</strong> Functional/Permutation Graph</a></li><li class="chapter-item "><a href="topics/l1.html"><strong aria-hidden="true">4.8.</strong> L1 Distance</a></li><li class="chapter-item "><a href="topics/longest_common_prefix.html"><strong aria-hidden="true">4.9.</strong> Longest Common Prefix</a></li><li class="chapter-item "><a href="topics/k.html"><strong aria-hidden="true">4.10.</strong> K(-th) Smallest</a></li><li class="chapter-item "><a href="topics/knapsack.html"><strong aria-hidden="true">4.11.</strong> Knapsack</a></li><li class="chapter-item "><a href="topics/multiples_gcd_lcm.html"><strong aria-hidden="true">4.12.</strong> Multiples/GCD/LCM</a></li><li class="chapter-item "><a href="topics/pairwise_on_graph.html"><strong aria-hidden="true">4.13.</strong> Pairwise on Graph/Tree</a></li><li class="chapter-item "><a href="topics/pairwise_on_sequence.html"><strong aria-hidden="true">4.14.</strong> Pairwise on Sequence</a></li><li class="chapter-item "><a href="topics/parenthesis_sequence.html"><strong aria-hidden="true">4.15.</strong> Parenthesis Sequence</a></li><li class="chapter-item "><a href="topics/square_number.html"><strong aria-hidden="true">4.16.</strong> Square Number</a></li><li class="chapter-item "><a href="topics/segments.html"><strong aria-hidden="true">4.17.</strong> Segments</a></li><li class="chapter-item "><a href="topics/subsequence.html"><strong aria-hidden="true">4.18.</strong> Subsequence</a></li><li class="chapter-item "><a href="topics/palindrome.html"><strong aria-hidden="true">4.19.</strong> Palindrome</a></li><li class="chapter-item "><a href="topics/random_hashing.html"><strong aria-hidden="true">4.20.</strong> Random Hashing</a></li><li class="chapter-item "><a href="topics/ring.html"><strong aria-hidden="true">4.21.</strong> Ring</a></li><li class="chapter-item "><a href="topics/sum_to_x.html"><strong aria-hidden="true">4.22.</strong> Sum to X</a></li><li class="chapter-item "><a href="topics/uniques.html"><strong aria-hidden="true">4.23.</strong> Unique Elements</a></li></ol></li><li class="chapter-item expanded "><a href="miscellaneous/index.html"><strong aria-hidden="true">5.</strong> Miscellaneous</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="miscellaneous/rust_basic.html"><strong aria-hidden="true">5.1.</strong> Rust Basic</a></li><li class="chapter-item "><a href="miscellaneous/rotate.html"><strong aria-hidden="true">5.2.</strong> Rotate</a></li><li class="chapter-item "><a href="miscellaneous/rle.html"><strong aria-hidden="true">5.3.</strong> Running Length Encoding</a></li><li class="chapter-item "><a href="miscellaneous/merge.html"><strong aria-hidden="true">5.4.</strong> Merge 2 Sorted Array</a></li><li class="chapter-item "><a href="miscellaneous/ordered_float.html"><strong aria-hidden="true">5.5.</strong> Ordered Float</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
