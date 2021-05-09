const bcrypt = require('bcrypt');

const data = {
    users: [
        {
            name: 'Ishant',
            email: 'ishant.sharma@sjsu.edu',
            password: bcrypt.hashSync('1234', 10),
            isAdmin: true,
            location: "San Jose",
            certification: "certified",
            description: "wholesale distributor"
        },
        {
            name: 'John',
            email: 'john.padilla@sjsu.edu',
            password: bcrypt.hashSync('1234', 10),
            location: "San Diego",
            certification: "certified",
            description: "distributor"
        },

    ],
    products:[
        {
            _id: '1',
            name: 'Organic Apples',
            image: '/images/appleImage.jpg',
            price: 1.3,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },

        {
            _id: '2',
            name: 'Bananas',
            image: '/images/bananaImage.jpg',
            price: 3,
            countInStock : 50,
            description: 'fresh from the farm bananas',
        },

        {
            _id: '3',
            name: 'Blueberries',
            image: '/images/blueberryImage.jpg',
            price: 1,
            countInStock : 50,
            description: 'hand picked blueberries staright from the farms',
        },

        {
            _id: '4',
            name: 'Broccolis',
            image: '/images/broccoliImage.jpg',
            price: 1.9,
            countInStock : 50,
            description: 'Add some broccoli facts',
        },
        {
            _id: '5',
            name: 'cabbage',
            image: '/images/cabbageImage.jpg',
            price: 1.5,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '6',
            name: 'Fresh Orange Carrots',
            image: '/images/carrotImage.jpg',
            price: 2,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '7',
            name: 'Cocoa Beans',
            image: '/images/cocoabeanImage.jpg',
            price: 16,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '8',
            name: 'Sweet Corn Bushels',
            image: '/images/cornImage.jpg',
            price: 3.5,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '9',
            name: 'lettuce',
            image: '/images/lettuceImage.jpg',
            price: 1,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '10',
            name: 'Organic Oranges',
            image: '/images/orangeImage.jpg',
            price: 1.3,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '11',
            name: 'White Potatoes',
            image: '/images/potatoImage.jpg',
            price: 0.7,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '12',
            name: 'Rasberries',
            image: '/images/rasberriesImage.jpg',
            price: 8,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '13',
            name: 'Red Onions',
            image: '/images/redOnionImage.jpg',
            price: 1.4,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '14',
            name: 'Farmed Spring Onions',
            image: '/images/springOnionImage.jpg',
            price: 2,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '15',
            name: 'Strawberries',
            image: '/images/strawberryImage.jpg',
            price: 3.5,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '16',
            name: 'Herbal Tea Leaves',
            image: '/images/tealeavesImage.jpg',
            price: 25,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '17',
            name: 'Organic Roma Tomatoes',
            image: '/images/tomatoImage.jpg',
            price: 2,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '18',
            name: 'Watermelon',
            image: '/images/watermelonImage.jpg',
            price: 0.5,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        {
            _id: '19',
            name: 'White Onions',
            image: '/images/whiteOnionImage.jpg',
            price: 1.5,
            countInStock : 50,
            description: 'freshly farmed organic apples',
        },

        {
            _id: '20',
            name: 'Coffee Beans',
            image: '/images/coffeebeanImage.jpg',
            price: 3,
            // countInStock : 50,
            description: 'freshly farmed organic apples',
        },
        
    ],
};
module.exports = data;