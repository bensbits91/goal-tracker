import * as React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList
} from 'recharts';
// import { survey_averages } from '../sampleData';
// import { navy, mint, yellow, pink } from '../colors';
// import * as times from '../times';
import { colors } from '../definitions';

const mcc = 'background-color:yellow;color:black;';

const survey_averages = [
    {
        question: 'Friendliness of Staff',
        score: 8.67
    },
    {
        question: 'Speed of Service',
        score: 6.13
    },
    {
        question: 'Quality of Food',
        score: 7.75
    },
    // {
    //     question: 'Choice of Food',
    //     score: 5.75
    // },
    {
        question: 'Value for Money',
        score: 5.74
    },
    {
        question: 'Cleanliness of Restaurant',
        score: 7.68
    },
    // {
    //     question: 'Music, Decoration & Ambience',
    //     score: 7.24
    // },
    // {
    //     question: 'Ease of Parking',
    //     score: 6.48
    // },
    // {
    //     question: 'Would you recommend us to a friend?',
    //     score: 8.9
    // }
];

export interface VerticalBarChartProps {
    chart_data: any;
}

export interface VerticalBarChartState {
    chart_data: any;
}

class VerticalBarChart extends React.Component<VerticalBarChartProps, VerticalBarChartState> {
    constructor(props: VerticalBarChartProps) {
        super(props);
        this.state = {
            chart_data: {}
        };
    }

    public componentDidMount() {
        console.log('%c : VerticalBarChart -> componentDidMount -> this.props', mcc, this.props);
        const data = this.props.chart_data.map((d, i) => {
            return {
                name: d.name,
                Sales: d.sales_sum,
                fill: i === 0 ? colors.navy : i === 1 ? colors.mint : i === 2 ? colors.green : i === 3 ? colors.orange : i === 4 ? colors.pink : i === 5 ? colors.red : colors.yellow
            };
        });
        // const data = this.props.chart_data.map(d => { return d; });
        this.setState({ chart_data: data });
    }


    public render() {
        const { chart_data } = this.state;
        console.log('%c : VerticalBarChart -> render -> chart_data', mcc, chart_data);
        return (
            <BarChart
                width={500}
                height={180}
                data={chart_data}
                layout='vertical'
                // margin={{ top: 5, right: 30, left: 20, bottom: 5, }}
                // barGap={0}
                // barCategoryGap={-40}
                barSize={20}
                animationDuration={4000}
            >
                {/* <CartesianGrid strokeDasharray='3 3' /> */}
                <XAxis
                    type='number'
                    // domain={[0, 15000]} 
                    tick={false}
                    hide
                />
                <YAxis
                    dataKey='name'
                    type='category'
                    tick={false}
                    hide
                />
                {/* <Tooltip /> */}
                {/* <Legend /> */}
                <Bar
                    dataKey='Sales'
                    animationBegin={1000}
                    animationDuration={1500}
                    label={{ fill: '#eee', position: 'insideRight' }}
                >
                    <LabelList
                        position='insideLeft'
                        fill='#eee'
                        stroke='none'
                        dataKey='name'
                    />
                </Bar>
                {/* <Bar dataKey='Speed of Service' fill={navy} /> */}
            </BarChart>
        );
    }
}

export default VerticalBarChart;

// export default class Example extends React.PureComponent {
//     public render() {
//         return (
//             <BarChart
//                 width={500}
//                 height={300}
//                 data={survey_averages}
//                 layout='vertical'
//             // margin={{ top: 5, right: 30, left: 20, bottom: 5, }}
//             >
//                 {/* <CartesianGrid strokeDasharray='3 3' /> */}
//                 <XAxis type='number' domain={[0, 10]} />
//                 <YAxis
//                     dataKey='question'
//                     type='category'
//                     tick={false}
//                 />
//                 {/* <Tooltip /> */}
//                 {/* <Legend /> */}
//                 <Bar
//                     dataKey='score'
//                     fill={navy}
//                     barSize={30}
//                     animationBegin={times.one}
//                     label={{ fill: '#eee', position: 'insideRight' }}
//                 >
//                     <LabelList
//                         position='insideLeft'
//                         fill='#eee'
//                         stroke='none'
//                         dataKey='question'
//                     />
//                 </Bar>
//                 {/* <Bar dataKey='Speed of Service' fill={navy} /> */}
//             </BarChart>
//         );
//     }
// }