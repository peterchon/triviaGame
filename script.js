/**
 * Created by peterchon on 2/21/17.
 */

/**
 * I like to separate my data (MODEL) from my logic and template (CONTROLLER & VIEW)
 * This data structure closely mimics the kind of data you will encounter using APIs
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


/**
 * My Logic & template (CONTROLLER & VIEW) - this handles all the functionality of my application.
 * Notice I'm not using a constructor since I only need one object.
 */
var triviaGame = {

    /**
     * This resets my starting variables when invoked.
     * The score & index would need to use the updated values.
     */
    init: function () {

        /* Initialize the main container of the application */
        this.container = this.container || document.getElementById('mainContainer');

        /* Create a DOM structure to show if user answered correctly or not */
        this.container.innerHTML = "<div><h1>" + this.answer + "</h1></div>" || "";

        /* use updated variable or initialize with 0 */
        this.score = this.score || 0;
        this.qIndex = this.qIndex + 1 || 0;

        /* initialize the timer for 30 seconds */
        this.time = 30;

        /* need to abstract "this" to a variable to use with setTimeout */
        var self = this;

        /* clear the setInterval */
        self.end();

        /* clear the screen and show the next question in 2.5 seconds */
        setTimeout(function() {
            /* clear the html */
            self.container.innerHTML = "";

            /* show next question */
            self.makeQ();

        }, this.answer ? 2500 : 0);
    },

    makeQ: function () {
        /* select the current question from array */
        var q = questions[this.qIndex];

        /* create the parent <div> */
        var div = document.createElement('div');

        /* add the parent <div> to the container */
        this.container.appendChild(div);

        /* make a clock if not available */
        this.clock = this.clock || document.createElement('p');

        /* add the time value to clock */
        this.clock.textContent = this.time;

        /* create a <h1> for the question text */
        var h1 = document.createElement('h1');

        /* add the <h1> to the parent <div> */
        div.appendChild(h1);

        /* if qIndex is the same as question.length, show final score */
        if(this.qIndex === questions.length) {
            /* Say "Boo" if score is zero, else say "Great Job" */
            h1.textContent = this.score ? this.CONST.GREAT_JOB : this.CONST.BOO;
            h1.textContent += this.CONST.SCORED + this.score;

            /* initialize by deleting the variables */
            delete this.score;
            delete this.qIndex;
            delete this.answer;

            /* Create button to re-play the game */
            var btn = document.createElement('button');
            btn.textContent = this.CONST.AGAIN;
            btn.onclick = this.init.bind(this);
            div.appendChild(btn);

            /* return out */
            return;
        }

        /* If qIndex is less than question.length, make new question */
        h1.textContent = q.text;

        /* Inject the clock <p> before the <h1> */
        div.insertBefore(this.clock, h1);

        /* create a <ul> for the question */
        var ul = document.createElement('ul');

        /* append the <ul> to the parent <div> */
        div.appendChild(ul);

        /* For every object in the "choices" array, create a <li> */
        for (var i=0, max=q.choices.length; i<max; i++) {
            var li = document.createElement("li");
            li.textContent = q.choices[i];
            li.onclick = this.checkAnswer;
            ul.appendChild(li);
        }

        /* start the timer */
        this.start();
    },

    start: function () {
        /* initialize the timer with setInterval */
        this.timer = setInterval(this.keepTime.bind(this), 1000);
    },

    end: function () {
        /* clear the timer with clearInterval */
        clearInterval(this.timer);
    },

    keepTime: function () {
        /* add the time to the clock <p> */
        this.clock.textContent = this.time--;

        /* if time reaches zero, show message and continue to next question */
        if (!this.time) {
            this.answer = this.CONST.TIMES_UP + questions[this.qIndex].choices[questions[this.qIndex].answer];
            this.init();
        }
    },

    checkAnswer: function () {
        /* when user clicks on the choice, run the validate fn and pass content as argument */
        triviaGame.validate(this.textContent);
    },

    validate: function (ans) {
        /* assign the current question object as q */
        var q = questions[this.qIndex];

        /* initialize the answer variable with sorry message */
        this.answer = this.CONST.SORRY + q.choices[q.answer];

        /* if answer is correct, override the answer variable with a new message and add to the score */
        if (ans === q.choices[q.answer]) {
            this.score++;
            this.answer = this.CONST.RIGHT;
        }

        /* continue to the next question */
        this.init();
    },

    /* this is where I keep all my text strings */
    CONST: {
        AGAIN: "Try Again?",
        BOO: "Boo! ",
        GREAT_JOB: "Great Job! ",
        RIGHT: "Yey! You're right!",
        SCORED: "You scored: ",
        SORRY: "Sorry! the correct answer was: ",
        TIMES_UP: "Time's up! the correct answer was: "
    }
};

/* start the game */
triviaGame.init();