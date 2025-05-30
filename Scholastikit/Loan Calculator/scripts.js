function getValues() {
  //button click gets values from inputs
  var balance = parseFloat(document.getElementById("principal").value);
  var interestRate = parseFloat(
    document.getElementById("interest").value / 100.0
  );
  var terms = parseInt(document.getElementById("terms").value);

  //set the div string
  var div = document.getElementById("Result");

  //in case of a re-calc, clear out the div!
  div.innerHTML = "";

  //validate inputs - display error if invalid, otherwise, display table
  var balVal = validateInputs(balance);
  var intrVal = validateInputs(interestRate);

  if (balVal && intrVal) {
    //Returns div string if inputs are valid
    div.innerHTML += amort(balance, interestRate, terms);
  } else {
    //returns error if inputs are invalid
    div.innerHTML += "Please Check your inputs and retry - invalid values.";
  }
}

/**
 * Amort function:
 * Calculates the necessary elements of the loan using the supplied user input
 * and then displays each months updated amortization schedule on the page
 */
function amort(balance, interestRate, terms) {
  var simpleInterest = balance * interestRate * (terms / 12); // rate is already in decimal
  var totalPayment = balance + simpleInterest;
  var monthlyPayment = totalPayment / terms;

  var result =
    "Loan amount: " +
    balance.toFixed(2) +
    "<br />" +
    "Interest rate: " +
    (interestRate * 100).toFixed(2) +
    "%<br />" +
    "Number of months: " +
    terms +
    "<br />" +
    "<br />" +
    "Monthly Payment: " +
    monthlyPayment.toFixed(2) +
    "<br />" +
    "Total Payment: " +
    totalPayment.toFixed(2) +
    "<br /><br />";

  result +=
    "<table border='1'><tr><th>Month #</th><th>Monthly Payment</th><th>Interest</th><th>Principal</th>";

  var monthlyInterest = simpleInterest / terms;
  var monthlyPrincipal = balance / terms;

  for (var i = 0; i < terms; ++i) {
    result += "<tr align=center>";
    result += "<td data-column=Month>" + (i + 1) + "</td>";
    result +=
      "<td data-column='Monthly Payment'>" +
      monthlyPayment.toFixed(2) +
      "</td>";
    result +=
      "<td data-column='Interest'>" + monthlyInterest.toFixed(2) + "</td>";
    result +=
      "<td data-column='Principal'>" + monthlyPrincipal.toFixed(2) + "</td>";
    result += "</tr>";
  }

  result += "</table>";
  return result;
}

function validateInputs(value) {
  //some code here to validate inputs
  if (value == null || value == "") {
    return false;
  } else {
    return true;
  }
}
