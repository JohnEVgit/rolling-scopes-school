const categoryes = [
    {
        category: 'Summer (set A)',
        image: 'assets/img/beach.svg'
    },
    {
        category: 'Summer (set B)',
        image: 'assets/img/sun.svg'
    },
    {
        category: 'Winter',
        image: 'assets/img/snowman.svg'
    },
    {
        category: 'Farm Animal (set A)',
        image: 'assets/img/cow.svg'
    },
    {
        category: 'Farm Animal (set B)',
        image: 'assets/img/piglet.svg'
    },
    {
        category: 'Clothing',
        image: 'assets/img/suit.svg'
    },
    {
        category: 'Job (set A)',
        image: 'assets/img/doctor.svg'
    },
    {
        category: 'Job (set B)',
        image: 'assets/img/miner.svg'
    },
];

const cards = [
    [
        {
            word: 'beach',
            translation: 'пляж',
            image: 'assets/img/beach.svg',
            audioSrc: 'assets/audio/pronunciation_en_beach.mp3'
        },
        {
            word: 'barbecue',
            translation: 'барбекю',
            image: 'assets/img/barbecue.svg',
            audioSrc: 'assets/audio/pronunciation_en_barbecue.mp3'
        },
        {
            word: 'fan',
            translation: 'вентилятор',
            image: 'assets/img/fan.svg',
            audioSrc: 'assets/audio/pronunciation_en_fan.mp3'
        },
        {
            word: 'camping',
            translation: 'отдых на природе',
            image: 'assets/img/camping.svg',
            audioSrc: 'assets/audio/pronunciation_en_camping.mp3'
        },
        {
            word: 'bikini',
            translation: 'бикини',
            image: 'assets/img/bikini.svg',
            audioSrc: 'assets/audio/pronunciation_en_bikini.mp3'
        },
        {
            word: 'beach ball',
            translation: 'пляжный мяч',
            image: 'assets/img/beach_ball.svg',
            audioSrc: 'assets/audio/pronunciation_en_beach_ball.mp3'
        },
        {
            word: 'flip flops',
            translation: 'шлепки',
            image: 'assets/img/flip_flops.svg',
            audioSrc: 'assets/audio/pronunciation_en_flip-flops.mp3'
        },
        {
            word: 'hot',
            translation: 'жарко',
            image: 'assets/img/hot.svg',
            audioSrc: 'assets/audio/pronunciation_en_hot.mp3'
        },
        {
            word: 'ice cream',
            translation: 'мороженое',
            image: 'assets/img/ice_cream.svg',
            audioSrc: 'assets/audio/pronunciation_en_ice_cream.mp3'
        },
        {
            word: 'lemonade',
            translation: 'лимонад',
            image: 'assets/img/lemonade.svg',
            audioSrc: 'assets/audio/pronunciation_en_lemonade.mp3'
        }
    ],
    [
        {
            word: 'picnic',
            translation: 'пикник',
            image: 'assets/img/picnic.svg',
            audioSrc: 'assets/audio/pronunciation_en_picnic.mp3'
        },
        {
            word: 'pool',
            translation: 'бассейн',
            image: 'assets/img/pool.svg',
            audioSrc: 'assets/audio/pronunciation_en_pool.mp3'
        },
        {
            word: 'sailboat',
            translation: 'парусная лодка',
            image: 'assets/img/sailboat.svg',
            audioSrc: 'assets/audio/pronunciation_en_sailboat.mp3'
        },
        {
            word: 'sandcastle',
            translation: 'замок из песка',
            image: 'assets/img/sandcastle.svg',
            audioSrc: 'assets/audio/pronunciation_en_sandcastle.mp3'
        },
        {
            word: 'sun',
            translation: 'солнце',
            image: 'assets/img/sun.svg',
            audioSrc: 'assets/audio/pronunciation_en_sun.mp3'
        },
        {
            word: 'sunglasses',
            translation: 'солнцезащитные очки',
            image: 'assets/img/sunglasses.svg',
            audioSrc: 'assets/audio/pronunciation_en_sunglasses.mp3'
        },
        {
            word: 'surfing',
            translation: 'серфинг',
            image: 'assets/img/surfing.svg',
            audioSrc: 'assets/audio/pronunciation_en_surfing.mp3'
        },
        {
            word: 'swimming',
            translation: 'плавание',
            image: 'assets/img/swimming.svg',
            audioSrc: 'assets/audio/pronunciation_en_swimming.mp3'
        },
        {
            word: 'trunks',
            translation: 'плавки',
            image: 'assets/img/trunks.svg',
            audioSrc: 'assets/audio/pronunciation_en_trunks.mp3'
        },
        {
            word: 'watermelon',
            translation: 'арбуз',
            image: 'assets/img/watermelon.svg',
            audioSrc: 'assets/audio/pronunciation_en_watermelon.mp3'
        }
    ],
    [
        {
            word: 'boots',
            translation: 'сапоги',
            image: 'assets/img/boots.svg',
            audioSrc: 'assets/audio/pronunciation_en_boots.mp3'
        },
        {
            word: 'coat',
            translation: 'пальто',
            image: 'assets/img/coat.svg',
            audioSrc: 'assets/audio/pronunciation_en_coat.mp3'
        },
        {
            word: 'mittens',
            translation: 'рукавицы, варежки',
            image: 'assets/img/mittens.svg',
            audioSrc: 'assets/audio/pronunciation_en_mittens.mp3'
        },
        {
            word: 'ice',
            translation: 'лёд',
            image: 'assets/img/ice.svg',
            audioSrc: 'assets/audio/pronunciation_en_ice.mp3'
        },
        {
            word: 'scarf',
            translation: 'шарф',
            image: 'assets/img/scarf.svg',
            audioSrc: 'assets/audio/pronunciation_en_scarf.mp3'
        },
        {
            word: 'icicle',
            translation: 'сосулька',
            image: 'assets/img/icicle.svg',
            audioSrc: 'assets/audio/pronunciation_en_icicle.mp3'
        },
        {
            word: 'sled',
            translation: 'санки',
            image: 'assets/img/sled.svg',
            audioSrc: 'assets/audio/pronunciation_en_sled.mp3'
        },
        {
            word: 'snowflake',
            translation: 'снежинка',
            image: 'assets/img/snowflake.svg',
            audioSrc: 'assets/audio/pronunciation_en_snowflake.mp3'
        },
        {
            word: 'snowman',
            translation: 'снеговик',
            image: 'assets/img/snowman.svg',
            audioSrc: 'assets/audio/pronunciation_en_snowman.mp3'
        },
        {
            word: 'sweater',
            translation: 'свитер',
            image: 'assets/img/sweater.svg',
            audioSrc: 'assets/audio/pronunciation_en_sweater.mp3'
        }
    ],
    [
        {
            word: 'calf',
            translation: 'теленок',
            image: 'assets/img/calf.svg',
            audioSrc: 'assets/audio/pronunciation_en_calf.mp3'
        },
        {
            word: 'cat',
            translation: 'кот',
            image: 'assets/img/cat.svg',
            audioSrc: 'assets/audio/pronunciation_en_cat.mp3'
        },
        {
            word: 'cow',
            translation: 'корова',
            image: 'assets/img/cow.svg',
            audioSrc: 'assets/audio/pronunciation_en_cow.mp3'
        },
        {
            word: 'chicken',
            translation: 'циплёнок',
            image: 'assets/img/chicken.svg',
            audioSrc: 'assets/audio/pronunciation_en_chicken.mp3'
        },
        {
            word: 'dog',
            translation: 'собака',
            image: 'assets/img/dog.svg',
            audioSrc: 'assets/audio/pronunciation_en_dog.mp3'
        },
        {
            word: 'donkey',
            translation: 'осёл',
            image: 'assets/img/donkey.svg',
            audioSrc: 'assets/audio/pronunciation_en_donkey.mp3'
        },
        {
            word: 'duck',
            translation: 'утка',
            image: 'assets/img/duck.svg',
            audioSrc: 'assets/audio/pronunciation_en_duck.mp3'
        },
        {
            word: 'duckling',
            translation: 'утёнок',
            image: 'assets/img/duckling.svg',
            audioSrc: 'assets/audio/pronunciation_en_duckling.mp3'
        },
        {
            word: 'goat',
            translation: 'козёл',
            image: 'assets/img/goat.svg',
            audioSrc: 'assets/audio/pronunciation_en_goat.mp3'
        },
        {
            word: 'hen',
            translation: 'курица',
            image: 'assets/img/hen.svg',
            audioSrc: 'assets/audio/pronunciation_en_hen.mp3'
        }
    ],
    [
        {
            word: 'horse',
            translation: 'лошадь',
            image: 'assets/img/horse.svg',
            audioSrc: 'assets/audio/pronunciation_en_horse.mp3'
        },
        {
            word: 'goose',
            translation: 'гусь',
            image: 'assets/img/goose.svg',
            audioSrc: 'assets/audio/pronunciation_en_goose.mp3'
        },
        {
            word: 'lamb',
            translation: 'ягненок',
            image: 'assets/img/lamb.svg',
            audioSrc: 'assets/audio/pronunciation_en_lamb.mp3'
        },
        {
            word: 'pig',
            translation: 'свинья',
            image: 'assets/img/pig.svg',
            audioSrc: 'assets/audio/pronunciation_en_pig.mp3'
        },
        {
            word: 'piglet',
            translation: 'поросёнок',
            image: 'assets/img/piglet.svg',
            audioSrc: 'assets/audio/pronunciation_en_piglet.mp3'
        },
        {
            word: 'rabbit',
            translation: 'кролик',
            image: 'assets/img/rabbit.svg',
            audioSrc: 'assets/audio/pronunciation_en_rabbit.mp3'
        },
        {
            word: 'rooster',
            translation: 'петух',
            image: 'assets/img/rooster.svg',
            audioSrc: 'assets/audio/pronunciation_en_rooster.mp3'
        },
        {
            word: 'sheep',
            translation: 'овца',
            image: 'assets/img/sheep.svg',
            audioSrc: 'assets/audio/pronunciation_en_sheep.mp3'
        },
        {
            word: 'turkey',
            translation: 'индейка',
            image: 'assets/img/turkey.svg',
            audioSrc: 'assets/audio/pronunciation_en_turkey.mp3'
        }
    ],
    [
        {
            word: 'belt',
            translation: 'ремень',
            image: 'assets/img/belt.svg',
            audioSrc: 'assets/audio/pronunciation_en_belt.mp3'
        },
        {
            word: 'dress',
            translation: 'платье',
            image: 'assets/img/dress.svg',
            audioSrc: 'assets/audio/pronunciation_en_dress.mp3'
        },
        {
            word: 'gloves',
            translation: 'перчатки',
            image: 'assets/img/gloves.svg',
            audioSrc: 'assets/audio/pronunciation_en_gloves.mp3'
        },
        {
            word: 'hat',
            translation: 'шапка, шляпа',
            image: 'assets/img/hat.svg',
            audioSrc: 'assets/audio/pronunciation_en_hat.mp3'
        },
        {
            word: 'pants',
            translation: 'брюки',
            image: 'assets/img/pants.svg',
            audioSrc: 'assets/audio/pronunciation_en_pants.mp3'
        },
        {
            word: 'skirt',
            translation: 'юбка',
            image: 'assets/img/skirt.svg',
            audioSrc: 'assets/audio/pronunciation_en_skirt.mp3'
        },
        {
            word: 'socks',
            translation: 'носки',
            image: 'assets/img/socks.svg',
            audioSrc: 'assets/audio/pronunciation_en_socks.mp3'
        },
        {
            word: 'suit',
            translation: 'костюм',
            image: 'assets/img/suit.svg',
            audioSrc: 'assets/audio/pronunciation_en_suit.mp3'
        },
        {
            word: 'tie',
            translation: 'галстук',
            image: 'assets/img/tie.svg',
            audioSrc: 'assets/audio/pronunciation_en_tie.mp3'
        },
        {
            word: 'vest',
            translation: 'жилет',
            image: 'assets/img/vest.svg',
            audioSrc: 'assets/audio/pronunciation_en_vest.mp3'
        },
    ],
    [
        {
            word: 'accountant',
            translation: 'бухгалтер',
            image: 'assets/img/accountant.svg',
            audioSrc: 'assets/audio/pronunciation_en_accountant.mp3'
        },
        {
            word: 'actor',
            translation: 'актер',
            image: 'assets/img/actor.svg',
            audioSrc: 'assets/audio/pronunciation_en_actor.mp3'
        },
        {
            word: 'architect',
            translation: 'архитектор',
            image: 'assets/img/architect.svg',
            audioSrc: 'assets/audio/pronunciation_en_architect.mp3'
        },
        {
            word: 'banker',
            translation: 'банкир',
            image: 'assets/img/banker.svg',
            audioSrc: 'assets/audio/pronunciation_en_banker.mp3'
        },
        {
            word: 'barber',
            translation: 'парикмахер',
            image: 'assets/img/barber.svg',
            audioSrc: 'assets/audio/pronunciation_en_barber.mp3'
        },
        {
            word: 'carpenter',
            translation: 'плотник',
            image: 'assets/img/carpenter.svg',
            audioSrc: 'assets/audio/pronunciation_en_carpenter.mp3'
        },
        {
            word: 'cashier',
            translation: 'кассир',
            image: 'assets/img/cashier.svg',
            audioSrc: 'assets/audio/pronunciation_en_cashier.mp3'
        },
        {
            word: 'chef',
            translation: 'повар',
            image: 'assets/img/chef.svg',
            audioSrc: 'assets/audio/pronunciation_en_chef.mp3'
        },
        {
            word: 'dentist',
            translation: 'зубной врач',
            image: 'assets/img/dentist.svg',
            audioSrc: 'assets/audio/pronunciation_en_dentist.mp3'
        },
        {
            word: 'doctor',
            translation: 'доктор',
            image: 'assets/img/doctor.svg',
            audioSrc: 'assets/audio/pronunciation_en_doctor.mp3'
        },
    ],
    [
        {
            word: 'farmer',
            translation: 'фермер',
            image: 'assets/img/farmer.svg',
            audioSrc: 'assets/audio/pronunciation_en_farmer.mp3'
        },
        {
            word: 'firefighter',
            translation: 'пожарный',
            image: 'assets/img/firefighter.svg',
            audioSrc: 'assets/audio/pronunciation_en_firefighter.mp3'
        },
        {
            word: 'lawyer',
            translation: 'юрист',
            image: 'assets/img/lawyer.svg',
            audioSrc: 'assets/audio/pronunciation_en_lawyer.mp3'
        },
        {
            word: 'mechanic',
            translation: 'механик',
            image: 'assets/img/mechanic.svg',
            audioSrc: 'assets/audio/pronunciation_en_mechanic.mp3'
        },
        {
            word: 'miner',
            translation: 'шахтер',
            image: 'assets/img/miner.svg',
            audioSrc: 'assets/audio/pronunciation_en_miner.mp3'
        },
        {
            word: 'musician',
            translation: 'музыкант',
            image: 'assets/img/musician.svg',
            audioSrc: 'assets/audio/pronunciation_en_musician.mp3'
        },
        {
            word: 'nurse',
            translation: 'медсестра',
            image: 'assets/img/nurse.svg',
            audioSrc: 'assets/audio/pronunciation_en_nurse.mp3'
        },
        {
            word: 'painter',
            translation: 'художник',
            image: 'assets/img/painter.svg',
            audioSrc: 'assets/audio/pronunciation_en_painter.mp3'
        },
        {
            word: 'pilot',
            translation: 'пилот',
            image: 'assets/img/pilot.svg',
            audioSrc: 'assets/audio/pronunciation_en_pilot.mp3'
        },
        {
            word: 'teacher',
            translation: 'учитель',
            image: 'assets/img/teacher.svg',
            audioSrc: 'assets/audio/pronunciation_en_teacher.mp3'
        },
    ],
];


export {categoryes, cards};