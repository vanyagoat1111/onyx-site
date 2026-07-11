const fs = require('fs');
let code = fs.readFileSync('src/components/LeadMagnets.tsx', 'utf8');

code = code.replace(
  `Получить бесплатный аудит`,
  `Получить разбор сайта`
);
code = code.replace(
  `Бесплатный разбор сайта`,
  `Бесплатный разбор сайта клиники`
);

fs.writeFileSync('src/components/LeadMagnets.tsx', code);
