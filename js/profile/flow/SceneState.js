var GeneJS = require('GeneJS');

// State 状态
var SceneState = GeneJS.Class({
    'public const HOME_MEDIATOR': 'LoginMediator',
    'public const GAME_MEDIATOR': 'GameMediator',
    'public const GAME_OVER_MEDIATOR': 'GameOverMediator'
});


exports.SceneState = SceneState;