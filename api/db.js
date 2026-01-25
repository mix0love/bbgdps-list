export default async function handler(req, res) {
    const dbUrl = process.env.UPSTASH_URL;
    const dbToken = process.env.UPSTASH_TOKEN;

    if (!dbUrl || !dbToken) {
        return res.status(500).json({ error: "Database credentials missing" });
    }

    try {
        const response = await fetch(dbUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${dbToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
