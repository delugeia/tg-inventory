"""Check the local documentation links changed by this planning task."""
import ast, json, pathlib, re, urllib.parse
paths=['README.md','status/Current Status.md','status/Decisions.md',
       'status/Open Questions.md','status/Future Ideas.md',
       '_specifications/Data Import and Legacy Data Review.md',
       '_data/data-for-import/README.md']
bad=[]; count=0
for filename in paths:
    p=pathlib.Path(filename)
    for target in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf-8')):
        if '://' in target or target.startswith('#'):continue
        target=urllib.parse.unquote(target.split('#')[0]);count+=1
        if not (p.parent/target).exists():bad.append([filename,target])
for p in pathlib.Path('work/data-import-review').glob('*.py'):
    ast.parse(p.read_text(encoding='utf-8'))
print(json.dumps({'local_links_checked':count,'broken_links':bad,'python_syntax':'passed'}))
raise SystemExit(bool(bad))
