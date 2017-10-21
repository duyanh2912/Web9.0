import Question from "../models/questionModel";

export const getAllQuestion = () => {
    return Question.find({});
};

export const getQuestion = (id: string) => {
    return Question.findById(id);
};

export const addQuestion = (content: string) => {
    const question = new Question({content});
    return question.save(err => err ? console.log(err) : "");
};

export const randomQuestion = async () => {
    const allIds = await getAllQuestion();

    let rand = Math.floor(Math.random() * (allIds.length));
    if (rand > allIds.length - 1) rand = allIds.length - 1;

    const id = allIds[rand].id;
    return getQuestion(id!);
};

export const voteFor = async (id: string, yes: boolean) => {
    const question = await getQuestion(id);
    yes ? question.yes++ : question.no++;
    return question.save();
};