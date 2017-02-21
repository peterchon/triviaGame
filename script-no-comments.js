/**
 * Created by peterchon on 2/21/17.
 */

var questions = [
    {
        text: "Who's not a DC character?",
        answer: 0,
        choices: ["Wolverine", "Batman", "Superman", "Wonder Woman", "Flash"]
    },
    {
        text: "Who's not in The Avengers?",
        answer: 1,
        choices: ["Thor", "Batman", "Black Widow", "Spider Man", "Captain America"]
    },
    {
        text: "What is Hulk's real name?",
        answer: 2,
        choices: ["Bruce Wayne", "Bruce Campbell", "Bruce Banner", "Bruce Lee", "Bruce Boner"]
    },
    {
        text: "What is Iron Man's real name?",
        answer: 3,
        choices: ["Tony Robbins", "Tony the Tiger", "Tony Barone", "Tony Stark", "Tony Mallone"]
    },
    {
        text: "Who is Thor's brother?",
        answer: 4,
        choices: ["ToneLoc", "Lowkey", "Lowmein", "Sweet&Low", "Loki"]
    }
];

var triviaGame = {
    init: function () {
        this.container = this.container || document.getElementById('mainContainer');
        this.container.innerHTML = "<div><h1>" + this.answer + "</h1></div>" || "";

        this.score = this.score || 0;
        this.qIndex = this.qIndex + 1 || 0;

        this.time = 30;

        var self = this;
        self.end();

        setTimeout(function() {
            self.container.innerHTML = "";
            self.makeQ();
        }, this.answer ? 2500 : 0);
    },

    makeQ: function () {
        var q = questions[this.qIndex];

        var div = document.createElement('div');
        this.container.appendChild(div);

        this.clock = this.clock || document.createElement('p');
        this.clock.textContent = this.time;

        var h1 = document.createElement('h1');
        div.appendChild(h1);

        if(this.qIndex === questions.length) {
            h1.textContent = this.score ? this.score === questions.length ? this.CONST.WOW : this.CONST.GREAT_JOB : this.CONST.BOO;
            h1.textContent += this.CONST.SCORED + this.score + "/" + questions.length;

            delete this.score;
            delete this.qIndex;
            delete this.answer;

            var btn = document.createElement('button');
            btn.textContent = this.CONST.AGAIN;
            btn.onclick = this.init.bind(this);
            div.appendChild(btn);

            return;
        }

        h1.textContent = q.text;
        div.insertBefore(this.clock, h1);

        var ul = document.createElement('ul');

        div.appendChild(ul);

        for (var i=0, max=q.choices.length; i<max; i++) {
            var li = document.createElement("li");
            li.textContent = q.choices[i];
            li.onclick = this.checkAnswer;
            ul.appendChild(li);
        }

        q = questions[this.qIndex];
        this.answer = q.choices[q.answer];

        this.start();
    },

    start: function () {
        this.timer = setInterval(this.keepTime.bind(this), 1000);
    },

    end: function () {
        clearInterval(this.timer);
    },

    keepTime: function () {
        this.clock.textContent = this.time--;
        if (!this.time) {
            this.answer = this.CONST.TIMES_UP + this.answer;
            this.init();
        }
    },

    checkAnswer: function () {
        triviaGame.validate(this.textContent);
    },

    validate: function (ans) {
        if (ans === this.answer) {
            this.score++;
            this.answer = this.CONST.RIGHT;
        } else {
            this.answer = this.CONST.SORRY + this.answer;
        }

        this.init();
    },

    CONST: {
        AGAIN: "Try Again?",
        BOO: "Boo! ",
        GREAT_JOB: "Great Job! ",
        RIGHT: "Yey! You're right!",
        SCORED: "You scored: ",
        SORRY: "Sorry! the correct answer was: ",
        TIMES_UP: "Time's up! the correct answer was: ",
        WOW: "Wow! "
    }
};

triviaGame.init();