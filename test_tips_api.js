// Test file for Tips API endpoints
// Run this file to test the tips API

const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

// Sample tip data
const sampleTip = {
    tips: 'Drink warm water with honey and lemon in the morning for better digestion'
};

// Test functions
async function testCreateTip() {
    try {
        console.log('Creating a new tip...');
        const response = await axios.post(`${BASE_URL}/tips`, sampleTip);
        console.log('Tip created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating tip:', error.response?.data || error.message);
    }
}

async function testGetAllTips() {
    try {
        console.log('\nFetching all tips...');
        const response = await axios.get(`${BASE_URL}/tips`);
        console.log('All tips:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching tips:', error.response?.data || error.message);
    }
}

async function testGetTipById(tipId) {
    try {
        console.log(`\nFetching tip with ID: ${tipId}`);
        const response = await axios.get(`${BASE_URL}/tips/${tipId}`);
        console.log('Tip found:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching tip:', error.response?.data || error.message);
    }
}

async function testUpdateTip(tipId) {
    try {
        console.log(`\nUpdating tip with ID: ${tipId}`);
        const updateData = {
            tips: 'Drink warm water with honey, lemon, and ginger in the morning for better digestion and immunity'
        };
        const response = await axios.put(`${BASE_URL}/tips/${tipId}`, updateData);
        console.log('Tip updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating tip:', error.response?.data || error.message);
    }
}

async function testCreateMultipleTips() {
    try {
        console.log('\nCreating multiple tips...');
        const multipleTips = [
            { tips: 'First tip: Eat slowly and mindfully' },
            { tips: 'Second tip: Include seasonal fruits in your diet' },
            { tips: 'Third tip: Practice deep breathing exercises daily' }
        ];
        const response = await axios.post(`${BASE_URL}/tips/bulk`, multipleTips);
        console.log('Multiple tips created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating multiple tips:', error.response?.data || error.message);
    }
}

async function testDeleteTip(tipId) {
    try {
        console.log(`\nDeleting tip with ID: ${tipId}`);
        const response = await axios.delete(`${BASE_URL}/tips/${tipId}`);
        console.log('Tip deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting tip:', error.response?.data || error.message);
    }
}

// Run all tests
async function runAllTests() {
    console.log('=== Testing Tips API ===\n');

    // Create a tip
    const createdTip = await testCreateTip();

    // Get all tips
    await testGetAllTips();

    if (createdTip) {
        // Get tip by ID
        await testGetTipById(createdTip._id);

        // Update tip
        await testUpdateTip(createdTip._id);

        // Create multiple tips
        await testCreateMultipleTips();

        // Delete tip
        await testDeleteTip(createdTip._id);
    }

    console.log('\n=== All tests completed ===');
}

// Run tests if this file is executed directly
if (require.main === module) {
    runAllTests().catch(console.error);
}

module.exports = {
    testCreateTip,
    testGetAllTips,
    testGetTipById,
    testUpdateTip,
    testCreateMultipleTips,
    testDeleteTip
};
