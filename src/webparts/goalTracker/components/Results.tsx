import * as React from 'react';
import ResultsPeople from './ResultsPeople';
import ResultsProduct from './ResultsProduct';
import ResultsDate from './ResultsDate';
import ResultsMap from './ResultsMap';
import { Stack } from 'office-ui-fabric-react/lib/Stack';



export interface ResultsProps {
    items: any;
}

export interface ResultsState {

}

class Results extends React.Component<ResultsProps, ResultsState> {
    constructor(props: ResultsProps) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <div className='results-wrap'>
                <Stack horizontal className='results-people-wrap'>
                    <ResultsPeople
                        items={this.props.items}
                    />
                    <ResultsProduct
                        items={this.props.items}
                    />
                </Stack>
                <Stack horizontal className='results-product-wrap'>
                    <ResultsDate
                        items={this.props.items}
                    />
                    <ResultsMap
                        items={this.props.items}
                    />
                </Stack>
            </div>
        );
    }
}

export default Results;