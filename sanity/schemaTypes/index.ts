import { type SchemaTypeDefinition } from "sanity";
import projectType from "./documents/projectType";
import homepageType from "./singleton/homepageType";
import stepType from "./objects/stepType";
import linkType from "./objects/linkType";
import settingsType from "./singleton/settingsType";
import drawingType from "./documents/drawingType";

const structure = [homepageType, settingsType];

const documents = [projectType, drawingType];

const objects = [stepType, linkType];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...structure, ...documents, ...objects],
};
