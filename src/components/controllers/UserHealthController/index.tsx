import uniqueId from "lodash.uniqueid";
import { useEffect } from "react";
import { useBodyParams } from "../../Body/context";
import { useHealth } from "../../HealthStorage/context";

export const USER_COLLISION_EVENT_NAME = 'user_collision';
const USER_ID = Number(uniqueId());

export const UserHealthController = () => {
  const {
    body
  } = useBodyParams();

  const {
    currentHealth,
    setHealth,
  } = useHealth(USER_ID);

  useEffect(() => {
    const cb = () => {

    }
  }, [])
  

  return null;
}