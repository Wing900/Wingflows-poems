from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path


HEADING_RE = re.compile(r"^###\s+(.+?)\s*$", re.MULTILINE)
INVALID_CHARS_RE = re.compile(r'[<>:"/\\|?*]')


@dataclass(frozen=True)
class SourceFile:
    path: Path
    category: str


ROOT = Path(__file__).resolve().parents[1]
SOURCE_FILES = [
    SourceFile(ROOT.parent / "较成熟作品.md", "较成熟作品"),
    SourceFile(ROOT.parent / "早期作品（不成熟）.md", "早期作品（不成熟）"),
]


def slugify_title(title: str) -> str:
    cleaned = INVALID_CHARS_RE.sub("-", title).strip().strip(".")
    return cleaned or "untitled"


def split_poems(content: str) -> list[tuple[str, str]]:
    matches = list(HEADING_RE.finditer(content))
    poems: list[tuple[str, str]] = []

    for index, match in enumerate(matches):
        title = match.group(1).strip()
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(content)
        body = content[start:end].strip()
        if body:
            poems.append((title, body))

    return poems


def build_frontmatter(title: str, category: str, source_name: str) -> str:
    extracted_on = datetime.now().date().isoformat()
    return "\n".join(
        [
            "---",
            f"title: {title}",
            f"category: {category}",
            f"source_file: {source_name}",
            "published: true",
            f"extracted_on: {extracted_on}",
            "---",
            "",
        ]
    )


def write_poems(source: SourceFile) -> int:
    content = source.path.read_text(encoding="utf-8")
    poems = split_poems(content)
    output_dir = ROOT / "poems" / source.category
    output_dir.mkdir(parents=True, exist_ok=True)

    for old_file in output_dir.glob("*.md"):
        old_file.unlink()

    used_names: dict[str, int] = {}
    for title, body in poems:
        stem = slugify_title(title)
        used_names[stem] = used_names.get(stem, 0) + 1
        suffix = "" if used_names[stem] == 1 else f"-{used_names[stem]}"
        filename = f"{stem}{suffix}.md"
        target = output_dir / filename
        frontmatter = build_frontmatter(title, source.category, source.path.name)
        target.write_text(frontmatter + body.rstrip() + "\n", encoding="utf-8")

    return len(poems)


def main() -> None:
    total = 0
    for source in SOURCE_FILES:
        count = write_poems(source)
        total += count
        print(f"{source.category}: {count} poems")
    print(f"total: {total} poems")


if __name__ == "__main__":
    main()
