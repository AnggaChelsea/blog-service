const chartModel = require('../models/chart');

class ChartItems {
    constructor() {
        this.model = chartModel;
    }
    static async init() {
        const chartItems = new ChartItems();
        return chartItems;
    }
}