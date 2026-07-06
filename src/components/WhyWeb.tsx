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
    <Container className="py-24 bg-gradient-to-br from-[#101b42] to-onyx-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] pointer-events-none -z-10 mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-[34px] font-heading font-black uppercase tracking-tight mb-8 drop-shadow-md">
          Почему вашему бизнесу <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">нужен сайт?</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-neutral-300 font-medium leading-relaxed mb-20 max-w-4xl drop-shadow-sm">
          Сегодня сайт — это не просто визитная карточка компании. Это инструмент продаж, который работает для вашего бизнеса <span className="text-blue-400 font-bold drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">24 часа в сутки</span>.
        </p>

        <div className="space-y-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex gap-8 group">
            <div className="w-20 h-20 shrink-0 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center clip-diagonal group-hover:bg-blue-600 transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              <Globe className="w-10 h-10 text-blue-400 group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="pt-2">
              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-sans group-hover:text-neutral-100 transition-colors duration-500">
                Потенциальные клиенты ищут информацию о компании в интернете прежде, чем оставить заявку или совершить покупку. Если сайта нет, часть клиентов уходит к конкурентам.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex gap-8 group">
            <div className="w-20 h-20 shrink-0 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center clip-diagonal group-hover:bg-blue-600 transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              <ShieldCheck className="w-10 h-10 text-blue-400 group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="pt-2">
              <h3 className="text-[23px] font-black uppercase tracking-tight text-white mb-4 group-hover:text-blue-100 transition-colors duration-500">Доверие B2B и B2C сегментов</h3>
              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-sans group-hover:text-neutral-100 transition-colors duration-500">
                В 2026 году социальные сети и мессенджеры стали перегруженным инфошумом. Наличие собственного брендированного веб-сайта — ключевой маркер надежности и стабильности вашей компании для клиентов.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex gap-8 group">
            <div className="w-20 h-20 shrink-0 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center clip-diagonal group-hover:bg-blue-600 transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              <Zap className="w-10 h-10 text-blue-400 group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="pt-2">
              <h3 className="text-[23px] font-black uppercase tracking-tight text-white mb-4 group-hover:text-blue-100 transition-colors duration-500">Автоматический прием заявки</h3>
              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-sans group-hover:text-neutral-100 transition-colors duration-500">
                Сайт работает автономно круглые сутки. Интегрированные формы и квизы мгновенно перенаправляют структурированные лиды в ваши корпоративные чаты и CRM-системы.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 bg-onyx-900/60 backdrop-blur-md border border-onyx-800/80 p-10 md:p-14 clip-diagonal relative overflow-hidden group hover:border-blue-500/50 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_60px_rgba(59,130,246,0.15)] hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[80px] pointer-events-none group-hover:bg-blue-400/20 transition-colors duration-700"></div>
          
          <h3 className="text-[23px] font-black uppercase tracking-tight text-white mb-10 drop-shadow-sm group-hover:text-blue-50 transition-colors duration-500">Профессиональный сайт помогает:</h3>
          
          <ul className="grid sm:grid-cols-2 gap-8 mb-12">
            {points.map((pt, i) => (
              <li key={i} className="flex gap-5 text-neutral-300 font-medium group-hover:text-neutral-100 transition-colors duration-500 items-center">
                <CheckCircle2 className="w-7 h-7 text-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.4)] rounded-full group-hover:text-blue-400 transition-colors duration-500" />
                <span className="text-base md:text-lg leading-snug">{pt}</span>
              </li>
            ))}
          </ul>
          
          <div className="border-t border-onyx-800 pt-10 mt-4 relative">
            <div className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-blue-500 to-transparent"></div>
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed drop-shadow-sm">
              Сайт — это <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 drop-shadow-[0_0_15px_rgba(96,165,250,0.4)]">актив бизнеса</span>, который работает на привлечение клиентов и рост прибыли каждый день.
            </p>
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
