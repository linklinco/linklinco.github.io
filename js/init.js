//转化markdown文本为html
function convert(value) {
    var text = value;
    var converter = new showdown.Converter();
    //设置开启表格解析
    converter.setOption("tables", true);
    var html = converter.makeHtml(text);
    return html;
}

function http(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                callback(data);
            }
        }
    }
    xhr.open('GET', url);
    xhr.send(null);
}
function sethash(data) {
    location.hash = data
}
function gethash() {
    return location.hash;
}




function changedata(data) {
    let main = document.querySelector('.show');
    main.className = 'show';
    main.innerHTML = '';
    let md = document.createElement('article');
    md.setAttribute('class', 'markdown-body')
    md.innerHTML = convert(data.markdown);
    main.appendChild(md);
    window.scrollTo(0, 0);
}



function init() {
    http('data/data.json', (data) => {
        var nav = document.querySelector('.about');
        for (let i in data) {
            var tmp = document.createElement('ul');
            let ls = document.createElement('li');
            ls.innerText = i.toUpperCase();
            ls.className = 'biu';
            tmp.appendChild(ls);
            for (let j of data[i]) {
                var m = document.createElement('li');
                var link = document.createElement('a');
                link.innerText = j.title;
                link.setAttribute('href', 'data/' + j.url);
                link.className = 'link';
                m.appendChild(link);
                tmp.appendChild(m);
            }
            nav.appendChild(tmp);
        }
    });
    var nav = document.querySelector('.about');
    nav.addEventListener('click', (e) => {

        if (e.target.tagName === 'A') {
            let url = e.target.getAttribute('href');
            sethash(url);
            e.target.parentNode.parentNode.style.height = '75px';
            e.target.parentNode.parentNode.children[0].style.background = '#07c160';
        };
        if (e.target.className === 'biu') {
            if (e.target.parentNode.style.height === 'auto') {
                e.target.parentNode.style.height = '75px';
                e.target.style.background = '#07c160';
            } else {
                e.target.parentNode.style.height = 'auto';
                e.target.style.background = 'green';
            }

        }
        e.preventDefault();
    })
    var showtimeline = document.querySelector('.showtimeline');
    showtimeline.addEventListener('click', (e) => {
        e.preventDefault();
        http('../data/data.json', (data) => {
            let aside = document.querySelector('.about');
            let show = document.querySelector('.show');
            aside.setAttribute('class', 'about notshow');
            show.innerHTML = '';
            show.appendChild(create_year(data));
        })
    })
}

//导航栏代码
function dhl() {
    let close = document.querySelector('.close');
    close.addEventListener('click', () => {

        let shows = document.querySelector('.shows');
        if (shows.classList.length <= 1) {
            shows.className = 'shows list';
            close.style.transform = "rotate(45deg)";
        } else {
            shows.className = 'shows';
            close.style.transform = "rotate(90deg)";
        }

    })
    let dhlclose = document.querySelector('.dhl');
    dhlclose.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            let shows = document.querySelector('.shows');
            shows.className = 'shows';
            close.style.transform = "rotate(90deg)";
        }
    })
}
//自我介绍
// function aboutme() {
//     let aboutme = {
//         'markdown': 
//     }
//     return aboutme;
// }



function setlist() {
    let main = document.querySelector('.show');
    main.classList.add('notshow');

}
//这里写点击切换函数
function biu() {

}



window.onload = function () {
    init();
    dhl();
    if (gethash() === '') {
        http('data/aboutme.json', changedata)
    } else if (gethash() === "#articlelist") {
        setlist()
    } else {
        let url = gethash().substring(1);
        http(url, changedata);
    }

}
window.onhashchange = function () {
    if (gethash() === '') {
        http('data/aboutme.json', changedata)
    } else if (gethash() === "#articlelist") {
        setlist()

    } else {
        let url = gethash().substring(1);
        let main = document.querySelector('.show');

        main.setAttribute('id', url)
        http(url, changedata);
    }



}