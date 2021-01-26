import * as React from 'react';
import RadialBlurChart from './charts/RadialBlurChart';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
// import { colors } from './definitions';

const mcc = 'background-color:purple;';


export interface ResultsPeopleProps {
    items: any;
}

export interface ResultsPeopleState {
    people_data: any;
}

class ResultsPeople extends React.Component<ResultsPeopleProps, ResultsPeopleState> {
    constructor(props: ResultsPeopleProps) {
        super(props);
        this.state = {
            people_data: null
        };
    }

    public componentDidMount() {
        console.log('%c : ResultsPeople -> componentDidMount -> this.props', mcc, this.props);
        const { items } = this.props;

        const people_w_dups = items.map((item: any) => item.Salesperson_name);

        // @ts-ignore
        const people = [...new Set(people_w_dups)];

        const people_objs = [];

        const people_map = people.map((p: any) => {
            const p_sales = [];
            const p_items = items.filter(i => i.Salesperson_name == p);
            const p_items_map = p_items.map(pi => {
                p_sales.push(pi.Quantity * pi.costPer_number);
            });
            Promise.all(p_items_map).then(_one => {
                const p_obj = {
                    name: p,
                    sales_sum: 0
                };
                p_obj.sales_sum = p_sales.reduce((a, b) => a + b, 0);
                people_objs.push(p_obj);
            });
        });
        Promise.all(people_map).then(_two => {
            console.log('%c : ResultsPeople -> componentDidMount -> people_objs', mcc, people_objs);
            this.setState({ people_data: people_objs });
        });

    }

    public render() {

        const { people_data } = this.state;

        const el = people_data ?
            <div className='zone-content'>
                <RadialBlurChart
                    chart_data={people_data}
                />
            </div>
            : <></>;

        return (
            <Stack className='zone-wrap'>
                <div className='zone-head'>By Salesperson</div>
                {el}
            </Stack>
        );
    }
}

export default ResultsPeople;