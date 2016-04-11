# phaser-template-tsc

A simple template project for creating [Phaser](http://phaser.io) games in TypeScript, using Gulp and npm for task running and [SystemJS](https://github.com/systemjs/systemjs) as the module loader.

This provides a basic setup to get started on a game. It includes three states (Boot, Loading, and Menu) to demonstrate the initial program flow.

## Getting Started

Clone the repository where you want, enter that directory, then run `npm install` to install the dependencies.

To build the `dist` output directory, run the `gulp` command. You may also run `gulp watch` in a terminal to update the output any time a file changes.

## Notes

When adding a new state to the game, edit `src/game.ts` to include the state.

This template includes a Loading state to preload all the assets for the game. This has a loading bar and percentage text which update automatically. Since there's nothing to load in the template, it goes to the Menu state almost instantly.
