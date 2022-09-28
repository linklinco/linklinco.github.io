window.onload = function () {
    var xhr = new XMLHttpRequest();
    console.log(1);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.open('GET', './js/data.json');
    xhr.send();


}