// Used as data source for application. Also could get the data from API, etc...
class DataService {
    constructor(dataProvider) {
        const { data, headers } = dataProvider();
        this.headers = headers;
        this.data = data;
    }

    getRawData() {
        return {
            headers: this.headers,
            data: this.data,
        };
    }

    getHeaders() {
        return this.headers[0];
    }

    getRowsNames() {
        return this.data.map((rowItem) => rowItem[0]);
    }

    getRowsValues() {
        return this.data.map((rowItem) => {
            const [title, ...values] = rowItem;

            return values;
        });
    }

    getMinValue() {
        let min = this.data[0][1];

        this.data.forEach((dataset) => {
            const [rowName, ...data] = dataset;
            data.forEach((value) => {
                if (value < min) {
                    min = value;
                }
            });
        });

        return min;
    }

    getMaxValue() {
        let max = this.data[0][1];

        this.data.forEach((dataset) => {
            const [rowName, ...data] = dataset;
            data.forEach((value) => {
                if (value > max) {
                    max = value;
                }
            });
        });

        return max;
    }
}

export default DataService;
