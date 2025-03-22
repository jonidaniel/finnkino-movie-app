function main() {
  // Create XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  // Make a connection
  let url = "https://jsonplaceholder.typicode.com/todos/1";
  xhr.open("GET", url, true);

  // function execute after request is successful
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  // Send request
  xhr.send();
}

main();
