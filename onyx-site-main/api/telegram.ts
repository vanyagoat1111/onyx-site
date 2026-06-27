export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      fio, phone, position, city, business, company, socials, vision, source, date 
    } = req.body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ error: "Не настроены TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID" });
    }

    const text = `
📩 <b>Новая заявка на сайт от ONYX</b> 📩

<b>Дата:</b> ${date}

👤 <b>ФИО:</b> ${fio}
📞 <b>Телефон:</b> ${phone}
🏙 <b>Город:</b> ${city}
💼 <b>Сфера бизнеса:</b> ${business}
🏢 <b>Компания:</b> ${company}
👨‍💼 <b>Должность:</b> ${position}
🔗 <b>Соц. сети:</b> ${socials || "Не указано"}
👁 <b>Видение/пожелания:</b>
${vision || "Не указано"}
📢 <b>Откуда узнали:</b> ${source || "Не указано"}
    `;

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      })
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error("Ошибка Telegram API:", errorData);
      return res.status(500).json({ error: "Ошибка при отправке в Telegram" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
