import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(req, res) {
  if (req.method === "POST") {
    const TOKEN = "9c5e776ef021508c247a7d3c36de41";
    const client = new SiteClient(TOKEN);

    const record = await client.items.create({
      itemType: "968746",
      title: "Teste",
      imageUrl: "https://github.com/gab618.png",
      creatorSlug: "gab618",
    });

    return res.json({
      dados: "Algum dado qualquer",
      record,
    });
  }
  return res.status(404).json({ error: "try POST" });
}
