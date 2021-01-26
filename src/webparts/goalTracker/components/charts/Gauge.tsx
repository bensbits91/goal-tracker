import * as React from 'react';
import {
    PieChart, Pie, Sector, Cell,
} from 'recharts';
// import { pie_simple_1 } from './sampleData';
// import * as colors from './colors';
// import * as times from './times';
import { colors } from '../definitions';


const pie_simple_1 = [
    { name: 'Marketing', value: 400 },
    { name: 'Operations', value: 300 },
    { name: 'Finance', value: 300 },
    { name: 'HR', value: 200 },
];

const COLORS = [colors.navy, colors.mint, colors.orange, colors.pink];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy - 20} dy={8} textAnchor='middle' fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={fill}>{`DX ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={fill}>
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


export default class PieChartWithPaddingAngleOne extends React.PureComponent {
    state = {
        activeIndex: 0,
    };

    public onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    public render() {
        return (
            <PieChart width={300} height={300}>
                <Pie
                    data={pie_simple_1}
                    cx='50%'
                    cy='50%'
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    fill='#8884d8'
                    paddingAngle={5}
                    dataKey='value'
                    // animationBegin={times.one}

                    activeIndex={this.state.activeIndex}
                    activeShape={renderActiveShape}

                    onMouseEnter={this.onPieEnter}
                >
                    {
                        pie_simple_1.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart>
        );
    }
}
