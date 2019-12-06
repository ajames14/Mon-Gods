// This seeds.js is really a self contained program we can run with
// a script we defined in package.json: `npm run seed`

// It's job is to give our db a bunch of data before we start developing
// It connects to mongoose, inserts data, then closes the connection.
const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Spot = require('../models/Spot')
const User = require('../models/User')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => {
        return User.create([{
          username: 'admin',
          email: 'admin@admin.com',
          password: 'password',
          passwordConfirmation: 'password'
        }])
      })
      .then(users => {
        // Insert data
        console.log(`${'🙍‍♀️'.repeat(users.length)} users created`)
        return Spot.create([
          {
            spotName: 'Anchor Point',
            lat: '',
            long: '',
            country: 'Morocco',
            region: 'Taghazout',
            image: 'https://surfberbere.com/wp-content/uploads/2016/03/anchor_point_surf_berbere_taghazout_holiday_surf_camp_morocco.png',
            description: 'A medium to large, long period NW swell is what’s needed to light-up this world-class right, first surfed by Aussies in the 1960’s. From the steep take-off at the outside peak, a seemingly endless succession of speed walls and cutback hooks present themselves. Occasional emerald green rooms appear on the sandy sections down the point. It’s easier to come in at one of the coves and walk back to jump off at the end between sets. Works on all but high tides, unless it’s huge, which is when it may be possible to ride back to Tarhazoute.',
            level: 'Advanced',
            typeOfWave: 'Point Break',
            user: users[0]
          },
          {
            spotName: 'Devils Rock',
            lat: '',
            long: '',
            country: 'Morocco',
            region: 'Taghazout',
            image: 'https://surfberbere.com/wp-content/uploads/2016/03/devils_rock_surf_school_morocco.jpg',
            description: 'Sand bottom beach break with peaky left and rights. Great for improver/beginners, closes out on big swells. To the left, around the headland, is Banana Point and for the experienced surfer a gem lies between the two spots. Can be crowded on the weekends with locals. Relaxed vibe and great cafe on the beach.',
            level: 'Intermediate',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Boilers',
            lat: '',
            long: '',
            country: 'Morocco',
            region: 'Central Morocco',
            image: 'https://surfberbere.com/wp-content/uploads/2016/03/anchor_point_surf_berbere_taghazout_holiday_surf_camp_morocco.png',
            description: 'Just south of the lighthouse of Cap Rhir, a washed-up ship boiler gives its name to this consistent and powerful righthander. Vertical lips and speed walls are held up by funnelling trade winds, bouncing off the hills. Experts only as it’s tricky getting in and out because of the urchins and sharp rock shelf. Try the keyhole from behind the large rock to the N. Always bigger than Tarhazoute so it’s often crowded.',
            level: 'Advanced',
            typeOfWave: 'Point Break',
            user: users[0]
          },
          {
            spotName: 'Imsouane',
            lat: '',
            long: '',
            country: 'Morocco',
            region: 'Central Morocco',
            image: 'https://www.surfholidays.com/accommodation/morocco/imsouane/travel-surf-morocco',
            description: 'Last stop before Tarhazoute, Immesouane remained authentic until the modern fishing port was built. Fortunately the long, mellow rights keep wrapping into the well-protected south-facing bay, while several well-defined peaks grace the cathedral side. Highly consistent and sometimes crowded.',
            level: 'Beginners',
            typeOfWave: 'Point Break',
            user: users[0]
          },
          {
            spotName: 'Killer Point',
            lat: '',
            long: '',
            country: 'Morocco',
            region: 'Taghazout',
            image: 'https://surfberbere.com/wp-content/uploads/2016/03/Killer-Point.jpg',
            description: '‘Killers’ is the most consistent Tarhazoute pointbreak, sucking up all available N-W swells. It’s always bigger than it looks and the paddle-out takes close to 15mins at high tide. In small swells, at low tide, the peak in front of the cliff has a short left (heading straight into some rocky caves) and a sectioning right. As the swell increases, the take-off area moves south and powerful, vertical walls, rumble down the point. Occasional barrels and difficult to make sections. The inside fires at high tide as it’s fully protected from N winds. Handles a lot of size.',
            level: 'Advanced',
            typeOfWave: 'Point Break',
            user: users[0]
          },
          {
            spotName: 'Safi',
            lat: '',
            long: '',
            country: 'Morocco',
            region: 'Central Morocco',
            image: 'https://theperfectwave.itravelsoftware.com/fotografije_itravel/816/3137_635534102310855326_800_533.jpg',
            description: 'Safi’s “Garden” remained semi-secret for a long time, with those in the know understandably protective of the long, ultra-fast, throaty barrels that fire down the point north of Safi. Unfortunately, it is very fickle, only breaking in big swells at low tide. There are more rights in the area under similar conditions.',
            level: 'Advanced',
            typeOfWave: 'Point Break',
            user: users[0]
          },
          {
            spotName: 'Tamri',
            lat: '',
            long: '',
            country: 'Morocco',
            region: 'Central Morocco',
            image: 'https://surfberbere.com/wp-content/uploads/2016/03/tamri_morocco_surf_spot.png',
            description: 'Located at the mouth of a ‘oued’ irrigating banana plantations, this ultra consistent beachbreak is the go when Tarhazoute is flat. Unfortunately it is onshore in the N winds. Strong rips at 4ft+.',
            level: 'Advanced',
            typeOfWave: 'Reef Break',
            user: users[0]
          },
          {
            spotName: 'Banana Point',
            lat: '',
            long: '',
            country: 'Morocco',
            region: 'Central Morocco',
            image: 'https://surfberbere.com/wp-content/uploads/2016/03/tamri_morocco_surf_spot.png',
            description: 'Located at the mouth of a ‘oued’ irrigating banana plantations, this ultra consistent beachbreak is the go when Tarhazoute is flat. Unfortunately it is onshore in the N winds. Strong rips at 4ft+.',
            level: 'Beginners',
            typeOfWave: 'Point Break',
            user: users[0]
          },

          {
            spotName: 'Tapia de Casariego',
            Lat: '43.5702° N',
            Long: '6.9439° W',
            country: 'Spain',
            region: 'Asturias',
            image: 'https://lasplayas.net/wp-content/uploads/2018/05/playa-penarronda.jpg',
            description: `Good-quality, consistent beachbreak with semi-permanent, hollow lefthander, fed by a stream. Best mid to low tide, outgoing. Some shelter from NE sea breezes in summer, but it is a year-round wave.
          Popular surfing beach and contest site that’s often crowded. La Paloma is a small swell spot west of town. Near to town of Tapia de Casariego. Good beach facilities and camping nearby, popular with travelling surfers. Surf shop in nearby town.`,
            level: 'Beginner',
            typeOfWave: 'Reef Break',
            user: users[0]
          },
          {
            spotName: 'San Lorenzo',
            lat: '28.0913° N',
            long: '16.6574° W',
            country: 'Spain',
            region: 'Asturias',
            image: 'https://gibspain.com/wp-content/uploads/2018/02/Playa-de-San-Lorenzo-Gij%C3%B3n-Asturias-Spain.jpg',
            description: `Average-quality beachbreak, picks up a limited amount of swell but surfable during most tides. SW wind OK. Often crowded. This beach is right in the centre of the city of Gijon. Parking is difficult year-round, with meters or expensive underground carparks. Good beach facilities including a surf school,
                        plus shops and bars at hand and camping fairly nearby. Residential and stormwater pollution.`,
            level: 'Intermediate',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Playa De Berria',
            lat: '43.4645° N',
            long: '3.4656° W',
            country: 'Spain',
            region: 'Cantabria',
            image: 'https://turismodecantabria.com/imagenes/Playas/CDBE773B-42AD-53EA-E6A6-4BA521F5638B.jpg/resizeMod/0/1200/imagen.jpg',
            description: `Quite long beach with several peaks, depending on sandbars and state of tide. Needs at least a medium swell to work. Moderately consistent.
          Fairly uncrowded. Quiet spot, practically deserted in winter. Fairly popular with beachgoers in summer. Parking not normally a problem, except during the busiest times. 
          Good beach facilities. Camping nearby. Slightly polluted.`,
            level: 'Beginner',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Playa De Cuberris',
            lat: '43.4962° N',
            long: '3.6151° W',
            country: 'Spain',
            region: 'Cantabria',
            image: 'https://live.staticflickr.com/4084/4963802369_cddf286de1_b.jpg',
            description: '250m long sand beach in a beautiful bay. Big parking, Cafés and Restaurants close by. Venue for many Beach volleyball tournaments and my preferred sport.',
            level: 'Intermediate',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Pantin',
            lat: '43.6373° N',
            long: '8.1200° W',
            country: 'Spain',
            region: 'Galicia',
            image: 'http://www.pantinsurfcamp.com/imagenes/img2Localizacion.jpg',
            description: `The most popular surf spot in Galicia, home to an annual pro contest. Ultra consistent, Pantin hoovers up W-NW swell and can hold quite a bit of size. Both left and right peaks can line up and spitting barrels are common. 
          Better low to mid but surfable on all tides. Strong rips with paddling channel at northern end. Can get crowded, with some localism. Fills up in summer with beachgoers and travelling surfers. Good beach facilities and a carpark freecamp scene. Clean water.`,
            level: 'Intermediate',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Patos',
            lat: '43.6373° N',
            long: '8.1200° W',
            country: 'Spain',
            region: 'Galicia',
            image: 'http://www.turismo.gal/imaxes/mdaw/mduw/~edisp/~extract/TURGA050534~1~staticrendition/tg_carrusel_cabecera_grande.jpg',
            description: `Good quality left and righthand reefbreak. Fairly short rides with some barrel sections. Needs large NW swell and mid to high tide to get going. SW wind OK.
          Near to the city of Vigo, so always crowded when on, with a degree of localism. Surf shop nearby. Some residential and stormwater pollution.`,
            level: 'Beginners',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Torrevieja La Mata',
            lat: '38.0186° N',
            long: '0.6530° W',
            country: 'Spain',
            region: 'Mediterranean',
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/03/ac/8b/ed/la-mata-beach.jpg',
            description: 'Long open, east-facing beach north of Torrevieja. Surfers concentrate in the south where some rocks help to stabalise the sand. Mostly rights. Medium consistency and sometimes crowded.',
            level: 'Intermediate',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Playa de Mundaka',
            lat: '43.4047° N',
            long: '2.6993° W',
            country: 'Spain',
            region: 'Pais Vasco',
            image: 'https://shipitwise.com/wp-content/uploads/2016/09/Mundaka-Spain.jpg',
            description: `Mundaka is a dream lefthand barrel and possibly the best rivermouth wave in the world. A long triangular sandbank catches the stronger NW swells, creating a long flawless tube with rides of up to 150-200 meters possible.
          Always crowded. Moderately dangerous, depending on swell size, wind and crowd. Be careful of the rip. Fairly consistent although almost never works in summer and only works from low to about mid tide.`,
            level: 'Advanced',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Sopelana',
            lat: '43.4047° N',
            long: '2.6993° W',
            country: 'Spain',
            region: 'Pais Vasco',
            image: 'https://photos.eltiempo.es/29/61/bac823c6adda67f8b2882b9d580d65e1_720x560.jpg',
            description: `Very consistent beachbreak with several peaks. Good semi-permanent high-tide peak at western end of beach. Works on small to medium swells. 
                      One of the most crowded spots in Spain. Highly competitive. Surf shops and camping nearby. Estuarine and stormwater pollution, particularly after heavy rains.`,
            level: 'Beginners',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Arrifina Costa Vicentina',
            Lat: '37.2941° N',
            Long: '8.8639° W',
            country: 'Portugal',
            region: 'Aljezur',
            image: 'https://algarvevillasblog.files.wordpress.com/2017/07/020-stranden-costa-vicentina-05-arrifana.jpg',
            description: `Beneath the white-washed village and massive cliffs is a busy and very ordinary BeachBreak that works throughout the tide, picks up most swell and has wind shelter. The real reason to visit Arrifana is the world-class, right pointBreak at the Beaches northern end. Waves here are long, fast and very heavy with shAllow boils and barrel sections. It needs to be at least 2m (6ft) to start Breaking and holds up to triple overhead.
          Be careful of the two large rocks on the inside, urchins, rips and locals. Not a Beginner’s wave. Easy parking, showers, lifeguard (for the surf schools), a surfshop (in Aljezur) and camping nearby.`,
            level: 'Intermediate',
            typeOfWave: 'Point Break',
            user: users[0]
          },
          {
            spotName: 'Praia Do Amado Costa Vicentina',
            Lat: '37.1673° N',
            Long: '8.9023° W',
            country: 'Portugal',
            region: 'Algarve',
            image: 'https://secureservercdn.net/166.62.112.199/rbe.285.myftpupload.com/wp-content/uploads/2019/04/2016-12-08-algarve-surf-Beaches-amado-Beach-jpg.jpg',
            description: `Praia do Amado offers a lot of variety on many different wave conditions. It has great right and left running waves so offers waves for both goofy and regular footed surfers.
          Tides do not effect waves and it can be surfed generAlly All year round, being one of the most consistent in the Algarve as it is open to All Atlantic swells, while still being sheltered by the north west winds.
          Amado Beach is in a protected area where no development is Allowed so the Surf Schools and Accommodation are located in towns such as Lagos and they travel to Amado Beach each day to surf.
          Beach Break – lefts/rights – some low rocks`,
            level: 'Beginner',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Praia de Carcavelos Carcavelos',
            Lat: '38.6796° N',
            Long: '9.3360° W',
            country: 'Portugal',
            region: 'Lisbon',
            image: 'https://www.surfholidays.com/assets/images/blog/2016-12-20-Carcavelos_surf_Beach_surfholidays_3.jpg',
            description: `The original and still one of the best Portuguese surf spots, Carcavelos is a awesome BeachBreak. Beside the fort at the eastern end, cylindrical lefts roll over shifting sandbars, attracting seemingly every surfer in the city and most of the foreign surfers on the Costa Estoril. Best on a SW swell, when power intensifies and the occasional right appears.
          Highly consistent, always crowded, rips, some localism, pay to park and there are All facilities.`,
            level: 'Beginner',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Ericeira',
            Lat: '38.9668° N',
            Long: '9.4062° W',
            country: 'Portugal',
            region: 'Mafra',
            image: 'https://ola-onda-ericeira.com/wp-content/uploads/2017/04/Ribeira-DIlhas-Ericeira-Surf-Spot-Guide-Portugal-1024x722.jpg',
            description: `Ericeira is the Mecca of Portuguese surf and like Peniche, it offers a truly staggering variety of waves, crammed into just a few kilometres of coast. There's something to suit every standard but unlike Peniche, most of these waves are rock bottomed and there is little wind or swell shelter. Coxos is the best known wave, a long, hollow world class right, but sitting proudly next to it in the quality stakes are the barrels of Pedra Branca and Reef. Such high class waves attract crowds and with Lisbon only a short drive away there are no shortages of surfers wanting a piece of Ericeira action. This lively and attractive town is a year round surf destination with the Beach Breaks to the south of town being the best bet in the smAll summer season and the Reefs and points the main event for the remainder of the year.`,
            level: 'All levels',
            typeOfWave: 'All Types',
            user: users[0]
          },
          {
            spotName: 'Praia do Norte Nazaré',
            Lat: '39.6120° N',
            Long: '9.0854° W',
            country: 'Portugal',
            region: 'Oeste',
            image: 'https://www.surfertoday.com/images/stories/praiadonortewave.jpg',
            description: `People are only just beginning to wake up to the potential of Nazaré. A finger of deep water points directly at the Beach to the north of town and the result is similar to La Nord in Hossegor. Huge, heavy and hollow Beach peaks for the brave.
          Be warned - currents can be strong, and giant clean up sets are guaranteed when it’s on, which isn’t that often as it’s wind exposed. The main town Beach offers a sheltered little wedge on big swells.`,
            level: 'Advanced',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Peniche',
            Lat: '39.3603° N',
            Long: '9.3876° W',
            country: 'Portugal',
            region: 'Oeste',
            image: 'https://cdn.thecrazytourist.com/wp-content/uploads/2017/07/Surfing-1-1024x683.jpg',
            description: `The little fishing town of Peniche is not the prettiest spot on the Portuguese coast, but it's probably the most renowned surfing area in the country. OriginAlly an island, Peniche became one with the mainland due to the silting up of the shAllow channel that divided it from the rest of the country. Today that short and narrow spit of land contains an obscene amount of wave variety that can provide the goods in almost any conditions. Most famous is Supertubos, regarded by many as one of Europe's best Beach Breaks, but there are plenty of other barrels to pull into around Peniche.
          Peniche is a year round destination with swell exposure on the north side of the town and shelter on the south. The town also sits at the dividing point between the cooler and wetter north and the dry, sunny south meaning that summers are long but tempered by cool sea breezes and the winters mild though occasionAlly stormy.`,
            level: 'All levels',
            typeOfWave: 'All Types',
            user: users[0]
          },
          {
            spotName: 'Praia do cabedelo Figueira da Foz',
            Lat: '40.1400° N',
            Long: '8.8627° W',
            country: 'Portugal',
            region: 'Coimbra',
            image: 'https://www.surftotal.com/en/media/k2/gAlleries/550/01.png',
            description: `Cabedelo in North Portugal is an exposed Beach/pier Break that has pretty consitent surf and can work at any time of the year. Offshore winds blow from the east. Tends to receive a mix of groundswells and windswells and the optimum swell angle is from the west.. When the surf is up, it can get quite busy in the water. Watch out for dangerous rips.`,
            level: 'Intermediate',
            typeOfWave: 'Jetty Break',
            user: users[0]
          },
          {
            spotName: 'Espinho',
            Lat: '41.0072° N',
            Long: '8.6410° W',
            country: 'Portugal',
            region: 'Aveiro',
            image: 'http://www.wavelengthmag.com/wp-content/uploads/2016/12/Screen-Shot-2016-12-08-at-15.25.52.png',
            description: `The best known surf spot in north Portugal Breaks off a jetty and runs through to the inside as a fast, wAlled up right that finAlly dies as a close out over shAllow rocks. Plenty of tubing moments with swells of up to 3m+ (10ft).
          The busiest spot in the area with the localism attitudes that you would expect. Very polluted.`,
            level: 'Intermediate',
            typeOfWave: 'Jetty Break',
            user: users[0]
          },
          {
            spotName: 'Sagres',
            Lat: '37.0168° N',
            Long: '8.9406° W',
            country: 'Portugal',
            region: '',
            image: 'https://coresites-cdn.factorymedia.com/surfeurope_new/wp-content/uploads/2016/01/algarve-surf.jpg',
            description: `The most consistent of the Sagres Beaches is generAlly pretty average. Lower tidal stages on the push are better as is a W swell. It doesn’t pick up as much swell as the west coast so it is a popular place for Beginner/Intermediates and the many local bodyboarders.
          Highly consistent, often crowded, currents and localism, but the water is clean, and amenities include showers, lifeguard, bodyboard surf school, surfshop and camping in town.`,
            level: 'All levels',
            typeOfWave: 'All Types',
            user: users[0]
          },
          {
            spotName: 'Paúl do Mar Madeira',
            Lat: '32.7591° N',
            Long: '17.2304° W',
            country: 'Portugal',
            region: 'Vila do Bispo',
            image: 'https://www.surfertoday.com/images/stories/jardimdomar.jpg',
            description: `Once named the best big-wave pointBreak in the world by Surfer Magazine, Ponta Jardim now suffers severe backwash at mid to high tide from a new seawAll built in 2003. The Break still has its days when the critical drops lead into long, fast, powerful wAlls, but they are much less frequent and only last for a few hours around dead low tide. Experts with pintails only.
          Getting in and out of the water on a big day can be downright frightening and the new seawAll has made the waves Break even closer to shore, so beware. Best shot is to paddle out from the backside of the point, to the west of the village.
          Follow main highway on south shore , past Ribeira Brava and Calheta, and look for signs for Jardim do Mar.`,
            level: 'Advanced',
            typeOfWave: 'Reef Break',
            user: users[0]
          },
          {
            spotName: 'Elands Bay',
            Lat: '32.3135° S',
            Long: '18.3505° E',
            country: 'South Africa',
            region: 'Western Cape',
            image: 'https://www.tripsavvy.com/thmb/8szKWZscFbWzeBdoNa1Ci47Qnps=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-90798727-5c0831cd46e0fb0001125ba2.jpg',
            description: `Located 135 miles/220 kilometres north of Cape Town on South Africa's West Coast, Elands is a top choice for surfers looking to avoid the crowds. There are a handful of guesthouses and self-catering rentals, but otherwise, it's pretty frontier. The wave here works best in summer when a southeaster holds up a westerly swell to produce a cranking left point Break. Don't forget your wetsuit and hoodie - the water here is freezing. `,
            level: 'Intermediate',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Long Beach',
            Lat: '34.1101° S',
            Long: '18.2530° E',
            country: 'South Africa',
            region: 'Western Cape',
            image: 'https://www.tripsavvy.com/thmb/ZErInaYtTcdF84RJNSo7GzMzYx4=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-618679962-5c08322646e0fb0001d07735.jpg',
            description: `An hour's drive south of Cape Town brings you to Long Beach in the tiny town of Kommetjie. Situated on the Atlantic side of the southern Cape Peninsula, the Beach offers the best and most consistent shore Break in the Cape (maybe second in the country after Durban). It works best on a southeaster in smAll to medium swell. If you're after a bigger ride, the Outer Kom kicks up massive curlers on a big westerly swell that are not for the faint-hearted.`,
            level: 'Intermediate',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Muizenberg',
            Lat: '34.136002° S',
            Long: '18.430000° E',
            country: 'South Africa',
            region: 'Western Cape',
            image: 'https://www.tripsavvy.com/thmb/vU6-rsMGinnKzJ3d49Ipko-N7wA=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/_-54WEB-5c784bc0c9e77c0001d19cca.jpg',
            description: `Nestled on the edge of False Bay, Muizenberg is home to an extremely popular swimming Beach cAlled Surfer's Corner. It's also known as a long boarders' paradise, and has a selection of surf schools renting out boards and wetsuits. In summer, it's best to get there early before the crowds and the pumping southeaster ruin things. This spot works best on a north-westerly in winter, but can be surfed most days of the year with a long board.`,
            level: 'All levels',
            typeOfWave: 'Beach Break',
            user: users[0]
          },
          {
            spotName: 'Still Baai',
            Lat: '33.9630° S',
            Long: '22.4617° E',
            country: 'South Africa',
            region: 'Western Cape',
            image: 'https://www.tripsavvy.com/thmb/se3n2DckfJ5KCu9gOG18POpGNXM=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-753293567-5be2a47646e0fb00265a3833.jpg',
            description: `Heading east from Cape Town, Stilbaai is one of several excellent surf spots along the Garden Route, with other constant producers including Mossel Bay, Plettenburg Bay, and Wilderness. Stilbaai has a pretty constant shore Break in front of the village, but those in the know wait for a big south to southeast swell, when the right-hand point Break reAlly grinds. If you're lucky, you'll be joined on backline by the bay's semi-resident dolphins.`,
            level: 'Beginner',
            typeOfWave: 'All Types',
            user: users[0]
          },
          {
            spotName: 'Victoria Bay',
            Lat: '34.0027° S',
            Long: '22.5510° E',
            country: 'South Africa',
            region: 'Western Cape',
            image: 'https://www.tripsavvy.com/thmb/6TOAqbUYEWF64BwYCidMBDcyQec=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/DSC_3661-5be2a4f2c9e77c0051048fd6.jpg',
            description: `A very narrow, steep-sided bay on the outskirts of George, Victoria Bay is jealously guarded by young locals when it's working well. Due to the shape of the bay, this spot operates most of the year and is suitable for surfers of All experience levels. If you're planning on hanging around for a while, try to get a booking at Lands End guesthouse, which touts itself as "the closest accommodation to the sea in Africa", making it ideal for surfers. `,
            level: 'All levels',
            typeOfWave: 'All Types',
            user: users[0]
          },
          {
            spotName: 'Cape St Francis',
            Lat: '34.1677° S',
            Long: '24.8315° E',
            country: 'South Africa',
            region: 'Eastern Cape',
            image: 'https://www.tripsavvy.com/thmb/iSNAtbq_a2ldtmrchbNfWnGIbDc=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-83204263-5c083316c9e77c000189eb31.jpg',
            description: `This spot is not to be confused with next-door St. Francis Bay, which was made famous by the '60s surf classic Endless Summer. The latter is unbeatable when the reticent wave known as Bruce's Beauties is pumping down the arm of the bay, creating barrels that literAlly roll for kilometers. At any other time, the Cape is a much better destination with a variety of point and shore Breaks, the best of which is Seal Point near the lighthouse.`,
            level: 'Intermediate',
            typeOfWave: 'Beach Break, Reef Break',
            user: users[0]
          },
          {
            spotName: 'Jeffreys Bay',
            Lat: '34.0333° S',
            Long: '24.9166° E',
            country: 'South Africa',
            region: 'Eastern Cape',
            image: 'https://www.tripsavvy.com/thmb/lSaHCR8u_Ds8OWn1VaWoQ6Y1RtQ=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-534624577-5c08337546e0fb0001206e41.jpg',
            description: `Supertubes, need we say more? Home of the World Surf League's annual J-Bay Open, this is South Africa's premier surf spot and one of the world's most consistent tubes. It's beloved by local giants like Jordy Smith, and has welcomed a slew of top overseas surfers (think Kelly Slater and Mick Fanning). However, Jeffreys is also one of the few places in the country where you could end up on the sharp end of local surf xenophobia. `,
            level: 'All levels',
            typeOfWave: 'All Types',
            user: users[0]
          },
          {
            spotName: 'Green Point',
            Lat: '33.9000° S',
            Long: '18.4000° E',
            country: 'South Africa',
            region: 'KwaZulu-Natal',
            image: 'https://www.tripsavvy.com/thmb/vui4X3ke0o1XnJa57Ui8C6nigIE=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-93103552-5be2a68fc9e77c0051a5b34a.jpg',
            description: `Located just north of Scottburgh on KwaZulu-Natal's South Coast, Green Point is one of the province's best-known surf spots. It needs a medium, southerly swell to get it going, but when it does, it's a classic right-hand point-Break that rivals several of its more famous counterparts down south. It can get busy on weekends, but for most of the year, it's a relatively off-the-beaten track option for those that don't like to compete too much for space. `,
            level: 'Beginner',
            typeOfWave: 'Point Break, Beach Break',
            user: users[0]
          },
          {
            spotName: 'Durban',
            Lat: '29.8302° S',
            Long: '31.0368° E',
            country: 'South Africa',
            region: 'KwaZulu-Natal',
            image: 'https://www.tripsavvy.com/thmb/qkfZIkcuVHfZTOBOdolWjOFRMWE=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-509251609-5c08346746e0fb000178e54c.jpg',
            description: `Sometimes referred to as the Bay of Plenty, Durban is a mecca for South African surfers. There is seldom a day when the wave is not working, and you can choose your spot according to the size of the swell. It gets bigger the further north you go, starting with Beginner-friendly waves in front of uShaka Marine World and progressing to the pro-worthy left and right-hand Breaks at New Pier. Keep an eye out for territorial locals at New Pier, Dairy and North Beach. `,
            level: 'Intermediate',
            typeOfWave: 'Point Break, River Mouth',
            user: users[0]
          },
          {
            spotName: 'Dungeons',
            Lat: '33.9415° S',
            Long: '18.3735° E',
            country: 'South Africa',
            region: 'Western Cape',
            image: 'https://www.tripsavvy.com/thmb/mxNuVs36k7fPso7dM0ZfT4oVQv4=/800x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-789382-5c08350f46e0fb0001d13883.jpg',
            description: `Classed as one of the world's “big wave” venues. The 15- to 30-foot swell at Dungeons Breaks over a shAllow Reef on the sea side of Hout Bay and is accessible only by watercraft. For the brave (and seriously experienced) only, the adrenaline rush is made even more intense by the fact that this area is one of the sharkiest surf spots in South Africa. `,
            level: 'Advanced',
            typeOfWave: 'Point Break, Beach Break',
            user: users[0]
          },

          {
            spotName: 'Mimizan',
            lat: '44.2004° N',
            long: '1.2280° W',
            country: 'France',
            region: 'Landes',
            image: 'https://www.ultimatefrance.com/wp-content/uploads/2017/01/surf-surfing-spot-waves-mimizan.jpg',
            description: 'Quiet place but with good enough waves to produce bodyboard champ Nicolas Capdeville. Four beaches on either side of the rivermouth that helps sculpt some good sandbars, particularly from mid to high tide.',
            level: 'Beginner',
            typeOfWave: 'Beach Break',
            user: users[0]
          },

          {
            spotName: 'Lacanau',
            lat: '45.0005° N',
            long: '1.2024° W',
            country: 'France',
            region: ' Gironde',
            image: 'https://www.ultimatefrance.com/wp-content/uploads/2017/01/surf-lacanau-line-up.jpg',
            description: 'ASP contest venue since 1979, this is surf central for the Bordeaux area. The reason? Consistent surf, easily checked from the boardwalk at Plage Centrale before opting for a session at La Nord, La Sud or Super Sud among 14km of beaches ideal with a medium size W-NW swell. Handles more size thanks to the deep scalloped baines around the rock jetties that are there to hold the sand in place. Every bit as good as Landes, especially in summer when it is often bigger in the W windswells. Fast peeling low tide runners or mid to high tide shories tapering into the rips are sometimes separated by a deep trench, or spin all the way through. Like all Biscay beachies, its fine for beginners when small and friendly, but a real challenge when overhead and bombing, not least because of the wicked rips.',
            level: 'Intermediate',
            typeOfWave: 'Beach Break',
            user: users[0]
          },

          {
            spotName: 'Côte Sauvage',
            lat: '45.7420° N',
            long: '1.2373° W',
            country: 'France',
            region: 'Poitou-Charente',
            image: 'http://baguetteshandlebarsdiscoverfrance.com/wp-content/uploads/2018/06/061418_1926_Top10things2.jpg',
            description: 'A concentration of some of the best spots in Brittany, with some hollow and powerful waves on a 2km stretch. Top-to-bottom, hard breathing barrels when a WSW swell meets an E wind. Port-Blanc is the first bay, gets some N wind shelter from a cliff and will probably be the busiest spot. Port Marie breaks far offshore and Port-Rhu is a well-defined, localised peak, while Port-Bara is more accessible. Some reef anchors the sandbars and large clusters of rock affect the line-up at high tides, so exit before dead high.',
            level: 'Intermediate',
            typeOfWave: 'Beach Break',
            user: users[0]
          },

          {
            spotName: 'Plage de Port Blanc',
            lat: '48.50° N',
            long: '3.18° W',
            country: 'France',
            region: 'Britanny South',
            image: '',
            description: '',
            level: 'Advanced',
            typeOfWave: 'Beach Break',
            user: users[0]
          },

          {
            spotName: 'Côte des Basques',
            lat: '43.4785° N',
            long: '1.5670° W',
            country: 'France',
            region: 'Basque Country',
            image: 'https://render.fineartamerica.com/images/rendered/default/poster/10/8/break/images-medium-5/plage-de-la-cote-des-basques-biarritz-john-harper.jpg',
            description: `The birthplace of France's surfing scene remains popular with longboarders enjoying mellow walls sheltered from northern winds. There's usually a peak close to the headland and another defined peak a bit further down the beach. While it is friendly and fun-loving for mals and beginners at knee to shoulder-high, there is a bit more energy at headhigh plus, especially if you drift south. The offshore islands filter and organise the swell a bit, but it is mainly a summer spot that is still rideable in the afternoon onshores.`,
            level: 'Intermediate',
            typeOfWave: 'Point Break',
            user: users[0]
          },

          {
            spotName: `Plage d'Hendaye`,
            lat: '43.3742° N',
            long: ' 1.7801° W',
            country: 'France',
            region: 'Basque Country',
            image: 'https://france3-regions.francetvinfo.fr/nouvelle-aquitaine/sites/regions_france3/files/styles/top_big/public/assets/images/2016/03/10/plage_hendaye.jpg?itok=S3KpMF4V',
            description: 'This is the answer when everything else is closing-out. A long stretch of average beachbreaks offers a wide choice of peaks; usually better close to the casino or the south jetty. The place is perfect for beginners, which explains the amazing number of surf schools. The two rocks of Les Deux Jumeaux to the northeast occasionally hold a solid right that requires patience. Further out off the eastern headland is Vanthrax, an imaginatively named death peak that spews out massive left barrels a handful of times a year. Crazy bodyboarders and pros only.',
            level: 'Intermediate',
            typeOfWave: 'Point Break',
            user: users[0]
          },

          {
            spotName: 'Les Culs Nus',
            lat: '43.6800° N',
            long: '1.4385° W',
            country: 'France',
            region: 'Landes',
            image: 'https://farm2.staticflickr.com/1519/24684452059_ef6ff276a0_b.jpg',
            description: 'The link between the normal beachbreaks to the north and the heavy shories of La Graviere. Usually better at mid to high tides with a moderate swell, because of the steeper beach angle. Powerful action close to shore.',
            level: 'Beginner',
            typeOfWave: 'Beach Break',
            user: users[0]
          },

          {
            spotName: 'Les Estagnots',
            lat: '43.6848° N',
            long: '1.4378° W',
            country: 'France',
            region: 'Landes',
            image: 'https://spot-thumbnails.cdn-surfline.com/spots/584204204e65fad6a7708fec/584204204e65fad6a7708fec_1500.jpg',
            description: 'Top quality peaks when a good W-NW swell hits the sand. Handles a bit more size than Bourdaines and Penon, but expect severe long-shore drift when bigger. High tide inside banks can be hollow and fast.',
            level: 'Intermediate',
            typeOfWave: 'Beach Break',
            user: users[0]
          },

          {
            spotName: 'Hossegor (La Nord)',
            lat: '43.6674° N',
            long: '1.4417° W',
            country: 'France',
            region: 'Landes',
            image: 'https://media-cdn.tripadvisor.com/media/vr-splice-j/07/78/b3/b8.jpg',
            description: 'Usually the only rideable beachbreak north of Capbreton when the swell heads towards 3m on the Biscay buoy. The shifting, outside bank holds triple overhead plus and favours rights into the rip torn paddling channel. Steep drops and fast walls with barrel sections mean extra inches are a good idea. Can work at all tides but mid is the best bet. Going left often leads to a punishing paddle back out as the deeper, defined paddling channel is usually south of the waves towards Centrale.',
            level: 'Beginner',
            typeOfWave: 'Beach Break',
            user: users[0]
          },

          {
            spotName: 'Hossegor (La Graviere)',
            lat: '43.6738° N',
            long: '1.4409° W',
            country: 'France',
            region: 'Landes',
            image: 'https://i.pinimg.com/originals/a2/db/16/a2db16de5f2509377b73773512da2a39.jpg',
            description: 'Sited on an old gravel pit, this is the legendary Hossegor tube spot. Dredging the rivermouth has affected wave quality in the past, but it is back with a vengeance, hosting pro-surfing competitions in huge conditions, including the 2011 Quik Pro. Sometimes white-caps outside, rolls in and reforms, standing up over the shallow inside bars. Heavy, thick-lipped beasts, break perilously close to shore and often close-out, snapping more boards than just about anywhere. Tidal range radically affects the window for ideal conditions, as does swell period, which decides if it is messy and inconsistent or lined-up and bombing through. The rip speed usually rises in direct proportion with the swell height and on big days, only the tow crew will be able to get into the sets before being swept south in the current.',
            level: 'Intermediate',
            typeOfWave: 'Beach Break',
            user: users[0]
          }
        ]
        )
      })
      .then(spots => console.log(`${spots.length} Spots created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)