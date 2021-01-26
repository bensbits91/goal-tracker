import * as React from 'react';
import RadialBarchartSingle from './charts/RadialBarchartSingle';


const mcc = 'background-color:teal;';

export interface ResultsOverallProps {
    items: any;
}

export interface ResultsOverallState {
    sum: number;
}

class ResultsOverall extends React.Component<ResultsOverallProps, ResultsOverallState> {
    constructor(props: ResultsOverallProps) {
        super(props);
        this.state = {
            sum: 0
        };
    }

    public componentDidMount() {
        console.log('%c : ResultsOverall -> componentDidMount -> this.props', mcc, this.props);

        const to_sum_array: number[] = this.props.items.map(i => {
            return i.Quantity * i.costPer_number;
        });
        Promise.all(to_sum_array).then(arr => {
            const calc_sum = arr.reduce((a, b) => a + b, 0);
            this.setState({ sum: calc_sum });
        });
    }

    public componentDidUpdate(prevProps: ResultsOverallProps, prevState: ResultsOverallState) {
        console.log('%c : ResultsOverall -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public render() {
        const { sum } = this.state;

        const el = sum ?
            <RadialBarchartSingle
                sales_sum={sum}
                sales_goal={100000}
            />
            : <></>;
        return (
            <>
                <div className='main-head'>Monthly Sales</div>
                {el}
            </>
        );
    }
}

export default ResultsOverall;