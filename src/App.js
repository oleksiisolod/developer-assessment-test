import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import CustomHighchartsWidget from './widgets/CustomHighchartsWidget';
import CustomHandsontableWidget from './widgets/CustomHandsontableWidget';

function App() {
    return (
        <div className="App">
            <div className="jumbotron text-center">
                <h1>Developer Assessment</h1>
            </div>

            <br />
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 widget">
                        <h1>Highcharts Heatmap</h1>
                        <CustomHighchartsWidget />
                    </div>
                    <div className="col-sm-12">&nbsp;</div>
                    <div className="col-sm-12 widget">
                        <h1>Handsontable Heatmap</h1>
                        <CustomHandsontableWidget />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
