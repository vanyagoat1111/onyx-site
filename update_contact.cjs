const fs = require('fs');

let content = fs.readFileSync('src/components/ContactForm.tsx', 'utf8');

const oldDataBlock = `    const data = {
      // Сохраняем старые ключи для совместимости со скриптом отправки в Telegram
      fio: formData.get('company') ? \`Заявка от: \${formData.get('company')}\` : 'Новая заявка',
      phone: formData.get('phone'),
      company: formData.get('company'),
      socials: formData.get('socials'),
      business: \`Ниша: \${formData.get('niche')}\`,
      niche: formData.get('niche'),
      promocode: formData.get('promocode'),
      date: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
    };`;

const newDataBlock = `    const data = {
      fio: formData.get('name') ? \`Заявка от: \${formData.get('name')}\` : 'Новая заявка',
      name: formData.get('name'),
      contact: formData.get('contact'),
      date: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
    };`;

const oldTgBlock = `        const text = \`🔥 *Новая заявка с сайта!* \${isPartner ? '(ПАРТНЕР)' : ''}\\n\\n*Название компании:* \${data.company || '-'}\\n*Ниша:* \${data.niche || '-'}\\n*Телефон:* \${data.phone || '-'}\\n*Соцсети:* \${data.socials || '-'}\\n\${!isPartner ? \`*Промокод:* \${data.promocode || '-'}\\n\` : ''}*Дата:* \${data.date}\\n        \`;`;

const newTgBlock = `        const text = \`🔥 *Новая заявка с сайта!* \${isPartner ? '(ПАРТНЕР)' : ''}\\n\\n*Имя:* \${data.name || '-'}\\n*Контакт:* \${data.contact || '-'}\\n*Дата:* \${data.date}\\n        \`;`;

const oldInputsBlock = `          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            <Input name="company" placeholder="1. Название компании" required />
            <Input name="niche" placeholder="2. Ниша" required />
            <Input name="phone" placeholder="3. Телефон" required />
            <Input name="socials" placeholder="4. Соцсети (ссылки)" />
            {!isPartner && <Input name="promocode" placeholder="5. Промокод (если есть)" />}
          </div>`;

const newInputsBlock = `          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            <Input name="name" placeholder="Как к вам обращаться?" required />
            <Input name="contact" placeholder="Телефон/телеграм" required />
          </div>`;

content = content.replace(oldDataBlock, newDataBlock);
content = content.replace(oldTgBlock, newTgBlock);
content = content.replace(oldInputsBlock, newInputsBlock);

fs.writeFileSync('src/components/ContactForm.tsx', content);
console.log('done');
