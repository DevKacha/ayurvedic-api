const mongoose = require('mongoose');
require('dotenv').config();
const Tips = require('./models/Tips');

// Sample Ayurvedic tips data
const sampleTips = [
    {
        tips: "Drink warm water with honey and lemon in the morning for better digestion and detoxification."
    },
    {
        tips: "Eat your largest meal at lunchtime when your digestive fire (Agni) is strongest."
    },
    {
        tips: "Practice Abhyanga (self-massage) with warm sesame oil before bathing for better circulation."
    },
    {
        tips: "Include all six tastes (sweet, sour, salty, bitter, pungent, astringent) in your daily meals."
    },
    {
        tips: "Chew your food slowly and mindfully to improve digestion and nutrient absorption."
    },
    {
        tips: "Drink herbal tea with ginger, cardamom, and cinnamon to boost metabolism."
    },
    {
        tips: "Practice deep breathing exercises (Pranayama) daily for better oxygen flow and stress relief."
    },
    {
        tips: "Eat seasonal fruits and vegetables to maintain balance with nature's cycles."
    },
    {
        tips: "Avoid cold drinks and ice-cold foods as they weaken digestive fire."
    },
    {
        tips: "Take a short walk after meals to aid digestion and improve metabolism."
    },
    {
        tips: "Use ghee (clarified butter) in cooking for better nutrient absorption and brain health."
    },
    {
        tips: "Practice meditation for 10-15 minutes daily to reduce stress and improve mental clarity."
    },
    {
        tips: "Sleep early (before 10 PM) and wake up early (before 6 AM) for optimal health."
    },
    {
        tips: "Include turmeric in your daily diet for its anti-inflammatory and healing properties."
    },
    {
        tips: "Practice yoga asanas daily to maintain flexibility and balance in the body."
    },
    {
        tips: "Drink water from a copper vessel overnight for its antimicrobial properties."
    },
    {
        tips: "Eat dinner at least 3 hours before bedtime for better sleep quality."
    },
    {
        tips: "Use natural sweeteners like jaggery or honey instead of refined sugar."
    },
    {
        tips: "Practice oil pulling with sesame or coconut oil for oral health and detoxification."
    },
    {
        tips: "Include bitter foods like bitter gourd, fenugreek, and neem for liver health."
    },
    {
        tips: "Take a warm bath with Epsom salt to relax muscles and detoxify the body."
    },
    {
        tips: "Practice gratitude daily to maintain positive mental health and emotional balance."
    },
    {
        tips: "Use natural spices like cumin, coriander, and fennel in cooking for better digestion."
    },
    {
        tips: "Avoid eating when stressed or emotional as it affects digestion negatively."
    },
    {
        tips: "Practice Surya Namaskar (Sun Salutation) in the morning for energy and vitality."
    },
    {
        tips: "Include protein-rich foods like lentils, nuts, and seeds in your daily diet."
    },
    {
        tips: "Practice mindful eating by avoiding distractions like TV or phone during meals."
    },
    {
        tips: "Use natural remedies like ginger tea for common cold and cough."
    },
    {
        tips: "Practice regular fasting (Ekadashi or intermittent fasting) for detoxification."
    },
    {
        tips: "Include green leafy vegetables in your diet for essential vitamins and minerals."
    },
    {
        tips: "Practice regular exercise like walking, swimming, or cycling for overall fitness."
    },
    {
        tips: "Use natural face packs with turmeric, honey, and milk for glowing skin."
    },
    {
        tips: "Practice deep sleep hygiene by creating a calm and dark sleeping environment."
    },
    {
        tips: "Include probiotic foods like yogurt and fermented foods for gut health."
    },
    {
        tips: "Practice regular detoxification with herbal teas and natural cleansers."
    },
    {
        tips: "Use natural hair care with coconut oil, amla, and shikakai for healthy hair."
    },
    {
        tips: "Practice regular eye exercises to reduce digital eye strain and improve vision."
    },
    {
        tips: "Include omega-3 rich foods like flaxseeds and walnuts for brain health."
    },
    {
        tips: "Practice regular foot massage with warm oil for better circulation and relaxation."
    },
    {
        tips: "Use natural air purifiers like neem leaves and tulsi plants in your home."
    },
    {
        tips: "Practice regular detox baths with natural ingredients for skin health."
    },
    {
        tips: "Include calcium-rich foods like sesame seeds and green vegetables for bone health."
    },
    {
        tips: "Practice regular breathing exercises to improve lung capacity and oxygen flow."
    },
    {
        tips: "Use natural remedies for common ailments instead of over-the-counter medicines."
    },
    {
        tips: "Practice regular self-care rituals for mental and emotional well-being."
    },
    {
        tips: "Include antioxidant-rich foods like berries and dark chocolate in moderation."
    },
    {
        tips: "Practice regular stretching exercises to maintain flexibility and prevent injuries."
    },
    {
        tips: "Use natural cleaning products to reduce exposure to harmful chemicals."
    },
    {
        tips: "Practice regular digital detox to reduce screen time and improve mental health."
    },
    {
        tips: "Include fiber-rich foods in your diet for better digestion and gut health."
    },
    {
        tips: "Practice regular gratitude journaling for positive mental health and happiness."
    },
    {
        tips: "Use natural remedies for stress relief like lavender oil and chamomile tea."
    },
    {
        tips: "Practice regular water therapy by drinking adequate water throughout the day."
    },
    {
        tips: "Include vitamin C rich foods like citrus fruits and amla for immunity."
    },
    {
        tips: "Practice regular nature walks to connect with nature and reduce stress."
    },
    {
        tips: "Use natural remedies for better sleep like warm milk with turmeric."
    },
    {
        tips: "Practice regular self-massage with essential oils for relaxation and healing."
    },
    {
        tips: "Include iron-rich foods like spinach and dates for better blood health."
    },
    {
        tips: "Practice regular mindfulness exercises for better focus and concentration."
    },
    {
        tips: "Use natural remedies for skin care like aloe vera and rose water."
    },
    {
        tips: "Practice regular energy healing techniques like Reiki or Pranic healing."
    },
    {
        tips: "Include magnesium-rich foods like nuts and seeds for better muscle function."
    },
    {
        tips: "Practice regular sound therapy with mantras and healing sounds."
    },
    {
        tips: "Use natural remedies for hair growth like onion juice and coconut oil."
    },
    {
        tips: "Practice regular chakra balancing exercises for energy flow and balance."
    },
    {
        tips: "Include zinc-rich foods like pumpkin seeds and legumes for immunity."
    },
    {
        tips: "Practice regular mudra exercises for better energy flow and health."
    },
    {
        tips: "Use natural remedies for joint health like ginger and turmeric."
    },
    {
        tips: "Practice regular crystal healing for emotional and spiritual well-being."
    },
    {
        tips: "Include vitamin D rich foods and get adequate sunlight exposure."
    },
    {
        tips: "Practice regular aromatherapy with essential oils for mood enhancement."
    },
    {
        tips: "Use natural remedies for better memory like brahmi and ginkgo biloba."
    },
    {
        tips: "Practice regular energy clearing techniques for spiritual well-being."
    },
    {
        tips: "Include potassium-rich foods like bananas and sweet potatoes for heart health."
    },
    {
        tips: "Practice regular sound sleep techniques for better rest and recovery."
    },
    {
        tips: "Use natural remedies for better eyesight like triphala and amla."
    },
    {
        tips: "Practice regular energy protection techniques for spiritual safety."
    },
    {
        tips: "Include selenium-rich foods like Brazil nuts for thyroid health."
    },
    {
        tips: "Practice regular energy grounding exercises for stability and balance."
    },
    {
        tips: "Use natural remedies for better concentration like shankhpushpi and brahmi."
    },
    {
        tips: "Practice regular energy cleansing rituals for spiritual purification."
    },
    {
        tips: "Include chromium-rich foods like broccoli for blood sugar regulation."
    },
    {
        tips: "Practice regular energy activation techniques for vitality and strength."
    },
    {
        tips: "Use natural remedies for better liver health like milk thistle and dandelion."
    },
    {
        tips: "Practice regular energy harmonization for overall well-being and peace."
    }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected for seeding tips');
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Function to seed tips
async function seedTips() {
    try {
        // Clear existing tips
        await Tips.deleteMany({});
        console.log('Cleared existing tips');

        // Insert new tips
        const insertedTips = await Tips.insertMany(sampleTips);
        console.log(`Successfully seeded ${insertedTips.length} tips`);

        // Display some sample tips
        console.log('\nSample tips added:');
        insertedTips.slice(0, 5).forEach((tip, index) => {
            console.log(`${index + 1}. ${tip.tips}`);
        });

        console.log('\nSeeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding tips:', error);
        process.exit(1);
    }
}

// Run the seeding function
seedTips();
