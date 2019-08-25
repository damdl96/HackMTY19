// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
//TODO: separar maps para limpiar codigo
const maps = [[{   "Maze":  [[0,1,0,1],
            [1,0,0,2],
            [3,0,1,0],
            [0,1,1,1]],
    "steps": 4,
    "location": [1,3],
    "count": 0
},
{   "Maze":  [[0,0,1,0],
            [3,0,0,0],
            [0,1,0,0],
            [1,0,2,0]],
    "steps": 4,
    "location": [3,2],
    "count": 0
},
{   "Maze":  [[0,1,0,3],
            [0,0,0,0],
            [2,0,0,1],
            [1,0,0,1]],
    "steps": 5,
    "location": [2,0],
    "count": 0
},
{   "Maze":  [[3,0,0,0],
            [0,0,1,1],
            [0,0,1,0],
            [0,0,0,2]],
    "steps": 6,
    "location": [3,3],
    "count": 0
},
{   "Maze":  [[1,1,0,0],
            [0,0,0,3],
            [0,2,0,1],
            [0,1,0,0]],
    "steps": 3,
    "location": [2,1],
    "count": 0
}],
[{   "Maze":  [[1,1,0,0,0],
            [1,2,0,1,1],
            [1,0,0,1,0],
            [0,0,3,0,0],
            [1,0,0,0,0]],
    "steps": 3,
    "location": [1,1],
    "count": 0
},
{   "Maze":  [[1,0,0,1,1],
            [0,0,0,0,1],
            [1,1,0,0,2],
            [0,1,0,1,1],
            [1,0,0,0,3]],
    "steps": 6,
    "location": [3,4],
    "count": 0
},
{   "Maze":  [[0,2,0,0,1],
            [0,0,1,0,1],
            [0,1,0,0,1],
            [1,1,1,0,0],
            [1,1,1,3,1]],
    "steps": 6,
    "location": [0,1],
    "count": 0
},
{   "Maze":  [[1,1,0,0,1],
            [3,0,0,0,0],
            [0,0,0,1,0],
            [1,0,1,1,1],
            [1,0,0,2,0]],
    "steps": 6,
    "location": [4,3],
    "count": 0
},
{   "Maze":  [[0,0,0,0,1],
            [1,1,3,0,0],
            [1,1,1,0,1],
            [1,1,2,0,1],
            [0,0,0,0,0]],
    "steps": 4,
    "location": [3,2],
    "count": 0
}],
[{   "Maze":  [[0,0,3,0,1,0],
            [0,1,1,0,0,0],
            [0,0,1,1,0,0],
            [0,0,0,1,0,1],
            [1,0,0,0,0,0],
            [0,2,1,1,0,0]],
    "steps": 8,
    "location": [5,1],
    "count": 0
},
{   "Maze":  [[2,1,0,0,1,1],
            [0,1,0,0,3,0],
            [0,1,0,0,0,1],
            [0,0,0,0,0,0],
            [1,0,0,1,1,0],
            [1,0,1,0,0,1]],
    "steps": 9,
    "location": [0,0],
    "count": 0
},
{   "Maze":  [[0,0,0,1,1,1],
            [0,1,1,1,0,9],
            [0,0,0,0,0,2],
            [3,0,0,0,0,1],
            [1,0,0,0,0,1],
            [0,0,0,1,1,0]],
    "steps": 6,
    "location": [2,5],
    "count": 0
},
{   "Maze":  [[0,1,0,1,0,0],
            [0,0,3,1,0,0],
            [0,0,1,1,1,0],
            [1,0,0,0,0,0],
            [1,0,1,0,0,0],
            [0,0,1,2,0,0]],
    "steps": 7,
    "location": [5,3],
    "count": 0
},
{   "Maze":  [[1,0,0,1,1,0],
            [2,0,1,1,0,0],
            [0,0,0,0,1,0],
            [0,0,0,0,0,0],
            [1,1,0,1,3,0],
            [0,0,0,0,0,0]],
    "steps": 7,
    "location": [1,0],
    "count": 0
}],



[{   "Maze":  [[0,0,0,0,0,0,1],
            [0,0,0,0,1,0,1],
            [1,0,1,1,0,0,1],
            [0,2,0,0,0,0,0],
            [0,0,1,0,0,0,0],
            [0,1,0,0,0,0,0],
            [0,1,1,3,0,0,1]],
    "steps": 5,
    "location": [3,1],
    "count": 0
},
{   "Maze":  [[0,0,0,0,1,1,1],
            [0,0,1,1,0,1,1],
            [0,0,2,0,0,0,1],
            [0,0,1,0,0,1,0],
            [1,0,0,0,0,0,0],
            [3,0,0,0,0,1,0],
            [0,0,0,1,0,0,0]],
    "steps": 5,
    "location": [2,2],
    "count": 0
},
{   "Maze":  [[0,0,0,3,0,0,1],
            [0,0,0,1,1,0,1],
            [0,1,1,2,0,0,0],
            [0,0,0,0,0,0,0],
            [1,0,0,1,0,1,0],
            [0,1,0,0,1,0,0],
            [0,0,0,1,0,1,1]],
    "steps": 10,
    "location": [2,3],
    "count": 0
},
{   "Maze":  [[1,0,1,1,1,0,0],
            [0,0,2,0,0,1,1],
            [0,0,0,0,0,1,1],
            [0,0,0,0,1,0,0],
            [1,0,0,0,0,0,1],
            [0,0,0,3,1,0,0],
            [1,1,0,0,0,0,0]],
    "steps": 5,
    "location": [1,2],
    "count": 0
},
{   "Maze":  [[1,0,0,0,1,0,0],
            [1,0,0,0,1,1,1],
            [1,1,3,0,0,0,1],
            [0,0,0,0,1,0,1],
            [0,1,1,0,0,0,0],
            [1,0,0,0,0,1,1],
            [1,1,2,0,0,0,1]],
    "steps": 6,
    "location": [6,2],
    "count": 0
}]];

var person;
var maze = undefined;
var difficulty;
var score;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        var regard = randomElement([
            '¡Hola! Este es el juego que ganará el Hack Monterrey 2019. Empecemos.',
            'Estoy muy feliz de jugar contigo. ¡Iniciemos!',
            'Estoy segura que te divertirás. Empecemos ahora.',
            '¡Estamos atrapados! ¡Hay que hacer algo!'
        ]);

        const speakOutput = regard + ' ¿Cómo te llamas?';

        const main = require('./templates/launch.json');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective({
               type : 'Alexa.Presentation.APL.RenderDocument',
               version: '1.0',
               document: main,
            })
            .getResponse();
    }
};

const WelcomeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'WelcomeIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const request = handlerInput.requestEnvelope.request;

        var person = request.intent.slots.name.value;

        const speakOutput = `Hola ${person}, selecciona la dificultad de tu calabozo: ¿1, 2, 3 o 4?`;

        const main = require('./templates/welcome.json');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective({
               type : 'Alexa.Presentation.APL.RenderDocument',
               version: '1.0',
               document: main,
               datasources: {
                  "docdata": {
                     "person": person
                 }
                }
            })
            .getResponse();

    }
};

const LevelIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'LevelIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const request = handlerInput.requestEnvelope.request;

        var type = request.intent.slots.difficulty.value;
        var speakOutput;
        switch(type) {
            case '1': difficulty = 1;
                        break;
            case '2': difficulty = 2;
                        break;
            case '3': difficulty = 3;
                        break;
            case '4': difficulty = 4;
                        break;
            default: difficulty = 0;
        }

        if (difficulty > 4 || difficulty < 1){
            speakOutput = "Opción inválida. Intenta de nuevo con un número del 1 al 4";
        } else {
            maze = maps[difficulty - 1][Math.floor(Math.random() * 5)];
            speakOutput = `Estamos atrapados, esta demasiado oscuro aquí dentro, puedo guiarte pero, debemos apresurarnos tenemos poco tiempo para salir antes que tu antorcha se extinga. ¡Adelante! nos podemos mover hacia`;
            if (maze["location"][0] > 0){
                if (maze["Maze"][(maze["location"][0] - 1)][maze["location"][1]] != 1){
                    speakOutput = speakOutput.concat(" norte");
                }
            }
            if(maze["location"][0] < (maze["Maze"].length - 1)) {
                if (maze["Maze"][(maze["location"][0] + 1)][maze["location"][1]] != 1){
                    speakOutput = speakOutput.concat(" sur");
                }
            }
            if(maze["location"][1] < (maze["Maze"].length - 1)) {
                if (maze["Maze"][maze["location"][0]][(maze["location"][1] + 1)] != 1){
                    speakOutput = speakOutput.concat(" este");
                }
            }
            if (maze["location"][1] > 0){
                if (maze["Maze"][maze["location"][0]][(maze["location"][1] - 1)] != 1){
                    speakOutput = speakOutput.concat(" oeste");
                }
            }
        }

        const main = require('./templates/walking.json');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective({
               type : 'Alexa.Presentation.APL.RenderDocument',
               version: '1.0',
               document: main,
            })
            .getResponse();

    }
};

const AnswerIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AnswerIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const request = handlerInput.requestEnvelope.request;

        var direction = request.intent.slots.answer.value;
        var main;
        var speakOutput;
        if(maze == undefined){
            speakOutput = "Elige una dificultad antes de decir alguna dirección."

        } else {
            var flag = false;
            switch(direction){
                case 'norte':
                    if (maze["location"][0] > 0){
                        if (maze["Maze"][(maze["location"][0] - 1)][maze["location"][1]] != 1){
                            maze["location"][0] = maze["location"][0] - 1;
                            flag = true;
                        }
                    }
                    break;
                case 'sur':
                    if(maze["location"][0] < (maze["Maze"].length - 1)) {
                        if (maze["Maze"][(maze["location"][0] + 1)][maze["location"][1]] != 1){
                            maze["location"][0] = maze["location"][0] + 1;
                            flag = true;
                        }
                    }
                    break;
                case 'este':
                    if(maze["location"][1] < (maze["Maze"].length - 1)) {
                        if (maze["Maze"][maze["location"][0]][(maze["location"][1] + 1)] != 1){
                            maze["location"][1] = maze["location"][1] + 1;
                            flag = true;
                        }
                    }
                    break;
                case 'oeste':
                    if (maze["location"][1] > 0){
                        if (maze["Maze"][maze["location"][0]][(maze["location"][1] - 1)] != 1){
                            maze["location"][1] = maze["location"][1] - 1;
                        }
                    }
                    break;
            }
            if(flag){
                maze["count"] = maze["count"]+1;
                speakOutput = `Hemos avanzado en dirección ${direction},`;
                main = require('./templates/walking.json');
            } else {
                speakOutput = "Topamos contra una pared, hay que elegir otra opcion,";
                main = require('./templates/wall.json');
            }
            speakOutput = speakOutput.concat(" ¿Cuál será el siguiente paso?");
            if (maze["location"][0] > 0){
                if (maze["Maze"][(maze["location"][0] - 1)][maze["location"][1]] != 1){
                    speakOutput = speakOutput.concat(" norte");
                }
            }
            if(maze["location"][0] < (maze["Maze"].length - 1)) {
                if (maze["Maze"][(maze["location"][0] + 1)][maze["location"][1]] != 1){
                    speakOutput = speakOutput.concat(" sur");
                }
            }
            if(maze["location"][1] < (maze["Maze"].length - 1)) {
                if (maze["Maze"][maze["location"][0]][(maze["location"][1] + 1)] != 1){
                    speakOutput = speakOutput.concat(" este");
                }
            }
            if (maze["location"][1] > 0){
                if (maze["Maze"][maze["location"][0]][(maze["location"][1] - 1)] != 1){
                    speakOutput = speakOutput.concat(" oeste");
                }
            }
            if(maze["Maze"][maze["location"][0]][maze["location"][1]] == 3){
                speakOutput = "Lo logramos! hemos salido del calabozo!";
                score = maze[""]
                maze = undefined;
                main = require('./templates/congratulations.json');
                let speechOutput = `Tu puntaje es de: ${score}`;
                let cardTitle = "¡Saliste del calabozo!"
                let cardContent = `Tu puntaje es de: ${score}`;
                this.emit(':askWithCard', speechOutput, cardTitle, cardContent);
            }
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('intenta de nuevo', speakOutput)
            .addDirective({
               type : 'Alexa.Presentation.APL.RenderDocument',
               version: '1.0',
               document: main,
               datasources: {
                  "docdata": {
                     "score": score
                 }
                }
            })
            .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        var farewell;

        maze = undefined;

        if(person == ''){
            farewell = randomElement([
                `¡Nos vemos pronto! Te esperaré con ansias.`,
                `¡Adiós!`,
            ]);
        } else {
           farewell = randomElement([
                `¡Nos vemos pronto ${person}! Te esperaré con ansias.`,
                `¡Adiós ${person}!`,
            ]);
        }

        const speakOutput = farewell;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        person = '';
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

function randomElement(regards){
    return regards[Math.floor(Math.random()*regards.length)];
}

/*function getSlotValues(filledSlots) {
    const slotValues = {};

    Object.keys(filledSlots).forEach((item) => {
        const name  = filledSlots[item].name;

        if (filledSlots[item] &&
            filledSlots[item].resolutions &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                case 'ER_SUCCESS_MATCH':
                    slotValues[name] = {
                        heardAs: filledSlots[item].value,
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                        ERstatus: 'ER_SUCCESS_MATCH'
                    };
                    break;
                case 'ER_SUCCESS_NO_MATCH':
                    slotValues[name] = {
                        heardAs: filledSlots[item].value,
                        resolved: '',
                        ERstatus: 'ER_SUCCESS_NO_MATCH'
                    };
                    break;
                default:
                    break;
            }
        } else {
            slotValues[name] = {
                heardAs: filledSlots[item].value || '', // may be null
                resolved: '',
                ERstatus: ''
            };
        }
    }, this);

    return slotValues;
}
*/

/*
function getSlotValues(filledSlots) {
    const slotValues = {};

    Object.keys(filledSlots).forEach((item) => {
        const name  = filledSlots[item].name;

        if (filledSlots[item] &&
            filledSlots[item].resolutions &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                case 'ER_SUCCESS_MATCH':
                    slotValues[name] = {
                        heardAs: filledSlots[item].value,
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                        ERstatus: 'ER_SUCCESS_MATCH'
                    };
                    break;
                case 'ER_SUCCESS_NO_MATCH':
                    slotValues[name] = {
                        heardAs: filledSlots[item].value,
                        resolved: '',
                        ERstatus: 'ER_SUCCESS_NO_MATCH'
                    };
                    break;
                default:
                    break;
            }
        } else {
            slotValues[name] = {
                heardAs: filledSlots[item].value || '', // may be null
                resolved: '',
                ERstatus: ''
            };
        }
    }, this);

    return slotValues;
}
*/

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        WelcomeIntentHandler,
        LevelIntentHandler,
        AnswerIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        //HelloWorldIntentHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();


/*
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
*/
