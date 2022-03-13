import { useState, useRef, useEffect } from "react";
import { getSpaceAvailable } from "../utils/getSpaceAvailable";

/**
 *
 * @param {*} element HTMLElement
 */
export const useGame = () => {
  const elementRef = useRef(null);
  const [initialize, setInitialize] = useState(false);
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (!initialize) {
      setInitialize(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const element = elementRef?.current;
    if (element && initialize) {
      const sizes = getSpaceAvailable(element.current);
      const Phaser = require("phaser");
      const game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: element,
        scene: {
          init: function () {
            this.cameras.main.setBackgroundColor("#24252A");
          },
          create: function () {
            this.helloWorld = this.add.text(
              this.cameras.main.centerX,
              this.cameras.main.centerY,
              "Hello World",
              {
                font: "40px Arial",
                fill: "#ffffff",
              }
            );
            this.helloWorld.setOrigin(0.5);
          },
          update: function () {
            this.helloWorld.angle += 1;
          },
        },
        ...sizes,
      });
      setGame(game);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, initialize]);

  return { game, elementRef, initialize };
};
