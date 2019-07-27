import axios from "axios";
import apiUrl from "./apiConfig";

export const getAllMosques = () => {
    console.log('Nader is refactoring')

    return axios({
        method: 'get',
        url: apiUrl + `/mosques`,
    })
    //.then(res => res.data)
        .catch(err => console.log(err))
}
export const getLocation = () => {
    console.log('Nader returned location')
    return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                    resolve({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        approximate: false
                    });
                },
                () => {
                    alert(' to fully leverage our website, please allow access to your location')
                    resolve(fetch('https://ipapi.co/json')
                        .then(res => res.json())

                        .then(loc => {
                            return {
                                lat: loc.latitude,
                                lng: loc.longitude,
                                approximate: true

                            };
                        }))
                })
        }
    )
}

export const validateForm = (form) => {
    if (form.mosque.name !== "" && form.mosque.city !== "" && form.mosque.desc !==""
        && form.mosque.region !=="") {
        return true
    }
    else {
        return false
    }
}

export const handleForm = (data , user) => {
    axios ({
        method : 'post',
        url : apiUrl + '/mosques/add',
        headers: {
            'Authorization': `Bearer ${user.token}` // FOR EXPRESS
        },
        data : data
    })
        .then(res => console.log("successfully posted data" + res))
        .catch(err=> console.log(err))
}





