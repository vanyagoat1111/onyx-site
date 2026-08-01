/* Забирает фотографии Unsplash к нам на домен.
 *
 * ЗАЧЕМ. То же, что и со шрифтами: пока картинки тянутся с чужого домена,
 * вид демо зависит от его доступности из России. Демо - главный продающий
 * элемент студии, и пустые рамки вместо интерьеров там дороже, чем лишние
 * мегабайты в репозитории.
 *
 * ЧТО ДЕЛАЕТ. Скачивает каждый снимок в public/photos под понятным именем
 * и переписывает адреса в исходниках шаблонов.
 *
 * ЗАПУСК:  node scripts/fetch-photos.mjs
 *
 * Запускается один раз. Результат коммитится: сборка не должна зависеть
 * от доступности Unsplash в момент деплоя.
 *
 * ПРО ПРАВА. Лицензия Unsplash разрешает скачивание и использование,
 * в том числе коммерческое, без указания автора. Копия у себя ничего
 * в этом не меняет - меняется только адрес, с которого файл отдаётся.
 */

import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('public/photos');
const CASES = path.resolve('src/cases');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
         + '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

/* Имя файла из адреса: идентификатор снимка плюс ширина.
   Один и тот же снимок встречается в разных размерах - это разные файлы,
   и путать их нельзя. */
function имяФайла(url) {
  const id = (url.match(/photo-([0-9a-f-]+)/) || [])[1] || 'photo';
  const w = (url.match(/[?&]w=(\d+)/) || [])[1] || 'orig';
  return `u-${id}-${w}.jpg`;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const файлы = (await readdir(CASES)).filter((f) => f.endsWith('.tsx'));

  // Собираем адреса из всех шаблонов
  const адреса = new Set();
  const тексты = new Map();
  for (const f of файлы) {
    const p = path.join(CASES, f);
    const t = await readFile(p, 'utf-8');
    тексты.set(p, t);
    for (const m of t.matchAll(/https:\/\/images\.unsplash\.com\/[^"'`)\s]+/g)) {
      адреса.add(m[0]);
    }
  }

  if (!адреса.size) {
    console.log('  Адресов Unsplash в шаблонах нет - работа не нужна.');
    return;
  }
  console.log(`  Нашёл ${адреса.size} снимков в ${файлы.length} шаблонах\n`);

  const карта = new Map();
  let скачано = 0, было = 0, байт = 0;

  for (const url of адреса) {
    const имя = имяФайла(url);
    const путь = path.join(OUT, имя);
    карта.set(url, `/photos/${имя}`);

    if (existsSync(путь)) { было++; continue; }
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (!r.ok) { console.error(`  ✗ ${имя}: ответ ${r.status}`); continue; }
      const buf = Buffer.from(await r.arrayBuffer());
      await writeFile(путь, buf);
      байт += buf.length;
      скачано++;
      console.log(`  ✓ ${имя} - ${(buf.length / 1024).toFixed(0)} КБ`);
    } catch (e) {
      console.error(`  ✗ ${имя}: ${e.message}`);
    }
  }

  // Переписываем исходники только на те адреса, файлы которых реально легли
  let правок = 0;
  for (const [p, t] of тексты) {
    let новый = t;
    for (const [url, локальный] of карта) {
      if (!existsSync(path.join(OUT, path.basename(локальный)))) continue;
      if (новый.includes(url)) {
        новый = новый.split(url).join(локальный);
        правок++;
      }
    }
    if (новый !== t) {
      await writeFile(p, новый);
      console.log(`  → переписан ${path.basename(p)}`);
    }
  }

  console.log(`\n  скачано: ${скачано}, уже было: ${было}`);
  console.log(`  добавлено: ${(байт / 1048576).toFixed(2)} МБ`);
  console.log(`  адресов заменено в коде: ${правок}`);
  console.log('\n  Дальше: npx tsc --noEmit и глазами по демо «Артель» и «Стоматология».');
}

main().catch((e) => { console.error(e); process.exit(1); });
