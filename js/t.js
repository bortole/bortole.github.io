var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};

getJSON('https://dweet.io/get/latest/dweet/for/vitebsk_temperature').then(function(data) {
<!--getJSON('http://time.jsontest.com').then(function(data) {-->
<!--alert('Your Json result is:  ' + data.result); //you can comment this, i used it to debug-->

    var text = JSON.stringify(data.with);

                var text = `${JSON.stringify(data.with)}`
                var s1 = text.indexOf('temperature":');
                text = text.substring(s1+13);
                s1 = text.indexOf(',');
                text = text.substring(0,s1);


    result.innerText = text; //display the result in an HTML element
}, function(status) { //error detection....
  alert('Something went wrong.');
});

