var sideSize = 150;
var settings = { text: "", width: sideSize, height: sideSize };
var qrcode = new QRCode(document.getElementById("qrcode"), settings);

function triggerCreateQRCode() {
  qrcode.clear();
  createQRCode(document.getElementById("input").value);
}

function createQRCode(input) {
  qrcode.makeCode(input);
}

var results = document.getElementById("scanned-result");

function onScanSuccess(qrCodeMessage) {
  // handle the scanned code as you like
  //document.write(`QR matched = ${qrMessage}`);
  results.innerHTML +=
    "Your scanned code says:" + " " + `${qrCodeMessage}` + "<br>";
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning
  console.warn(`QR error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: 250 },
  /* verbose= */ true
);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);
