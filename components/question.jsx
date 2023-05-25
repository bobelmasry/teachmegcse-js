import Link from "next/link"
import Image from "next/image"

export default function Question ({imageSrc, linkSrc}) {
    return (
        <>
        <div className='sm:border sm:border-4 sm:border-green-600 p-2 rounded rounded-xl'>
                <Image className='rounded rounded-md' src={`https://teachmegcse-api2.s3.eu-central-1.amazonaws.com/sortedp1/1/${imageSrc}`} alt='image' height={800} width={800} />
                <div className="flex gap-4">
                    <h1 className='dark:text-white text-xl sm:text-2xl mt-4'>Answer: {questionData.Answer}</h1>
                    <h1 className='dark:text-white text-xl sm:text-2xl mt-4'>Source: <Link href={`/A-level/${questionData.Subject}/2022/${questionData.pdfName}`}></Link>{questionData.pdfName}</h1>
                </div>
            </div>
        </>
    )
}