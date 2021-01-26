import * as React from 'react';

import { Stack } from 'office-ui-fabric-react/lib/Stack';
import MapOne from './charts/MapOne';


const mcc = 'background-color:maroon;';


export interface ResultsMapProps {
    items: any;
}

export interface ResultsMapState { }

class ResultsMap extends React.Component<ResultsMapProps, ResultsMapState> {
    constructor(props: ResultsMapProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : ResultsMap -> componentDidMount -> this.props', mcc, this.props);
    }

    public render() {

        const el =
            <div className='zone-content'>
                <MapOne
                    items={this.props.items}
                />

            </div>;

        return (
            <Stack className='zone-wrap'>
                <div className='zone-head'>By Location</div>
                {el}
            </Stack>
        );
    }
}

export default ResultsMap;