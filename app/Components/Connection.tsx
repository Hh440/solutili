
import dynamic from 'next/dynamic'
const Earth = dynamic(() => import('./Earth'), {

    ssr: false,

})
const Locked= ()=>{
    return(
        <div className='w-full h-full bg-[#1f2221]'>
            <Earth/>
        </div>
    )
}

export default Locked