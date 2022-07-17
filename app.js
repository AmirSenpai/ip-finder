const checkIpWrapper = document.getElementsByClassName("check-ip-wrapper")[0];
const checkIpBtn = document.getElementById("check-ip");

checkIpBtn.addEventListener("click", function () {
  const thisElement = this;
  thisElement.setAttribute("disabled", "disabled");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://ip-api.com/json/");
  xhr.responseType = "json";
  xhr.onreadystatechange = function (e) {
    if (this.status === 200 && this.readyState == this.DONE) {
      thisElement.remove();
      const table = document.querySelector(".check-ip-wrapper table");
      table.classList.toggle("ds-none");

      const data = this.response;

      const countryData = [
        data.query,
        data.country,
        data.countryCode,
        data.regionName,
        data.city,
        data.as,
      ];

      const tdTableElement = document.querySelectorAll(
        ".check-ip-wrapper table td"
      );

      let counter = 0;
      for (const element of tdTableElement) {
        element.innerHTML = countryData[counter];
        counter++;
      }
    } else if (this.status < 200 && this.readyState == this.DONE) {
      window.alert("network error");
      console.error("ERR");
    }
  };

  xhr.send();
});
