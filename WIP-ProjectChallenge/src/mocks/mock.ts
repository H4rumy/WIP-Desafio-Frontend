import axios from "axios"
import MockAdapter from "axios-mock-adapter"

export const mock = new MockAdapter(axios, { delayResponse: 500 })

mock.onGet("/api/create-articles").reply(200, {
    sucess:true,
    data: ["PM","PK", "AC","KS"],
})

