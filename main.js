"use strict"

const score_boxes = document.querySelectorAll(".score_box")
for (const score_box_clicked of score_boxes) {
    score_box_clicked.addEventListener( "click", () => {

    //--Set all but clicked score-box to black
    const score_id = score_box_clicked.innerText
        for (const score_box of score_boxes) {
            if (score_box.innerText === score_id ) {
                score_box.classList.add("scoreBoxBlanc")
            }
        }
        score_box_clicked.classList.remove("scoreBoxBlanc")

    //--Recalculate score
    //----#1 Carl
    const candidate_carl = document.getElementById("candidate_carl")
    const score_boxes_carl = candidate_carl.querySelectorAll(".score_box")
    const total_score_carl = candidate_carl.querySelector(".candidate_score_total")
    let score_carl = 0
    for (const score_box_carl of score_boxes_carl) {
        if (!score_box_carl.classList.contains("scoreBoxBlanc")) {
            score_carl = score_carl + parseInt(score_box_carl.innerText, 10)
        }
    }
    total_score_carl.innerText = score_carl
    //----#2 Opponent
    const candidate_opponent = document.getElementById("candidate_opponent")
    const score_boxes_opponent = candidate_opponent.querySelectorAll(".score_box")
    const total_score_opponent = candidate_opponent.querySelector(".candidate_score_total")
    let score_opponent = 0
    for (const score_box_opponent of score_boxes_opponent) {
        if (!score_box_opponent.classList.contains("scoreBoxBlanc")) {
            score_opponent = score_opponent + parseInt(score_box_opponent.innerText, 10)
        }
    }
    total_score_opponent.innerText = score_opponent


    //--Set progress bar
    const max_score = 55
    const max_progressBar_length = 331
    //----#1 Carl
    const progress_bar_carl = candidate_carl.querySelector(".candidate_score_progressBar")
    let progress_bar_carl_value = ((max_progressBar_length / max_score) * score_carl) * 2
    if (progress_bar_carl_value > max_progressBar_length) {
        progress_bar_carl_value = max_progressBar_length
    }
    progress_bar_carl.style.boxShadow = "inset " + progress_bar_carl_value + "px 0 0 0 red"

    //----#2 Opponent
    const progress_bar_opponent = candidate_opponent.querySelector(".candidate_score_progressBar")
    let progress_bar_opponent_value = ((max_progressBar_length / max_score) * score_opponent) * 2
    if (progress_bar_opponent_value > max_progressBar_length) {
        progress_bar_opponent_value = max_progressBar_length
    }
    progress_bar_opponent.style.boxShadow = "inset " + progress_bar_opponent_value + "px 0 0 0 red"


    })
}

