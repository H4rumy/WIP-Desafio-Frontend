import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import articleTypes from "./mock/articleTypes";
import details from "./mock/details";

const mock = new MockAdapter(axios, { delayResponse: 500 });

// mock para carregar os tipos de artigo
mock.onGet("/article-types").reply(200, articleTypes);

// mock para dados adicionais de PK
mock.onGet("/details").reply(200, details);

export default mock;
