# ExploitX

## Setup Instructions

### 1. Clone and install
git clone <your-repo-url>
cd expressproject
npm install

### 2. Set up environment
cp .env_sample .env
# Open .env and fill in your MySQL password

### 3. Set up database
Open MySQL Workbench → File > Open SQL Script → select seed.sql → click Execute

### 4. Run the server
node app.js

### 5. Open browser
http://localhost:4000