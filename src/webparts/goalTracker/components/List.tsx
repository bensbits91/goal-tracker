import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, IDetailsListStyles } from 'office-ui-fabric-react/lib/DetailsList';
// import { sp, Web } from "@pnp/sp/presets/all";
// import * as moment from 'moment';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
// import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
// import { product_info } from './definitions';


const style_detailsList: Partial<IDetailsListStyles> = {
    root: {
        marginTop: 30
    }
};


// let the_web;

const mcc = 'color:yellow;';


export interface IListItem {
    key: number;
    Id: number;
    Product: string;
    Salesperson: string;
    DateSold: string;
    Quantity: number;
    costPer: string;
    total: string;
    costPer_number: number;
    total_number: number;
    // view: number;
    // edit: number;
}



export interface ListProps {
    items: any;
    handler: any;
}

export interface ListState {
    items: IListItem[];
}

class List extends React.Component<ListProps, ListState> {
    private _allItems: IListItem[];
    private _columns: IColumn[];

    constructor(props: ListProps) {
        super(props);

        this._columns = [
            // { key: 'column1', name: 'ID', fieldName: 'Id', minWidth: 25, maxWidth: 25, isResizable: false },
            { key: 'column2', name: 'Product', fieldName: 'Product', minWidth: 50, maxWidth: 125, isResizable: true },
            { key: 'column3', name: 'Sold By', fieldName: 'Salesperson', minWidth: 100, maxWidth: 75, isResizable: true },
            { key: 'column4', name: 'Date Sold', fieldName: 'DateSold', minWidth: 100, maxWidth: 75, isResizable: true },
            { key: 'column6', name: 'Quantity', fieldName: 'Quantity', minWidth: 50, maxWidth: 50, isResizable: true },
            { key: 'column7', name: 'Cost Per Item', fieldName: 'costPer', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'column8', name: 'Total', fieldName: 'total', minWidth: 50, maxWidth: 150, isResizable: true },
            // { key: 'column7', name: '', fieldName: 'view', minWidth: 100, maxWidth: 100, isResizable: false },
            // { key: 'column8', name: '', fieldName: 'edit', minWidth: 100, maxWidth: 100, isResizable: false },
        ];

        this.state = {
            items: this._allItems,
        };
        // this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
        // this.onclick_listButton = this.onclick_listButton.bind(this);
        // this.getData_items = this.getData_items.bind(this);
    }

    public componentDidMount() {
        console.log('%c : List -> componentDidMount -> this.props', mcc, this.props);
        this._allItems = [];
        if (this.props.items) {
            this.props.items.map(i => {

                // const price = product_info.filter(p => p.title == i.Product)[0].price;

                this._allItems.push({
                    key: i.Id,
                    Id: i.Id,
                    Product: i.Product,
                    Salesperson: i.Salesperson_name,
                    DateSold: i.DateSold_short,
                    Quantity: i.Quantity,
                    costPer: formatMoney(i.costPer_number),
                    // costPer: formatMoney(price),
                    total: formatMoney(i.Quantity * i.costPer_number),
                    costPer_number: i.costPer_number,
                    total_number: (i.Quantity * i.costPer_number)
                });
            });
            this.setState({ items: this._allItems });
        }

    }


    public _onItemInvoked(item: IListItem): void {
        this.props.handler(item/* .id */);
    }


    public render() {
        const { items } = this.state;

        const el_list = items ?
            <Fabric style={{ padding: '10px 40px' }}>
                <DetailsList
                    compact={true}
                    items={items}
                    columns={this._columns}
                    setKey='set'
                    layoutMode={DetailsListLayoutMode.justified}
                    onItemInvoked={this._onItemInvoked.bind(this)}
                    checkboxVisibility={2}
                    // selection={this._selection}
                    // selectionPreservedOnEmptyClick={true}
                    // ariaLabelForSelectionColumn='Toggle selection'
                    // ariaLabelForSelectAllCheckbox='Toggle selection for all items'
                    // checkButtonAriaLabel='Row checkbox'
                    // onRenderItemColumn={this._onRenderItemColumn}
                    styles={style_detailsList}
                />
            </Fabric>
            : <></>;

        return (
            el_list
        );
    }
}

function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default List;