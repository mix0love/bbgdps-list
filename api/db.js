export default async function handler(req, res) {
    const dbUrl = process.env.UPSTASH_URL;
    const dbToken = process.env.UPSTASH_TOKEN;

    // Проверка наличия переменных
    if (!dbUrl || !dbToken) {
        return res.status(500).json({ error: "Missing Database Credentials" });
    }

    try {
        // Твой index.html отправляет массив: ["GET", "key"] или ["SET", "key", "value"]
        // Мы просто пересылаем это в Upstash
        const response = await fetch(dbUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${dbToken}`,
                'Content-Type': 'application/json'
            },
            // Vercel автоматически парсит входящий JSON в req.body
            // Нам нужно превратить его обратно в строку для отправки в Upstash
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        // Возвращаем ответ сайту
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
