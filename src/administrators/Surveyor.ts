export class Surveyor {
    static instance: Surveyor;

    public surveyRoom(room: Room){
        room.memory.sources = [];
        const sources = room.find(FIND_SOURCES_ACTIVE);
        sources.forEach((source) => {
            room.memory.sources.push({id: source.id, targets: 0 });        
        });

    }
}

export default Surveyor;