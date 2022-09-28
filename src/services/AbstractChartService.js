export default class AbstractChartService {
    /**
     *
     * @param {*} dataService = object of data service that should be provided
     * @param {*} settings = settings for configuration the output options
     */
    constructor(dataService, settings) {
        this.dataService = dataService;
        this.settings = settings;

        this.minValue = dataService.getMinValue();
        this.maxValue = dataService.getMaxValue();
    }

    buildOptions() {}
}
