import img from '@/assets/video.gif'
export default function VideoAdd() {
    return (
        <>
        <div className="h-full w-full  rounded-lg  my-2 px-2">
            <img src={img} alt="" className=' object-cover border-4 object-center rounded-lg' />

        </div>
        </>
    )
}
