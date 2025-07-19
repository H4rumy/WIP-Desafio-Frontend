import axios from "axios"
import MockAdapter from "axios-mock-adapter"

export const setupMock = () => {
    const mock = new MockAdapter(axios, { delayResponse: 500 })


    //mock inicial
    mock.onGet("/api/create-articles").reply(200, {
        sucess:true,
        data: ["PM","PK", "AC","KS"],
    })

    //ao escolher PK

    mock.onGet("/api/details/PK").reply(200, {
        sucess:true,
        costumer: [
            { "001": "WIP" },
            { "025": "IPCA" },
        ],
        certification : [
            { "001": "GOTS" },
            { "002": "BLUE" },
            { "003": "GREEN" },
        ],
        unit: [
            { "001": "UN" },
            { "002": "PK" },
            { "003": "PAIR" },
        ],
        currency: [
            { "001": "EUR" },
            { "002": "USD" },
            { "003": "JPY" },
            { "004": "GBP" },
        ],
        sustComp: [
            { "001": "ECO" },
            { "002": "WOOL" },
            { "003": "GRTXT" },
        ],
    })

    //mock Brands

    mock.onGet("/api/brands/001").reply(200, {
        success: true,
        data: [
            { "001": "WIPTech Pro" },
            { "253": "WIPTech Ultra" },
            { "563": "WIPTech Standard" },
        ],
    })

    mock.onGet("/api/brands/025").reply(200, {
        success: true,
        data: [
            { "009": "IPCA 1" },
            { "632": "IPCA 2" },
        ],
    })

    //mock Cores/Sortimento
    mock.onGet("/api/colorsSort/001").reply(200, {
        success: true,
        data: [
            { "002": "Pure Red" },
            { "006": "Soft White" },
            { "009": "Sunset Orange" },
        ],
    })
    mock.onGet("/api/colorsSort/253").reply(200, {
        success: true,
        data: [
            { "025": "Pure Red" },
            { "085": "Soft White" },
        ],
    })

    mock.onGet("/api/colorsSort/563").reply(200, {
        success: true,
        data: [
            { "001": "Black" },
            { "002": "White" },
        ],
    })
    mock.onGet("/api/colorsSort/009").reply(200, {
        success: true, 
        data: [
            { "001": "Green" },
            { "002": "White" },
        ],
    })

    mock.onGet("/api/colorsSort/632").reply(200, {
        success: true,
        data: [
            { "001": "Green" },
            { "002": "White" },
        ],
    })
}
