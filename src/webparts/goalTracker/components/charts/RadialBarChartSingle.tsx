import * as React from 'react';
import { RadialBarChart, RadialBar, LabelList } from 'recharts';
import { colors } from '../definitions';

const mcc = 'background-color:lime;color:black;';

export interface RadialBarChartSingleProps {
    sales_sum: number;
    sales_goal: number;
}

export interface RadialBarChartSingleState {
    sales_data: any;
    end_angle: number;
}

class RadialBarChartSingle extends React.Component<RadialBarChartSingleProps, RadialBarChartSingleState> {
    constructor(props: RadialBarChartSingleProps) {
        super(props);
        this.state = {
            sales_data: null,
            end_angle: 0,
        };
    }

    public componentDidMount() {
        const { sales_sum, sales_goal } = this.props;
        const pct = sales_sum / sales_goal;
        const end_angle = pct * 360;
        const fill = pct < .4 ? colors.red : pct < .8 ? colors.yellow : colors.green;
        const sum_obj = {
            name: 'Monthly Sales',
            sum: sales_sum,
            fill: fill,
        };

        this.setState({
            sales_data: [sum_obj],
            end_angle: end_angle,
        });
    }

    public renderLabel(/* props */) {
        const { sales_goal, sales_sum } = this.props;
        // const { cx, cy } = props.viewBox;

        return (
            <g>
                <text
                    x={193}
                    y={150}
                    fill='#333'
                    font-size={24}
                >
                    {formatMoney(sales_sum)}
                </text>
                <text
                    x={193}
                    y={170}
                    fill='#333'
                    font-size={12}
                >
                    Goal: {formatMoney(sales_goal)}
                </text>
            </g>
        );
    }

    public render() {
        const { sales_data, end_angle } = this.state;

        const el = sales_data ?
            <RadialBarChart
                width={500}
                height={300}
                cx={250}
                cy={150}
                innerRadius={100}
                // outerRadius={150}
                barSize={20}
                data={sales_data}
                endAngle={end_angle}

            >
                <RadialBar
                    minAngle={15}
                    dataKey='sum'
                    background
                    // animationBegin={times.one}
                    clockWise
                >
                    <LabelList
                        dataKey='sum'
                        position='center'
                        fill='#333'
                        content={this.renderLabel.bind(this)}
                    />
                </RadialBar>
            </RadialBarChart>
            : <></>;

        return (
            el
        );
    }
}

function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default RadialBarChartSingle;