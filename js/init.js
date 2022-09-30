//转化markdown文本为html
function convert(value) {
    var text = value;
    var converter = new showdown.Converter();
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

        };
        e.preventDefault();
    })
}


function aboutme() {
    let aboutme = {
        'markdown': `### 看这里 👋

<p>你好，我是林可😋。欢迎来到我的GitHub主页，这里存储着我学习编程过程中的作品，下面是你可能会感兴趣的项目~</p>

1. [⭐炉石传说爬虫](https://github.com/linklinco/HearthStone_Card) - 从暴雪网站爬取所有的炉石卡牌，并且下载图片
2. [🌟LoveMail](https://github.com/linklinco/LoveMail) - 给心爱的人发一封邮件吧
3. [✨Autopic](https://github.com/linklinco/autopic) - 自动更改桌面壁纸，让你时时刻刻保持好心情~



如果你在编程中遇到什么问题，或者有什么奇奇怪怪的想法，欢迎通过<a href="mailto:linklinco@163.com">✉️邮件</a>联系我~

<hr>

### Hi there 👋

Hello, I'm linco 😋。

Welcome to my GitHub home page, where I've learned to program. Here are some projects you might be interested in~ 

If you have any problems in programming, or have any strange ideas, please contact me by <a href="mailto:linklinco@163.com">✉️email</a>~

<hr>
<h4 align="center">Made with ❤️ by <a href="https://linklinco.github.io" style="text-decoration:none">Linco</a>🎉</h4>`}
    return aboutme
}


window.onload = function () {
    init();
    if (gethash() === '') {
        changedata(aboutme());
    } else {
        let url = gethash().substring(1);
        http(url, changedata);
    }

}
window.onhashchange = function () {
    if (gethash() === '') {
        changedata(aboutme());
    } else {
        let url = gethash().substring(1);
        let main = document.querySelector('.show');
        main.setAttribute('id', url)
        http(url, changedata);
    }



}