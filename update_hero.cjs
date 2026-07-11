const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// Update Subheading
code = code.replace(
  `<p>Превратите посетителей в клиентов с помощью системы, которая работает без выходных.</p>`,
  `<p>Превратите посетителей в пациентов с помощью системы, которая работает без выходных. Готовое решение для стоматологий и медицинских центров, генерирующее стабильный поток заявок.</p>`
);

code = code.replace(
  `<p>Мы создаем не просто красивую картинку, а инструмент для регулярного потока заявок и увеличения вашей прибыли. И всё это — за 0 рублей на старте.</p>`,
  `<p className="text-blue-400 font-bold tracking-wide uppercase text-sm border-l-2 border-blue-500 pl-4">Мы всегда на связи и отвечаем в течение 10 минут даже в выходные дни.</p>`
);

// Update CTA Texts
code = code.replace(
  `Получить бесплатный аудит`,
  `Получить аудит сайта`
);

code = code.replace(
  `Посмотреть демо-версии`,
  `Смотреть структуру`
);

fs.writeFileSync('src/components/Hero.tsx', code);
