import React, { useEffect } from "react";
import { useGame } from "../game/useGame";
import { useStoreOpenChat } from "../store/openChat";
import { useAvailableSize } from "../hooks/useAvailableSize";

export const Game = () => {
  const isOpenChat = useStoreOpenChat((store) => store.openChat);
  const { game, elementRef } = useGame();
  useAvailableSize(elementRef.current, isOpenChat, console.log);
  return <div ref={elementRef}></div>;
};
