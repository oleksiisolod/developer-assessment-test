import chroma from 'chroma-js';
import AbstractChartService from './AbstractChartService';
/**
 * Reusable service for building a configuration options for Handsontable heat maps
 */
export default class HandsontableService extends AbstractChartService {
    /**
     * PUBLIC
     *
     * Responsible for building the configuration schema for Handsontable
     *
     * @returns Configuration schema for Handsontable library
     */
    buildOptions() {
        const {
            headers: [headers],
            data,
        } = this.dataService.getRawData();
        const columns = this.#buildColumns(headers);

        return {
            colHeaders: headers,
            columns,
            data,
        };
    }

    /**
     * Private method
     *
     * @param {*} headers Array of strings
     *
     * @returns array of columns for handson
     */
    #buildColumns(headers) {
        return headers.map((header, index) => {
            const signature = {
                type: 'numeric',
            };
            if (index !== 0) {
                signature.format = '0,0';
                signature.renderer = this.#heatmapRenderer.bind(this);
            }

            return signature;
        });
    }

    /**
     * Private method
     *
     * Сorresponds the renderer object for HandsonTable
     *
     * @returns void
     */
    #heatmapRenderer(instance, td, row, col, prop, value, cellProperties) {
        const heatmapScale = chroma.scale([this.settings.heatMinColor, this.settings.heatMaxColor]);
        const point = (parseInt(value, 10) - this.minValue) / (this.maxValue - this.minValue);

        td.style.backgroundColor = heatmapScale(point).hex();
        td.style.textAlign = 'center';
        td.style.fontWeight = 'bold';
        td.style.padding = '20px 10px';
        td.innerText = value;
    }
}
