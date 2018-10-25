export class Task {
    constructor(
        public name: string,
        public descr: string,
        public date: string,
        public complete: boolean,
        public id?: number
    ) { }
}