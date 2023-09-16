export async function postData(jsonData) {
    const postUrl = 'https://197.37.83.246:443/';
    const data = {
      jsonData: jsonData, // Pass your JSON data here
    };
  
    try {
      // Send the POST request
      const response = await fetch(postUrl, {
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
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'generated.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  