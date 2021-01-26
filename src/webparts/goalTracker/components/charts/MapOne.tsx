import * as React from 'react';
import {
    // Annotations,
    Annotation,
    ComposableMap,
    Geographies,
    Geography,
    // Markers,
    Marker,
    // ZoomableGroup
} from 'react-simple-maps';
import { geoAlbersUsa, geoMercator } from 'd3-geo';


const mcc = 'color:lime;';

const projections = [
    {
        name: 'geoAlbersUsa',
        projection: { geoAlbersUsa }
    },
    {
        name: 'geoMercator',
        projection: { geoMercator }
    }
];

const data_markers_static = [
    {
        label: 'Portland',
        label_fill: '#eee',
        label_stroke: 'transparent',
        label_line_stroke: '#f53',
        marker_color: '#f53',
        marker_shape: 'circle',
        // marker_size: 12,
        coords: [
            -122.658722,
            45.51223
        ],
        dx: 30,
        dy: 5,
        Salesperson_name: ['Owen', 'Sam'],
    },
    {
        label: 'San Fransisco',
        label_fill: '#eee',
        label_stroke: 'transparent',
        label_line_stroke: '#f53',
        marker_color: '#f53',
        marker_shape: 'circle',
        // marker_size: 12,
        coords: [
            -122.449788,
            37.774793
        ],
        dx: 30,
        dy: 5,
        Salesperson_name: ['Ben'],
    },
    {
        label: 'New York',
        label_fill: '#333',
        label_stroke: 'transparent',
        label_line_stroke: '#f53',
        marker_color: '#f53',
        marker_shape: 'circle',
        // marker_size: 12,
        coords: [
            -74.005974,
            40.712776
        ],
        dx: 30,
        dy: -15,
        Salesperson_name: ['Jen'],
    },
    {
        label: 'Nashville',
        label_fill: '#333',
        label_stroke: 'transparent',
        label_line_stroke: '#f53',
        marker_color: '#f53',
        marker_shape: 'circle',
        // marker_size: 12,
        coords: [
            -86.793493,
            36.160508
        ],
        dx: 75,
        dy: 15,
        Salesperson_name: ['Anna'],
    },
    // {
    //     label: 'Austin',
    //     label_fill: '#333',
    //     label_stroke: 'transparent',
    //     label_line_stroke: '#f53',
    //     marker_color: '#f53',
    //     marker_shape: 'circle',
    //     marker_size: 12,
    //     coords: [
    //         -97.769202,
    //         30.294644
    //     ],
    //     dx: 30,
    //     dy: 30,
    // Salesperson_name: 'Owen',
    // },
];


export interface MapOneProps {
    items: any;
}

export interface MapOneState {
    data_markers: any;
}


class MapOne extends React.Component<MapOneProps, MapOneState> {
    constructor(props: MapOneProps) {
        super(props);
        this.state = {
            data_markers: null
        };
    }

    public componentDidMount() {
        const dm_temp = data_markers_static.map(dm => {
            const my_items = this.props.items.filter(item => dm.Salesperson_name.indexOf(item.Salesperson_name) > -1).map(i => {
                return i.Quantity * i.costPer_number;
            });
            const my_sum = my_items.reduce((a, b) => a + b, 0);
            return { 
                ...dm,
                sales_sum: formatMoney(my_sum),
                marker_size: my_sum / 2000
             };
        });
        this.setState({ data_markers: dm_temp });
    }

    public render() {

        const { data_markers } = this.state;

        const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json';

        const el_map = data_markers ?
            <div>
                <ComposableMap
                    projection='geoAlbersUsa'
                    projectionConfig={{
                        scale: 400,
                    }}
                    height={180}
                    width={450}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo =>
                                <Geography key={geo.rsmKey} geography={geo} />
                            )
                        }
                    </Geographies>

                    {data_markers.map(m => (
                        <>
                            <Marker
                                key={m.label.replace(/ /g, '-')}
                                coordinates={m.coords}
                                // onClick={this.handleClick_marker}
                                name={m.label}
                            >
                                <circle
                                    r={m.marker_size}
                                    fill={m.marker_color}
                                />
                            </Marker>
                            <Annotation
                                subject={m.coords}
                                dx={m.dx}
                                dy={m.dy}
                                connectorProps={{
                                    stroke: "#FF5533",
                                    strokeWidth: 3,
                                    strokeLinecap: "round"
                                }}
                            >
                                <text
                                    dx={10}
                                    dy={5}
                                    fill={m.label_fill}
                                    stroke={m.label_stroke}
                                >
                                    {m.label}
                                </text>
                                <text
                                    dx={10}
                                    dy={25}
                                    fill={m.label_fill}
                                    stroke={m.label_stroke}
                                >
                                    {m.sales_sum}
                                </text>
                            </Annotation>
                        </>
                    ))}
                </ComposableMap>
            </div>
            : <></>;

        return (
            el_map
        );
    }
}

function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default MapOne;