export class Surveyor {
    static instance: Surveyor;

    public static surveyRoom(room: Room) {
        room.memory.sources = {};
        const sources = room.find(FIND_SOURCES);

        room.memory.defaultSourceId = sources[0].id;
        room.memory.avoidSourceId = sources[2].id;

        sources.forEach((source) => {
            Object.assign(room.memory.sources, { [source.id]: { targets: 0, occupied: false } });
        });

        const roomName = room.name;
        
        if (roomName === "sim") { return; }

        const exits = Game.map.describeExits(roomName);
        
        Object.keys(exits).forEach(exitKey => {
            console.log(exitKey);
            const exit = exits[exitKey as ExitKey];
            if (exit !== undefined) {
                Object.assign(Memory.rooms, { [exit]: {} });
            }
        });
    }
}

export default Surveyor;