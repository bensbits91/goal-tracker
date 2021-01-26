import * as React from 'react';
import VerticalBarChart from './charts/VerticalBarChart';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const mcc = 'background-color:navy;';



export interface ResultsProductProps {
    items: any;
}

export interface ResultsProductState {
    products_data: any;
}

class ResultsProduct extends React.Component<ResultsProductProps, ResultsProductState> {
    constructor(props: ResultsProductProps) {
        super(props);
        this.state = {
            products_data: null
        };
    }

    public componentDidMount() {
        console.log('%c : ResultsProduct -> componentDidMount -> this.props', mcc, this.props);
        const { items } = this.props;

        const products_w_dups = items.map((item: any) => item.Product);
        console.log('%c : ResultsProduct -> componentDidMount -> products_w_dups', mcc, products_w_dups);

        // @ts-ignore
        const products = [...new Set(products_w_dups)];
        console.log('%c : ResultsProduct -> componentDidMount -> products', mcc, products);

        const products_objs = [];

        const products_map = products.map((p: any) => {
            const p_sales = [];
            const p_items = items.filter(i => i.Product == p);
            const p_items_map = p_items.map(pi => {
                p_sales.push(pi.Quantity * pi.costPer_number);
            });
            Promise.all(p_items_map).then(_one => {
                const p_obj = {
                    name: p,
                    sales_sum: 0,
                    sales_count: p_items.length
                };
                p_obj.sales_sum = p_sales.reduce((a, b) => a + b, 0);
                products_objs.push(p_obj);
            });
        });
        Promise.all(products_map).then(_two => {
            console.log('%c : ResultsProduct -> componentDidMount -> products_objs', mcc, products_objs);
            this.setState({ products_data: products_objs });
        });

    }

    public render() {
        const { products_data } = this.state;

        const el = products_data ?
            <div className='zone-content'>
                <VerticalBarChart
                    chart_data={products_data}
                />
            </div>
            : <></>;


        return (
            <Stack className='zone-wrap'>
                <div className='zone-head'>By Product</div>
                {el}
            </Stack>
        );
    }
}

export default ResultsProduct;