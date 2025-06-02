//function to access multiple element
function getElement(id) {
  return document.querySelectorAll(id);
}

//creatiing object and setting its property
function obj(el, result) {
  this.element = el;
  this.result = result;
}

//adding method to the prototype
obj.prototype.calculate = function () {
  //changing the nodelist to an array and passing them to a varaible
  let arr = Array.from(this.element);

  //getting a span element,changing it to an array and passing it to a varaible
  let span = Array.from(getElement(`.span`));

  //looping over the nodelist array
  for (var i = 0; i < arr.length; i++) {
    if (i !== 2) {
      //adding Event Listener to 2 of the nodelist array and access their parent for logic
      arr[i].addEventListener("input", function () {
        if (this.parentElement.id === "before") {
          span[0].innerHTML = this.value;
        } else {
          span[1].innerHTML = this.value;
        }
      });
    } else {
      //adding a click Event to the last nodelist which is the button
      arr[i].addEventListener(
        "click",
        (e) => {
          e.stopPropagation();

          e.preventDefault();
          //checking if the input are empty
          if (arr[0].value === "" || arr[1].value === "") {
            alert("both input should not be empty");
          } else if (arr[0].value > 0 && arr[1].value > 0) {
            //checking if the input are greater than 0;

            let beforeinput = parseFloat(arr[0].value);
            let afterinput = parseFloat(arr[1].value);

            let total = ((afterinput - beforeinput) / beforeinput) * 100;
            total = total.toFixed(2);
            //checking if it has negative number to output decrease
            if (total.includes("-")) {
              total = total.substring(1);
              this.result.innerHTML =
                "The percent Decrease between" +
                " " +
                beforeinput +
                " " +
                "and" +
                " " +
                afterinput +
                " " +
                "is" +
                " " +
                total +
                "%";
              this.result.style.color = "rgba(255,0,0,0.9)";
              this.result.style.border = "1px solid rgba(255,0,0,0.9)";
              this.result.style.padding = "30px";
              this.result.style.fontWeight = "bold";
              return false;
            }
            //outputin increase because there is no negative number
            this.result.innerHTML =
              "The percent Increase between" +
              " " +
              beforeinput +
              " " +
              "and" +
              " " +
              afterinput +
              " " +
              "is" +
              " " +
              total +
              "%";
            this.result.style.color = "rgb(12, 146, 5)";
            this.result.style.border = "1px solid rgb(12, 146, 5)";
            this.result.style.padding = "30px";
            this.result.style.fontWeight = "bold";
          } else {
            alert("Negative number are not allowed example(0 or -1)");
          }
        },
        false
      );
    }
  }
};
var tony = new obj(getElement("input"), document.getElementById("result"));
//invoking the prototype function with the obj instance
tony.calculate();
