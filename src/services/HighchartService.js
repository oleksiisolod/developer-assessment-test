import AbstractChartService from './AbstractChartService';

// default configuration options for highcharts heat map
const defaultOptions = {
    chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1,
    },

    title: {
        text: '',
    },

    xAxis: {
        categories: [],
    },

    yAxis: {
        categories: [],
        title: null,
        reversed: true,
    },

    colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: 'red',
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280,
    },

    series: [
        {
            name: 'Series',
            borderWidth: 1,
            data: [],
            dataLabels: {
                enabled: true,
                color: '#000000',
            },
        },
    ],
};

/**
 * Reusable service for building a configuration options for Highcharts heat maps
 */
class HighchartService extends AbstractChartService {
    /**
     * PUBLIC
     *
     * If it is Typescript, it would be one public method of the service
     *
     * Responsible for building the configuration schema for Highcharts
     *
     * @returns Configuration schema for Highcharts library
     */
    buildOptions() {
        const xAxis = this.dataService.getHeaders();
        const yAxis = this.dataService.getRowsNames();
        const data = this.dataService.getRowsValues();

        const series = this.#convertIntoSeries(data);

        return {
            ...defaultOptions,
            yAxis: {
                ...defaultOptions.yAxis,
                categories: yAxis,
            },
            xAxis: {
                ...defaultOptions.xAxis,
                categories: xAxis.slice(1),
            },
            series: [
                {
                    ...defaultOptions.series[0],
                    data: series,
                },
            ],
            colorAxis: {
                min: this.minValue,
                max: this.maxValue,
                minColor: this.settings.heatMinColor,
                maxColor: this.settings.heatMaxColor,
            },
        };
    }

    /**
     * Private
     *
     * Responsible for converting the raw data into Highcharts series
     *
     * @returns Highcharts heat map series
     */
    #convertIntoSeries(rawData) {
        const series = [];

        rawData.forEach((rowsItem, xAxis) => {
            rowsItem.forEach((elementValue, yAxis) => {
                series.push([yAxis, xAxis, elementValue]);
            });
        });

        return series;
    }
}

export default HighchartService;
