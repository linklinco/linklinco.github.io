function create_year(data) {
    let m = getObj(data);
    m.sort((a, b) => b.time - a.time);
    let years = fenzu(m);
    let timeline = document.createElement('div');
    timeline.className = 'timeline';
    for (let year of years) {
        let timeline_year = document.createElement('ul');
        timeline_year.className = 'timeline-year';
        let tmp_year = document.createElement('div');
        tmp_year.className = 'year';
        tmp_year.innerText = year[0].year;
        timeline_year.appendChild(tmp_year);
        for (let i of year) {
            let a = new TimelineDay(i);
            timeline_year.appendChild(a.gethtml());
        }
        timeline.appendChild(timeline_year);
    }
    return timeline;
}
function fenzu(lis) {
    lis.sort((a, b) => b.year - a.year);
    let tmp = lis[0].year;
    let tmplis = [];
    let res = [];
    for (let i in lis) {
        if (lis[i].year === tmp) {
            tmplis.push(lis[i]);
        } else {
            tmp = lis[i].year;
            res.push(tmplis);
            tmplis = [lis[i]];
        }
    }
    res.push(tmplis)
    return res;

}



function getObj(data) {
    let obj = [];
    for (let key in data) {
        for (let i in data[key]) {
            let tmp = {};
            let a = data[key][i];
            tmp.title = a.title;
            tmp.link = a.url;
            tmp.time = new Date(a.time * 1000);
            tmp.year = tmp.time.getFullYear();
            obj.push(tmp)
        }
    }
    return obj;
}

class TimelineDay {
    constructor(obj) {
        let yuefen = '一月、二月、三月、四月、五月、六月、七月、八月、九月、十月、十一、十二'.split('、');
        this.title = obj.title;
        this.time = obj.time;
        this.month = yuefen[this.time.getMonth()];
        this.day = this.time.getDate();
        this.link = obj.link;
    }
    gethtml() {
        let li = document.createElement('li');
        li.className = 'timeline-year-day';
        let tem = `<a href=".#data/${this.link}" class="main">
                <div class="time"><span class="month">${this.month}</span>
                <span class="day">${this.day}日</span></div>
                <div class="title">${this.title}</div>
                </a>`;
        li.innerHTML = tem;
        return li;
    }
}

