var game_b = [] // DIV מערך השומר מספרי התמונות לכל
var nums = new Array(81) // מערך מונים כדי למנוע כפילות בתמונות
var score1;
//var name1 = "";

//הגדרת משתמש 
class Member {
    constructor(name, score) {
        this.name = name;
        this.score = score;
        this.prevScore = 0;
        this.prevTime = 0;
        this.level = 12;
    }
}

//הגדרת lockal
if (localStorage.memberss == 'undefined' || localStorage.memberss == undefined) {
    var members = new Array(100);
    for (var i = 0; i < 100; i++) {
        members[i] = new Member('', 0);
    }
    localStorage.memberss = JSON.stringify(members);
}
if (localStorage.index == 'undefined' || localStorage.index == undefined)
    localStorage.index = '0';

//הוספת אפשרות המשך משחק קיים במידה וצריך
function startpi() {
    localStorage.new = 'true';
    document.getElementById("home").style.backgroundImage = "url(something/unnamed.gif )" 
    t = localStorage.memberss;
    obj = JSON.parse(t);
    if ((obj[Number(localStorage.userIndex)].prevScore != 0) && (obj[Number(localStorage.userIndex)].prevScore != '0')) {
        document.getElementsByClassName("menu-all-content")[0].innerHTML += " <br /><br/><a class='menu-item' href='GamePage.html' onclick=" + "iscont()" +">Continue playing</a>"
        t = JSON.stringify(obj);
        localStorage.memberss = t;
        
    }
}
function iscont(){
    localStorage.new = 'false';
}

// פונקציה שיוצרת את לוח המשחק ומגרילה קלפים
//ואם נכנס דרך משחק קיים שומרת זמן ניקוד ורמה
let x1
function Start1(num) {
    x1 = num
    ck = 0;
    clearInterval(ticker);
    num1=num/3
    t = localStorage.memberss;
    obj = JSON.parse(t);
    if (localStorage.new == 'true') {
        startTimer(num1 * 60);
        score1 = 0;
    }
    else {
        startTimer(Number(obj[Number(localStorage.userIndex)].prevTime));
        score1 = Number(obj[Number(localStorage.userIndex)].prevScore);
    }

    for (var i = 0; i < nums.length; i++) {
        nums[i] = 0;
    }
    document.getElementById("game").innerHTML = "";
    var y = 0;
    for (var i = 1; i <= num; i++) {
        game_b[i] = 0
        document.getElementById("game").innerHTML += "<div id=" + i + " class=" + "card" + "   onclick=" + "select()" + "> </div>";
        document.getElementById("game").setAttribute("class","game"+num)
        var j = Math.floor(Math.random() * 80);
        nums[j] = nums[j] + 1;

        while (nums[j] > 1) {
            nums[j] = 1
            j = Math.floor(Math.random() * 80);
            nums[j] = nums[j] + 1;
        }
        document.getElementById(i).style.backgroundImage = "url(pictures/" + j + ".jpg)"
        game_b[i] = j;
    }
    document.getElementById("score").innerHTML = "ניקוד:" + score1;
}

var ck = 0; //count על מנת לאפשר פעם אחת במשחק
//הוספת 3 קלפים ללוח  
function add3() {
    if (ck == 0) {
        ck = 1;
        for (var i = 16; i <= 18; i++) {
            game_b[i] = 0
            document.getElementById("game").innerHTML += "<div id=" + i + " class=" + "card" + "   onclick=" + "select()" + "> </div>";
            var j = Math.floor(Math.random() * 80);
            nums[j] = nums[j] + 1;

            while (nums[j] > 1) {
                nums[j] = 1
                j = Math.floor(Math.random() * 80);
                nums[j] = nums[j] + 1;
            }
            document.getElementById(i).style.backgroundImage = "url(pictures/" + j + ".jpg)"
            game_b[i] = j;
        }
        if (x1 == 15) {
            document.getElementById("game").setAttribute("class", "gameadd")
        }
        else {
            document.getElementById("game").setAttribute("class", "game15")
        }
    }
    else {
      
        alert("האפשרות להוסיף 3 קלפים קימת פעם אחת במשחק");

    }
}

var count1 = 0
var selected = [] //מספרי התמונות שנבחרו
var selectedid = []  //מיקומי התמונות שנבחרו

//הפונקציה בודקת עבור 3 הקלפים שנבחרו האם הם יוצרים סט ופועלת בהתאם
function select() {
    if (count1 == 3)
        return;
    var x = event.target.id;
    document.getElementById(x).setAttribute("class", "try");
    if (count1 == 0) { 
        selected[count1] = game_b[x]
        selectedid[count1] = x
        count1 = count1 + 1;
    }
    if (count1 == 1 && (selected[count1-1] != game_b[x]))
    {
        selected[count1] = game_b[x]
        selectedid[count1] = x
        count1 = count1 + 1;
    }
    if (count1 == 2 && (selected[count1 - 1] != game_b[x] && selected[count1 - 2] != game_b[x])) {
        selected[count1] = game_b[x]
        selectedid[count1] = x
        count1 = count1 + 1;
    }

    if (count1 == 3) {
        setTimeout(alertFunc, 1500);
    }
    
    function alertFunc() {//בדיקה לאחר שנבחרו 3 קלפים
        const features = getFeatures(selected);//קריאה לפונקציה המשמשת לחישוב  נתוני הקלפים
        if (isSet(features)) {
            score1 += 100;
            document.getElementById("score").innerHTML = "ניקוד:" + score1;
            setTimeout(function () {
                var audio = new Audio('something/mixkit-arcade-game-complete-or-approved-mission-205.wav');
                audio.play();
                //alert("Is a SET");
            }, 0.10);
            replaceCards(); //קריאה לפונקציה שמחליפה את הקלפים שנבחרו
        }
        for (var i = 0; i < selected.length; i++) {
            document.getElementById(selectedid[i]).setAttribute("class", "card");

            selected[i] = 0;// איפוס מערך התמונות הנבחרות

            selectedid[i] = 0;//איפוס מערך הקלפים הנבחרים
        }
        count1 = 0
    }
}

//פונקציה המגרילה קלפים חדשים במקום הסט הנבחר 
//ומעדכנת במערך המונים 
function replaceCards() {
    for (var i = 0; i < 3; i++) {
        nums[selected[i]] = 0
        var j = Math.floor(Math.random() * 80);
        nums[j] = nums[j] + 1;

        while (nums[j] > 1) {
            nums[j] = 1
            j = Math.floor(Math.random() * 80);
            nums[j] = nums[j] + 1;
        }
        document.getElementById(selectedid[i]).style.backgroundImage = "url(pictures/" + j + ".jpg)"
        game_b[selectedid[i]] = j;
    }
}



//חישוב של כל אברי המערך.
// . כל קלף מיוצג על ידי מספר,הקלפים מחולקים ל3 ערימות של 27 קלפים בכל ערימה, 0-26 זה הקלפים האדומים, 27-53 זה הקלפים הירוקים. 54-80 זה הקלפים הסגולים ,לכן אם המספר לחלק ל27 עם עיגול כלפי מטה שווה 0 שה אדום, אם המספר לחלק ל27 עם עיגול כלפי מטה שווה 1 זה ירוק ואם המספר לחלק ל27 עם עיגול כלפי מטה זה 2 אז זה סגול
//בכל ערימה 9 הקלפים הראשונים ריקים,9 הקלפים השניים מחוספסים,ו9 הקלפים האחרונים מלאים
// בכל ערימה כל המספרים שמתחלקים ב3 עם שארית 1 יש בהם צורה אחת. המספרים שמתחלקים ב3 עם שארית 2 יש בהם 2 צורות , המספרים שמתחלקים ב3 עם שארית 0 יש בהם 3 צורות
//כל אחת משלושת הערימות מחולקת 3 ערימות של 9 כל ערימה של 9 מחולקת ל3 באופן הבא: כל מספר לחלק ל3 עם עיגול למטה שווה 0 זה אומר מעויין, כל מסםר לחלק ל3 עם עיגול ללמטה לחלק ל3 שווה 1 זה נחש וכל מספר לחלק ל3 עם עיגול ללמטה שווה 2 זה אליפסה.
function getFeatures(possible_set) {

    var color = [];
    var number = [];
    var shape = [];
    var shading = [];
    for (var idx in possible_set) {
        color.push(getColor(possible_set[idx]));
        number.push(getNumber(possible_set[idx]));
        shape.push(getShape(possible_set[idx]));
        shading.push(getShading(possible_set[idx]));
    }
    return features = [
        arrSum(color) % 3,
        arrSum(number) % 3,
        arrSum(shape) % 3,
        arrSum(shading) % 3,
    ];
}
const arrSum = arr => arr.reduce((a, b) => a + b, 0);//arr שווה לסכום של a+b


function getColor(card) {// .מחזיר את המספר המאפיין את הקלף באצמעות מספר(0= אדום,1=ירוק,2=סגול)
    return Math.floor(card / 27);//
}

function getNumber(card) {//מחזיר את כמות הצורות בקלף באמצעות מספר(0=1,1=2,2=3)
    return card % 3;
}

function getShape(card) {//מחזיר מספר בהתאם לצורה: 0=משולש,1=נחש,2=אליפסה
    return Math.floor((card % 9) / 3);
}

function getShading(card) {//מחזיר את המילוי באמצעות מספר. 0=ריק,1=מחוספס.2=מלא
    return Math.floor((card % 27) / 9);
}


function isSet(features) {

    return arrSum(features) == 0;
}

//פתיחת תפריט 
function openNav() {
    document.getElementById("myNav").style.width = "40%";
    t = localStorage.memberss;
    obj = JSON.parse(t);
    p = "hi       "+ obj[Number(localStorage.userIndex)].name ;
    document.getElementById("h31").innerHTML = p
    t = JSON.stringify(obj);
    localStorage.memberss = t;
   
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("h31").innerHTML += ""
}

//שמירת פרטי משתמש בלוקל סטורייג'
function login() {
    localStorage.setItem("userIndex", -1);
    var t = localStorage.memberss;
    var obj = JSON.parse(t);
    //לבדוק אם קיים
    var f = false;
    for (var i = 0; i < Number(localStorage.index); i++) {
        if (obj[i].name == document.getElementById("username").value) {
            localStorage.setItem("userIndex", i);
            f = true;
        }

    }
    //אם כן שומרת את האינקס שקיים
    //ואם לא 
    if (!f) {
        obj[Number(localStorage.index)].name = document.getElementById("username").value;
        localStorage.memberss = JSON.stringify(obj);
        localStorage.setItem("userIndex", Number(localStorage.index));
        localStorage.index = Number(localStorage.index) + 1;
    }
}

//הוראות
function oo1() {
    document.getElementById("oo").innerHTML = "מניחים 15/12 קלפים באופן גלוי, וכל המשתתפים מנסים למצוא סטים מבין הקלפים.  <br/> משתתף שמצא סט מכריז 'סט'.  <br/> אם הקלפים שחשב עליהם הם אכן סט, המשתתף מקבל נקודה, מסירים את קלפי הסט ומניחים אחרים במקומם. <br/>אם אף משתתף לא הצליח למצוא סט לאחר פרק זמן סביר, ניתן להוסיף עוד 3 קלפים (יש כאלה המוסיפים רק קלף אחד בפעם) ולחפש 'סט' ב-15 הקלפים שפרוסים כעת – דבר המשפר משמעותית את הסיכוי לקיומו של סט מתוך הקלפים הפרוסים.<br/> ברגע שמוצאים סט מתוך 15 קלפים, מוציאים את 3 הקלפים שהיוו סט, וממשיכים את המשחק שוב עם 12 קלפים.<br/>"

        + "מטרת" + " המשחק היא למצוא 'סטים'.  <br/>שלושה קלפים יכולים להוות יחד 'סט' אם הם מקיימים את הכלל הבא: עבור כל אחד מהמאפיינים בנפרד, שלושת הקלפים זהים זה לזה או שונים זה מזה.  <br/>לדוגמה, שלושה קלפים שבכל אחד מהם מעוין אחד מלא בצבע שונה הם סט.<br/>דוגמה נוספת: שלושה קלפים שבכל אחד צורה אחרת, צבע אחר, אבל כולם מפוספסים ובכמות 1 – גם הם סט.<br/>"
  
}

//טיימר 
var timeInSecs;
var ticker;

function startTimer(secs) {
    timeInSecs = parseInt(secs);
    ticker = setInterval("tick()", 1000);
}

function tick() {
    var secs = timeInSecs;
    if (secs < 30)
        document.getElementById("countdown").style.color = "red";
    if (secs > 0) {
        
        timeInSecs--;
    }
    else {
        clearInterval(ticker);
        t = localStorage.memberss;
        obj = JSON.parse(t);
        obj[Number(localStorage.userIndex)].prevTime = '0';
        obj[Number(localStorage.userIndex)].prevScore = 0;
        if (score1 > obj[Number(localStorage.userIndex)].score)
            obj[Number(localStorage.userIndex)].score = score1;
        t = JSON.stringify(obj);
        localStorage.memberss = t;
        localStorage.new = 'true';
        window.location.assign('win.html');
    }

    var mins = Math.floor(secs / 60);
    secs %= 60;
    var pretty = ((mins < 10) ? "0" : "") + mins + ":" + ((secs < 10) ? "0" : "") + secs;

    document.getElementById("countdown").innerHTML = pretty;
}

//שמירת נתוני המשחק בסגירת העמוד
function finishGame() {
    if (timeInSecs != 0) {
        t = localStorage.memberss;
        obj = JSON.parse(t);
        obj[Number(localStorage.userIndex)].prevTime = timeInSecs;
        obj[Number(localStorage.userIndex)].prevScore = score1;
        if (score1 > obj[Number(localStorage.userIndex)].score)
            obj[Number(localStorage.userIndex)].score = score1;
        obj[Number(localStorage.userIndex)].prevScore = score1;
        t = JSON.stringify(obj);
        localStorage.memberss = t;
    }
    else {
        t = localStorage.memberss;
        obj = JSON.parse(t);
        obj[Number(localStorage.userIndex)].prevTime = '0';
        obj[Number(localStorage.userIndex)].prevScore = score1;
        if (score1 > obj[Number(localStorage.userIndex)].score)
            obj[Number(localStorage.userIndex)].score = score1;
        t = JSON.stringify(obj);
        localStorage.memberss = t;
    }
}

//הדפסת העמוד
function pprint() {
    closeNav();
    print();
}

//דף סוף המשחק
function winn() {
    document.getElementById("win2").style.backgroundImage =   "url(something/gameover1.gif)";
   
    setTimeout(win1, 5000);
}
function win1() {
    document.getElementById("win2").style.backgroundImage = "url(something/225118.jpg)";
    t = localStorage.memberss;
    obj = JSON.parse(t);
    p = "your score: " + obj[Number(localStorage.userIndex)].prevScore + "<br/>" + "your best score:" + obj[Number(localStorage.userIndex)].score +"<br/>"+"<a id="+ "awin"+" "+ "href="+"HomePage.html"+">back to main page</a>";
    document.getElementById("pone").innerHTML += p;
    obj[Number(localStorage.userIndex)].prevScore = 0;
    t = JSON.stringify(obj);
    localStorage.memberss = t;
      

    clearInterval(win1);

}


