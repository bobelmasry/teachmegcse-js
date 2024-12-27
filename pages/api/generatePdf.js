import { GENERATE_PDF_ENDPOINT } from "../../utils/constants";

export default async function handler(req, res) {
  const endpoint = GENERATE_PDF_ENDPOINT;

  // Make sure it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const data = req.body;

  try {
    // Send request to FastAPI endpoint to generate PDF
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to generate PDF");
    }

    const buffer = await response.arrayBuffer();
    
    // Set headers to indicate a downloadable file
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=multiple_files.zip");
    res.status(200).send(Buffer.from(buffer));

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
}
