class Modal {
    constructor(bcolor, message, btnOk = "N") {
        this.modal = this.createModal(bcolor, message, btnOk)
    }
    createModal(bcolor, message, btnOk) {
        let divModal = document.createElement("div")
        divModal.id = "modal"
        document.body.appendChild(divModal)

        let divHead = document.createElement("div")
        divHead.style = `background-color: ${bcolor}; width: 100%; height: 37px; text-align:right;`
        divModal.appendChild(divHead)

        let btnTimes = document.createElement("button")
        btnTimes.id = "btnTimes"
        btnTimes.style = "border:solid 1px white; border-radius: 5%; padding: 0px; width:34px; background-color: gray;"
        divHead.appendChild(btnTimes)

        let iconTimes = document.createElement("i")
        iconTimes.className = "fas fa-times fa-2x"
        iconTimes.style.color = "white"
        btnTimes.appendChild(iconTimes)

        let textDiv = document.createElement("div")
        textDiv.id = "modalTxt"
        textDiv.innerText = message
        divModal.appendChild(textDiv)

        let buttonOk = document.createElement("button")
        buttonOk.id = "btnOk"
        buttonOk.innerText = "Ok"
        if (btnOk == "Y") { divModal.appendChild(buttonOk) }
        
        let divBack = document.createElement("div")
        divBack.id = "modalBack"
        divBack.style = "z-index: 100; opacity: 0.5; position:absolute; top:0; left:0; width:100%; height:100%; background-color: gray;"
        document.body.appendChild(divBack)        
    }
}
    //let modalWrong = new Modal ("#1CAF66","Wrong","Y") green
    //let modalWrong = new Modal ("#EC4F4F","Wrong","Y") red
