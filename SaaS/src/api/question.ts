import {dataFolder} from "../path";
import * as fs from "fs";
import Question from "../models/Question";
import {v4} from "node-uuid";

interface QuestionData {
    allIds: string[];
    byId: {
        [id: string]: Question;
    };
}

const questionPath = dataFolder + "question.json";

const loadData = (): QuestionData => {
    let data: QuestionData = {allIds: [], byId: {}};
    try {
        const raw = fs.readFileSync(questionPath, "utf-8");
        data = JSON.parse(raw);
    } catch (err) {
        console.log(err);
    }
    return data;
};

export const getAllQuestion = (): Question[] => {
    const data = loadData();
    return data.allIds.map(id => data.byId[id]);
};

export const getQuestion = (id: number): (Question | undefined) => {
    return loadData().byId[id];
};

const saveData = (data: QuestionData) => {
    const json = JSON.stringify(data, undefined, "  ");
    fs.writeFileSync(questionPath, json, "utf-8");
};

export const addQuestion = (content: string) => {
    let data = loadData();
    const id = v4();
    const newQuestion = {
        content,
        yes: 0,
        no: 0,
        id
    };

    data.allIds.push(id);
    data.byId[id] = newQuestion;

    saveData(data);
    return id;
};

export const randomQuestion = (): Question | undefined => {
    const { allIds, byId } = loadData();

    let rand = Math.floor(Math.random() * (allIds.length));
    if (rand > allIds.length - 1) rand = allIds.length - 1;

    const id = allIds[rand];
    return byId[id];
};

export const voteFor = (id: number, yes: boolean) => {
    const data = loadData();
    if (data.byId[id]) {
        const question = data.byId[id];
        yes ? question.yes ++ : question.no ++;
        saveData(data);
    }
};