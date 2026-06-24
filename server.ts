import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Парсинг JSON-тел
  app.use(express.json());

  // API маршрут для отправки в Telegram
  app.post("/api/telegram", async (req, res) => {
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

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware для development
  if (process.env.NODE_ENV !== "production") {
    app.use(express.static('public'));
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Fallback для React Router и SPA
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
