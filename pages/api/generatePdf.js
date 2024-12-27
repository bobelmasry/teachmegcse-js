import { GENERATE_PDF_ENDPOINT } from "../../utils/constants";

export default async function handler(req, res) {
  const endpoint = GENERATE_PDF_ENDPOINT;

  const data = req.body;
  res.status(200);

  try {
    // Wait for a specified amount of time before sending the request
    await new Promise(resolve => setTimeout(resolve, 15000)); // 5000ms = 5 seconds delay

    // Send the POST request to the server
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Wait for another specified amount of time after receiving the response
    await new Promise(resolve => setTimeout(resolve, 15000)); // Another 5-second delay before sending the response to the client

    // Handle the response
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(Buffer.from(buffer));
  } catch (e) {
    console.log(e);
    res.status(500).send("Error while processing the request.");
  }
}
