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

    if (
      parseInt(data.rollDigit) >= 1 &&
      parseInt(data.rollDigit) <= 11 &&
      parseInt(data.setCount) >= 1 &&
      parseInt(data.setCount) <= 4 &&
      parseInt(data.questionsCount) >= 1 &&
      parseInt(data.questionsCount) <= 35
    ) {
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
    } else {
      alert("Please enter valid inputs");
    }
  });
