import * as React from 'react';
import {
    RadialBarChart,
    RadialBar,
    // Tooltip,
    Legend
} from 'recharts';
import { colors } from '../definitions';


const mcc = 'background-color:white;color:black;';

const style_legend = {
    top: 20,
    left: 0,
    // left: 460,
    lineHeight: '24px',
};

export interface RadialBlurChartProps {
    chart_data: any;
}

export interface RadialBlurChartState {
    chart_data: any;
}

class RadialBlurChart extends React.Component<RadialBlurChartProps, RadialBlurChartState> {
    constructor(props: RadialBlurChartProps) {
        super(props);
        this.state = {
            chart_data: null
        };
    }

    public componentDidMount() {
        console.log('%c : RadialBlurChart -> componentDidMount -> this.props', mcc, this.props);
        const data = this.props.chart_data.map((d, i) => {
            return {
                name: d.name,
                Sales: d.sales_sum,
                fill: i === 0 ? colors.navy : i === 1 ? colors.mint : i === 2 ? colors.green : i === 3 ? colors.orange : i === 4 ? colors.pink : i === 5 ? colors.red : colors.yellow
            };
        });
        this.setState({ chart_data: data });
    }

    public render() {
        const { chart_data } = this.state;
        console.log('%c : RadialBlurChart -> render -> chart_data', mcc, chart_data);

        const el = chart_data ?
            <RadialBarChart
                width={600}
                height={250}
                // innerRadius='10%'
                // outerRadius='80%'
                cx={250}
                cy={200}
                innerRadius={20}
                outerRadius={200}
                barSize={20}
                data={chart_data}
                // data={radial}
                startAngle={180}
                endAngle={0}
            >
                <RadialBar
                    minAngle={15}
                    label={{ fill: '#fff', position: 'insideStart' }}
                    background
                    dataKey='Sales'
                    animationBegin={500}
                    clockWise={true}
                />
                <Legend
                    iconSize={10}
                    width={120}
                    height={140}
                    layout='vertical'
                    verticalAlign='middle'
                    wrapperStyle={style_legend}
                />
            </RadialBarChart>
            : <></>;
        return (
            el
        );
    }
}

export default RadialBlurChart;