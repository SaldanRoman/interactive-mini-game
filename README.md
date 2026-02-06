# 10x10 Reaction Grid Game

An interactive mini-game built with **Angular** where players test their reaction speed against a computer.

## 🎮 Game Rules
1. **Setup**: Enter a time limit `N` in milliseconds (default: 1000ms).
2. **Start**: Click the "Start" button to begin the game.
3. **Gameplay**:
   - A random blue square turns **yellow**.
   - You must click it before `N` milliseconds pass.
   - **Success**: Square turns **green**, Player scores 1 point.
   - **Failure**: Square turns **red**, Computer scores 1 point.
4. **Winning**: The first to reach **10 points** wins the match!

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/grid-game.git](https://github.com/YOUR_USERNAME/grid-game.git)

2. Navigate to the project directory:
   ```bash
   cd grid-game

3. Install dependencies:
   ```bash
   npm install

4. Start the development server:
   ```bash
   ng serve