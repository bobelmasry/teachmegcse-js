export async function postData(questionData, filename) {
  // Ensure Chapter is a string in each question data
  const updatedQuestionData = questionData.map(question => {
    if (typeof question.Chapter !== 'string') {
      question.Chapter = String(question.Chapter); // Convert to string if it's not already
    }
    return question;
  });

  const data = {
    questionData: updatedQuestionData,
  };

  try {
    // Send the POST request
    const response = await fetch("/api/generatePdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Request failed");
    }

    // Add a 5-second delay before proceeding with the response
    await new Promise(resolve => setTimeout(resolve, 5000)); // 5000ms = 5 seconds

    // Handle the response here (e.g., download the PDF)
    const pdfBlob = await response.blob();
    // Example: Create a link to download the PDF
    const pdfUrl = window.URL.createObjectURL(pdfBlob);
    console.log(pdfUrl);
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `${filename}.zip`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(pdfUrl);
  } catch (error) {
    console.error("Error:", error);
  }
}
