import * as React from 'react';
import { sp, Web } from "@pnp/sp/presets/all";
import { IItemAddResult } from "@pnp/sp/items";
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import ResultsOverall from './ResultsOverall';
import List from './List';
import ListMenu from './ListMenu';
import Results from './Results';
import ItemPanel from './ItemPanel';
import styles from './App.module.scss';
import { product_info } from './definitions';
import * as moment from 'moment';


const mcc = 'color:lime;';

export interface AppProps {
    context: any;
}

export interface AppState {
    // showPanel: boolean;
    // web: any;
    fields: any;
    items: any;
    panelItem: number;
    web: any;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            // showPanel: false
            // web: null,
            fields: null,
            items: null,
            panelItem: null,
            web: null
        };
        this.getData_sales_fields = this.getData_sales_fields.bind(this);
    }

    public componentDidMount() {
        this.getWebUrl().then((w: string) => {
            this.getData_sales_fields(Web(w)).then(fields => {
                this.getData_sales_items(Web(w)).then(items => {
                    console.log('%c : App -> componentDidMount -> items', mcc, items);
                    this.setState({
                        items: items,
                        fields: fields,
                        web: w
                    });
                });
            });
        });
    }

    public componentDidUpdate(prevProps: AppProps, prevState: AppState) {
        console.log('%c : App -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public getWebUrl = () => new Promise(resolve => {
        sp.web.get().then(w => {
            resolve(w.Url);
        });
    })

    public getData_sales_fields = (web) => new Promise(resolve => {
        web.lists.getByTitle('Sales').fields
            .filter("Hidden eq false and ReadOnlyField eq false and InternalName ne 'ContentType' and InternalName ne 'Title' and InternalName ne 'Amount'")
            .select('TypeAsString', 'InternalName', 'Title', 'Required', 'Choices', 'Description')
            .get().then(f => {
                resolve(f);
            });
    })

    public getData_sales_items = (web) => new Promise(resolve => {
        web.lists.getByTitle('Sales').items
            .select('Product', 'DateSold', 'ID', 'Quantity', 'Salesperson')
            .orderBy('DateSold', false)
            .get().then(items => {
                items.map(i => {
                    i.costPer_number = product_info.filter(p => p.title == i.Product)[0].price;
                    i.Salesperson_name = getNameFromEmail(i.Salesperson);
                    i.DateSold_short = moment(i.DateSold).format('M/D/YYYY');
                });
                resolve(items);
            });
    })



    public refresh_data(web) {
        this.setState({
            items: null
        }, () => {

            this.getData_sales_items(web).then(items => {
                console.log('%c : App -> componentDidMount -> items', mcc, items);
                this.setState({
                    items: items,
                    panelItem: null
                });
            });
        });
    }


    public handler_panel(data) {
        console.log('%c : App -> handler_panel -> data', mcc, data);
        if (data == 'close') {
            this.setState({ panelItem: null });
        }
        else if (data.button && data.button == 'save') {
            console.log('%c : App -> handler_panel -> data.item', mcc, data.item);
            this.commitChanges(data.item);
        }
        else {
            console.log('%c : App -> handler_panel -> unhandled panel click', mcc, 'unhandled panel click');
        }
    }

    public handler_list(data) {
        console.log('%c : App -> handler_list -> data', mcc, data);
        this.setState({ panelItem: data });
    }

    public handler_listMenu(data) {
        console.log('%c : App -> handler_listMenu -> data', mcc, data);
        if (data == 'new') {
            this.setState({ panelItem: data });
        }
    }







    public commitChanges(item) {
        this.getWebUrl().then((w: string) => {

            if (item.Id) {
                this.updateItem(Web(w), item);
            }
            else {
                this.addItem(Web(w), item);
            }
        });
    }

    public addItem(web, item) {
        web.lists.getByTitle('Sales').items
            .add(item)
            .then((iar: IItemAddResult) => {
                console.log('%c : App -> addItem -> iar', mcc, iar);
                this.refresh_data(web);
                // this.setState({ panelItem: null });
            });
    }

    public updateItem(web, item) {
        web.lists.getByTitle('Sales').items
            .getById(item.Id)
            .update(item)
            .then((iar: IItemAddResult) => {
                console.log('%c : App -> updateItem -> iar', mcc, iar);
                this.refresh_data(web);
                // this.setState({ panelItem: null });
            });
    }




    public render() {
        const { panelItem, fields, items } = this.state;

        const el_resultsOverall = items ?
            <div className='results-overall-wrap'>
                <ResultsOverall
                    items={items}
                />
            </div>
            : <></>;

        const el_list = items ?
            <List
                items={items}
                handler={this.handler_list.bind(this)}
            />
            : <></>;

        const el_results = items ?
            <Results
                items={items}
            />
            : <></>;

        const el_panel = panelItem ?
            <ItemPanel
                showPanel={!!panelItem}
                item={panelItem}
                fields={fields}
                handler={this.handler_panel.bind(this)}
                context={this.props.context}
            />
            : <></>;

        return (
            <>
                <ListMenu
                    handler={this.handler_listMenu.bind(this)}
                // mode={}
                />
                <ScrollablePane className={styles.listPane}>
                    {el_resultsOverall}
                    {el_list}
                </ScrollablePane>
                <ScrollablePane className={styles.resultPane}>
                    {el_results}
                </ScrollablePane>
                {el_panel}
            </>
        );
    }
}

function getNameFromEmail(email) {
    const name_split = email.split('@')[0];
    return name_split.charAt(0).toUpperCase() + name_split.slice(1);
}


export default App;