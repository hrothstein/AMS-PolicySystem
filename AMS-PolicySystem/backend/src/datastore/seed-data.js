const { v4: uuidv4 } = require('uuid');

// 50 customers from bankingcoredemo (40 individuals + 10 businesses)
const seedPolicyholders = [
  // INDIVIDUAL customers (40)
  { customer_type: 'INDIVIDUAL', first_name: 'John', last_name: 'Smith', email: 'john.smith@email.com', phone: '555-0101', date_of_birth: '1985-03-15', address_line1: '123 Main St', city: 'New York', state: 'NY', postal_code: '10001', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Sarah', last_name: 'Johnson', email: 'sarah.johnson@email.com', phone: '555-0102', date_of_birth: '1990-07-22', address_line1: '456 Oak Ave', city: 'Los Angeles', state: 'CA', postal_code: '90001', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Michael', last_name: 'Williams', email: 'michael.williams@email.com', phone: '555-0103', date_of_birth: '1978-11-08', address_line1: '789 Pine Rd', city: 'Chicago', state: 'IL', postal_code: '60601', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Emily', last_name: 'Brown', email: 'emily.brown@email.com', phone: '555-0104', date_of_birth: '1992-05-30', address_line1: '321 Elm St', city: 'Houston', state: 'TX', postal_code: '77001', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'David', last_name: 'Jones', email: 'david.jones@email.com', phone: '555-0105', date_of_birth: '1983-09-12', address_line1: '654 Maple Dr', city: 'Phoenix', state: 'AZ', postal_code: '85001', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Jessica', last_name: 'Garcia', email: 'jessica.garcia@email.com', phone: '555-0106', date_of_birth: '1988-02-18', address_line1: '987 Cedar Ln', city: 'Philadelphia', state: 'PA', postal_code: '19019', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'James', last_name: 'Miller', email: 'james.miller@email.com', phone: '555-0107', date_of_birth: '1975-12-25', address_line1: '147 Birch Way', city: 'San Antonio', state: 'TX', postal_code: '78201', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Jennifer', last_name: 'Davis', email: 'jennifer.davis@email.com', phone: '555-0108', date_of_birth: '1995-06-14', address_line1: '258 Spruce Ct', city: 'San Diego', state: 'CA', postal_code: '92101', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Robert', last_name: 'Rodriguez', email: 'robert.rodriguez@email.com', phone: '555-0109', date_of_birth: '1980-10-05', address_line1: '369 Willow Pl', city: 'Dallas', state: 'TX', postal_code: '75201', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Linda', last_name: 'Martinez', email: 'linda.martinez@email.com', phone: '555-0110', date_of_birth: '1987-04-20', address_line1: '741 Ash Blvd', city: 'San Jose', state: 'CA', postal_code: '95101', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'William', last_name: 'Hernandez', email: 'william.hernandez@email.com', phone: '555-0111', date_of_birth: '1991-08-17', address_line1: '852 Poplar St', city: 'Austin', state: 'TX', postal_code: '78701', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Mary', last_name: 'Lopez', email: 'mary.lopez@email.com', phone: '555-0112', date_of_birth: '1984-01-28', address_line1: '963 Hickory Ave', city: 'Jacksonville', state: 'FL', postal_code: '32099', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Richard', last_name: 'Gonzalez', email: 'richard.gonzalez@email.com', phone: '555-0113', date_of_birth: '1979-07-09', address_line1: '159 Walnut Dr', city: 'Fort Worth', state: 'TX', postal_code: '76101', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Patricia', last_name: 'Wilson', email: 'patricia.wilson@email.com', phone: '555-0114', date_of_birth: '1993-11-03', address_line1: '357 Chestnut Rd', city: 'Columbus', state: 'OH', postal_code: '43004', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Thomas', last_name: 'Anderson', email: 'thomas.anderson@email.com', phone: '555-0115', date_of_birth: '1986-05-26', address_line1: '486 Sycamore Ln', city: 'Charlotte', state: 'NC', postal_code: '28201', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Barbara', last_name: 'Thomas', email: 'barbara.thomas@email.com', phone: '555-0116', date_of_birth: '1989-09-19', address_line1: '753 Magnolia Way', city: 'San Francisco', state: 'CA', postal_code: '94102', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Christopher', last_name: 'Taylor', email: 'christopher.taylor@email.com', phone: '555-0117', date_of_birth: '1982-03-07', address_line1: '951 Dogwood Ct', city: 'Indianapolis', state: 'IN', postal_code: '46201', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Susan', last_name: 'Moore', email: 'susan.moore@email.com', phone: '555-0118', date_of_birth: '1994-12-11', address_line1: '842 Redwood Pl', city: 'Seattle', state: 'WA', postal_code: '98101', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Daniel', last_name: 'Jackson', email: 'daniel.jackson@email.com', phone: '555-0119', date_of_birth: '1977-06-23', address_line1: '159 Juniper Blvd', city: 'Denver', state: 'CO', postal_code: '80201', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Karen', last_name: 'Martin', email: 'karen.martin@email.com', phone: '555-0120', date_of_birth: '1996-02-16', address_line1: '753 Fir St', city: 'Washington', state: 'DC', postal_code: '20001', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Matthew', last_name: 'Lee', email: 'matthew.lee@email.com', phone: '555-0121', date_of_birth: '1981-10-29', address_line1: '486 Beech Ave', city: 'Boston', state: 'MA', postal_code: '02101', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Nancy', last_name: 'Perez', email: 'nancy.perez@email.com', phone: '555-0122', date_of_birth: '1990-04-13', address_line1: '357 Larch Dr', city: 'Nashville', state: 'TN', postal_code: '37201', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Anthony', last_name: 'White', email: 'anthony.white@email.com', phone: '555-0123', date_of_birth: '1985-08-06', address_line1: '951 Hemlock Rd', city: 'Detroit', state: 'MI', postal_code: '48201', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Betty', last_name: 'Harris', email: 'betty.harris@email.com', phone: '555-0124', date_of_birth: '1992-01-21', address_line1: '842 Cypress Ln', city: 'Portland', state: 'OR', postal_code: '97201', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Mark', last_name: 'Sanchez', email: 'mark.sanchez@email.com', phone: '555-0125', date_of_birth: '1978-11-15', address_line1: '753 Alder Way', city: 'Las Vegas', state: 'NV', postal_code: '89101', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Helen', last_name: 'Clark', email: 'helen.clark@email.com', phone: '555-0126', date_of_birth: '1995-07-08', address_line1: '159 Cottonwood Ct', city: 'Memphis', state: 'TN', postal_code: '37501', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Steven', last_name: 'Ramirez', email: 'steven.ramirez@email.com', phone: '555-0127', date_of_birth: '1983-03-24', address_line1: '486 Palm Pl', city: 'Louisville', state: 'KY', postal_code: '40201', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Dorothy', last_name: 'Lewis', email: 'dorothy.lewis@email.com', phone: '555-0128', date_of_birth: '1989-12-02', address_line1: '357 Sequoia Blvd', city: 'Baltimore', state: 'MD', postal_code: '21201', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Paul', last_name: 'Robinson', email: 'paul.robinson@email.com', phone: '555-0129', date_of_birth: '1976-05-18', address_line1: '951 Bamboo St', city: 'Milwaukee', state: 'WI', postal_code: '53201', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Sandra', last_name: 'Walker', email: 'sandra.walker@email.com', phone: '555-0130', date_of_birth: '1991-09-11', address_line1: '842 Eucalyptus Ave', city: 'Albuquerque', state: 'NM', postal_code: '87101', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Andrew', last_name: 'Young', email: 'andrew.young@email.com', phone: '555-0131', date_of_birth: '1987-02-04', address_line1: '753 Mahogany Dr', city: 'Tucson', state: 'AZ', postal_code: '85701', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Ashley', last_name: 'Allen', email: 'ashley.allen@email.com', phone: '555-0132', date_of_birth: '1993-06-27', address_line1: '159 Teak Rd', city: 'Fresno', state: 'CA', postal_code: '93650', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Joshua', last_name: 'King', email: 'joshua.king@email.com', phone: '555-0133', date_of_birth: '1980-10-20', address_line1: '486 Rosewood Ln', city: 'Sacramento', state: 'CA', postal_code: '94203', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Kimberly', last_name: 'Wright', email: 'kimberly.wright@email.com', phone: '555-0134', date_of_birth: '1988-03-14', address_line1: '357 Ebony Way', city: 'Kansas City', state: 'MO', postal_code: '64101', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Kenneth', last_name: 'Scott', email: 'kenneth.scott@email.com', phone: '555-0135', date_of_birth: '1984-07-07', address_line1: '951 Cherry Ct', city: 'Mesa', state: 'AZ', postal_code: '85201', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Donna', last_name: 'Torres', email: 'donna.torres@email.com', phone: '555-0136', date_of_birth: '1992-11-30', address_line1: '842 Pecan Pl', city: 'Atlanta', state: 'GA', postal_code: '30301', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Brian', last_name: 'Nguyen', email: 'brian.nguyen@email.com', phone: '555-0137', date_of_birth: '1979-04-22', address_line1: '753 Olive Blvd', city: 'Colorado Springs', state: 'CO', postal_code: '80901', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Carol', last_name: 'Hill', email: 'carol.hill@email.com', phone: '555-0138', date_of_birth: '1994-08-15', address_line1: '159 Acacia St', city: 'Raleigh', state: 'NC', postal_code: '27601', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Kevin', last_name: 'Flores', email: 'kevin.flores@email.com', phone: '555-0139', date_of_birth: '1986-01-08', address_line1: '486 Hawthorn Ave', city: 'Omaha', state: 'NE', postal_code: '68101', country: 'USA' },
  { customer_type: 'INDIVIDUAL', first_name: 'Michelle', last_name: 'Green', email: 'michelle.green@email.com', phone: '555-0140', date_of_birth: '1990-05-01', address_line1: '357 Sumac Dr', city: 'Miami', state: 'FL', postal_code: '33101', country: 'USA' },
  
  // BUSINESS customers (10)
  { customer_type: 'BUSINESS', business_name: 'Tech Solutions Inc', email: 'contact@techsolutions.com', phone: '555-1001', address_line1: '1000 Innovation Dr', city: 'San Francisco', state: 'CA', postal_code: '94105', country: 'USA' },
  { customer_type: 'BUSINESS', business_name: 'Global Logistics LLC', email: 'info@globallogistics.com', phone: '555-1002', address_line1: '2000 Commerce Blvd', city: 'Chicago', state: 'IL', postal_code: '60602', country: 'USA' },
  { customer_type: 'BUSINESS', business_name: 'Metro Real Estate Group', email: 'info@metrorealestate.com', phone: '555-1003', address_line1: '3000 Park Ave', city: 'New York', state: 'NY', postal_code: '10002', country: 'USA' },
  { customer_type: 'BUSINESS', business_name: 'Swift Transportation Co', email: 'contact@swifttransport.com', phone: '555-1004', address_line1: '4000 Highway 1', city: 'Dallas', state: 'TX', postal_code: '75202', country: 'USA' },
  { customer_type: 'BUSINESS', business_name: 'Prime Healthcare Services', email: 'info@primehealthcare.com', phone: '555-1005', address_line1: '5000 Medical Center Dr', city: 'Boston', state: 'MA', postal_code: '02102', country: 'USA' },
  { customer_type: 'BUSINESS', business_name: 'Blue Wave Manufacturing', email: 'contact@bluewave.com', phone: '555-1006', address_line1: '6000 Industrial Pkwy', city: 'Detroit', state: 'MI', postal_code: '48202', country: 'USA' },
  { customer_type: 'BUSINESS', business_name: 'Summit Financial Advisors', email: 'info@summitfinancial.com', phone: '555-1007', address_line1: '7000 Wall St', city: 'New York', state: 'NY', postal_code: '10003', country: 'USA' },
  { customer_type: 'BUSINESS', business_name: 'Green Energy Solutions', email: 'contact@greenenergy.com', phone: '555-1008', address_line1: '8000 Solar Way', city: 'Phoenix', state: 'AZ', postal_code: '85002', country: 'USA' },
  { customer_type: 'BUSINESS', business_name: 'Pacific Construction Corp', email: 'info@pacificconstruction.com', phone: '555-1009', address_line1: '9000 Builder Ln', city: 'Seattle', state: 'WA', postal_code: '98102', country: 'USA' },
  { customer_type: 'BUSINESS', business_name: 'Apex Marketing Agency', email: 'contact@apexmarketing.com', phone: '555-1010', address_line1: '10000 Creative Blvd', city: 'Los Angeles', state: 'CA', postal_code: '90002', country: 'USA' }
];

// Helper functions for data generation
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomAmount = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

const randomChoice = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const generatePolicyNumber = (type, index) => {
  return `POL-${type}-${String(index).padStart(6, '0')}`;
};

const generateClaimNumber = (index) => {
  return `CLM-${String(index).padStart(6, '0')}`;
};

const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Jamie', 'Avery', 'Quinn', 'Sage'];
const lastNames = ['Anderson', 'Brown', 'Clark', 'Davis', 'Evans', 'Foster', 'Grant', 'Hayes', 'Irwin', 'Jones'];

const claimTypes = {
  HOME: ['FIRE', 'WATER_DAMAGE', 'THEFT', 'STORM', 'VANDALISM'],
  AUTO: ['COLLISION', 'THEFT', 'VANDALISM', 'HAIL', 'ACCIDENT'],
  LIFE: ['DEATH', 'TERMINAL_ILLNESS', 'DISABILITY']
};

module.exports = {
  seedPolicyholders,
  randomDate,
  randomAmount,
  randomChoice,
  generatePolicyNumber,
  generateClaimNumber,
  firstNames,
  lastNames,
  claimTypes
};

