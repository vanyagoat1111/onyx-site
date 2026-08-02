/* Забирает шрифты Google к нам на домен.
 *
 * ЗАЧЕМ. fonts.googleapis.com в России недоступен без VPN. Пока шрифты
 * тянутся оттуда, вид сайта зависит от чужой доступности, а любая ошибка
 * в порядке загрузки превращается в пустой экран. Наша аудитория -
 * российский бизнес, поэтому исходим из того, что Google недоступен.
 *
 * ЧТО ДЕЛАЕТ. Спрашивает у Google таблицу стилей, вытаскивает адреса woff2,
 * скачивает только нужные наборы символов и раскладывает в public/fonts.
 * Рядом пишет fonts.css со ссылками на локальные файлы.
 *
 * ЗАПУСК:  node scripts/fetch-fonts.mjs
 *
 * Запускается один раз и потом только при смене состава шрифтов. Результат
 * коммитится в репозиторий: сборка не должна зависеть от того, доступен ли
 * Google в момент деплоя.
 */

import { mkdir, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('public/fonts');

/* Наборы символов. Всё остальное - греческий, вьетнамский и прочее -
   это лишние килобайты, которые никто на нашем сайте не увидит. */
const KEEP = new Set(['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext']);

/* Семейства главной страницы. Их правила идут в отдельный файл,
   который подключается блокирующе - иначе заголовок мигнёт системным
   шрифтом. Все остальные живут только в демо: держать их в блокирующем
   файле значит заставить человека ждать лишние 56 килобайт до того,
   как он увидит хоть что-то. */
const CORE = new Set(['Unbounded', 'Golos Text', 'JetBrains Mono', 'Inter', 'Playfair Display']);

/* Состав повторяет index.html. Первые пять - главная страница,
   остальные живут только в демо-шаблонах. */
const FAMILIES = [
  'Unbounded:wght@300;400;500;600;700;800;900',
  'Golos+Text:wght@400;500;600;700',
  'JetBrains+Mono:wght@400;500;700',
  'Inter:wght@300;400;500;600;700',
  'Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400',
  'Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400',
  'Manrope:wght@300;400;500;600;700;800',
  'Montserrat:wght@300;400;500;600;700;800',
  'Outfit:wght@300;400;500;600;700;800',
  'Space+Grotesk:wght@300;400;500;600;700',
  'Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400;1,6..96,500',
  'Archivo:wght@300;400;500;600;700',
  'Spectral:wght@300;400;500;600;700',
  'Plus+Jakarta+Sans:wght@300;400;500;600;700;800',
  'Archivo+Black',
  'Sora:wght@400;500;600;700;800',
  'Jost:wght@300;400;500;600;700',
];

/* Google отдаёт woff2 только современным браузерам. Со стандартным
   User-Agent Node в ответе будет ttf - втрое тяжелее при том же виде. */
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
         + '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const css2 = (spec) =>
  `https://fonts.googleapis.com/css2?family=${spec}&display=swap`;

async function получитьCss(spec) {
  const r = await fetch(css2(spec), { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`${spec}: ответ ${r.status}`);
  return r.text();
}

/* Разбор @font-face. Нам нужны четыре вещи: семейство, начертание,
   наклон и адрес файла. Плюс комментарий перед блоком - Google пишет
   в нём название набора символов, и это единственный способ понять,
   какой набор внутри. */
function разобрать(css) {
  const блоки = [];
  const rx = /\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
  let m;
  while ((m = rx.exec(css))) {
    const набор = m[1];
    const тело = m[2];
    const поле = (имя) => (тело.match(new RegExp(`${имя}:\\s*([^;]+);`)) || [])[1]?.trim();
    const url = (тело.match(/url\(([^)]+)\)/) || [])[1];
    if (!url) continue;
    блоки.push({
      набор,
      family: (поле('font-family') || '').replace(/['"]/g, ''),
      weight: поле('font-weight') || '400',
      style: поле('font-style') || 'normal',
      stretch: поле('font-stretch'),
      range: поле('unicode-range'),
      url,
    });
  }
  return блоки;
}

const имяФайла = (b) =>
  [b.family.toLowerCase().replace(/\s+/g, '-'),
   b.weight.replace(/\s+/g, '-'),
   b.style,
   b.набор].join('-') + '.woff2';

async function main() {
  await mkdir(OUT, { recursive: true });
  const ядро = [], демо = [];
  let скачано = 0, пропущено = 0, байт = 0;

  for (const spec of FAMILIES) {
    let css;
    try {
      css = await получитьCss(spec);
    } catch (e) {
      console.error(`  ✗ ${spec.split(':')[0]}: ${e.message}`);
      continue;
    }

    const блоки = разобрать(css).filter((b) => KEEP.has(b.набор));
    for (const b of блоки) {
      const имя = имяФайла(b);
      const путь = path.join(OUT, имя);

      if (existsSync(путь)) {
        пропущено++;
      } else {
        const r = await fetch(b.url, { headers: { 'User-Agent': UA } });
        if (!r.ok) { console.error(`  ✗ ${имя}: ${r.status}`); continue; }
        const buf = Buffer.from(await r.arrayBuffer());
        await writeFile(путь, buf);
        байт += buf.length;
        скачано++;
      }

      (CORE.has(b.family) ? ядро : демо).push(
        '@font-face{'
        + `font-family:'${b.family}';`
        + `font-style:${b.style};`
        + `font-weight:${b.weight};`
        + (b.stretch ? `font-stretch:${b.stretch};` : '')
        + 'font-display:swap;'
        + `src:url('/fonts/${имя}') format('woff2');`
        + (b.range ? `unicode-range:${b.range};` : '')
        + '}'
      );
    }
    console.log(`  ✓ ${spec.split(':')[0].replace(/\+/g, ' ')} - ${блоки.length} файлов`);
  }

  const шапка =
    '/* Собрано скриптом scripts/fetch-fonts.mjs - руками не править.\n'
    + '   Шрифты лежат на нашем домене, потому что fonts.googleapis.com\n'
    + '   недоступен в России без VPN. */\n';
  await writeFile(path.join(OUT, 'fonts-core.css'),
    шапка + ядро.join('\n') + '\n');
  await writeFile(path.join(OUT, 'fonts-demo.css'),
    шапка + демо.join('\n') + '\n');

  const всего = (await readdir(OUT)).filter((f) => f.endsWith('.woff2')).length;
  console.log(`\n  файлов в public/fonts: ${всего}`);
  console.log(`  скачано сейчас: ${скачано}, уже было: ${пропущено}`);
  console.log(`  добавлено: ${(байт / 1048576).toFixed(2)} МБ`);
  console.log(`  правил: ядро ${ядро.length}, демо ${демо.length}`);
  console.log('\n  В index.html: fonts-core.css обычной ссылкой,');
  console.log('  fonts-demo.css с media=\"print\" onload - он НЕ должен блокировать.');
}

main().catch((e) => { console.error(e); process.exit(1); });
