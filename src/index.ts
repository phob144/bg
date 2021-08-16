// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />
import 'reflect-metadata';

import { Context, MVCSBundle } from '@robotlegsjs/core';
import { ContextView, PixiBundle } from '@robotlegsjs/pixi';
import { PalidorPixiExtension } from '@robotlegsjs/pixi-palidor';
import {
    CanvasRenderer,
    Container,
    WebGLRenderer,
    autoDetectRenderer,
} from 'pixi.js';

import { Config } from './config/Config';
import { UIConst } from './utils/UIConst';

class Main {
    private stage: Container;
    private renderer: CanvasRenderer | WebGLRenderer;
    private context: Context;

    constructor() {
        this.renderer = autoDetectRenderer(
            UIConst.WINDOW_WIDTH,
            UIConst.WINDOW_HEIGHT
        );
        this.stage = new Container();
        this.context = new Context();
        this.context
            .install(MVCSBundle, PixiBundle)
            .install(PalidorPixiExtension)
            .configure(new ContextView(this.stage))
            .configure(Config)
            .initialize();

        document.body.appendChild(this.renderer.view);
    }

    public render = () => {
        window.requestAnimationFrame(this.render);
        this.renderer.render(this.stage);
    };
}

const main = new Main();
main.render();
