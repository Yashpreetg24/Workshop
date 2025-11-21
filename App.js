import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Accelerometer } from "expo-sensors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;

const BULLET_WIDTH = 10;
const BULLET_HEIGHT = 20;

const BLOCK_WIDTH = 40;
const BLOCK_HEIGHT = 40;

export default function App() {
  const [playerX, setPlayerX] = useState((screenWidth - PLAYER_WIDTH) / 2);
  const [bullets, setBullets] = useState([]);
  const [fallingBlocks, setFallingBlocks] = useState([]);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(true);
  const [velocity, setVelocity] = useState(0); 

  useEffect(() => {
    Accelerometer.setUpdateInterval(16);

    const subscription = Accelerometer.addListener(({ x }) => {
      const rawMove = x * 5;
      const targetVelocity = rawMove * 0.8 + velocity * 0.2; 
      setVelocity(targetVelocity);
      
      setPlayerX((prevX) => {
        const jitter = (Math.random() - 0.5) * 0.3;
        const newX = prevX + targetVelocity + jitter;
        return Math.max(0, Math.min(newX, screenWidth - PLAYER_WIDTH));
      });
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!gameRunning) return;

    const gameLoop = setInterval(() => {
      setBullets(prevBullets => {
        setFallingBlocks(prevBlocks => {

          const movedBullets = prevBullets
            .map(bullet => ({ 
              ...bullet, 
              y: bullet.y - (9 + Math.random() * 2) 
            }))
            .filter(bullet => bullet.y > -BULLET_HEIGHT);

          let updatedBlocks = prevBlocks
            .map(block => ({ 
              ...block, 
              y: block.y + (block.speed || (2.5 + Math.random() * 1.5)) 
            }))
            .filter(block => block.y < screenHeight + BLOCK_HEIGHT);

          if (Math.random() < 0.015) {
            let spawnX;
            if (updatedBlocks.length > 0 && Math.random() < 0.4) {
              const nearbyBlock = updatedBlocks[Math.floor(Math.random() * updatedBlocks.length)];
              spawnX = nearbyBlock.x + (Math.random() - 0.5) * 100;
              spawnX = Math.max(0, Math.min(spawnX, screenWidth - BLOCK_WIDTH));
            } else {
              spawnX = Math.random() * (screenWidth - BLOCK_WIDTH);
            }
            
            const newBlock = {
              id: Date.now() + Math.random(),
              x: spawnX,
              y: -BLOCK_HEIGHT,
              speed: 2.5 + Math.random() * 1.5, 
            };
            updatedBlocks = [...updatedBlocks, newBlock];
          }

          const { remainingBullets, remainingBlocks, newScore } = checkCollisions(movedBullets, updatedBlocks);
          
          if (newScore > 0) {
            setScore(prev => prev + newScore);
          }

          setBullets(remainingBullets);
          
          return remainingBlocks;
        });

        return prevBullets;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameRunning]);

  const checkCollisions = (currentBullets, currentBlocks) => {
    const remainingBullets = [];
    const remainingBlocks = [...currentBlocks];
    let newScore = 0;
    
    currentBullets.forEach(bullet => {
      let bulletHit = false;
      
      for (let i = remainingBlocks.length - 1; i >= 0; i--) {
        const block = remainingBlocks[i];
        const collision = 
          bullet.x < block.x + BLOCK_WIDTH &&
          bullet.x + BULLET_WIDTH > block.x &&
          bullet.y < block.y + BLOCK_HEIGHT &&
          bullet.y + BULLET_HEIGHT > block.y;
        
        if (collision && !bulletHit) {
          bulletHit = true;
          remainingBlocks.splice(i, 1);
          newScore++;
          break;
        }
      }
      
      if (!bulletHit) {
        remainingBullets.push(bullet);
      }
    });
    
    return { remainingBullets, remainingBlocks, newScore };
  };

  const shootBullet = () => {
    if (!gameRunning) return;
    
    const aimOffset = (Math.random() - 0.5) * 8; 
    
    const newBullet = {
      id: Date.now() + Math.random(),
      x: playerX + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2 + aimOffset,
      y: screenHeight - 100,
    };
    setBullets(prev => [...prev, newBullet]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      
      <TouchableOpacity 
        style={[styles.player, { left: playerX }]} 
        onPress={shootBullet}
        activeOpacity={0.8}
      />
      
      {bullets.map(bullet => (
        <View
          key={bullet.id}
          style={[styles.bullet, { left: bullet.x, top: bullet.y }]}
        />
      ))}
      
      {fallingBlocks.map(block => (
        <View
          key={block.id}
          style={[styles.fallingBlock, { left: block.x, top: block.y }]}
        />
      ))}
      
      <Text style={styles.instruction}>Tilt to move • Tap player to shoot</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
  },
  player: {
    position: "absolute",
    bottom: 20,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 5,
  },
  instruction: {
    position: "absolute",
    bottom: 10,
    color: "#fff",
    fontFamily: "Courier",
    fontSize: 12,
    textAlign: "center",
  },
  score: {
    position: "absolute",
    top: 50,
    color: "#fff",
    fontFamily: "Courier",
    fontSize: 18,
    fontWeight: "bold",
  },
  bullet: {
    position: "absolute",
    width: BULLET_WIDTH,
    height: BULLET_HEIGHT,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 2,
  },
  fallingBlock: {
    position: "absolute",
    width: BLOCK_WIDTH,
    height: BLOCK_HEIGHT,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 3,
  },
  gameOverText: {
    position: "absolute",
    top: screenHeight / 2 - 40,
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Courier",
  },
});