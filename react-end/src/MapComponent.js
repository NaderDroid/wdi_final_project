import React, {Component} from 'react'
import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.css'
import icon from 'leaflet'
import axios from 'axios'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import { Alert ,
    Card, CardBody, ButtonGroup, Form, FormGroup, Label, CardTitle , Input, Button
} from 'reactstrap';
import  './mapComponent.css'
import {handleForm, showUser, validateForm} from './auth/api'
import {showAll} from "./auth/api";
import spinner from './Spinner.gif'

const myIcon = icon.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
})

class MapComponent extends Component {
    state = {
        user: this.props.user,
        approximate: false,
        zoom: 2,
        form: true,
        isSending : false,
        validForm : false,
        isSent : false,
        info: {
            coords: {
                lat: 21.485,
                lng: 39.199
            },
            name: '',
            desc: '',
            city: '',
            region: '',
            hasJum: false
        },
        css: ''
    }

    componentDidMount() {
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
        navigator.geolocation.getCurrentPosition((pos) => {
            const copyInfo = Object.assign(this.state.info)
            copyInfo.coords =  {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            };
            this.setState({
                info : copyInfo,
                userPermitted: true,
                zoom: 15
            })

        }, () => {
            alert(' to fully leverage our website, please allow access to your location')
            axios({
                method: 'get',
                url: 'https://ipapi.co/json'
            })
                .then(res => {
                    console.log(res.data.latitude)
                    console.log(res.data.longitude)
                    const copyInfo = Object.assign(this.state.info)
                    copyInfo.coords =  {
                        lat: res.data.latitude,
                        lng: res.data.longitude
                    };
                    this.setState({
                        info: copyInfo,
                        userPermitted: false,
                        approximate: true
                    })
                })
        });
    }

    handleChange = (event) => {

        this.setState({
            info : {
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
            isSending : true,
            form:false
        })

        if (validateForm(data)) {


            handleForm(data, this.state.user)
            console.log(this.state)

            setTimeout(() => this.setState({
                validForm: true,
                isSending : false,
                isSent : true
            }) , 3000)
        }
        else {
            alert("Invalid form submission. All fields are required")
        }
    }

    handleRadio = (val) => {
        let  copyInfo = Object.assign(this.state.info)


            if(val){
                copyInfo.hasJum = false;
                this.setState({
                    info: copyInfo
                })
            }
            else {
                copyInfo.hasJum = true;
                this.setState({
                        info: copyInfo
                })
            }



    }

    clearForm = () => {
        let  copyInfo = Object.assign(this.state.info)
        copyInfo.name ='';
        copyInfo.desc ='';
        copyInfo.hasJum = false
        this.setState({
            info: copyInfo
        })
    }

    render() {
        const position = [this.state.info.coords.lat , this.state.info.coords.lng]
        return (
            <div>
                {/*<img src={spinner} alt="Waiting"/>*/}
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
                            <Marker position={position}
                                    icon={myIcon}
                            >
                                <Popup>
                                    This is not a mosque <br/> It's Nader Home
                                </Popup>
                            </Marker>
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
                                icon={myIcon}
                        >
                            <Popup>
                                This is not a mosque <br/> It's Nader Home
                            </Popup>
                        </Marker>
                    </Map>
                }
                {this.state.user && this.state.approximate ?
                 <h3>Enable location services to add to the map</h3>
                    :
                ''
                }

                            {this.state.user && !this.state.approximate ?
                                <Card className="card">
                                    <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <CardTitle>Add A mosque to Map</CardTitle>
                                    <FormGroup>
                                        <Label for="Mosque name">Name</Label>
                                        <Input onChange={this.handleChange}
                                               type="text"
                                               name="name"
                                               value={this.state.info.name}
                                               id="name"
                                               placeholder="Enter mosque name"/>
                                        <Label for="city">City</Label>
                                        <Input onChange={this.handleChange}
                                               type="text"
                                               name="city"
                                               id="city"
                                               value={this.state.info.city}
                                               placeholder="City name"
                                        />
                                        <Label for="region">Region</Label>
                                        <Input onChange={this.handleChange}
                                               type="text"
                                               name="region"
                                               id="region"
                                               value={this.state.info.region}
                                               placeholder="City name"
                                        />
                                        <Label for="Description">Description</Label>
                                        <Input onChange={this.handleChange}
                                               type="textarea"
                                               name="desc"
                                               id="message"
                                               value={this.state.info.desc}
                                               placeholder="Enter a description"
                                        />
                                        <br/>
                                        <h6>Does this mosque holds Jumm'ah</h6>
                                        <ButtonGroup>
                                            <Button color="primary"
                                                    onClick={() => this.handleRadio(false)}> Yes </Button>
                                            <Button color="primary" onClick={() => this.handleRadio(true)}> No </Button>
                                        </ButtonGroup>
                                        <p>Selected: {this.state.info.hasJum ? <p>This mosque holds Jumm'ah</p> :
                                            <p>This mosque does NOT hold Jumm'ah</p>}</p>

                                    </FormGroup>
                                    <Button className="submit" color="secondary" type="submit">Save Mosque</Button>
                                    <Button className="submit" onClick={this.clearForm} color="secondary">Clear
                                        form</Button>
                                </Form>
                                    </CardBody>
                                </Card>
                                : ''}
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
                                    <CardTitle>Mosque has been added successfully <br/> Thank you for contributing to our database, </CardTitle>
                                    :
                                    ''

                            }
            </div>
        )
                }

}
export default MapComponent
