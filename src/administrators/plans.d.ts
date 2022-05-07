
interface BUILD_PLAN {
    budget: number;
    frame(x: number, y: number, room: Room): void;
}

interface WORKER_PLAN extends WORKER_PROPS {
    budget: number;
}