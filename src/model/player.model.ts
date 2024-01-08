import IllegalArgumentError from "../error/illegal.argument.error";

export default class Player {

    private _id?: number;
    private _health!: number;
    private _attack!: number;
    private _strength!: number;

    constructor(id: number | undefined, health: number, attack: number, strength: number) {
        this.id = id;
        this.health = health;
        this.attack = attack;
        this.strength = strength;
    }

    get id() {
        return this._id;
    }
    set id(id: number | undefined) {

        if (id && !Number.isInteger(id)) {
            throw new IllegalArgumentError('Id must be an integer');
        }
        this._id = id;
    }

    get health() {
        return this._health;
    }
    set health(health: number) {

        if (!Number.isInteger(health)) {
            throw new IllegalArgumentError('Health must be an integer');
        }
        this._health = health;
    }

    get attack() {
        return this._attack;
    }
    set attack(attack: number) {

        if (!Number.isInteger(attack) || attack <= 0) {
            throw new IllegalArgumentError('Attack must be an integer');
        }
        this._attack = attack;
    }

    get strength() {
        return this._strength;
    }
    set strength(strength: number) {

        if (!Number.isInteger(strength) || strength <= 0) {
            throw new IllegalArgumentError('Strength must be an integer');
        }
        this._strength = strength;
    }

    clone(): Player {
        return new Player(this.id, this.health, this.attack, this.strength);
    }
}