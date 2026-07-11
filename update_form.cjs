const fs = require('fs');
let code = fs.readFileSync('src/components/ContactForm.tsx', 'utf8');

code = code.replace(
  `export default function ContactForm({ isModal = false, isPartner = false, onClose }: { isModal?: boolean, isPartner?: boolean, onClose?: () => void }) {`,
  `export default function ContactForm({ isModal = false, isPartner = false, subject = '', buttonText = '', onClose }: { isModal?: boolean, isPartner?: boolean, subject?: string, buttonText?: string, onClose?: () => void }) {`
);

code = code.replace(
  `const data = {`,
  `const data = {\n      subject: subject || 'Новая заявка',`
);

code = code.replace(
  "const text = `🔥 *Новая заявка с сайта!* ${isPartner ? '(ПАРТНЕР)' : ''}\\n\\n*Имя:* ${data.name || '-'}\\n*Контакт:* ${data.contact || '-'}\\n${!isPartner ? `*Промокод:* ${data.promocode || '-'}\\n` : ''}*Дата:* ${data.date}\\n        `;",
  "const text = `🔥 *Новая заявка с сайта!* ${isPartner ? '(ПАРТНЕР)' : ''}\\n\\n*Тема:* ${subject || 'Общая заявка'}\\n*Имя:* ${data.name || '-'}\\n*Контакт:* ${data.contact || '-'}\\n${!isPartner ? `*Промокод:* ${data.promocode || '-'}\\n` : ''}*Дата:* ${data.date}\\n        `;"
);

code = code.replace(
  `{isPartner ? "Заполните анкету для сотрудничества" : "Заполните бриф для старта работы"}`,
  `{isPartner ? "Заполните анкету для сотрудничества" : (subject ? \`Оставьте контакты, чтобы \${subject.toLowerCase()}\` : "Заполните бриф для старта работы")}`
);

code = code.replace(
  `{status === 'loading' ? 'Отправка...' : (isPartner ? 'Отправить заявку' : 'Получить сайт бесплатно')}`,
  `{status === 'loading' ? 'Отправка...' : (buttonText || (isPartner ? 'Отправить заявку' : 'Получить сайт бесплатно'))}`
);

fs.writeFileSync('src/components/ContactForm.tsx', code);
