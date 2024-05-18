import requests
from lxml import etree
from pybadges import badge
from bisect import bisect_right
from pathlib import Path
from subprocess import check_output
from datetime import datetime

ASSERT_DIR = Path("./src/assets/")

ATCODER_PIVOTS = [400, 800, 1200, 1600, 2000, 2400, 2800, 10**10]
ATCODER_COLORS = [
    "#808000",  # gray
    "#804000",  # brown
    "#008000",  # green
    "#00C0C0",  # cyan
    "#0000FF",  # blue
    "#C0C000",  # yellow
    "#FF8000",  # orange
    "#FF0000",  # red
]

CODEFORCES_PIVOTS = [1200, 1400, 1600, 1900, 2200, 2400, 10**10]
CODEFORCES_COLORS = [
    "#808080",  # gray
    "#008000",  # green
    "#03A89E",  # cyan
    "#0000FF",  # blue
    "#AA00AA",  # violet
    "#FF8C00",  # orange
    "#FF0000",  # red
]


def get_atcoder_data(user_id: str):
    link = f"https://atcoder.jp/users/{user_id}"
    html = requests.get(link).content.decode()
    tree = etree.HTML(html)
    elem = tree.xpath("//table[@class='dl-table mt-2']/tr/td/span")[0]
    rating = int(elem.text)
    color = ATCODER_COLORS[bisect_right(ATCODER_PIVOTS, rating)]
    return rating, color


def get_codeforces_data(user_id: str):
    link = f"https://codeforces.com/profile/{user_id}"
    html = requests.get(link).content
    tree = etree.HTML(html)
    elem = tree.xpath("//div[@class='info']/ul/li/span")[0]
    rating = int(elem.text)
    color = CODEFORCES_COLORS[bisect_right(CODEFORCES_PIVOTS, rating)]
    return rating, color


codeforces_rating, codeforces_color = get_codeforces_data("amoshuangyc")
with open(ASSERT_DIR / "codeforces_badge.svg", "w") as f:
    f.write(
        badge(
            logo=str(ASSERT_DIR / "codeforces_logo.svg"),
            embed_logo=True,
            left_text="Codeforces",
            left_color="#303030",
            right_text=str(codeforces_rating),
            right_color=codeforces_color,
        )
    )
print(f"Codeforces badge generated. Rating = {codeforces_rating}.")

atcoder_rating, atcoder_color = get_atcoder_data("amoshuangyc")
with open(ASSERT_DIR / "atcoder_badge.svg", "w") as f:
    f.write(
        badge(
            logo=str(ASSERT_DIR / "atcoder_logo.svg"),
            embed_logo=True,
            left_text="AtCoder",
            left_color="#303030",
            right_text=str(atcoder_rating),
            right_color=atcoder_color,
        )
    )
print(f"AtCoder badge generated. Rating = {atcoder_rating}.")

last_update_time = f'{datetime.now():%Y/%m/%d}'
with open(ASSERT_DIR / "last_update_time.svg", "w") as f:
    f.write(
        badge(
            embed_logo=True,
            left_text="Last Updated",
            left_color="#303030",
            right_text=last_update_time,
            right_color="#B08F0E",
        )
    )
print(f"Update Time based generated. Time = {last_update_time}.")

with open(ASSERT_DIR / "rust_version_badge.svg", "w") as f:
    f.write(
        badge(
            logo=str(ASSERT_DIR / "rust_logo.svg"),
            embed_logo=True,
            left_text="Rust",
            left_color="#303030",
            right_text="1.70+",
        )
    )
print("Rust version badge generated.")

with open(ASSERT_DIR / "license_badge.svg", "w") as f:
    f.write(
        badge(
            embed_logo=True,
            left_text="License",
            left_color="#303030",
            right_text="Apache-2.0",
            right_color="#A4A62B",
        )
    )

print("License badge generated.")
