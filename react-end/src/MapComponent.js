import React, {Component} from 'react'
import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import FormCard from './FormCard'
import './mapComponent.css'
import {theirCont, myCont, loc} from "./Icons";
import {getAllMosques, getLocation, validateForm, handleForm,} from "./api";
import {Card, CardBody, CardTitle} from "reactstrap";
import spinner from "./spinner2.gif";

class MapComponent extends Component {
    state = {
        user: this.props.user,
        approximate: false,
        zoom: 2,
        form: true,
        isSending: false,
        validForm: false,
        isSent: false,
        mosques: [],
        info: {
            coords: {
                lat: 44.485,
                lng: 39.199
            },
            name: '',
            desc: '',
            city: '',
            region: '',
            hasJum: false
        },
    }

    componentDidMount() {
        getAllMosques()
            .then(res => this.setState({
                mosques: res.data.mosques
            }))
        axios({
            method: 'get',
            url: 'https://ipapi.co/json'
        })
            .then(res => {
                const copyInfo = Object.assign(this.state.info)
                copyInfo.city = res.data.city
                copyInfo.region = res.data.region
                this.setState({
                        info: copyInfo
                    }
                )
            })

        getLocation()

            .then(res => {
                const copyInfo = Object.assign(this.state.info)
                console.log(res)
                copyInfo.coords.lat = res.lat
                copyInfo.coords.lng = res.lng
                this.setState({

                    info: copyInfo,
                    zoom: 15,
                    userPermitted: true,
                    approximate: res.approximate

                })
                console.log('After' + this.state.info)
            })
            .catch(e => console.log(e))
    }

    handleChange = (event) => {

        this.setState({
            info: {
                ...this.state.info,
                [event.target.name]: event.target.value
            },
            [event.target.name]: event.target.value,

        })
        //console.log(this.state)
        // console.log(this.state.info.desc)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = {
            mosque: {
                name: this.state.info.name,
                desc: this.state.info.desc,
                coords: {
                    x: this.state.info.coords.lat,
                    y: this.state.info.coords.lng,
                },
                city: this.state.info.city,
                region: this.state.info.region,
                hasJum: this.state.info.hasJum
            }
        }
        this.setState({
            isSending: true,
            form: false
        })

        if (validateForm(data)) {


            handleForm(data, this.state.user)
            console.log(this.state)

            setTimeout(() => this.setState({
                validForm: true,
                isSending: false,
                isSent: true
            }), 3000)
        } else {
            alert("Invalid form submission. All fields are required")
        }
    }
    handleRadio = (val) => {
        let copyInfo = Object.assign(this.state.info)


        if (val) {
            copyInfo.hasJum = false;
            this.setState({
                info: copyInfo
            })
        } else {
            copyInfo.hasJum = true;
            this.setState({
                info: copyInfo
            })
        }
    }
    clearForm = () => {
        let copyInfo = Object.assign(this.state.info)
        copyInfo.name = '';
        copyInfo.desc = '';
        copyInfo.hasJum = false
        this.setState({
            info: copyInfo
        })
    }

    render() {
        const position = [this.state.info.coords.lat, this.state.info.coords.lng]
        return (
            <div>
                {this.state.approximate && !this.state.user ?
                    <div>
                        <h2>
                            The location is approximate and based on your ip address
                        </h2>
                        <Map className="map" center={position} zoom={this.state.zoom}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </Map>
                        <h3>
                            You need to be logged and location services is enabled to add to the list
                        </h3>
                    </div>
                    :
                    <Map className="map" center={position} zoom={this.state.zoom}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}
                                icon={loc}
                        >

                            <Popup>
                                This is not a mosque <br/> It's Nader Home
                            </Popup>
                        </Marker>
                        {this.state.mosques.map((mosque, index) => <div>
                            <Marker position={[mosque.coords.x, mosque.coords.y]}
                                    key={index}
                                    icon={theirCont}>
                                <Popup>
                                    Added by: {mosque.name} <br/> Said '{mosque.desc}'
                                </Popup>
                            </Marker>
                        </div>)}
                    </Map>
                }
                {this.state.user && this.state.approximate ?
                    <h3>Enable location services to add to the map</h3>
                    :
                    ''
                }
                {this.state.user && !this.state.approximate && !this.state.isSent ?
                    <FormCard
                        isSending={this.state.isSending}
                        info={this.state.info}
                        isSent={this.state.isSent}
                        handleRadio={this.handleRadio}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        clearForm={this.clearForm}
                        approximate={this.state.approximate}
                    />
                    : ''
                }
                {this.state.isSending ?
                    <div>
                        <img src={spinner} alt="Waiting"/>
                        <CardTitle>Valid Input, One moment...</CardTitle>
                    </div>
                    :
                    ''
                }
                {
                    this.state.isSent ?
                        <CardTitle>Mosque has been added successfully <br/> Thank you for contributing to our
                            database,
                        </CardTitle>
                        :
                        ''
                }
            </div>
        )
    }
}

export default MapComponent
