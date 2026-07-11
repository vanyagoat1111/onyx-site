const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

code = code.replace(
  `  const openForm = (subject, btnText) => {
    setFormSubject(subject);
    setFormBtnText(btnText);
    openForm('Получить разбор', 'Получить разбор бесплатно');
  };`,
  `  const openForm = (subject: string, btnText: string) => {
    setFormSubject(subject);
    setFormBtnText(btnText);
    setFormOpen(true);
  };`
);

fs.writeFileSync('src/components/Navbar.tsx', code);
