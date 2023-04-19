let btn_opzetten
let w_torenl
let w_torenr
let w_paardl
let w_paardr
let w_bisschopl
let w_bisschopr
let w_koningin
let w_koning
let w_pion1
let w_pion2

let dragged
let dragging
let restoreArray = []
let promoTel = 1




window.onload = (event) => {
    btn_opzetten = document.getElementById("id_btn_opzetten")
    modal = document.getElementById("id_modal")
    img_koningin = document.getElementById("id_img_koningin")
    img_toren = document.getElementById("id_img_toren")
    img_bisschop = document.getElementById("id_img_bisschop")
    img_paard = document.getElementById("id_img_paard")
    
    btn_opzetten.addEventListener('click', (evt) => {
        opzetten()
    })

    img_koningin.addEventListener('click', (evt) => {
        if (dragged.id.includes("w_")) {
            modal.style.display = "none"
            dragged.src = "w_koningin.svg"
            dragged.id = "w_koningin" + promoTel
        } else {
            modal.style.display = "none"
            dragged.src = "b_koningin.svg"
            dragged.id = "b_koningin" + promoTel
        }
        promoTel++
    })

    img_toren.addEventListener('click', (evt) => {
        if (dragged.id.includes("w_")) {
            modal.style.display = "none"
            dragged.src = "w_toren.svg"
            dragged.id = "w_toren" + promoTel
        } else {
            modal.style.display = "none"
            dragged.src = "b_toren.svg"
            dragged.id = "b_toren" + promoTel
        }
        promoTel++
    })

    img_bisschop.addEventListener('click', (evt) => {
        if (dragged.id.includes("w_")) {
            modal.style.display = "none"
            dragged.src = "w_bisschop.svg"
            dragged.id = "w_bisschop" + promoTel
        } else {
            modal.style.display = "none"
            dragged.src = "b_bisschop.svg"
            dragged.id = "b_bisschop" + promoTel
        }
        promoTel++
    })

    img_paard.addEventListener('click', (evt) => {
        if (dragged.id.includes("w_")) {
            modal.style.display = "none"
            dragged.src = "w_paard.svg"
            dragged.id = "w_paard" + promoTel
        } else {
            modal.style.display = "none"
            dragged.src = "b_paard.svg"
            dragged.id = "b_paard" + promoTel
        }
        promoTel++
    })
};



function opzetten() {
    let bord = document.getElementById("id_grid-container")
    let vak
    // een arry om de vak-id's in op te slaan
    let vakArray = []
    
    bord.innerHTML = ""
    
    for (var i = 8; i > 0; i--) {
        for (var j = 1; j < 9; j++) {
            vak = document.createElement('div')
            vak.id = String.fromCharCode(64 + j) + i 
            if(i % 2 == 0) {
                if (j % 2 != 0) {
                    vak.style.backgroundColor = "burlywood"
                    vak.style.color = "black"
                } else {
                    vak.style.backgroundColor = "saddlebrown"
                    vak.style.color = "white"
                }
            } else {
                if (j % 2 != 0) {
                    vak.style.backgroundColor = "saddlebrown"
                    vak.style.color = "white"
                } else {
                    vak.style.backgroundColor = "burlywood"
                    vak.style.color = "black"
                }
            }
            bord.appendChild(vak)
            vakArray.push(vak.id)
        }
    }

    
    
    // regel dat de vakken "dropable" zijn. Gebruik hiervoor de array die hiervoor is gevuld.
    vakArray.forEach((element) => {
        const vakID = document.getElementById(element)

        vakID.classList.add("droptarget")

        vakID.addEventListener("dragover", (event) => {
            event.preventDefault();
        })
        
        vakID.addEventListener("drop", (event) => {
            event.preventDefault();
            if (vakID.classList.contains("droptarget")) {
                // controleer of het stuk naar een ander vak wordt gesleept. Zo wel, verplaats het. Zo niet, doe niets
                if (vakID.id != dragged.parentNode.id) {
                    // controleer of de zet geldig is. De lijst met geldige opties staat reeds in de restoreArray!
                    if (restoreArray.length > 0 && restoreArray.includes(vakID.id)) {
                        // is het targetvak leeg. Zo niet, is het 'vriend' of 'vijand' en pas de actie daarop aan
                        if (vakID.childElementCount > 0) {
                            let childID = vakID.childNodes[0]
                            if (childID.id.substring(0,1) != dragged.id.substring(0,1)) {
                                //'vijand' wordt geslagen, dus verwijder het
                                vakID.removeChild(childID)
                                // het plaats het slaande stuk
                                dragged.parentNode.removeChild(dragged);
                                vakID.appendChild(dragged)
                            }
                        } else {
                            // er staat nog geen stuk, dus plaats het gesleepte stuk
                            dragged.parentNode.removeChild(dragged);
                            event.target.appendChild(dragged)
                        }
                        // een witte pion heeft de achterste rij van de tegenstander gehaald. Promoveer het ...
                        if (vakID.id.includes("8") && dragged.id.includes("pion")) {
                            document.getElementById("id_modal").style.display = "block"
                            document.getElementById("id_img_koningin").src = "w_koningin.svg"
                            document.getElementById("id_img_toren").src = "w_toren.svg"
                            document.getElementById("id_img_bisschop").src = "w_bisschop.svg"
                            document.getElementById("id_img_paard").src = "w_paard.svg"
                        }
                        // een zwarte pion heeft de achterste rij van de tegenstander gehaald. Promoveer het ...
                        if (vakID.id.includes("1") && dragged.id.includes("pion")) {
                            document.getElementById("id_modal").style.display = "block"
                            document.getElementById("id_img_koningin").src = "b_koningin.svg"
                            document.getElementById("id_img_toren").src = "b_toren.svg"
                            document.getElementById("id_img_bisschop").src = "b_bisschop.svg"
                            document.getElementById("id_img_paard").src = "b_paard.svg"
                        }
                    }
                }
                // herstel de de velden die een andere opacity hebben
                for (var i = 0; i < restoreArray.length; i++) {
                    document.getElementById(restoreArray[i]).style.opacity = "1"
                }
            }
        })
    })

    // 'luister' naar een drag event
    window.addEventListener("drag", (event) => {
        dragged = event.target
    })

    // 'luister' of er gestart wordt met slepen. Kijk welk stuk het is en wat de plaatsingsmogelijkheden zijn
    window.addEventListener('dragstart', (event) => {
        restoreArray = []
        dragging = event.target
        let stukID = event.target.id
        let vakID = dragging.parentNode.id
        let vakLetter = vakID.substring(0,1)
        let vakNummer = parseInt(vakID.substring(1))
        let vakChar = vakLetter.charCodeAt(0)

        // de pionnen
        if (stukID.includes("pion")) {
            if (stukID.substring(0,1) == "w") {
                // en pas de opacity aan van de vakken die kunnen worden bereikt
                if (vakNummer + 1 < 9) {
                    document.getElementById(vakLetter + (vakNummer + 1)).style.opacity = "0.4"
                    restoreArray.push(vakLetter + (vakNummer + 1))
                    if (vakNummer == 2) {
                        document.getElementById(vakLetter + (vakNummer + 2)).style.opacity = "0.4"
                        restoreArray.push(vakLetter + (vakNummer + 2))
                    }
                    // 'vijand 'diagonaal links
                    if (vakChar - 64 - 1 > 0 && document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer + 1)).childElementCount != 0) {
                        document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer + 1)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar - 1) + (vakNummer + 1))
                    }
                    // 'vijand' diagonaal rechts
                    if (vakChar - 64 + 1 < 9 && document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer + 1)).childElementCount != 0) {
                        document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer + 1)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar + 1) + (vakNummer + 1))
                    }
                }
            } else {
                if (vakNummer - 1 > 0) {
                    document.getElementById(vakLetter + (vakNummer - 1)).style.opacity = "0.4"
                    restoreArray.push(vakLetter + (vakNummer - 1))
                    if (vakNummer  == 7) {
                        document.getElementById(vakLetter + (vakNummer -2)).style.opacity = "0.4"
                        restoreArray.push(vakLetter + (vakNummer -2))
                    }
                    // 'vijand' diagonaal rechts
                    if (vakChar - 64 - 1 > 0 && document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer - 1)).childElementCount != 0) {
                        document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer - 1)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar - 1) + (vakNummer - 1))
                    }
                    // 'vijand' diagonaal links
                    if (vakChar - 64 + 1 < 9 && document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer - 1)).childElementCount != 0) {
                        document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer - 1)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar + 1) + (vakNummer - 1))
                    }
                }
            }
        }

        if (stukID.includes("toren") || stukID.includes("koningin")) {
            // conrolevariabelen voor de rand van het bord
            let nre = false
            let nli = false
            let nbo = false
            let nbe = false

            // een stuk kan maximaal 7 vakken verspringen. Rechte lijn voorwaarts/achterwaarts/links/rechts.
            // in deze for-lus worden alle mogelijkheden doorlopen. Is het eind van het bord bereikt dan wordt de controlevariabele op true gezet
            for (var i = 1; i < 8; i++) {
                // naar rechts
                if (vakChar - 64 + i < 9 && nre ==  false) {
                    if (document.getElementById(String.fromCharCode(vakChar + i) + (vakNummer)).childElementCount == 0) {
                        document.getElementById(String.fromCharCode(vakChar + i) + (vakNummer)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar + i) + (vakNummer))
                    } else {
                        // de node heeft een 'child'. Haalt het ID op
                        let touchID = document.getElementById(String.fromCharCode(vakChar + i) + vakNummer).childNodes[0].id
                        // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                        if (stukID.substring(0,1) != touchID.substring(0,1)) {
                            document.getElementById(String.fromCharCode(vakChar + i) + (vakNummer)).style.opacity = "0.4"
                            restoreArray.push(String.fromCharCode(vakChar + i) + (vakNummer))
                        }
                        nre = true
                    }
                }
                //naar links
                if (vakChar - 64 - i > 0 && nli ==  false) {
                    if (document.getElementById(String.fromCharCode(vakChar - i) + (vakNummer)).childElementCount == 0) {
                        document.getElementById(String.fromCharCode(vakChar - i) + (vakNummer)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar - i) + (vakNummer))
                    } else {
                        // de node heeft een 'child'. Haalt het ID op
                        let touchID = document.getElementById(String.fromCharCode(vakChar - i) + vakNummer).childNodes[0].id
                        // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                        if (stukID.substring(0,1) != touchID.substring(0,1)) {
                            document.getElementById(String.fromCharCode(vakChar - i) + (vakNummer)).style.opacity = "0.4"
                            restoreArray.push(String.fromCharCode(vakChar - i) + (vakNummer))
                        }
                        nli = true
                    }
                }
                // naar boven
                if (vakNummer + i < 9 && nbo ==  false) {
                     if (document.getElementById(vakLetter + (vakNummer + i)).childElementCount == 0) {
                        document.getElementById(vakLetter + (vakNummer + i)).style.opacity = "0.4"
                        restoreArray.push(vakLetter + (vakNummer + i))
                    } else {
                        // de node heeft een 'child'. Haalt het ID op
                        let touchID = document.getElementById(vakLetter + (vakNummer + i)).childNodes[0].id
                        // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                        if (stukID.substring(0,1) != touchID.substring(0,1)) {
                            document.getElementById(vakLetter + (vakNummer + i)).style.opacity = "0.4"
                            restoreArray.push(vakLetter + (vakNummer + i))
                        }
                        nbo = true
                    }
                }

                // naar beneden
                if (vakNummer - i> 0 && nbe ==  false) {
                    if (document.getElementById(vakLetter + (vakNummer - i)).childElementCount == 0) {
                        document.getElementById(vakLetter + (vakNummer - i)).style.opacity = "0.4"
                        restoreArray.push(vakLetter + (vakNummer - i))
                    } else {
                        // de node heeft een 'child'. Haalt het ID op
                        let touchID = document.getElementById(vakLetter + (vakNummer - i)).childNodes[0].id
                        // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                        if (stukID.substring(0,1) != touchID.substring(0,1)) {
                            document.getElementById(vakLetter + (vakNummer - i)).style.opacity = "0.4"
                            restoreArray.push(vakLetter + (vakNummer - i))
                        }
                        nbe = true
                    }
                }
            }
        }

        // de paarden
        if (stukID.includes("paard")) {
            // en pas de opacity aan van de vakken die kunnen worden bereikt
            // 1 naar voren 2 naar rechts
            if (vakChar - 64 + 2 < 9 && vakNummer + 1 < 9) {
                if (document.getElementById(String.fromCharCode(vakChar + 2) + (vakNummer + 1)).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar + 2) + (vakNummer + 1)).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar + 2) + (vakNummer + 1))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar + 2) + (vakNummer + 1)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar + 2) + (vakNummer + 1)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar + 2) + (vakNummer + 1))
                    }
                }
            }
            // 2 naar voren 1 naar rechts
            if (vakChar - 64 + 1 < 9 && vakNummer + 2 < 9) {
                if (document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer + 2)).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer + 2)).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar + 1) + (vakNummer + 2))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer + 2)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer + 2)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar + 1) + (vakNummer + 2))
                    }
                }
            }
            // 1 naar voren 2 naar links
            if (vakChar - 64 - 2 > 0 && vakNummer + 1 < 9) {
                if (document.getElementById(String.fromCharCode(vakChar - 2) + (vakNummer + 1)).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar - 2) + (vakNummer + 1)).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar - 2) + (vakNummer + 1))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar - 2) + (vakNummer + 1)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar - 2) + (vakNummer + 1)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar - 2) + (vakNummer + 1))
                    }
                }
            }
            // 2 naar voren 1 naar links
            if (vakChar - 64 - 1 > 0 && vakNummer + 2 < 9) {
                if (document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer + 2)).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer + 2)).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar - 1) + (vakNummer + 2))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer + 2)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer + 2)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar - 1) + (vakNummer + 2))
                    }
                }
            }
            // 1 naar achteren 2 naar rechts
            if (vakChar - 64 + 2 < 9 && vakNummer - 1 > 0) {
                if (document.getElementById(String.fromCharCode(vakChar + 2) + (vakNummer - 1)).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar + 2) + (vakNummer - 1)).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar + 2) + (vakNummer - 1))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar + 2) + (vakNummer - 1)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar + 2) + (vakNummer - 1)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar + 2) + (vakNummer - 1))
                    }
                }
            }
            // 2 naar achteren 1 naar rechts
            if (vakChar - 64 + 1 < 9 && vakNummer - 2 > 0) {
                if (document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer - 2)).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer - 2)).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar + 1) + (vakNummer - 2))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer - 2)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer - 2)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar + 1) + (vakNummer - 2))
                    }
                }
            }
            // 1 naar achteren 2 naar links
            if (vakChar - 64 - 2 > 0 && vakNummer - 1 > 0) {
                if (document.getElementById(String.fromCharCode(vakChar - 2) + (vakNummer - 1)).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar - 2) + (vakNummer - 1)).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar - 2) + (vakNummer - 1))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar - 2) + (vakNummer - 1)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar - 2) + (vakNummer - 1)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar - 2) + (vakNummer - 1))
                    }
                }
            }
            // 2 naar achteren 1 naar links
            if (vakChar - 64 - 1 > 0 && vakNummer - 2 > 0) {
                if (document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer - 2)).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer - 2)).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar - 1) + (vakNummer - 2))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer - 2)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer - 2)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar - 1) + (vakNummer - 2))
                    }
                }
            }
        }

        // de bisschoppen
        if (stukID.includes("bisschop") || stukID.includes("koningin") ) {
            // conrolevariabelen voor de rand van het bord
            let lorb = false
            let rolb = false
            let rblo = false
            let lbro = false

            // een stuk kan maximaal 7 vakken verspringen. Diagonaal voorwaarts/achterwaarts.
            // in deze for-lus worden alle mogelijkheden doorlopen. Is het eind van het bord bereikt dan wordt de controlevariabele op true gezet
            for (var i = 1; i < 8; i++) {
                // van linksonder naar rechtsboven
                if ((vakChar - 64 + i < 9 && vakNummer + i < 9) && lorb == false) {
                    if (document.getElementById(String.fromCharCode(vakChar + i) + (vakNummer + i)).childElementCount == 0) {
                        document.getElementById(String.fromCharCode(vakChar + i) + (vakNummer + i)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar + i) + (vakNummer + i))
                    } else {
                        // de node heeft een 'child'. Haalt het ID op
                        let touchID = document.getElementById(String.fromCharCode(vakChar + i) + (vakNummer + i)).childNodes[0].id
                        // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                        if (stukID.substring(0,1) != touchID.substring(0,1)) {
                            document.getElementById(String.fromCharCode(vakChar + i) + (vakNummer + i)).style.opacity = "0.4"
                            restoreArray.push(String.fromCharCode(vakChar + i) + (vakNummer + i))
                        }
                        lorb = true
                    }
                }
                // van rechtsonder naar linksboven
                if ((vakChar - 64 - i > 0 && vakNummer + i < 9) && rolb == false) {
                    if (document.getElementById(String.fromCharCode(vakChar - i) + (vakNummer + i)).childElementCount == 0) {
                        document.getElementById(String.fromCharCode(vakChar - i) + (vakNummer + i)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar - i) + (vakNummer + i))
                    } else {
                        // de node heeft een 'child'. Haalt het ID op
                        let touchID = document.getElementById(String.fromCharCode(vakChar - i) + (vakNummer + i)).childNodes[0].id
                        // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                        if (stukID.substring(0,1) != touchID.substring(0,1)) {
                            document.getElementById(String.fromCharCode(vakChar - i) + (vakNummer + i)).style.opacity = "0.4"
                            restoreArray.push(String.fromCharCode(vakChar - i) + (vakNummer + i))
                        }
                        rolb = true
                    }
                }
                // van rechtsboven naar linksonder
                if ((vakChar - 64 - i > 0 && vakNummer - i > 0) && rblo == false) {
                    if (document.getElementById(String.fromCharCode(vakChar - i) + (vakNummer - i)).childElementCount == 0) {
                        document.getElementById(String.fromCharCode(vakChar - i) + (vakNummer - i)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar - i) + (vakNummer - i))
                    } else {
                        // de node heeft een 'child'. Haalt het ID op
                        let touchID = document.getElementById(String.fromCharCode(vakChar - i) + (vakNummer - i)).childNodes[0].id
                        // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                        if (stukID.substring(0,1) != touchID.substring(0,1)) {
                            document.getElementById(String.fromCharCode(vakChar - i) + (vakNummer - i)).style.opacity = "0.4"
                            restoreArray.push(String.fromCharCode(vakChar - i) + (vakNummer - i))
                        }
                        rblo = true
                    }
                }
                // van linksboven naar rechtsonder
                if ((vakChar - 64 + i < 9 && vakNummer - i > 0) && lbro == false) {
                    if (document.getElementById(String.fromCharCode(vakChar + i) + (vakNummer - i)).childElementCount == 0) {
                        document.getElementById(String.fromCharCode(vakChar + i) + (vakNummer - i)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar + i) + (vakNummer - i))
                    } else {
                        // de node heeft een 'child'. Haalt het ID op
                        let touchID = document.getElementById(String.fromCharCode(vakChar + i) + (vakNummer - i)).childNodes[0].id
                        // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                        if (stukID.substring(0,1) != touchID.substring(0,1)) {
                            document.getElementById(String.fromCharCode(vakChar + i) + (vakNummer - i)).style.opacity = "0.4"
                            restoreArray.push(String.fromCharCode(vakChar + i) + (vakNummer - i))
                        }
                        lbro = true
                    }
                }
            }
        }

        if (stukID == "w_koning" || stukID == "b_koning") {
            //vakje rechts
            if (vakChar - 64 + 1 < 9) {
                if (document.getElementById(String.fromCharCode(vakChar + 1) + vakNummer).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar + 1) + vakNummer).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar + 1) + vakNummer)
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar + 1) + vakNummer).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar + 1) + vakNummer).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar + 1) + vakNummer)
                    }
                }
            }
            // vakje links
            if (vakChar - 64 - 1 > 0) {
                if (document.getElementById(String.fromCharCode(vakChar - 1) + vakNummer).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar - 1) + vakNummer).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar - 1) + vakNummer)
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar - 1) + vakNummer).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar - 1) + vakNummer).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar - 1) + vakNummer)
                    }
                }
            }
            // vakje boven
            if (vakNummer + 1 < 9) {
                if (document.getElementById(vakLetter + (vakNummer + 1)).childElementCount == 0) {
                    document.getElementById(vakLetter + (vakNummer + 1)).style.opacity = "0.4"
                    restoreArray.push(vakLetter + (vakNummer + 1))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(vakLetter + (vakNummer + 1)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(vakLetter + (vakNummer + 1)).style.opacity = "0.4"
                        restoreArray.push(vakLetter + (vakNummer + 1))
                    }
                }
            }
            // vakje onder
            if (vakNummer - 1 > 0) {
                if (document.getElementById(vakLetter + (vakNummer - 1)).childElementCount == 0) {
                    document.getElementById(vakLetter + (vakNummer - 1)).style.opacity = "0.4"
                    restoreArray.push(vakLetter + (vakNummer - 1))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(vakLetter + (vakNummer - 1)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(vakLetter + (vakNummer - 1)).style.opacity = "0.4"
                        restoreArray.push(vakLetter + (vakNummer - 1))
                    }
                }
            }
            // rechts diagonaal boven
            if (vakChar - 64 + 1 < 9 && vakNummer + 1 < 9) {
                if (document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer + 1)).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer + 1)).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar + 1) + (vakNummer + 1))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer + 1)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer + 1)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar + 1) + (vakNummer + 1))
                    }
                }
            }
            // rechts diagonaal onder
            if (vakChar - 64 + 1 < 9 && vakNummer - 1 > 0) {
                if (document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer - 1)).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer - 1)).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar + 1) + (vakNummer - 1))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer - 1)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar + 1) + (vakNummer - 1)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar + 1) + (vakNummer - 1))
                    }
                }
            }
            // links diagonaal boven
            if (vakChar - 64 - 1 > 0 && vakNummer + 1 < 9) {
                if (document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer + 1)).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer + 1)).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar - 1) + (vakNummer + 1))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer + 1)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer + 1)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar - 1) + (vakNummer + 1))
                    }
                }
            }
            // links diagonaal onder
            if (vakChar - 64 - 1 > 0 && vakNummer - 1 > 0) {
                if (document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer - 1)).childElementCount == 0) {
                    document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer - 1)).style.opacity = "0.4"
                    restoreArray.push(String.fromCharCode(vakChar - 1) + (vakNummer - 1))
                } else {
                    // de node heeft een 'child'. Haalt het ID op
                    let touchID = document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer - 1)).childNodes[0].id
                    // de postie van een eigen stuk kan niet worden ingenomen, die van de tegenstander wel (vergelijk "w"/"b")
                    if (stukID.substring(0,1) != touchID.substring(0,1)) {
                        document.getElementById(String.fromCharCode(vakChar - 1) + (vakNummer - 1)).style.opacity = "0.4"
                        restoreArray.push(String.fromCharCode(vakChar - 1) + (vakNummer - 1))
                    }
                }
            }
        }
    });

    // plaats de stukken op het bord
    w_torenl = document.createElement('img');
    w_torenl.src = "w_toren.svg"
    w_torenl.id = "w_torenl"
    vak = document.getElementById("A1")
    vak.appendChild(w_torenl)

    w_torenr = document.createElement('img');
    w_torenr.src = "w_toren.svg"
    w_torenr.id = "w_torenr"
    vak = document.getElementById("H1")
    vak.appendChild(w_torenr)

    w_paardl = document.createElement('img');
    w_paardl.src = "w_paard.svg"
    w_paardl.id = "w_paardl"
    vak = document.getElementById("B1")
    vak.appendChild(w_paardl)

    w_paardr = document.createElement('img');
    w_paardr.src = "w_paard.svg"
    w_paardr.id = "w_paardr"
    vak = document.getElementById("G1")
    vak.appendChild(w_paardr)
    
    w_bisschopl = document.createElement('img');
    w_bisschopl.src = "w_bisschop.svg"
    w_bisschopl.id = "w_bisschopl"
    vak = document.getElementById("C1")
    vak.appendChild(w_bisschopl)

    w_bisschopr = document.createElement('img');
    w_bisschopr.src = "w_bisschop.svg"
    w_bisschopr.id = "w_bisschopr"
    vak = document.getElementById("F1")
    vak.appendChild(w_bisschopr)
    
    w_koningin = document.createElement('img');
    w_koningin.src = "w_koningin.svg"
    w_koningin.id = "w_koningin"
    w_koningin.draggable = true
    vak = document.getElementById("D1")
    vak.appendChild(w_koningin)

    w_koning = document.createElement('img');
    w_koning.src = "w_koning.svg"
    w_koning.id = "w_koning"
    w_koning.draggable = true
    vak = document.getElementById("E1")
    vak.appendChild(w_koning)

    w_pion1 = document.createElement('img');
    w_pion1.src = "w_pion.svg"
    w_pion1.id = "w_pion1"
    vak = document.getElementById("A2")
    vak.appendChild(w_pion1)

    w_pion2 = document.createElement('img');
    w_pion2.src = "w_pion.svg"
    w_pion2.id = "w_pion2"
    vak = document.getElementById("B2")
    vak.appendChild(w_pion2)

    w_pion3 = document.createElement('img');
    w_pion3.src = "w_pion.svg"
    w_pion3.id = "w_pion3"
    vak = document.getElementById("C2")
    vak.appendChild(w_pion3)
    
    w_pion4 = document.createElement('img');
    w_pion4.src = "w_pion.svg"
    w_pion4.id = "w_pion4"
    vak = document.getElementById("D2")
    vak.appendChild(w_pion4)

    w_pion5 = document.createElement('img');
    w_pion5.src = "w_pion.svg"
    w_pion5.id = "w_pion5"
    vak = document.getElementById("E2")
    vak.appendChild(w_pion5)
    
    w_pion6 = document.createElement('img');
    w_pion6.src = "w_pion.svg"
    w_pion6.id = "w_pion6"
    vak = document.getElementById("F2")
    vak.appendChild(w_pion6)

    w_pion7 = document.createElement('img');
    w_pion7.src = "w_pion.svg"
    w_pion7.id = "w_pion7"
    vak = document.getElementById("G2")
    vak.appendChild(w_pion7)
    
    w_pion8 = document.createElement('img');
    w_pion8.src = "w_pion.svg"
    w_pion8.id = "w_pion8"
    vak = document.getElementById("H2")
    vak.appendChild(w_pion8)

    b_torenl = document.createElement('img');
    b_torenl.src = "b_toren.svg"
    b_torenl.id = "b_torenl"
    vak = document.getElementById("H8")
    vak.appendChild(b_torenl)

    b_torenr = document.createElement('img');
    b_torenr.src = "b_toren.svg"
    b_torenr.id = "b_torenr"
    vak = document.getElementById("A8")
    vak.appendChild(b_torenr)
    
    b_paardl = document.createElement('img');
    b_paardl.src = "b_paard.svg"
    b_paardl.id = "b_paardl"
    vak = document.getElementById("G8")
    vak.appendChild(b_paardl)

    b_paardr = document.createElement('img');
    b_paardr.src = "b_paard.svg"
    b_paardr.id = "b_paardr"
    vak = document.getElementById("B8")
    vak.appendChild(b_paardr)
    
    b_bisschopl = document.createElement('img');
    b_bisschopl.src = "b_bisschop.svg"
    b_bisschopl.id = "b_bisschopl"
    vak = document.getElementById("F8")
    vak.appendChild(b_bisschopl)

    b_bisschopr = document.createElement('img');
    b_bisschopr.src = "b_bisschop.svg"
    b_bisschopr.id = "b_bisschopr"
    vak = document.getElementById("C8")
    vak.appendChild(b_bisschopr)
    
    b_koningin = document.createElement('img');
    b_koningin.src = "b_koningin.svg"
    b_koningin.id = "b_koningin"
    vak = document.getElementById("D8")
    vak.appendChild(b_koningin)

    b_koning = document.createElement('img');
    b_koning.src = "b_koning.svg"
    b_koning.id = "b_koning"
    vak = document.getElementById("E8")
    vak.appendChild(b_koning)
    
    b_pion1 = document.createElement('img');
    b_pion1.src = "b_pion.svg"
    b_pion1.id = "b_pion1"
    vak = document.getElementById("H7")
    vak.appendChild(b_pion1)

    b_pion2 = document.createElement('img');
    b_pion2.src = "b_pion.svg"
    b_pion2.id = "b_pion2"
    vak = document.getElementById("G7")
    vak.appendChild(b_pion2)

    b_pion3 = document.createElement('img');
    b_pion3.src = "b_pion.svg"
    b_pion3.id = "b_pion3"
    vak = document.getElementById("F7")
    vak.appendChild(b_pion3)
    
    b_pion4 = document.createElement('img');
    b_pion4.src = "b_pion.svg"
    b_pion4.id = "b_pion4"
    vak = document.getElementById("E7")
    vak.appendChild(b_pion4)
    
    b_pion5 = document.createElement('img');
    b_pion5.src = "b_pion.svg"
    b_pion5.id = "b_pion5"
    vak = document.getElementById("D7")
    vak.appendChild(b_pion5)
    
    b_pion6 = document.createElement('img');
    b_pion6.src = "b_pion.svg"
    b_pion6.id = "b_pion6"
    vak = document.getElementById("C7")
    vak.appendChild(b_pion6)
    
    b_pion7 = document.createElement('img');
    b_pion7.src = "b_pion.svg"
    b_pion7.id = "b_pion7"
    vak = document.getElementById("B7")
    vak.appendChild(b_pion7)
    
    b_pion8 = document.createElement('img');
    b_pion8.src = "b_pion.svg"
    b_pion8.id = "b_pion8"
    vak = document.getElementById("A7")
    vak.appendChild(b_pion8)
    
}

