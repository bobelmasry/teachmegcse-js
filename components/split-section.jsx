import Image from "next/image"

export default function SplitSection ({header, description, imageSrc}) {

    return (
        <>
        <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-24">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <Image
          alt="Party"
          src={imageSrc}
          height={0}
          width={0}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="lg:py-24">
        <h2 className="text-3xl text-gray-100 font-bold sm:text-4xl">
          {header}
        </h2>
        <p className="mt-4 text-gray-300">
          {description}
        </p>
      </div>
    </div>
  </div>
</section>


        </>
    )
}