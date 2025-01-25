import { GENERATE_PDF_ENDPOINT } from "@/components/utils/constants";

export default async function handler(req, res) {
  const endpoint = GENERATE_PDF_ENDPOINT;

  const data = req.body;
  res.status(200);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    res.status(200);
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(Buffer.from(buffer));
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}