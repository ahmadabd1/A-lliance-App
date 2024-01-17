class Player{
   
    constructor(name) {
        this.name = name
        this._position = 1
        this.rollValue = 0
        this._id = 1
    }

    set position(newPosition) {
        this._position = newPosition;
        if(this._position < 1) {
            this._position = 1;
        }
    }
    
    get position() {
        return this._position;
    }

    move(steps) {
        this._position += steps;
    }

    getPosition() {
        return this._position;
    }
    getId(){
        return this._id
    }
}
