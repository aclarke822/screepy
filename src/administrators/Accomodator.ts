export class Accomodator {
    public static planRoads = () => {
        const rooms = Memory.rooms;
        Object.keys(Memory.rooms).forEach(room => {
            rooms[room].roadPlans.push();
        });
    };
}


export default Accomodator;