const fs = require('fs');
let code = fs.readFileSync('src/components/PartnerPage.tsx', 'utf8');

code = code.replace(
  `Партнерская программа ONYX`,
  `Создавайте пассивный доход, рекомендуя ONYX`
);

code = code.replace(
  `Рекомендуйте нас своим клиентам, друзьям или партнерам по бизнесу и зарабатывайте на каждой успешной сделке.`,
  `Мы не просто продаем сайты, мы строим системы, которые генерируют лиды. Рекомендуйте продукт, за который не стыдно, и получайте стабильный процент с каждой успешной сделки.`
);

fs.writeFileSync('src/components/PartnerPage.tsx', code);
