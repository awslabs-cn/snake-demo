var GeneJS = require('GeneJS');

var SceneState = require('./SceneState.js').SceneState;
var SceneAction = require('./SceneAction.js').SceneAction;
var SceneTransition = require('./SceneTransition.js').SceneTransition;

var SceneFsm = GeneJS.Class({
    'public createFsm': function() {
        var fsm = {
            // 开始状态
            "@initial": SceneState.$('HOME_MEDIATOR'),
            "state": [
                {
                    // Menu
                    "@name": SceneState.$('HOME_MEDIATOR'),
                    //"@changed": SceneTransition ,
                    "transition": [
                        {
                            "@action": SceneAction.$('GAME_ACTION'),
                            "@target": SceneState.$('GAME_MEDIATOR')
                        }
                    ]
                },
                {
                    // Game
                    "@name": SceneState.$('GAME_MEDIATOR'),
                    //"@changed": SceneTransition ,
                    "transition": [
                        {
                            "@action": SceneAction.$('GAME_OVER_ACTION'),
                            "@target": SceneState.$('GAME_OVER_MEDIATOR')
                        }
                    ]
                },
                {
                    // GameOver
                    "@name": SceneState.$('GAME_OVER_MEDIATOR'),
                    //"@changed": SceneTransition ,
                    "transition": [
                        {
                            "@action": SceneAction.$('HOME_ACTION'),
                            "@target": SceneState.$('HOME_MEDIATOR')
                        }
                    ]
                }
            ]
        };

        return fsm;
    }
});

exports.SceneFsm = SceneFsm;
