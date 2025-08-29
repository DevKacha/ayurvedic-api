const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

// Function to add a single tip
async function addTip(tipText) {
    try {
        const response = await axios.post(`${BASE_URL}/tips`, {
            tips: tipText
        });
        console.log('Tip added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding tip:', error.response?.data || error.message);
    }
}

// Function to add multiple tips
async function addMultipleTips(tipsArray) {
    try {
        const response = await axios.post(`${BASE_URL}/tips/bulk`, tipsArray);
        console.log('Multiple tips added successfully:', response.data.length, 'tips');
        return response.data;
    } catch (error) {
        console.error('Error adding multiple tips:', error.response?.data || error.message);
    }
}

// Example usage
async function example() {
    console.log('=== Adding Tips Example ===\n');

    // Add a single tip
    console.log('Adding a single tip...');
    await addTip("Practice daily gratitude by writing down three things you're thankful for.");

    // Add multiple tips
    console.log('\nAdding multiple tips...');
    const newTips = [
        { tips: "Use natural remedies like honey and ginger for sore throat relief." },
        { tips: "Practice regular foot reflexology for better circulation and relaxation." },
        { tips: "Include adaptogenic herbs like ashwagandha for stress management." },
        { tips: "Practice regular earthing by walking barefoot on natural surfaces." },
        { tips: "Use natural remedies like neem and turmeric for skin health." }
    ];
    await addMultipleTips(newTips);

    console.log('\n=== Example completed ===');
}

// Export functions for use in other files
module.exports = {
    addTip,
    addMultipleTips
};

// Run example if this file is executed directly
if (require.main === module) {
    example().catch(console.error);
}
