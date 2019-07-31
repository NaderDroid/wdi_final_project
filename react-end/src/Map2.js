import React from "react";
import 'leaflet/dist/leaflet.css'
import {marker, myCont, theirCont} from "./icon";
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import {getAllMosques} from "./api";


const style = {
    width: "100%",
    height: "576px"
};

class Map2 extends React.Component {
    state = {
        mosques: []
    }
    // L.marker([this.props.lat , this.props.lng], {icon : myCont}).addTo(this.map)
    // add marker
    //this.marker = L.marker(this.props.markerPosition).addTo(this.map);
    //L.popup(this.props.markerPosition , <p>This is me lol</p>).addTo(this.map)

    componentDidMount() {
        getAllMosques()
            .then(mosques => {
                this.setState({
                    mosques: mosques.data.mosques
                })
            })

            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                {this.props.appr ?
                    <div className="alert alert-secondary alert-dismissible fade show" role="alert">
                        <strong>Location is approximate!</strong> For better results, please enable location services in
                        your browser
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    :
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Your Location is accurate</strong>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                <Map style={style} center={[this.props.lat, this.props.lng]}
                     zoom={this.props.zoom}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />

                    <Marker position={[this.props.lat, this.props.lng]} icon={marker}>
                        <Popup>
                            <span>This is your current location</span>
                        </Popup>
                    </Marker>
                    {this.state.mosques.map((mosque, index) =>
                        <div>

                            {this.props.user && this.props.user._id === mosque.owner ?
                                <Marker position={[mosque.coords.x, mosque.coords.y]}
                                        key={index}
                                        icon={myCont}>
                                    <Popup>
                                        Added by You<br/> you said '{mosque.desc}'
                                    </Popup>
                                </Marker>
                                :
                                <Marker position={[mosque.coords.x, mosque.coords.y]}
                                        key={index}
                                        icon={theirCont}>
                                    <Popup>
                                        Added by: {mosque.name} <br/> Said '{mosque.desc}'
                                    </Popup>
                                </Marker>
                            }
                        </div>
                    )}

                </Map>
            </div>
        )
    }
}

export default Map2;
