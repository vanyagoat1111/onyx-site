const fs = require('fs');
let code = fs.readFileSync('src/components/LeadMagnets.tsx', 'utf8');

code = code.replace(
  `const [formOpen, setFormOpen] = useState(false);`,
  `const [formOpen, setFormOpen] = useState(false);\n  const [formSubject, setFormSubject] = useState('');\n  const [formBtnText, setFormBtnText] = useState('');\n\n  const openForm = (subject, btnText) => {\n    setFormSubject(subject);\n    setFormBtnText(btnText);\n    setFormOpen(true);\n  };`
);

code = code.replace(
  `onClick={() => setFormOpen(true)} className="w-full"`,
  `onClick={() => openForm('Получить чек-лист 15 ошибок', 'Скачать чек-лист')} className="w-full"`
);

code = code.replace(
  `onClick={() => setFormOpen(true)} variant="outline" className="w-full mt-auto"`,
  `onClick={() => openForm('Бесплатный разбор сайта', 'Получить разбор')} variant="outline" className="w-full mt-auto"`
);

code = code.replace(
  `{formOpen && <ContactForm isModal onClose={() => setFormOpen(false)} />}`,
  `{formOpen && <ContactForm isModal subject={formSubject} buttonText={formBtnText} onClose={() => setFormOpen(false)} />}`
);

fs.writeFileSync('src/components/LeadMagnets.tsx', code);
