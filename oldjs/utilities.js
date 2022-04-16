module.exports = {
    calculateBodyCost: function (parts) {
        let sum = 0;
        for (let i in parts) {
            sum += BODYPART_COST[parts[i]];
        }

        return sum;
    }
};