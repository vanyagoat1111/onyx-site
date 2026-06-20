import { Container, SectionTitle } from './ui';

export default function Stats() {
  const stats = [
    { value: "> 900", label: "бизнесов подключены к нашей подписке и имеют сайт от ONYX прямо сейчас" },
    { value: "> 85.000", label: "человек посещают разработанные нами сайты ежедневно" },
    { value: "80%", label: "Наше предложение на 80% выгоднее чем у других студий (смотрите математические расчеты выгод ниже)" },
    { value: "> 55", label: "Бизнесы из более чем 55 городов России и стран СНГ имеют сайт от ONYX" },
    { value: "2 дня", label: "средний срок разработки сайта" },
    { value: "100%", label: "адаптация под мобильные устройства" },
    { value: "0 рублей", label: "стоит разработка сайта" },
    { value: "12 месяцев", label: "в году бесплатное обслуживание вашего сайта" },
  ];

  return (
    <Container className="bg-onyx-950 py-16 md:py-24 border-t border-onyx-800/50 relative z-10">
      <div className="absolute inset-0 bg-blue-600/5 blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-4xl max-w-full">
        <SectionTitle 
          subtitle="Цифры доверия" 
          className="text-left !mb-12 md:!mb-16"
        >
          Вместо красивых слов предлагаем вам взглянуть на цифры
        </SectionTitle>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-3 group relative">
            <div className="absolute -inset-4 bg-onyx-900/0 group-hover:bg-onyx-900/50 transition-colors -z-10 clip-diagonal" />
            <div className="text-4xl md:text-5xl font-black font-heading tracking-tighter text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              {stat.value}
            </div>
            <p className="text-sm md:text-xs lg:text-sm font-sans text-neutral-400 leading-relaxed font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
