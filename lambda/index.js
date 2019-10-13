const Alexa = require('ask-sdk-core');

//maze variables
var maze = undefined;
var difficulty = undefined;
var steps_taken = 0;

//States
const inicio = 0;
const libre = 1;
const puente = 2;
const acantilado = 3;
const pinturas = 4;
const casada_der = 5;
const cascada_izq = 6;
const salida = 8;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        var regard = randomElement([
            'Estoy muy feliz de jugar contigo. ¡Iniciemos!',
            'Estoy segura que te divertirás. Empecemos ahora.'
        ]);

        const speakOutput = regard + ' menciona la dificultad de tu calabozo; <break time="0.5s"/> 1 para fácil <break time="0.5s"/> 2 para media <break time="0.5s"/> 3 para difícil <break time="0.5s"/> 4 para leyenda';

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
        
        var speakOutput = "";
        
        var difficulty = Number(request.intent.slots.difficulty.value);
        
        if (maze != undefined) {
           if (Boolean(difficulty)) {
                speakOutput = "¡Ya estamos en un calabozo! ¡Hay que salir de aquí! Las direcciones en las que nos podemos mover son: ";
            } else {
                speakOutput = "No se pudo reconocer lo que dijiste. Por favor menciona una dirección para movernos. Las direcciones posibles son: ";
            }
            //speakOutput = speakOutput.concat(availableDirections());
        } else if (difficulty > 4 || difficulty < 1){
            speakOutput = "Opción inválida. Intenta de nuevo con un número del 1 al 4";
        } else {
            
            //maze = jsGenerateMaze(2 + (2 * difficulty));
            speakOutput = `Estamos atrapados, está demasiado oscuro aquí dentro, puedo guiarte, pero debemos apresurarnos tenemos poco tiempo para salir antes que tu antorcha se extinga. ¡Adelante! nos podemos mover hacia el `;
            //speakOutput = speakOutput.concat(availableDirections());
        }
        
        speakOutput = speakOutput.concat(".");

        /*const main = require('./templates/walking.json');

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

        } else {*/

          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();

        //}
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

//Function to generate the maze
function jsGenerateMaze(steps) {
    dungeon = {};
    dungeon[0] = { "tipo": inicio,     "norte": 4,     "este": 4,      "oeste" : 4 };
    dungeon[1] = { "tipo": puente,     "norte": 0,     "este": null,   "oeste" : null };
    dungeon[2] = { "tipo": pinturas,   "norte": 1,     "este": 3,      "oeste" : 0 };
    dungeon[3] = { "tipo": acantilado, "norte": null,  "este": 1,      "oeste": 0 };
    for (var i = 0; i < steps; i++) {
        dungeon[i + 4] = {};
        if (i != steps - 1) {
            switch(Math.floor(Math.random() * 4) + 1){
               case libre: 
                        dungeon[i + 4]["tipo"] = libre;
                        switch(Math.floor(Math.random() * 3)){
                            case 0:
                                dungeon[i + 4]["norte"] = i + 5;
                                dungeon[i + 4]["este"] = Math.floor(Math.random() * 3) + 1;
                                dungeon[i + 4]["oeste"] = Math.floor(Math.random() * 3 + 1);
                                break;
                            case 1:
                                dungeon[i + 4]["norte"] = Math.floor(Math.random() * 3) + 1;
                                dungeon[i + 4]["este"] = i + 5;
                                dungeon[i + 4]["oeste"] = Math.floor(Math.random() * 3 + 1);
                                break;
                            case 2:
                                dungeon[i + 4]["norte"] = Math.floor(Math.random() * 3) + 1;
                                dungeon[i + 4]["este"] = Math.floor(Math.random() * 3) + 1;
                                dungeon[i + 4]["oeste"] = i + 5;
                        }
                        break;
                case puente: 
                        dungeon[i + 4]["tipo"] = puente;
                        dungeon[i + 4]["norte"] = i + 5;
                        dungeon[i + 4]["este"] = null;
                        dungeon[i + 4]["oeste"] = null;
                        break;
                case acantilado:  
                        dungeon[i + 4]["tipo"] = acantilado;
                        dungeon[i + 4]["norte"] = null;
                        switch(Math.floor(Math.random() * 2)){
                            case 0:
                                dungeon[i + 4]["este"] = i + 5;
                                dungeon[i + 4]["oeste"] = Math.floor(Math.random() * 3 + 1);
                                break;
                            case 1:
                                dungeon[i + 4]["este"] = Math.floor(Math.random() * 3) + 1;
                                dungeon[i + 4]["oeste"] = i + 5;
                        }
                        break;
                case pinturas: 
                        dungeon[i + 4]["tipo"] = pinturas;
                        switch(Math.floor(Math.random() * 3)){
                            case 0:
                                dungeon[i + 4]["norte"] = i + 5;
                                dungeon[i + 4]["este"] = Math.floor(Math.random() * 3) + 1;
                                dungeon[i + 4]["oeste"] = Math.floor(Math.random() * 3 + 1);
                                break;
                            case 1:
                                dungeon[i + 4]["norte"] = Math.floor(Math.random() * 3) + 1;
                                dungeon[i + 4]["este"] = i + 5;
                                dungeon[i + 4]["oeste"] = Math.floor(Math.random() * 3 + 1);
                                break;
                            case 2:
                                dungeon[i + 4]["norte"] = Math.floor(Math.random() * 3) + 1;
                                dungeon[i + 4]["este"] = Math.floor(Math.random() * 3) + 1;
                                dungeon[i + 4]["oeste"] = i + 5;
                        }
                        break;
                default: console.log("error");
            }
        } else {
            dungeon[i+4]["tipo"] = salida;
            dungeon[i + 4]["norte"] = null;
            dungeon[i + 4]["este"] = null;
            dungeon[i + 4]["oeste"] = null;
        }
    }
    return dungeon;
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
