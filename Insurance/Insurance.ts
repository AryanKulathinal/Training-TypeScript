import * as readline from 'readline';

interface User {
    age: number;
    location: string;
    drivingHistory: number;
}

interface Vehicle {
    type: string;
    age: number;
}

function calculatePremium(user: User, vehicle: Vehicle): number {
    const basePremium = 500;

    let ageFactor = 1;
    if (user.age < 25) {
        ageFactor = 1.5;
    } else if (user.age > 60) {
        ageFactor = 1.2;
    }

    let vehicleTypeFactor = 1;
    if (vehicle.type === 'motorcycle') {
        vehicleTypeFactor = 1.3;
    }

    let vehicleAgeFactor = 1;
    if (vehicle.age < 2) {
        vehicleAgeFactor = 0.9;
    } else if (vehicle.age > 10) {
        vehicleAgeFactor = 1.2;
    }

    let drivingHistoryFactor = 1;
    if (user.drivingHistory > 0) {
        drivingHistoryFactor = 1.5;
    }

    let locationFactor = 1;
    if (user.location === 'urban') {
        locationFactor = 1.2;
    }

    const totalPremium = basePremium * ageFactor * vehicleTypeFactor * vehicleAgeFactor * drivingHistoryFactor * locationFactor;
    return totalPremium;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => rl.question(question, resolve));
}

async function getInsuranceDetails() {
    const age = parseInt(await askQuestion('Enter your age: '), 10);
    const location = await askQuestion('Enter your location (urban/rural): ');
    const drivingHistory = parseInt(await askQuestion('Enter the number of traffic violations/accidents you have had: '), 10);
    const vehicleType = await askQuestion('Enter your vehicle type (car/motorcycle): ');
    const vehicleAge = parseInt(await askQuestion('Enter the age of your vehicle (in years): '), 10);

    const user: User = { age, location, drivingHistory };
    const vehicle: Vehicle = { type: vehicleType, age: vehicleAge };

    const premium = calculatePremium(user, vehicle);
    console.log(`Your estimated insurance premium is: $${premium.toFixed(2)}`);

    rl.close();
}

getInsuranceDetails();
