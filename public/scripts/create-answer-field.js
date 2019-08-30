function createAnswerField() {

    function create(tag) {
        return document.createElement(tag)
    }

    let mainDiv = create("div")
    document.body.appendChild(mainDiv)

    let formAnswer = create("div")
    formAnswer.style = "width: 500px; position: absolute; left:50%; top: 50%; transform: translate(-50%, -50%); background-color: gray; border: solid 2px white; border-radius: 5%; color:white;"
    document.body.appendChild(formAnswer)

    let fontplay = create("i")
    fontplay.className = "fas fa-play fa-3x"
    fontplay.style = "position:relative; display:block;  left:40%; width: 30%; margin:30px;"
    formAnswer.appendChild(fontplay)

    let formGroup = create("div")
    formGroup.className = "form-group"
    formAnswer.appendChild(formGroup)

    let inputForAnswer = create("input")
    inputForAnswer.className = "form-control"
    inputForAnswer.placeholder = "Write word here"
    formGroup.appendChild(inputForAnswer)

    let host = ""
    if (language.value == "english") {
        host = 'http://localhost:3000/englishWords'
    }
    else {
        host = 'http://localhost:3000/russianWords'
    }
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1))
    }

    let sum = 0
    let wrongWords = `Your answer | CORRECT\n`
    console.log(formAnswer)
    function writeWord() {
        async function getRandomWord() {
            let res = await fetch(host, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            let englishWords = await res.json()
            let randWord = (englishWords[rand(0, englishWords.length - 1)])

            return randWord.word
        }
        let randomWord = getRandomWord()

        function speakWord() {
            randomWord.then(word => {
                console.log(word)
                let msg = new SpeechSynthesisUtterance(word)
                if (language.value == "english") {
                    msg.lang = "en"
                }
                else msg.lang = "ru"
                speechSynthesis.speak(msg)
                return word
            })
        }
        speakWord()
        fontplay.onmousedown = speakWord

        inputForAnswer.onkeydown = () => {
            if (event.key === "Enter") {
                randomWord.then(word => {
                    if (word == inputForAnswer.value) {
                        inputForAnswer.style.color = "green"
                    }
                    else {
                        inputForAnswer.style.color = "red"
                    }
                })
            }
        }

        inputForAnswer.onkeyup = () => {
            if (event.key === "Enter") {
                randomWord.then(word => {
                    if (word == inputForAnswer.value) {
                        sum++
                        console.log(sum)
                        inputForAnswer.value = ""
                        inputForAnswer.style.color = "black"
                        writeWord()
                    }
                    else {
                        wrongWords += `${inputForAnswer.value} | ${word}\n`
                        inputForAnswer.value = ""
                        inputForAnswer.style.color = "black"
                        writeWord()
                    }
                })
            }
        }

    }
    writeWord()

    setTimeout(() => {
        async function addResult() {
            let name = chooseUser.value
            let result = sum
            let lang = language.value
            let obj = { name, result, lang }

            let json = JSON.stringify(obj)
            console.log(json)
            let res = await fetch('http://localhost:3000/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: json
            })
        }
        addResult()
        if (wrongWords === `Your answer | CORRECT\n`){
            wrongWords = "Congratulations! All your answers were correct!"
        }
        new Modal("#1CAF66", `${wrongWords}`)
        let misMsg = document.getElementById("modal")
        let modalBackMis = document.getElementById("modalBack")
        let btnTimesMis = document.getElementById("btnTimes")
        btnTimesMis.onmousedown = () => {
            misMsg.parentNode.removeChild(misMsg)
            modalBackMis.parentNode.removeChild(modalBackMis)

            new Modal("#1CAF66", `Result for ${chooseUser.value} ${sum}`)
            let resultMsg = document.getElementById("modal")
            let modalBack = document.getElementById("modalBack")
            let btnTimes = document.getElementById("btnTimes")
            btnTimes.onmousedown = () => {
                resultMsg.parentNode.removeChild(resultMsg)
                modalBack.parentNode.removeChild(modalBack)

                new Modal("#1CAF66", "To see all results press 'OK'", "Y")
                let finalMsg = document.getElementById("modal")
                let modalBackFinal = document.getElementById("modalBack")
                let btnTimesFinal = document.getElementById("btnTimes")
                let btnOkFinal = document.getElementById("btnOk")
                btnTimesFinal.onmousedown = () => {
                    finalMsg.parentNode.removeChild(finalMsg)
                    modalBackFinal.parentNode.removeChild(modalBackFinal)
                    window.location.href = "index.html"
                }
                btnOkFinal.onmousedown = () => window.location.href = "additional/results.html"
            }
        }}, 60000)
}