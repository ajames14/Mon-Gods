const axios = require('axios')

function address(req, res) {

    const address = req.body.address
    // const address = 'aldgate east'
    console.log(lang)
    //LocationIQ
    const key = '042d8a8131e296'
    // axios.get(`https://eu1.locationiq.com/v1/search.php?key=${key}&q=${address}&format=json`)
    axios.get(`https://eu1.locationiq.com/v1/search.php?key=${key}&q=aldgate&format=json`)
        .then(resp => {
            console.log(resp)
            //ask twilio to check number 

            // eslint-disable-next-line camelcase
            // .then(lattitude => console.log(lattitude.lat))
            // .then(longitude => console.log(longitude.lon))
            .catch(err => res.status(400).json({ message: err }))
        })
        .catch(err => console.log(err))
}


module.exports = {
    address
}
