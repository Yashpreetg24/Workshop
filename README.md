# Tilt Fire - Mobile Game

A React Native mobile game built with Expo that uses device tilt controls to move a player and shoot falling blocks. Tilt your device to move, tap to shoot!

## 🎮 Game Overview

Tilt Fire is an action-packed mobile game where you control a player using your device's accelerometer. The goal is to shoot and destroy falling blocks before they reach the bottom of the screen. Your score increases with each block you destroy!

## ✨ Features

- **Tilt Controls**: Move your player by tilting your device left or right
- **Tap to Shoot**: Tap the player to fire bullets at falling blocks
- **Dynamic Block Spawning**: Blocks fall from the top with varying speeds
- **Score Tracking**: Real-time score display
- **Smooth Gameplay**: Optimized game loop with collision detection
- **Cross-Platform**: Works on iOS, Android, and Web

## 🛠️ Technologies Used

- **React Native** (0.81.5)
- **Expo** (~54.0.25)
- **expo-sensors** (^15.0.7) - For accelerometer functionality
- **React** (19.1.0)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing)

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/Yashpreetg24/Workshop.git
cd tilt-fire-template
```

2. Install dependencies:
```bash
npm install
```

## 🎯 How to Run

### Start the development server:
```bash
npm start
```

### Run on specific platforms:

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Web:**
```bash
npm run web
```

Or scan the QR code with the Expo Go app on your mobile device.

## 🎮 How to Play

1. **Move**: Tilt your device left or right to move the player horizontally
2. **Shoot**: Tap on the player to fire bullets upward
3. **Destroy Blocks**: Aim your bullets at the falling blocks to destroy them
4. **Score**: Each destroyed block increases your score
5. **Survive**: Keep shooting and avoid letting blocks reach the bottom!

## 📁 Project Structure

```
tilt-fire-template/
├── App.js              # Main game component
├── index.js            # App entry point
├── app.json            # Expo configuration
├── package.json        # Dependencies and scripts
└── assets/             # Images and icons
    ├── icon.png
    ├── splash-icon.png
    └── ...
```

## 🎨 Game Mechanics

- **Player Movement**: Uses accelerometer data with smooth velocity interpolation
- **Bullet Physics**: Bullets move upward with slight random variation
- **Block Spawning**: Blocks spawn randomly at the top, sometimes clustering together
- **Collision Detection**: Precise rectangle-based collision detection between bullets and blocks
- **Game Loop**: Runs at ~20 FPS (50ms intervals) for smooth gameplay

## 🔧 Configuration

Game constants can be adjusted in `App.js`:
- `PLAYER_WIDTH` / `PLAYER_HEIGHT`: Player dimensions
- `BULLET_WIDTH` / `BULLET_HEIGHT`: Bullet dimensions
- `BLOCK_WIDTH` / `BLOCK_HEIGHT`: Block dimensions
- Spawn rates and speeds can be modified in the game loop

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web (note: accelerometer may not work on web)

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📄 License

This project is private.

## 👤 Author

Created as part of a game development workshop.

---

**Note**: For the best experience, play on a physical mobile device where the accelerometer controls work properly. Web version may have limited functionality.
