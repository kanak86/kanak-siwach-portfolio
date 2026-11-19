"""Generate docs/lead/index.html (the Leadership edition) from docs/index.html.

Both editions share app.js, style.css and data.js; the Leadership edition also loads
data-lead.js, which overrides wording, stats, section order and adds its own sections.
Run before previewing locally; the Pages workflow runs it on every deploy.
"""
import pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent / "docs"
html = (root / "index.html").read_text()

swaps = [
    ('href="style.css"', 'href="../style.css"'),
    ('<script src="data.js"></script>', '<script src="../data.js"></script>\n<script src="../data-lead.js"></script>'),
    ('<script src="app.js"></script>', '<script src="../app.js"></script>'),
]
for old, new in swaps:
    assert old in html, f"missing in index.html: {old}"
    html = html.replace(old, new)

title = "Kanak Siwach · Engineering Leadership"
desc = "Lead Engineer and Engineering Manager: 18+ years leading teams to design, build, test and modernize applications, with AI-native engineering."
html = re.sub(r"<title>.*?</title>", f"<title>{title}</title>", html, count=1)
html = re.sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{title}">', html, count=1)
html = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{desc}">', html, count=1)

out = root / "lead"
out.mkdir(exist_ok=True)
(out / "index.html").write_text(html)
print("wrote", out / "index.html")
