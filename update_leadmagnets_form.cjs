const fs = require('fs');
let code = fs.readFileSync('src/components/LeadMagnets.tsx', 'utf8');

code = code.replace(
  `  const openForm = (subject, btnText) => {
    setFormSubject(subject);
    setFormBtnText(btnText);
    setFormOpen(true);
  };`,
  `  const openForm = (subject: string, btnText: string) => {
    setFormSubject(subject);
    setFormBtnText(btnText);
    setFormOpen(true);
  };`
);

code = code.replace(
  `<Button onClick={() => setFormOpen(true)} className="w-full text-center justify-center p-4">
              Получить разбор
            </Button>`,
  `<Button onClick={() => openForm('Получить разбор', 'Получить аудит')} className="w-full text-center justify-center p-4">
              Получить разбор сайта
            </Button>`
);

code = code.replace(
  `<Button 
              variant="outline" 
              onClick={() => setFormOpen(true)} 
              className="w-full text-center justify-center p-4 group-hover:bg-onyx-800 transition-colors"
            >
              Скачать бесплатно
            </Button>`,
  `<Button 
              variant="outline" 
              onClick={() => openForm('Получить чек-лист', 'Получить чек-лист')} 
              className="w-full text-center justify-center p-4 group-hover:bg-onyx-800 transition-colors"
            >
              Скачать бесплатно
            </Button>`
);

fs.writeFileSync('src/components/LeadMagnets.tsx', code);
