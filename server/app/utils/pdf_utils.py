import fitz

def extract_text_from_pdf(file_path: str) -> str:
    with fitz.open(file_path) as pdf_document:
        text = ""
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
    return text
