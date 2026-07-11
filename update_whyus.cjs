const fs = require('fs');
let code = fs.readFileSync('src/components/WhyUs.tsx', 'utf8');

code = code.replace(
  `Почему 80% клиентов <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-md">возвращаются снова?</span>`,
  `Почему 80% клиентов <br className="hidden md:block" />\n        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-md">возвращаются к нам?</span>`
);

const newBenefits = `[
    {
      icon: <Target className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />,
      title: "Фокус на одной нише",
      desc: "Мы не делаем сайты для всех подряд. Наша команда изучила десятки медицинских клиник и точно знает, какие блоки и триггеры заставляют пациента записаться на прием."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />,
      title: "Отвечаем за результат",
      desc: "Мы внедряем только те решения, которые уже доказали свою эффективность на практике и стабильно приносят целевые заявки."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />,
      title: "Гарантия 100%",
      desc: "Если структура не приносит заявок, мы бесплатно переработаем смыслы и логику сайта до тех пор, пока не получим нужную конверсию."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />,
      title: "Быстрый старт за 2 дня",
      desc: "Не нужно ждать месяцами. Наше решение уже продумано, спроектировано и готово к запуску — вы начинаете получать пациентов уже на этой неделе."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />,
      title: "Всегда на связи",
      desc: "Вам не придется искать нас днями. Отвечаем на запросы в течение 10 минут, даже в выходные дни, чтобы ваш бизнес работал без перебоев."
    },
    {
      icon: <Handshake className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />,
      title: "Без скрытых рисков",
      desc: "Вы не платите сотни тысяч за кота в мешке. Прозрачные тарифы, понятный результат и система, которая окупает себя с первых месяцев."
    }
  ];`

code = code.replace(/const benefits = \[([\s\S]*?)\];/m, newBenefits);

fs.writeFileSync('src/components/WhyUs.tsx', code);
