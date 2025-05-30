import { useState } from "react";
import "./App.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import logo from "./logo.png";
import stamp from "./stamp.png";

function App() {
  const [data, setData] = useState({
    senderName: "Abdi Tadese Wayessa",
    senderAccount: "1015100075998",
    transactionType: "Other Bank",
    channel: "Coop App",
    beneficiaryName: "Abdi Tadese Wayessa",
    benficiaryAccount: "5517432265011",
    transactionId: "FT1234SDRTYU",
    transactionDate: "01/02/2025",
    amount: 29700.0,
    discount: 0,
    narrative: "Payment for paper",
  });

  const generatePDF = () => {
    const input = document.getElementById("content-to-pdf");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const tran = "Transaction " + data.transactionId.toLowerCase();

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(tran + ".pdf");
    });
  };

  function numberToWordsETB(num) {
    if (isNaN(num)) return "Invalid number";

    const belowTwenty = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

    function helper(n) {
      if (n === 0) return "";
      else if (n < 20) return belowTwenty[n] + " ";
      else if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);
      else
        return (
          belowTwenty[Math.floor(n / 100)] +
          " Hundred " +
          (n % 100 !== 0 ? helper(n % 100) : "")
        );
    }

    function convertIntegerPart(number) {
      if (number === 0) return "";

      let word = "";
      let i = 0;

      while (number > 0) {
        if (number % 1000 !== 0) {
          word = helper(number % 1000) + thousands[i] + " " + word;
        }
        number = Math.floor(number / 1000);
        i++;
      }
      return word.trim();
    }

    function convertDecimalPart(decimal) {
      if (decimal.length === 1) decimal += "0"; // Convert ".5" to "50"
      let decimalNumber = parseInt(decimal, 10);
      return decimalNumber ? helper(decimalNumber).trim() : "Zero";
    }

    let [integerPart, decimalPart] = num.toString().split(".");

    let words = convertIntegerPart(parseInt(integerPart, 10)) + " Birr";

    if (decimalPart) {
      words += " and " + convertDecimalPart(decimalPart) + " Cents";
    }

    return words;
  }
  return (
    <div>
      <div className="invoice" id="content-to-pdf">
        <div className="header">
          {" "}
          <img src={logo} alt="logo" />
          <h2>Cooperative Bank of Oromia</h2>
          <h5>Empowering Communities, Transforming Lives.</h5>
        </div>
        <div className="head">
          <h3>Electronic Receipt</h3>
        </div>
        <div className="grid">
          <div className="card">
            Address: Addis Ababa, Ethiopia
            <br />
            Po.box:2076, Addis Ababa
            <br />
            info@coopbankoromiasc.com
            <br />
            www.coopbankoromiasc.com.et
          </div>
          <div className="card">
            VAT Reg. No. 16210820010
            <br />
            TIN No. 0051252630
            <br />
            Tel: +251115150229
            <br />
            Customer Contact Center: 609
          </div>
        </div>

        <div className="space"></div>
        <div className="title">
          <hr />
          <h4>Transaction Details</h4>
          <hr />
        </div>

        <div className="grid1">
          <div className="card1">
            Sender Details
            <br />
            Name: {data.senderName}
            <br />
            Account Number: {data.senderAccount}
            <br />
            Narrative: {data.narrative}
            <br />
            Transaction Type: {data.transactionType}
            <br />
            Transaction Channel: {data.channel}
          </div>

          <div className="card2">
            <span>Beneficiary's Detail</span>
            <br />
            Beneficiary Name: {data.beneficiaryName}
            <br />
            Account Number: {data.benficiaryAccount}
            <br />
            Transaction ID: {data.transactionId}
            <br />
            Transaction Date: {data.transactionDate}
            <br />
          </div>
        </div>
        <div className="space"></div>
        <div className="title">
          <hr />
          <h4>Payment Details</h4>
          <hr />
        </div>
        <div className="stamp">
          <img src={stamp} />
        </div>
        <table className="table">
          <tr>
            <td>Transaction Amount</td>
            <td className="tdleft">{data.amount.toFixed(2)} ETB</td>
          </tr>
          <tr>
            <td>Service Charge</td>
            <td className="tdleft">{(data.amount * 0.004).toFixed(2)} ETB</td>
          </tr>

          <tr>
            <td>VAT (15%)</td>
            <td className="tdleft">
              {(data.amount * 0.004 * 0.15).toFixed(2)} ETB
            </td>
          </tr>
          <tr>
            <td>Discount Amount</td>
            <td className="tdleft">{data.discount.toFixed(2)} ETB</td>
          </tr>
          <tr className="total">
            <td>Total</td>
            <td className="tdleft">
              {(
                data.amount +
                data.amount * 0.004 +
                data.amount * 0.004 * 0.15
              ).toFixed(2)}{" "}
              ETB
            </td>
          </tr>
        </table>
        <div className="word">
          <b>Amount in Word:</b>{" "}
          {numberToWordsETB(
            (
              data.amount +
              data.amount * 0.004 +
              data.amount * 0.004 * 0.15
            ).toFixed(2)
          )}{" "}
          only
        </div>
        <div className="footer">
          Thank you for banking with us
          <br />
          Cooperative Bank of Oromia
          <br />
          Bank smarter, Live better
          <br /> https://coopbankoromia.com.et/
        </div>
      </div>
      <div className="dwn">
        <button onClick={generatePDF} className="download">
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default App;
