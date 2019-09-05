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

var maze = undefined;
var difficulty;
var score;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        var regard = randomElement([
            'Estoy muy feliz de jugar contigo. ¡Iniciemos!',
            'Estoy segura que te divertirás. Empecemos ahora.'
        ]);

        const speakOutput = regard + ' menciona la dificultad de tu calabozo: ¿1, 2, 3 o 4?';

        const main = require('./templates/welcome.json');

        const viewportProfile = Alexa.getViewportProfile(handlerInput.requestEnvelope);

        if(viewportProfile == "HUB-ROUND-SMALL"  || viewportProfile == "HUB-LANDSCAPE-SMALL" ||
            viewportProfile == "HUB-LANDSCAPE-MEDIUM" || viewportProfile == "HUB-LANDSCAPE-LARGE"){

          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective({
               type : 'Alexa.Presentation.APL.RenderDocument',
               version: '1.0',
               document: main,
            })
            .getResponse();

        } else {

          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();

        }
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

        var difficulty = Number(request.intent.slots.difficulty.value);
        var speakOutput;
        
        if (maze != undefined) {
           if (Boolean(difficulty)) {
                speakOutput = "¡Ya estamos en un calabozo! ¡Hay que salir de aquí! Las direcciones en las que nos podemos mover son: ";
            } else {
                speakOutput = "No se pudo reconocer lo que dijiste. Por favor menciona una dirección para movernos. Las direcciones posibles son: ";
            }
            speakOutput = speakOutput.concat(availableDirections());
        } else if (difficulty > 4 || difficulty < 1){
            speakOutput = "Opción inválida. Intenta de nuevo con un número del 1 al 4";
        } else {
            maze = maps[difficulty - 1][Math.floor(Math.random() * 5)];
            speakOutput = `Estamos atrapados, está demasiado oscuro aquí dentro, puedo guiarte, pero debemos apresurarnos tenemos poco tiempo para salir antes que tu antorcha se extinga. ¡Adelante! nos podemos mover hacia el `;
            speakOutput = speakOutput.concat(availableDirections());
        }
        speakOutput = speakOutput.concat(".");

        const main = require('./templates/walking.json');

        const viewportProfile = Alexa.getViewportProfile(handlerInput.requestEnvelope);

        if(viewportProfile == "HUB-ROUND-SMALL"  || viewportProfile == "HUB-LANDSCAPE-SMALL" ||
            viewportProfile == "HUB-LANDSCAPE-MEDIUM" || viewportProfile == "HUB-LANDSCAPE-LARGE"){

          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective({
               type : 'Alexa.Presentation.APL.RenderDocument',
               version: '1.0',
               document: main,
            })
            .getResponse();

        } else {

          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();

        }
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
        
        if (direction == 'parar' || direction == 'para' || direction == 'alto' || direction == 'detente' || direction == 'salir' || direction == 'sal' || direction == 'cancelar' || direction == 'cancela'){
            var farewell;

            maze = undefined;
            dificultad = 0;
            score = 0;

            farewell = randomElement([
                `¡Nos vemos pronto! Te esperaré con ansias.`,
                `¡Adiós!`,
            ]);
        
            const speakOutput = farewell;
        
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .withShouldEndSession(true)
                .getResponse();
        }
        
        if(maze === undefined){
            speakOutput = "Por favor. Menciona una dificultad antes de decir alguna dirección. Las dificultades posibles son: 1, 2, 3 o 4.";
            main = require('./templates/walking.json');
        } else {
            maze["count"] = maze["count"]+1;
            var flag = false;
            switch(direction){
                case 'adelante':
                case 'enfrente':
                case 'norte':
                    speakOutput = `Hemos avanzado en dirección norte,`;
                    main = require('./templates/walking.json');
                    if (maze["location"][0] > 0){
                        if (maze["Maze"][(maze["location"][0] - 1)][maze["location"][1]] !== 1){
                            maze["location"][0] = maze["location"][0] - 1;
                            flag = true;
                        }
                    }
                    break;
                case 'atrás':
                case 'sur':
                    speakOutput = `Hemos avanzado en dirección sur,`;
                main = require('./templates/walking.json');
                    if(maze["location"][0] < (maze["Maze"].length - 1)) {
                        if (maze["Maze"][(maze["location"][0] + 1)][maze["location"][1]] !== 1){
                            maze["location"][0] = maze["location"][0] + 1;
                            flag = true;
                        }
                    }
                    break;
                case 'derecha':
                case 'este':
                    speakOutput = `Hemos avanzado en dirección este,`;
                main = require('./templates/walking.json');
                    if(maze["location"][1] < (maze["Maze"].length - 1)) {
                        if (maze["Maze"][maze["location"][0]][(maze["location"][1] + 1)] !== 1){
                            maze["location"][1] = maze["location"][1] + 1;
                            flag = true;
                        }
                    }
                    break;
                case 'izquierda':
                case 'oeste':
                    speakOutput = `Hemos avanzado en dirección oeste,`;
                    main = require('./templates/walking.json');
                    if (maze["location"][1] > 0){
                        if (maze["Maze"][maze["location"][0]][(maze["location"][1] - 1)] !== 1){
                            maze["location"][1] = maze["location"][1] - 1;
                            flag = true;
                        }
                    }
                    break;
            }
            if(!flag){
                speakOutput = "Topamos contra una pared, ";
                main = require('./templates/wall.json');
            }
            speakOutput = speakOutput.concat(" podemos ir hacia el ");
            speakOutput = speakOutput.concat(String(availableDirections()));

//            speakOutput = speakOutput.concat(". ¿Cuál será nuestro siguiente paso?");

            if(maze["Maze"][maze["location"][0]][maze["location"][1]] === 3) {
                speakOutput = "¡Lo logramos, hemos salido del calabozo! Menciona una dificultad para el siguiente calabozo: 1, 2, 3 o 4.";
                score = Math.floor((maze["steps"]/maze["count"])*100);
                maze = undefined;
                dificultad = 0;
                main = require('./templates/congratulations.json');
                /*let speechOutput = `Tu puntaje es de: ${score}`;
                let cardTitle = "¡Saliste del calabozo!"
                let cardContent = `Tu puntaje es de: ${score}`;
                this.emit(':askWithCard', speechOutput, cardTitle, cardContent);*/
            }
        }

        const viewportProfile = Alexa.getViewportProfile(handlerInput.requestEnvelope);

        if(viewportProfile == "HUB-ROUND-SMALL"  || viewportProfile == "HUB-LANDSCAPE-SMALL" ||
            viewportProfile == "HUB-LANDSCAPE-MEDIUM" || viewportProfile == "HUB-LANDSCAPE-LARGE"){

          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Intenta de nuevo ', speakOutput)
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

        } else {

          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("Intenta de nuevo ", speakOutput)
            .getResponse();

        }
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        var speakOutput = '¡Estamos en un calabozo! ¡Hay que salir de aquí!';
        
        if (maze == undefined) {
            speakOutput = speakOutput.concat(" Menciona una dificultad para el calabozo. Las dificultades disponibles son: 1, 2, 3 o 4.");
        } else {
            speakOutput = speakOutput.concat(" Menciona una dirección para continuar. Las direcciones posibles son: ");
            speakOutput = speakOutput.concat(availableDirections());
            speakOutput = speakOutput.concat(".");
        }

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
        dificultad = 0;
        score = 0;

        farewell = randomElement([
            `¡Nos vemos pronto! Te esperaré con ansias.`,
            `¡Adiós!`,
        ]);
        
        const speakOutput = farewell;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        var farewell;

        maze = undefined;
        dificultad = 0;
        score = 0;

        farewell = randomElement([
            `¡Nos vemos pronto! Te esperaré con ansias.`,
            `¡Adiós!`,
        ]);
        
        const speakOutput = farewell;
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};

/*const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Acabas de llegar a ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};*/

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        var speakOutput = `Lo siento, ocurrió un error. Por favor, `;
        
        if (maze == undefined) {
            speakOutput = speakOutput.concat("menciona una dificultad para el calabozo. Las dificultades disponibles son: 1, 2, 3 o 4.");
        } else {
            speakOutput = speakOutput.concat("menciona una dirección para continuar. Las direcciones posibles son: ");
            speakOutput = speakOutput.concat(availableDirections());
            speakOutput = speakOutput.concat(".");
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

function randomElement(regards){
    return regards[Math.floor(Math.random()*regards.length)];
}

function availableDirections() {
     var availableDir = [];
     var directions;
    if (maze["location"][0] > 0){
        if (maze["Maze"][(maze["location"][0] - 1)][maze["location"][1]] !== 1){
            availableDir.push("norte");
        }
    }
    if(maze["location"][0] < (maze["Maze"].length - 1)) {
        if (maze["Maze"][(maze["location"][0] + 1)][maze["location"][1]] !== 1){
            availableDir.push("sur");
        }
    }
    if(maze["location"][1] < (maze["Maze"].length - 1)) {
        if (maze["Maze"][maze["location"][0]][(maze["location"][1] + 1)] !== 1){
            if (availableDir.length > 1) {
                prev = availableDir.join(", ");
                availableDir = [prev,"este"];
            } else {
                availableDir.push("este");
            }
        }
    }
    if (maze["location"][1] > 0){
        if (maze["Maze"][maze["location"][0]][(maze["location"][1] - 1)] !== 1){
            if (availableDir.length > 1) {
                prev = availableDir.join(", ");
                availableDir = [prev,"oeste"];
            } else {
                availableDir.push("oeste");
            }
        }
    }
    if (availableDir[1] != "oeste"){
        directions = availableDir.join(" ó ");
    } else {
        directions = availableDir.join(" u ");
    }
    return directions;
}

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        LevelIntentHandler,
        AnswerIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        //IntentReflectorHandler,
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
