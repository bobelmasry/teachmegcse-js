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
    const response = await fetch("/api/generatePdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    console.log('Response status:', response.status); // Ensure status is OK
    if (!response.ok) {
      throw new Error(`Failed to generate PDF: ${response.status}`);
    }
    
    const pdfBlob = await response.blob();
    const pdfUrl = window.URL.createObjectURL(pdfBlob);
    console.log('PDF Blob URL:', pdfUrl); // Log the generated URL
    
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
