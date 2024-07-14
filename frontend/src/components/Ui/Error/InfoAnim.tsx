import Lottie  from 'react-lottie-player';
import animation from './BoxKitten.json';

export default function Boor() {

  return <Lottie animationData={animation}  
  style={{ width: 550, height: 500 }} play   loop   />;

}