//screepy 4.0.0
import ErrorMapper from "utilities/ErrorMapper";
import Director from "utilities/Director";

export const loop = ErrorMapper.wrapLoop(() => {
    Director.initialize();
    Director.cleanse();
    Director.maintain();
    Director.direct();
});
