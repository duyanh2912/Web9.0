import * as path from "path";

const helper = (_:string) => path.join(__dirname,_);

export const staticFolder = helper("../static/");
export const viewsFolder = helper("../views/");
export const layoutsFolder = helper("../views/layouts/");
export const dataFolder = helper("../static/data/");