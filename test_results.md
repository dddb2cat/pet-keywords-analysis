# PawCalc Dog Calorie Calculator - Test Results

## Test Date: 2025-12-27

## Test Case: Basic Calorie Calculation

### Input:
- Dog Name: Buddy
- Weight: 25 kg
- Body Condition: Ideal Weight
- Activity Level: Casual Walker (moderate)

### Expected Output:
Using the RER formula: RER = 70 × (weight in kg)^0.75
- RER = 70 × (25)^0.75 = 70 × 11.18 = 783 kcal
- Daily Calories = RER × Activity Multiplier × Body Condition Multiplier
- Daily Calories = 783 × 1.4 (moderate) × 1.0 (ideal) = 1096 kcal

### Actual Output:
- **1096 calories per day** ✅

### Result: PASS

The calculator correctly computed the daily calorie needs based on:
1. Resting Energy Requirement (RER) formula
2. Activity level multiplier (1.4 for moderate/casual walker)
3. Body condition adjustment (1.0 for ideal weight)

## Features Verified:
- [x] Step-by-step wizard flow
- [x] Dog name personalization
- [x] Weight input with kg/lbs toggle
- [x] Body condition visual selector
- [x] Activity level with friendly labels
- [x] Results display with personalized recommendations
- [x] Calculate Again functionality
- [x] Back to Home navigation
