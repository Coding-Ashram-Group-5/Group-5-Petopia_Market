import Lottie from 'react-lottie-player';
import animation from './dognotauth.json';


export default function Warnings() {
  return (
    <>
      <div className="flex justify-center items-center flex-col h-[50vh]"> <Lottie animationData={animation}
        style={{ width: 350, height: 250 }} play loop /><h1 className="text-center text-4xl font-cab font-bold">⚠️Warning! Restricted Area. ⚠️</h1></div>
    </>
  )
}
