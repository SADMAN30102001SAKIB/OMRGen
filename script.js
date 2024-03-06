document
  .getElementById("downloadPdf")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("pdfForm"));

    const data = {
      isName: formData.get("isName") === "true",
      isRoll: formData.get("isRoll") === "true",
      rollDigit: formData.get("rollDigit"),
      setCount: formData.get("setCount"),
      questionsCount: formData.get("questionsCount"),
    };

    fetch("https://sadman30102001.pythonanywhere.com/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "output.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => console.log("Error:", error));
  });
