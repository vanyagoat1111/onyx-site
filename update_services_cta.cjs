const fs = require('fs');
let code = fs.readFileSync('src/components/Services.tsx', 'utf8');

code = code.replace(
  /action: 'Оплатить'/g,
  "action: 'Добавить опцию'"
);

// We have two buttons with >Оплатить<
code = code.replace(
  />Оплатить</g,
  ">Выбрать тариф<"
);

// We might have more instances of >Оплатить<, maybe they have whitespace.
code = code.replace(
  /Оплатить/g,
  "Выбрать тариф"
);

fs.writeFileSync('src/components/Services.tsx', code);
