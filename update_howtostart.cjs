const fs = require('fs');
let code = fs.readFileSync('src/components/HowToStart.tsx', 'utf8');

const newSteps = `[
    {
      num: "01",
      title: "Заявка на аудит",
      desc: "Оставьте запрос. Мы проведем бесплатный разбор вашей ситуации и покажем точки роста."
    },
    {
      num: "02",
      title: "План запуска",
      desc: "Адаптируем готовую структуру под специфику вашей клиники, интегрируем онлайн-запись."
    },
    {
      num: "03",
      title: "Новые пациенты",
      desc: "Запускаем проект. Сайт начинает конвертировать трафик в реальные записи на прием."
    }
  ];`

code = code.replace(/const steps = \[([\s\S]*?)\];/m, newSteps);

code = code.replace(
  `Сделать первый шаг`,
  `Получить разбор клиники`
);

fs.writeFileSync('src/components/HowToStart.tsx', code);
