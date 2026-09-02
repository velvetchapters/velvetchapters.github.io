import os
import json
import re

def split_text_file_to_chapters(txt_filepath, novel_id, novel_title, author="Your Name"):
    """
    Converts a massive .txt document containing novel chapters into 
    the webnovel site's JSON folder structure automatically.
    
    Expected format in TXT file:
    Chapter 1: Chapter Title
    Paragraph text...

    Chapter 2: Next Chapter Title
    Paragraph text...
    """
    if not os.path.exists(txt_filepath):
        print(f"File {txt_filepath} not found.")
        return

    with open(txt_filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to detect chapter headers like 'Chapter 1: Title' or 'CHAPTER 1' or '### Chapter 1'
    chapter_blocks = re.split(r'(?i)(?:^|\n)(?:###\s*|Chapter\s+(\d+)[:\s]*)(.*?)(?=\n)', content)
    
    output_dir = os.path.join('data', novel_id)
    os.makedirs(output_dir, exist_ok=True)

    chapters_meta = []
    
    # Process blocks
    lines = content.splitlines()
    current_ch_num = 0
    current_title = ""
    current_paragraphs = []

    def save_current_chapter():
        if current_ch_num > 0 and current_paragraphs:
            ch_data = {
                "title": current_title or f"Chapter {current_ch_num}",
                "paragraphs": [p.strip() for p in current_paragraphs if p.strip()]
            }
            with open(os.path.join(output_dir, f"{current_ch_num}.json"), 'w', encoding='utf-8') as cf:
                json.dump(ch_data, cf, indent=2, ensure_ascii=False)
            
            chapters_meta.append({
                "number": current_ch_num,
                "title": current_title or f"Chapter {current_ch_num}"
            })

    for line in lines:
        line_str = line.strip()
        match = re.match(r'(?i)^(?:###\s*)?Chapter\s+(\d+)[:\s]*(.*)', line_str)
        if match:
            # Save previous chapter before starting new one
            save_current_chapter()
            current_ch_num = int(match.group(1))
            title_suffix = match.group(2).strip()
            current_title = f"Chapter {current_ch_num}: {title_suffix}" if title_suffix else f"Chapter {current_ch_num}"
            current_paragraphs = []
        else:
            if line_str:
                current_paragraphs.append(line_str)

    # Save final chapter
    save_current_chapter()

    # Save meta.json
    meta = {
        "id": novel_id,
        "title": novel_title,
        "author": author,
        "status": "Ongoing",
        "synopsis": "Add your synopsis here...",
        "chapters": chapters_meta
    }
    with open(os.path.join(output_dir, "meta.json"), 'w', encoding='utf-8') as mf:
        json.dump(meta, mf, indent=2, ensure_ascii=False)

    print(f"Successfully generated {len(chapters_meta)} chapter JSON files in 'data/{novel_id}/'.")

if __name__ == "__main__":
    print("Webnovel Chapter Converter Tool")
    print("Example usage: split_text_file_to_chapters('my_story.txt', 'my-story-slug', 'My Great Story')")
