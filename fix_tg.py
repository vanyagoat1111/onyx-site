import re
with open("src/components/ContactForm.tsx", "r") as f:
    content = f.read()

pattern = r"const text = `.*?`;"
replacement = """const text = `🔥 *Новая заявка с сайта!* ${isPartner ? '(ПАРТНЕР)' : ''}\\n\\n*Название компании:* ${data.company || '-'}\\n*Ниша:* ${data.niche || '-'}\\n*Телефон:* ${data.phone || '-'}\\n*Соцсети:* ${data.socials || '-'}\\n*Промокод:* ${data.promocode || '-'}\\n*Дата:* ${data.date}\\n        `;"""

content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open("src/components/ContactForm.tsx", "w") as f:
    f.write(content)
print("Done!")
