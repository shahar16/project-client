const stores = [
  {
    storeID:  '17',
    name:     'ACE',
    desc:     'this is test store',
    owner:    'Eyal.Narkis@gmail.com',
    contact:  {
      email:       'shaharyig@gmail.com',
      phoneNumber: '0545340025',
      adress:      {
        city:     'Tel Aviv',
        street:   'Hakovshim',
        houseNum: 41,
      }
    },
    images:   [
      'uploads/dummy@email.com-2875-116699550_10159729561322439_4272521058269525974_n.jpg',
      'uploads/dummy@email.com-5622-117140860_10159729561802439_7743082863726720689_n.jpg'
    ],
    products: [1, 2]
  },
  {
    storeID:  'bb22f0b4-299c-4434-aead-db9945b99854-',
    name:     'test store - update should fail',
    desc:     'this is test store',
    owner:    'Eyal.Kala@gmail.com',
    contact:  {
      email:       'shaharyig@gmail.com',
      phoneNumber: '0545340025',
      adress:      {
        city:     'Tel Aviv',
        street:   'Hakovshim',
        houseNum: 41,
      }
    },
    images:   [
      'uploads/dummy@email.com-2875-116699550_10159729561322439_4272521058269525974_n.jpg',
      'uploads/dummy@email.com-5622-117140860_10159729561802439_7743082863726720689_n.jpg'
    ],
    products: [1, 2, 3]
  },
  {
    storeID:  '',
    name:     'stam store',
    desc:     'this is test store',
    owner:    'Eyal.Kala@gmail.com',
    contact:  {
      email:       'shaharyig@gmail.com',
      phoneNumber: '0545340025',
      adress:      {
        city:     'Tel Aviv',
        street:   'Hakovshim',
        houseNum: 41,
      }
    },
    images:   [
      'uploads/dummy@email.com-2875-116699550_10159729561322439_4272521058269525974_n.jpg',
      'uploads/dummy@email.com-5622-117140860_10159729561802439_7743082863726720689_n.jpg'
    ],
    products: [1, 2, 3, 4]
  },
]

export default stores