import { GENERATE_PDF_ENDPOINT } from "../utils/constants";

export async function postData(questionData,filename) {
    const data = {
      questionData,
    };
  
    try {
      // Send the POST request
      const response = await fetch(GENERATE_PDF_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Request failed');
      }
  
      // Handle the response here (e.g., download the PDF)
      const pdfBlob = await response.blob();
      // Example: Create a link to download the PDF
      const pdfUrl = window.URL.createObjectURL(pdfBlob);
      console.log(pdfUrl);
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = `${filename}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  