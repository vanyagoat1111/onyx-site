import sys

with open("src/components/ContactForm.tsx", "r") as f:
    content = f.read()

target1 = """      niche: formData.get('niche'),
      
      date: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })"""
replacement1 = """      niche: formData.get('niche'),
      promocode: formData.get('promocode'),
      date: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })"""

target2 = """        const text = `🔥 *Новая заявка с сайта!*

*Название компании:* ${data.company || '-'}
*Ниша:* ${data.niche || '-'}
*Телефон:* ${data.phone || '-'}
*Соцсети:* ${data.socials || '-'}
*Дата:* ${data.date}
        `;"""
replacement2 = """        const text = `🔥 *Новая заявка с сайта!*

*Название компании:* ${data.company || '-'}
*Ниша:* ${data.niche || '-'}
*Телефон:* ${data.phone || '-'}
*Соцсети:* ${data.socials || '-'}
*Промокод:* ${data.promocode || '-'}
*Дата:* ${data.date}
        `;"""

target3 = """          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            <Input name="company" placeholder="1. Название компании" required />
            <Input name="niche" placeholder="2. Ниша" required />
            <Input name="phone" placeholder="3. Телефон" required />
            <Input name="socials" placeholder="4. Соцсети (ссылки)" />
          </div>"""
replacement3 = """          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            <Input name="company" placeholder="1. Название компании" required />
            <Input name="niche" placeholder="2. Ниша" required />
            <Input name="phone" placeholder="3. Телефон" required />
            <Input name="socials" placeholder="4. Соцсети (ссылки)" />
            <Input name="promocode" placeholder="5. Промокод (по желанию)" />
          </div>"""

content = content.replace(target1, replacement1)
content = content.replace(target2, replacement2)
content = content.replace(target3, replacement3)

with open("src/components/ContactForm.tsx", "w") as f:
    f.write(content)
print("Updated successfully")
