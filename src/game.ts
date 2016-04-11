/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>

import { Boot } from './states/boot';
import { Loading } from './states/loading';
import { Menu } from './states/menu';
// Import additional states here

export class MyGame extends Phaser.Game {
    constructor() {
        super(800, 600);

        this.state.add('Boot', Boot);
        this.state.add('Loading', Loading);
        this.state.add('Menu', Menu);
        // Add additional states here

        this.state.start('Boot');
    }
}

let game = new MyGame(); // This kicks everything off
