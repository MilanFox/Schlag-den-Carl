"use strict"

const scoreboardFunctions = {
  /**
   * Assigns point to either one of the opponents
   * @param scoreboxClicked {HTMLElement} Selected Scoreboard-Box
   */
  assignPoint(scoreboxClicked) {
    if (scoreboxClicked.classList.contains("scoreBoxBlanc")) {
      const score_id = scoreboxClicked.innerText
      for (const score_box of score_boxes) {
        if (score_box.innerText === score_id ) {
          score_box.classList.add("scoreBoxBlanc")
        }
      }
      scoreboxClicked.classList.remove("scoreBoxBlanc")
      scoreboardFunctions.emit("scoreboardChanged")
    }
  },
  /**
   * Recalculates the Score and writes it into Score_Total DIV
   * Sets Progress bar according to score reached
   * @param candidate {HTMLElement} Candidate to calculate score
   */
  recalculateScore(candidate) {
    // Calculate Score
    const scoreBoxes = candidate.querySelectorAll(".score_box")
    const totalScoreBox = candidate.querySelector(".candidate_score_total")
    let score = 0
    for (const scoreBox of scoreBoxes) {
      if (!scoreBox.classList.contains("scoreBoxBlanc")) {
        score = score + parseInt(scoreBox.innerText, 10)
      }
    }
    totalScoreBox.innerText = score
    // Set Progress Bar
    const max_score = 55
    const progressBarSlider = candidate.querySelector(".progressBar_slider")
    let progressBarValue = ((100 / max_score) * score) * 2
    progressBarSlider.style.transform = "translateX(" + progressBarValue + "%)"
  },
  events: {},
  /**
   * Triggers an Events
   * Is able to pass through one parameter of any kind
   * @param {string} eventName Name of Event to Trigger
   * @param {*=} param Parameter to pass through
   */
  emit(eventName, param) {
    if (eventName in this.events) {
      for(const f of this.events[eventName]) {
        f(param)
      }
    }
  },
  /**
   * Registers an Event Listener for eventName
   * @param {string} eventName Name of Event to listen for
   * @param {Function} cb Callback Function
   */
  on(eventName, cb) {
    if (!(eventName in this.events)) {
      this.events[eventName] = []
    }
    this.events[eventName].push(cb)
  },
}

const score_boxes = document.querySelectorAll(".score_box")
for (const scoreboxClicked of score_boxes) {
  scoreboxClicked.addEventListener( "click", () => {
    const candidates = document.querySelectorAll(".candidate")
    scoreboardFunctions.on("scoreboardChanged", () => {
      for (const candidate of candidates) {
        scoreboardFunctions.recalculateScore(candidate)
      }
    })
    scoreboardFunctions.assignPoint(scoreboxClicked)
  })
}

const opponent_name =  document.getElementById("opponent_name")
/**
 * Changes Name of Opponent
 */
function changeNameOfOpponent(){
  let name = prompt("Name des Gegners:");
  if (name!=null){
    opponent_name.innerText = name.toUpperCase()
  }
}
opponent_name.addEventListener("click", () => {
  changeNameOfOpponent()
})