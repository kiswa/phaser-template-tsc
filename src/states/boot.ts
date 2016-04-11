export class Boot extends Phaser.State {
    fontLoaded: boolean = false;

    init() {
        // Create the object expected by webfont below
        window['WebFontConfig'] = {
            active: () => this.fontLoaded = true,
            google: { families: ['Walter Turncoat'] }
        };
    }

    preload() {
        // The loading state needs the webfont and loading bar images
        this.load.script('webfont',
            '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');

        this.load.image('loadingBarBg', 'assets/images/loading-bar-bg.png');
        this.load.image('loadingBar', 'assets/images/loading-bar.png');
    }

    create() {
        this.game.input.maxPointers = 1;
        //this.game.antialias = false; // For pixel art

        // Uncomment to disable auto-pause on focus loss
        //this.stage.disableVisibilityChange = true;

        if (!this.game.device.desktop) {
            this.scale.forceOrientation(true, false); // Landscape
            //this.scale.forceOrientation(false, true); // Portrait
        }

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // Use max screen space
    }

    update() {
        if (this.fontLoaded) {
            this.game.state.start('Loading');
        }
    }
}
