import {dataFolder} from "../path";
import * as fs from "fs";
import Question from "../models/Question";

const questionPath = dataFolder + "question.json";

export const getAllQuestion = (): Question[] => {
    let data: { questions: Question[] } = {questions: []};
    try {
        data = JSON.parse(fs.readFileSync(questionPath, "utf-8"));
    } catch (err) {
        console.log(err);
    }

    if (!data.questions || !data.questions.length) return [];
    return data.questions;
};

export const getQuestion = (id: number): (Question | undefined) => {
    return getAllQuestion()[id];
};

const saveQuestions = (questions: Question[]) => {
    const data = {questions};
    const json = JSON.stringify(data, undefined, "  ");
    fs.writeFileSync(questionPath, json, "utf-8");
};

export const addQuestion = (content: string) => {
    let questions = getAllQuestion();
    const id = questions.length;
    const newQuestion = {
        content,
        yes: 0,
        no: 0,
        id
    };
    questions.push(newQuestion);
    saveQuestions(questions);
    return id;
};

export const randomQuestion = (): Question => {
    const questions = getAllQuestion();
    const a = Math.random() * (questions.length-1);
    const index = Math.round(a);
    return questions[index];
};

export const voteFor = (id: number, yes: boolean) => {
    const questions = getAllQuestion();
    yes ? questions[id].yes++ : questions[id].no++;
    saveQuestions(questions);
};