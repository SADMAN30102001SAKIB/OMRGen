document
  .getElementById("downloadPdf")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("pdfForm"));
    var string = "";
    document.getElementById("downloadPdf").innerText = "Loading PDF" + string;
    var flag = true;

    const data = {
      iName: formData.get("iName"),
      isIUnderline: formData.get("isIUnderline") === "true",
      pName: formData.get("pName"),
      isPUnderline: formData.get("isPUnderline") === "true",
      isName: formData.get("isName") === "true",
      isRoll: formData.get("isRoll") === "true",
      rollDigit: formData.get("rollDigit"),
      setCount: formData.get("setCount"),
      questionsCount: formData.get("questionsCount"),
    };

    if (
      data.iName != "" &&
      data.pName != "" &&
      parseInt(data.rollDigit) >= 1 &&
      parseInt(data.rollDigit) <= 11 &&
      parseInt(data.setCount) >= 1 &&
      parseInt(data.setCount) <= 4 &&
      parseInt(data.questionsCount) >= 1 &&
      parseInt(data.questionsCount) <= 100 &&
      flag
    ) {
      flag = false;
      var i = 0;
      var ref = setInterval(() => {
        string += ". ";
        if (string.length > 6) {
          string = "";
        }
        document.getElementById("downloadPdf").innerText =
          "Loading PDF" + string;
      }, 1000);
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
          clearInterval(ref);
          document.getElementById("downloadPdf").innerText = "Download PDF";
          flag = true;
        })
        .catch((error) => console.log("Error:", error));
    } else {
      alert("Please enter inputs carefully");
      clearInterval(ref);
      document.getElementById("downloadPdf").innerText = "Download PDF";
      flag = true;
    }
  });

document.getElementById("rollBox1").addEventListener("click", () => {
  if (document.getElementById("rollBox1").checked) {
    document.getElementById("rollDigit").style.display = "block";
  } else {
    document.getElementById("rollDigit").style.display = "none";
  }
});

document.getElementById("rollBox2").addEventListener("click", () => {
  if (document.getElementById("rollBox1").checked) {
    document.getElementById("rollDigit").style.display = "block";
  } else {
    document.getElementById("rollDigit").style.display = "none";
  }
});
