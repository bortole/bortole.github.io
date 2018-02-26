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

getJSON('https://dweet.io/get/latest/dweet/for/olbo_astro_coord').then(function(data) {
<!--getJSON('http://time.jsontest.com').then(function(data) {-->
    <!--alert('Your Json result is:  ' + data.result); //you can comment this, i used it to debug-->

    var text = JSON.stringify(data.with);

                var dweet = `${JSON.stringify(data.with)}`
                var s1 = dweet.indexOf('sun');
                var text = dweet.substring(s1+3);
                s1 = text.indexOf(';');
                text = text.substring(0,s1);
        sun_coord = parseFloat(text);
        sun.innerText = sun_coord; //display the result in an HTML element

                s1 = dweet.indexOf('mon');
                text = dweet.substring(s1+3);
                s1 = text.indexOf(';');
                text = text.substring(0,s1);
        mon_coord = parseFloat(text);
        mon.innerText = mon_coord; //display the result in an HTML element

                s1 = dweet.indexOf('asc');
                text = dweet.substring(s1+3);
                s1 = text.indexOf(';');
                text = text.substring(0,s1);
        as_coord = parseFloat(text);
        as.innerText = as_coord; //display the result in an HTML element

                s1 = dweet.indexOf('mc');
                text = dweet.substring(s1+2);
                s1 = text.indexOf(';');
                text = text.substring(0,s1);
        mc_coord = parseFloat(text);
        mc.innerText = mc_coord; //display the result in an HTML element

}, function(status) { //error detection....
  alert('Something went wrong.');
});

