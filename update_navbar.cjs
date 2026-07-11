const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

code = code.replace(
  `const [formOpen, setFormOpen] = useState(false);`,
  `const [formOpen, setFormOpen] = useState(false);\n  const [formSubject, setFormSubject] = useState('');\n  const [formBtnText, setFormBtnText] = useState('');\n\n  const openForm = (subject, btnText) => {\n    setFormSubject(subject);\n    setFormBtnText(btnText);\n    setFormOpen(true);\n  };`
);

code = code.replace(/setFormOpen\(true\)/g, "openForm('Получить разбор', 'Получить разбор бесплатно')");

code = code.replace(
  `{formOpen && <ContactForm isModal onClose={() => setFormOpen(false)} />}`,
  `{formOpen && <ContactForm isModal subject={formSubject} buttonText={formBtnText} onClose={() => setFormOpen(false)} />}`
);

fs.writeFileSync('src/components/Navbar.tsx', code);
