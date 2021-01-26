import * as React from 'react';
import LineChartOne from './charts/LineChart';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { colors } from './definitions';

const mcc = 'background-color:darkgreen;';

export interface ResultsDateProps {
    items: any;
}

export interface ResultsDateState {
    dates_data: any;
}

class ResultsDate extends React.Component<ResultsDateProps, ResultsDateState> {
    constructor(props: ResultsDateProps) {
        super(props);
        this.state = {
            dates_data: null
        };
    }

    public componentDidMount() {
        const { items } = this.props;

        const dates_w_dups = items.map((item: any) => item.DateSold_short);

        // @ts-ignore
        const dates = [...new Set(dates_w_dups)];

        const dates_objs = [];

        const dates_map = dates.map((p: any) => {
            const p_sales = [];
            const p_items = items.filter(i => i.DateSold_short == p);
            const p_items_map = p_items.map(pi => {
                p_sales.push(pi.Quantity * pi.costPer_number);
            });
            Promise.all(p_items_map).then(_one => {
                const p_obj = {
                    Date: p.split('/2020')[0],
                    Sales: 0
                };
                p_obj.Sales = p_sales.reduce((a, b) => a + b, 0);
                dates_objs.push(p_obj);
            });
        });
        Promise.all(dates_map).then(_two => {
            console.log('%c : ResultsDate -> componentDidMount -> dates_objs', mcc, dates_objs);
            this.setState({ dates_data: dates_objs });
        });


    }

    public render() {
        const { dates_data } = this.state;

        const el = dates_data ?
            <div className='zone-content'>
                <LineChartOne
                    data={dates_data}
                    dataKey_x='Date'
                    dataKey_y1='Sales'
                    dataKey_y2='Guests'
                    width={500}
                    height={250}
                    stroke_color_1={colors.navy}
                    stroke_color_2={colors.mint}
                    // legend
                    // cart_grid
                    tooltip
                />
            </div>
            : <></>;
        return (
            <Stack className='zone-wrap'>
                <div className='zone-head'>By Date</div>
                {el}
            </Stack>
        );
    }
}

export default ResultsDate;











/*


    <AALineChart
        data={sampleData.lines_tiny}
        dataKey_x='Day'
        dataKey_y1='Sales'
        dataKey_y2='Guests'
        width={730}
        height={250}
        stroke_color_1={colors.navy}
        stroke_color_2={colors.mint}
        tooltip
        legend
        cart_grid
    />


*/