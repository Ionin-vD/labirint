let sername=document.getElementsByClassName('Sername');
let canv=document.getElementById("canv");
let NewGame=document.getElementById("NewGame");
NewGame.style.display="none";
let table=document.getElementById("Table");
table.style.display="none";
let CloseBut=document.getElementById("CloseBut");

addCookie();
addNameCookie();

let score=1;
let b="#canvas";
let c=5;
let e=5;
let a=0;
let m=1;
let TimeOt4eta=5;
let x=TimeOt4eta;
let time=x;
let h=0;

mapGen(b, c, e, a, m); 

function mapGen(b, c, e, a, m) {
    // Функция управления персонажем
    function character(a, b) {
        // Получаем цвет пикселя из промежутка между текущей ячейкой и той, в сторону которой персонаж должен передвинуться
        var h = d.getImageData(13 * f + 7 + 6 * a, 13 * g + 7 + 6 * b, 1, 1);
        // Если цвет пикселя черный, то не перемещаем персонажа (обнуляем dx (a) и dy (b)), иначе увеличиваем количество шагов
        if(0 == h.data[0] && 0 == h.data[1] && 0 == h.data[2] && 255 == h.data[3]) {
            //score=a;
            a = b = 0;
        }
        else{
            document.querySelector("#step").innerHTML = Math.floor(document.querySelector("#step").innerHTML) + 1;
        }
        //0 == h.data[0] && 0 == h.data[1] && 0 == h.data[2] && 255 == h.data[3] ? a = b = 0 : document.querySelector("#step").innerHTML = Math.floor(document.querySelector("#step").innerHTML) + 1;
        // Закрашиваем персонажа
        d.clearRect(13 * f + 3, 13 * g + 3, 10, 10); 
        // Меняем его текушие координаты
        f += a; 
        g += b; 
        // Вновь отрисовываем его
        d.fillRect(3 + 13 * f, 3 + 13 * g, 10, 10);
        // Если персонаж вышел за пределы лабиринта, то генерируем новый лабиринт и начинаем игру сначала
        //f >= c && mapGen("#canvas", c + m  * 3, e + m * 3, 0, m + 1)
        if(f>=c){
            mapGen("#canvas", c + m  * 3, e + m * 3, 0, m + 1);
            score++;
            time-=10;
            x=-1;
            function sayHi() {
                x=time;
                Timer();
            }
            setTimeout(sayHi, 1000);
        }
    }

    // Выбираем область рисования
    b = document.querySelector(b);
    var d = b.getContext("2d");
    // И вписываем количество шагов и пройденных лабиринтов
    document.querySelector("#step").innerHTML = Math.floor(a);  
    document.querySelector("#level").innerHTML = Math.floor(m);
    // Зададим ширину и высоту области лабиринта
    b.width = 13 * c + 3;
    b.height = 13 * e + 3;
    // И закрасим в черный цвет
    d.fillStyle = "black";
    d.fillRect(0, 0, 13 * c + 3, 13 * e + 3);
    
    // Объявим массивы для хранения значения множества текущей ячейки, для значения стенки справа и для значения стенки снизу
    a = Array(c); 
    b = Array(c);
    var k = Array(c),
        // Текущее множество
        q = 1;

    // Цикл по строкам
    for (cr_l = 0; cr_l < e; cr_l++) {
        // Проверка принадлежности ячейки в строке к какому-либо множеству        
        for (i = 0; i < c; i++) 
            0 == cr_l && (a[i] = 0), d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 10), k[i] = 0, 1 == b[i] && (b[i] = a[i] = 0), 0 == a[i] && (a[i] = q++);

        // Создание случайным образом стенок справа и снизу
        for (i = 0; i < c; i++) {
            k[i] = Math.floor(2 * Math.random()), b[i] = Math.floor(2 * Math.random());
            
            if ((0 == k[i] || cr_l == e - 1) && i != c - 1 && a[i + 1] != a[i]) {
                var l = a[i + 1];
                for (j = 0; j < c; j++) a[j] == l && (a[j] = a[i]);
                d.clearRect(13 * i + 3, 13 * cr_l + 3, 15, 10)
            }
            cr_l != e - 1 && 0 == b[i] && d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 15)
        }

        // Проверка на замкнутые области.
        for (i = 0; i < c; i++) {
            var p = l = 0;
            for (j = 0; j < c; j++) a[i] == a[j] && 0 == b[j] ? p++ : l++;
            0 == p && (b[i] = 0, d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 15))
        }
    }

    // Рисуем выход из лабиринта
    d.clearRect(13 * c, 3, 15, 10);
    // Обнуляем текущие координаты персонажа
    var f = 0,
        g = 0;
    // Задаем крассный цвет
    d.fillStyle = "red";
    // И ставим персонажа в начало лабиринта
    character(-1, -1);
    // Ожидаем нажатия стрелок
    document.body.onkeydown = function (a) {
        36 < a.keyCode && 41 > a.keyCode && character((a.keyCode - 38) % 2, (a.keyCode - 39) % 2)
        if(h==0){
            Timer();
            h++;
        }
    }
};

function PressButTwo(){
    canv.style.display="block";
    //CloseBut.style.display="block";
    NewGame.style.display="none";
    table.style.display="none";
    score=0;
    mapGen("#canvas", 5, 5, 0, 1);
    x=TimeOt4eta;
    Timer();
}
function PressBut(){
    canv.style.display="none";
    //CloseBut.style.display="none"
    NewGame.style.display="block";
    table.style.display="block";
    if(score!=0){
        let NameAndSername=prompt("Введите Фамилию и Имя");
        if(NameAndSername!=undefined && NameAndSername!="" && NameAndSername!=" "){
            AddNameSername(NameAndSername);
        }
    }
}

function AddNameSername(name)
{
    let mas=[];
    for(let i=1;i<sername.length;i+=2) {
        if(score > sername[i].innerHTML){
            if(i==1) {
                mas[0]=name;
                mas[1]=score;
                for(let k=0,l=2; k<sername.length-2; k++,l++) {
                    mas[l]=sername[k].innerHTML;
                }
            }
            else {
                for(let j=0; j < i-1; j++) {
                    mas[j]=sername[j].innerHTML;
                }
                mas[i-1]=name;
                mas[i]=score;
                for(let o=i+1;o<sername.length;o++) {
                    mas[o]=sername[o-2].innerHTML;
                }
            }
            returnNameCookie(mas);
            return;
        }
        else if(score == sername[i].innerHTML) {
            if(i==1) {
                mas[0]=name;
                mas[1]=score;
                for(let k=2,l=2; k<sername.length; k++,l++) {
                    mas[l]=sername[k].innerHTML;
                }
            }
            else {
                for(let j=0; j < i-1; j++) {
                    mas[j]=sername[j].innerHTML;
                }
                mas[i-1]=name;
                mas[i]=score;
                for(let o=i+1;o<sername.length;o++) {
                    mas[o]=sername[o].innerHTML;
                }
            }
            returnNameCookie(mas);
            return;
        }
    }
}

function returnNameCookie(mas) {
    for(let i=0;i<sername.length;i++) {
        sername[i].innerHTML=mas[i];
    }
    delCookie();
    for(let j=0;j<sername.length;j+=2) {
        document.cookie=sername[j].innerHTML+'='+sername[j+1].innerHTML;
    }
}

function delCookie() {
    let masCookie=document.cookie.split("; ");
    for(let i=0;i<masCookie.length;i++) {
        document.cookie=masCookie[i]+"; max-age=-1";
    }
}

function addCookie(){
    for(let j=0;j<10;j++) {
        let str="Фамилия_"+(j+1)+"=0";
        document.cookie = str;
    }
}

function addNameCookie() {
    let masCookie=document.cookie.split("; ");
    let i=0;
    for(let j=0;j<sername.length;j+=2) {
        let masarrCookie=masCookie[i].split("=");
        sername[j].innerHTML=masarrCookie[0];
        sername[j+1].innerHTML=masarrCookie[1];
        i++;
    }
}

function Timer(){
    let timer; // пока пустая переменная
    //let x =time; // стартовое значение обратного отсчета
    countdown(); // вызов функции
    function countdown(){  // функция обратного отсчета
        if(x!=-1){
            document.getElementById('rocket').innerHTML ="time: " + x;
        }
        if(x==0){
            x=-1;
            function sayHi() {
                alert("Время вышло");
                PressBut();
            } 
            setTimeout(sayHi, 1000);
        }
        x--; // уменьшаем число на единицу
        if (x<0){
            clearTimeout(timer); // таймер остановится на нуле
            //alert('Стоп таймер и пуск ракеты!');
        }
        else {
            timer = setTimeout(countdown, 1000);
        }
    }
}