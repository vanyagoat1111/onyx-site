import React from 'react';
import { Container } from './ui';
import { Globe, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyWeb() {
  const points = [
    "Вызывать доверие к компании",
    "Привлекать новых клиентов из поиска и рекламы",
    "Презентовать товары и услуги",
    "Автоматизировать обработку заявок",
    "Увеличивать продажи без расширения штата"
  ];

  return (
    <Container className="py-16 bg-[#162455]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight mb-8">Почему вашему бизнесу нужен сайт?</h2>

        <p className="text-xl md:text-2xl text-neutral-300 font-medium leading-relaxed mb-16">
          Сегодня сайт — это не просто визитная карточка компании. Это инструмент продаж, который работает для вашего бизнеса <span className="text-blue-400 font-bold">24 часа в сутки</span>.
        </p>

        <div className="space-y-12">
          <motion.div initial={{ opacity: 1, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-6 group">
            <div className="w-16 h-16 shrink-0 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center clip-diagonal transition-colors">
              <Globe className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-sans mt-2">
                Потенциальные клиенты ищут информацию о компании в интернете прежде, чем оставить заявку или совершить покупку. Если сайта нет, часть клиентов уходит к конкурентам.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 1, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-6 group">
            <div className="w-16 h-16 shrink-0 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center clip-diagonal transition-colors">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3 mt-1">Доверие B2B и B2C сегментов</h3>
              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-sans">
                В 2026 году социальные сети и мессенджеры стали перегруженным инфошумом. Наличие собственного брендированного веб-сайта — ключевой маркер надежности и стабильности вашей компании для клиентов.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 1, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-6 group">
            <div className="w-16 h-16 shrink-0 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center clip-diagonal transition-colors">
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3 mt-1">Автоматический прием заявки</h3>
              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-sans">
                Сайт работает автономно круглые сутки. Интегрированные формы и квизы мгновенно перенаправляют структурированные лиды в ваши корпоративные чаты и CRM-системы.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 1, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20 bg-onyx-900 border border-onyx-800 p-8 md:p-12 clip-diagonal relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] pointer-events-none group-hover:bg-blue-600/10 transition-colors"></div>
          <h3 className="text-[23px] font-black uppercase tracking-tight text-white mb-8">Профессиональный сайт помогает:</h3>
          <ul className="grid sm:grid-cols-2 gap-6 mb-10">
            {points.map((pt, i) => (
              <li key={i} className="flex gap-4 text-neutral-300 font-medium">
                <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.3)] rounded-full" />
                <span className="text-base md:text-lg">{pt}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-onyx-800 pt-8 mt-2">
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              Сайт — это <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">актив бизнеса</span>, который работает на привлечение клиентов и рост прибыли каждый день.
            </p>
          </div>
        </motion.div>

      </div>
    </Container>
  );
}
