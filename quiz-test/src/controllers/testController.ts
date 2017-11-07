import {dataFolder} from "../path";
import * as fs from "fs";
import * as path from "path";

interface Question {
    id: number;
    correct: number;
}

const dataPath = path.join(dataFolder, "data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

export const getTestData = () => {
    return data;
};

export const checkAnswers = (answers: any) => {
    // TODO: return test score based on user answer
    let score = 0;
    for (let questionKey in answers) {
        if(!answers.hasOwnProperty(questionKey)) return;

        const questionId = parseInt(questionKey.split("_")[1]);
        if (parseInt(answers[questionKey]) === data.questions[questionId].correct) {
            score += 1;
        }
    }
    return score;
};

export const getCorrectAnswers = () => {
    return data.questions.map((question: Question) => ({
        id: question.id,
        correct: question.correct
    }));
};