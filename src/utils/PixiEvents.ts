export class PixiEvents {
    // mouse events
    public static readonly MOUSE_DOWN: string = 'mousedown';
    public static readonly MOUSE_UP: string = 'mouseup';
    public static readonly MOUSE_UP_OUTSIDE: string = 'mouseupoutside';
    public static readonly MOUSE_OVER: string = 'mouseover';
    public static readonly MOUSE_OUT: string = 'mouseout';
    public static readonly MOUSE_MOVE: string = 'mousemove';

    // touch events
    public static readonly TOUCH_START: string = 'touchstart';
    public static readonly TOUCH_END: string = 'touchend';
    public static readonly TOUCH_MOVE: string = 'touchmove';
    public static readonly TOUCH_END_OUTSIDE: string = 'touchendoutside';

    // pointer events
    public static readonly POINTER_DOWN: string = 'pointerdown';
    public static readonly POINTER_UP: string = 'pointerup';
    public static readonly POINTER_UP_OUTSIDE: string = 'pointerupoutside';
    public static readonly POINTER_MOVE: string = 'pointermove';
    public static readonly POINTER_TAP: string = 'pointertap';
    public static readonly POINTER_OUT: string = 'pointerout';
    public static readonly POINTER_OVER: string = 'pointerover';

    // keyboard events
    public static readonly KEY_DOWN: string = 'keydown';
    public static readonly KEY_UP: string = 'keyup';

    // interaction events
    public static readonly CLICK: string = 'click';

    // display list event names
    public static readonly ADDED_TO_STAGE: string = 'added';
    public static readonly REMOVED_FROM_STAGE: string = 'removed';
}
