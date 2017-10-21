import Question from "../models/questionModel";

export const getAllQuestion = () => {
    return Question.find({});
};

export const getQuestion = (id: string) => {
    return Question.findById(id).then(res => {
        if (!res) throw new Error("Invalid id.");
        return res;
    });
};

export const addQuestion = (content: string): Promise<string> => {
    const question = new Question({content});
    return question.save().then(doc => doc.id!);
};

export const randomQuestion = async () => {
    const ids = await getAllQuestion().select("_id");
    if (!ids.length) throw new Error("There has been no question yet.");

    let rand = Math.floor(Math.random() * (ids.length));
    if (rand > ids.length - 1) rand = ids.length - 1;

    const id = ids[rand].id;
    return getQuestion(id!);
};

export const voteFor = async (id: string, yes: boolean) => {
    const question = await getQuestion(id);
    yes ? question.yes++ : question.no++;
    return question.save();
};