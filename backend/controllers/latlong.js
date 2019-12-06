const axios = require('axios')

function address(req, res) {

    const address = req.body.address

    console.log(lang)

    //LocationIQ
    const key = '042d8a8131e296'

    //Twilio
    //   const accountSid = 'AC7ca5ae686cef0503c846ba87009871ae'
    //   const authToken = 'cd018fe2561d1653477db763def27dbf'
    //   const client = require('twilio')(accountSid, authToken)
    //   const twilioNum = '+13163134784'

    //get translation from yandex
    //   axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=${lang}`)
    axios.get(`https://eu1.locationiq.com/v1/search.php?key=${key}&q=${address}&format=json`)
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
