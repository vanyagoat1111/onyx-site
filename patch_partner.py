import sys

with open("src/components/ContactForm.tsx", "r") as f:
    content = f.read()

target_signature = "export default function ContactForm({ isModal = false, onClose }: { isModal?: boolean, onClose?: () => void }) {"
replacement_signature = "export default function ContactForm({ isModal = false, isPartner = false, onClose }: { isModal?: boolean, isPartner?: boolean, onClose?: () => void }) {"

target_urls = """    // Чтобы заявки начали приходить в гугл таблицу:
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby0CXnLnIyY3sfJSlGEwERIkYal-DdxWG0cz-m4DlnUq5nimNC8meaAeDN2ivoAYLpbCQ/exec";"""
replacement_urls = """    // Чтобы заявки начали приходить в гугл таблицу:
    const GOOGLE_SCRIPT_URL = isPartner
      ? (import.meta.env.VITE_PARTNER_GOOGLE_SCRIPT_URL || "") // Вставьте сюда URL скрипта для новой таблицы партнеров
      : "https://script.google.com/macros/s/AKfycby0CXnLnIyY3sfJSlGEwERIkYal-DdxWG0cz-m4DlnUq5nimNC8meaAeDN2ivoAYLpbCQ/exec";"""

target_titles = """        <h3 className="text-3xl font-black uppercase tracking-tight mb-2 text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] ">Начать проект</h3>
        <p className="text-blue-500 font-mono text-sm drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">Заполните бриф для старта работы</p>"""
replacement_titles = """        <h3 className="text-3xl font-black uppercase tracking-tight mb-2 text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] ">
          {isPartner ? "Стать партнером" : "Начать проект"}
        </h3>
        <p className="text-blue-500 font-mono text-sm drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
          {isPartner ? "Заполните анкету для сотрудничества" : "Заполните бриф для старта работы"}
        </p>"""

target_tg = """const text = `🔥 *Новая заявка с сайта!*

*Название компании:* ${data.company || '-'}
*Ниша:* ${data.niche || '-'}
*Телефон:* ${data.phone || '-'}
*Соцсети:* ${data.socials || '-'}
*Промокод:* ${data.promocode || '-'}
*Дата:* ${data.date}
        `;"""
replacement_tg = """const text = `🔥 *Новая заявка с сайта!* ${isPartner ? '(ПАРТНЕР)' : ''}

*Название компании:* ${data.company || '-'}
*Ниша:* ${data.niche || '-'}
*Телефон:* ${data.phone || '-'}
*Соцсети:* ${data.socials || '-'}
*Промокод:* ${data.promocode || '-'}
*Дата:* ${data.date}
        `;"""

content = content.replace(target_signature, replacement_signature)
content = content.replace(target_urls, replacement_urls)
content = content.replace(target_titles, replacement_titles)
content = content.replace(target_tg, replacement_tg)

with open("src/components/ContactForm.tsx", "w") as f:
    f.write(content)

with open("src/components/Partner.tsx", "r") as f:
    partner_content = f.read()
    
target_partner = "{formOpen && <ContactForm isModal onClose={() => setFormOpen(false)} />}"
replacement_partner = "{formOpen && <ContactForm isModal isPartner onClose={() => setFormOpen(false)} />}"
partner_content = partner_content.replace(target_partner, replacement_partner)

with open("src/components/Partner.tsx", "w") as f:
    f.write(partner_content)

print("Done")
