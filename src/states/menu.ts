export class Menu extends Phaser.State {
    text: Phaser.Text;

    create() {
        let fontStyle = {
            font: '18px Walter Turncoat',
            fill: '#7edcfc'
        };

        this.text = this.add.text(this.world.centerX, 50,
                                  'Main Menu', fontStyle);
        this.text.anchor.setTo(0.5, 0.5);
    }
}
