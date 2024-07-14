import Lottie  from 'react-lottie-player';
import animation from './anime.json';

export default function Boor() {

  return <Lottie animationData={animation}  
  style={{ width: 350, height: 100 }} play   loop   />;

}