export class Hero {
    constructor(
        public id: string,
        public vida: string,
        public forca: string,
        public name: string
    ) { }
    public getId(): string {
        return this.id
    }
    public getVida(): string {
        return this.vida
    }
    public getForca(): string {
        return this.forca
    }
    public getname(): string {
        return this.name
    }
    public setVida(value: string): void {
        this.vida = value
    }
    public setForca(value: string): void {
        this.forca = value
    }
}
