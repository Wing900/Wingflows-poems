# Wingflows-poems

This repository stores poems as one Markdown file per poem.

## Structure

- `poems/`: extracted poems grouped by source collection
- `scripts/extract_poems.py`: splits source Markdown files into individual poems

## Current source files

- `../较成熟作品.md`
- `../早期作品（不成熟）.md`

## Usage

```powershell
python .\scripts\extract_poems.py
```

The script is safe to rerun. It recreates extracted files from the source files.
