import * as React from 'react';
// import { sp, Web } from "@pnp/sp/presets/all";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import PanelMenu from './PanelMenu';

import FieldText from './fields/FieldText';
import FieldDropDown from './fields/FieldDropDown';
import FieldDatePicker from './fields/FieldDatePicker';
import FieldPeoplePicker from './fields/FieldPeoplePicker';


import { colors, product_info } from './definitions';
import styles from './ItemPanel.module.scss';
import ListMenu from './ListMenu';

const mcc = 'color:hotpink;background-color:black;';

// const sigDoneIconClass = mergeStyles({
//     fontSize: 30,
//     height: 30,
//     width: 30,
//     margin: '0 25px',
//     color: colors.status.green.txt
// });
// const signIcon: IIconProps = { iconName: 'InsertSignatureLine' };

export interface ItemPanelProps {
    showPanel: boolean;
    handler: any;
    item: any;
    fields: any;
    context: any;
}
export interface ItemPanelState {
    item: any;
    fields: any;
}

class ItemPanel extends React.Component<ItemPanelProps, ItemPanelState> {
    constructor(props: ItemPanelProps) {
        super(props);
        this.state = {
            item: this.props.item,
            fields: null
        };
        this.handler_fields = this.handler_fields.bind(this);
    }

    public componentDidMount() {
        console.log('%c : ItemPanel -> componentDidMount -> this.props', mcc, this.props);
        this.prepFields().then(preppedFields => {
            console.log('%c : ItemPanel -> componentDidMount -> preppedFields', mcc, preppedFields);
            this.setState({ fields: preppedFields });
        });
    }

    public componentDidUpdate(prevProps: ItemPanelProps, prevState: ItemPanelState) {
        console.log('%c : ItemPanel -> componentDidUpdate -> this.state', mcc, this.state);
    }


    public handler_fields(data) {
        console.log('%c : ItemPanel -> handler_fields -> data', mcc, data);

        let item_new;
        let fields_new = JSON.parse(JSON.stringify(this.state.fields));

        if (this.state.item === 'new') {
            item_new = {};
        }
        else {
            item_new = JSON.parse(JSON.stringify(this.state.item));
        }
        item_new[data.field] = data.value;
        if (data.field == 'Product' && data.value && data.value != 'noselection') {
            item_new.costPer_number = product_info.filter(p => p.title == data.value)[0].price;
        }

        console.log('%c : ItemPanel -> handler_fields -> item_new', mcc, item_new);
        console.log('%c : ItemPanel -> handler_fields -> fields_new', mcc, fields_new);

        let this_field = fields_new.filter(f => f.InternalName == data.field)[0];
        this_field.value = data.value;

        console.log('%c : ItemPanel -> handler_fields -> this_field', mcc, this_field);

        this.setState({
            item: item_new,
            fields: fields_new
        });
    }


    public prepFields = () => new Promise(resolve => {
        resolve(this.props.fields.map(f => {
            return ({
                ...f,
                value: this.props.item[f.InternalName]
            });
        }));
    })

    public handler_menu(data) {
        console.log('%c : ItemPanel -> handler_menu -> data', mcc, data);
        if (data == 'save') {
            const new_item = JSON.parse(JSON.stringify(this.state.item));
            ['key', 'costPer', 'costPer_number', 'total', 'total_number'].map(k => {
                delete new_item[k];
            });
            this.props.handler({
                button: 'save',
                item: new_item
            });
        }
    }


    public render() {

        const { showPanel, handler } = this.props;
        const { fields, item } = this.state;

        const costPer_div = item.costPer_number ? <div>{formatMoney(item.costPer_number)}</div> : <div>$0.00</div>;

        // const total = item.costPer_number * item.Quantity; 
        const total_div = item.Quantity ? <div>{formatMoney(item.costPer_number * item.Quantity)}</div> : <div>$0.00</div>;

        // const costPer_div = /* item === 'new' ?
        //     <></>
        //     :  */<>
        //         <div>Price per unit</div>
        //         <div>{formatMoney(item.costPer_number)}</div>
        //     </>;

        // const total_div = item === 'new' ?
        //     <></>
        //     :
        //     <>
        //         <div>Total</div>
        //         <div>{formatMoney(total)}</div>
        //     </>;


        const el_item = fields ?
            <div className={styles.itemWrap} >
                <div>
                    <FieldDropDown
                        field={fields.filter(f => f.InternalName == 'Product')[0]}
                        handler={this.handler_fields}
                    />
                </div>
                <div>
                    <FieldPeoplePicker
                        field={fields.filter(f => f.InternalName == 'Salesperson')[0]}
                        handler={this.handler_fields}
                        context={this.props.context}
                    />
                </div>
                <div>
                    <FieldDatePicker
                        field={fields.filter(f => f.InternalName == 'DateSold')[0]}
                        handler={this.handler_fields}
                    />
                </div>
                <div>
                    <FieldText
                        field={fields.filter(f => f.InternalName == 'Quantity')[0]}
                        handler={this.handler_fields}
                    />
                </div>
                <div>Price per unit</div>
                {costPer_div}
                <div>Total</div>
                {total_div}
                {/* <div>{formatMoney(item.costPer_number)}</div> */}
                {/* <div>{formatMoney(total)}</div> */}
            </div>
            : <></>;

        return (
            <Panel
                isOpen={showPanel}
                headerText='Order Details'
                closeButtonAriaLabel='Close'
                isLightDismiss={true}
                onDismiss={() => {
                    handler('close');
                }}
                type={PanelType.custom}
                customWidth='800px'
                styles={{
                    // root: { backgroundColor: bg_color },
                    // closeButton: { color: color_1 },
                    // main: {
                    //     backgroundColor: bg_color,
                    // },
                    content: {
                        paddingRight: '0!important',
                        paddingLeft: '0!important'
                    },
                    // headerText: {
                    //     color: color_1
                    // }
                }}
            >
                <PanelMenu
                    handler={this.handler_menu.bind(this)}
                    mode={'edit'}
                />
                {el_item}
            </Panel>
        );
    }
}


function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default ItemPanel;