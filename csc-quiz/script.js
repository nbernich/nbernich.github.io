// hello chat
let quizData = null;

window.onload = async () => {
    await fetchQuizData();
    createQuestionNodes();
    addLabelClickBehavior();
}

document.querySelector("#submit").addEventListener("click", event => {
    event.preventDefault();
    validateAnswers();
});

async function fetchQuizData() {
    quizData = await fetch("./data.json").then(res => {
        return res.json();
    }).catch(err => {
        console.error(err);
        return null;
    });
}

function createQuestionNodes() {

    if (!quizData) {
        alert("Something broke! Can't generate question content.");
        return;
    }

    const questionContainer = document.querySelector("#question-container");

    Object.entries(quizData.questions).forEach(([questionId, questionData]) => {

        const questionNode = document.createElement("div");
        questionNode.id = questionId;
        questionNode.classList.add("question");

        const promptNode = document.createElement("p");
        promptNode.innerText = questionData.prompt;
        questionNode.appendChild(promptNode);

        questionData.options.forEach(option => {

            const optionNode = document.createElement("input");
            optionNode.type = "radio";
            optionNode.name = questionId;
            optionNode.value = option;
            questionNode.append(optionNode);

            const labelNode = document.createElement("label");
            labelNode.innerText = option;
            questionNode.append(labelNode);

            questionNode.append(document.createElement("br"));

        });

        questionContainer.appendChild(questionNode);
    });
}

function addLabelClickBehavior() {
    document.querySelectorAll("label").forEach(labelNode => {
        labelNode.addEventListener("click", event => {
            event.preventDefault();
            labelNode.previousElementSibling.checked = true;
        });
    });
}

function validateAnswers() {

    if (!quizData) {
        alert("Something broke! Can't validate your answers.");
        return;
    }

    let incorrectCount = 0;
    document.querySelectorAll(".question").forEach(questionNode => {
        const selectedOption = questionNode.querySelector("input:checked")?.value;
        const answer = quizData.answers[questionNode.id];
        if (!selectedOption || selectedOption != answer) {
            incorrectCount++;
        }
    });

    if (incorrectCount == 0) {
        alert("Congrats! You got everything correct!");
        sendWebhookAlert();
    } else {
        // alert(`You got ${incorrectCount} answer(s) wrong. Try again!`);
        alert("You failed! Try again");
    }
}

async function sendWebhookAlert() {
    await fetch("https://discord.com/api/webhooks/1153767807440400414/n7zzW7uToVvUdpele-ujk5AVEhXkGBU8eI14c8EKDLCbxZEqgyNCRmilG_FHfUkCh95w", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "embeds": [
                {
                    "title": "New Quiz Completion!",
                    "color": 0x00ff00,
                    "fields": [
                        { "name": "User Agent ", "value": navigator.userAgent }
                    ]
                }
            ]
        })
    });
}